// Times a lite-tier adoption: package C's stopwatch. The rule and its bar were fixed in
// docs/C_KICKOFF.md before the run. Read-only: it reads one transcript and writes nothing.
//
//   node --no-warnings evidence/adoption-time.mjs "<project folder>" [<session id or prefix>]
//   node --no-warnings evidence/adoption-time.mjs "<transcript>.jsonl"
//
// The session is the one named, or else the project's earliest transcript (its first session).
// The adoption ends at that session's first `npm run sessions -- --current` whose result is not an
// error and prints the session's own row (its full id). The transcript is cut just after that
// result and measured by the kit's own ledger code (tools/sessions.ts → summarise), so work and
// wait time, prompts, calls, context and cost mean what they mean in the ledger. Wall clock is the
// first timestamped entry to that result. Sub-agent figures cover the whole session, not only the
// part before the cut. Transcripts are deleted after about 30 days, so time a run before then.
// Exit 0 when the bar is met, 1 when it is not, 2 when there is nothing to time.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { agentUsage, parse, slugOf, summarise, transcriptDir } from '../tools/sessions.ts';

const BAR_MINUTES = 15; // docs/C_KICKOFF.md: the README's lite-tier target, wall clock

const usage = 'usage: node --no-warnings evidence/adoption-time.mjs "<project folder>" [<session id>] | "<transcript>.jsonl"';
const stop = (message) => {
  console.error(message);
  process.exit(2);
};

const [target, wanted] = process.argv.slice(2);
if (target === undefined) stop(usage);

const read = (dir, id) => parse(readFileSync(join(dir, `${id}.jsonl`), 'utf8'));
const firstStamp = (entries) => entries.find((e) => e.timestamp !== undefined)?.timestamp;

let dir;
let id;
if (target.endsWith('.jsonl')) {
  if (!existsSync(target)) stop(`no transcript at ${target}`);
  dir = dirname(target);
  id = basename(target, '.jsonl');
} else {
  try {
    dir = transcriptDir(slugOf(target));
  } catch (e) {
    stop(String(e.message ?? e));
  }
  const ids = readdirSync(dir).filter((f) => f.endsWith('.jsonl')).map((f) => basename(f, '.jsonl'));
  if (wanted !== undefined) {
    const hits = ids.filter((i) => i.startsWith(wanted));
    if (hits.length !== 1) stop(`${hits.length} transcripts in ${dir} start with ${wanted}`);
    id = hits[0];
  } else {
    const dated = ids.map((i) => ({ i, at: firstStamp(read(dir, i)) })).filter((d) => d.at !== undefined);
    if (dated.length === 0) stop(`no timestamped transcript in ${dir}`);
    dated.sort((a, b) => (a.at < b.at ? -1 : 1));
    id = dated[0].i;
  }
}

const entries = read(dir, id);
const runsCurrent = (b) => b.type === 'tool_use' && /npm\s+run\s+sessions\s+--\s+--current/.test(String(b.input?.command ?? ''));
const printsRow = (b) => JSON.stringify(b.content ?? '').includes(`${id}:`);

const asked = new Set();
let end = -1;
for (let i = 0; i < entries.length && end < 0; i++) {
  const e = entries[i];
  const content = e.message?.content;
  if (!Array.isArray(content)) continue;
  if (e.type === 'assistant' && e.isSidechain !== true) for (const b of content) if (runsCurrent(b) && b.id !== undefined) asked.add(b.id);
  if (e.type === 'user' && content.some((b) => b.type === 'tool_result' && asked.has(b.tool_use_id) && b.is_error !== true && printsRow(b))) end = i;
}
if (end < 0) stop(`session ${id} never ran \`npm run sessions -- --current\` successfully, so there is no adoption to time`);

const cut = entries.slice(0, end + 1);
const row = summarise(id, cut, agentUsage(dir, id));
if (row === null) stop(`session ${id} has no model calls before its --current run`);

const start = firstStamp(cut);
const at = entries[end].timestamp;
const minutes = (Date.parse(at) - Date.parse(start)) / 60_000;
const title = entries.findLast((e) => e.type === 'ai-title' && e.aiTitle !== undefined)?.aiTitle ?? '';
const usd = row.costUSD ?? row.listUSD;
const met = minutes <= BAR_MINUTES;
const one = (n) => (n === undefined ? '—' : n.toFixed(1));

console.log(`Adoption timed in ${dir}`);
console.log(`  session  ${id}${title === '' ? '' : ` "${title}"`} · ${row.model ?? '—'}`);
console.log(`  start    ${start} (first entry)`);
console.log(`  end      ${at} (first successful \`npm run sessions -- --current\`)`);
console.log(`  wall clock ${one(minutes)} min · work ${one(row.workMin)} min · waiting on shell commands ${one(row.waitMin)} min`);
console.log(`  prompts ${row.prompts} · model calls ${row.calls} · tool calls ${row.tools} (${row.toolErrors} errors) · peak context ${row.peakK}k · cost $${usd === undefined || usd === null ? '—' : usd.toFixed(2)}`);
console.log(`  bar (docs/C_KICKOFF.md): wall clock ≤ ${BAR_MINUTES} min → ${met ? 'met' : 'not met'}`);
process.exit(met ? 0 : 1);
