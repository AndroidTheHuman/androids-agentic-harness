// Checks that the kit's ported ledger (tools/sessions.ts) computes the same rows as the game's.
// Read-only: it reads the game's transcripts and its committed ledger, and writes nothing.
//
//   node --no-warnings evidence/ledger-port-check.mjs "<game repo>" [<rev>]
//
// 1. Every row the game committed at <rev> (default HEAD) whose transcript still exists is
//    recomputed by the kit's code and compared field by field.
// 2. A row can differ only when its transcript grew after the game wrote it, in two known ways:
//    - the newest row is written by its own session (`npm run sessions -- --current`) before that
//      session ends: the check cuts the transcript where the session ran that command;
//    - Claude Code appends a `cost-state` record (no timestamp) to a transcript later, sometimes
//      hours after the session: when the file was modified after <rev>'s commit, the check
//      recomputes without those records.
//    The row is reproduced when either recomputation gives it exactly.
// 3. The check proves the port, not the prices: it computes at the rates the game committed at <rev>
//    (its tools/sessionMeasures.ts → PRICES). Since 2026-11-10 the kit's rates differ (Sonnet 5.5's
//    cache read, audit finding 1), so the rows whose list price the kit's rates change are counted
//    after the check, by name.
// Exit 0 when every row is reproduced, else 2.

import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { agentUsage, parse, scan, slugOf, summarise, transcriptDir } from '../tools/sessions.ts';
import { KIT_PRICES, gamePrices, rateDiffs, setPrices } from './game-prices.mjs';

const [game, rev = 'HEAD'] = process.argv.slice(2);
if (game === undefined) {
  console.error('usage: node --no-warnings evidence/ledger-port-check.mjs "<game repo>" [<rev>]');
  process.exit(1);
}

const sorted = (o) => JSON.stringify(o, Object.keys(o).sort());
const show = (path) => execFileSync('git', ['-C', game, 'show', `${rev}:${path}`], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
const sha = execFileSync('git', ['-C', game, 'rev-parse', '--short', rev], { encoding: 'utf8' }).trim();
const committed = JSON.parse(show('docs/session-ledger.json'));
const commitTime = Date.parse(execFileSync('git', ['-C', game, 'log', '-1', '--format=%cI', rev], { encoding: 'utf8' }).trim());
const dir = transcriptDir(slugOf(game));

// The comparison runs at the game's PRICES at <rev>; the kit's are restored after it.
const game_ = gamePrices(game, rev);
const diffs = rateDiffs(game_, KIT_PRICES);
setPrices(game_);

const kit = new Map(scan(dir).map((r) => [r.id, r]));

const runsCurrent = (b) => b.type === 'tool_use' && /npm\s+run\s+sessions\s+--\s+--current/.test(String(b.input?.command ?? ''));

/** The row as the session saw it when it ran `sessions -- --current`: entries up to that call. */
function cuts(id) {
  const entries = parse(readFileSync(join(dir, `${id}.jsonl`), 'utf8'));
  const out = [];
  entries.forEach((e, i) => {
    if (e.type !== 'assistant' || !Array.isArray(e.message?.content) || !e.message.content.some(runsCurrent)) return;
    let end = i;
    while (entries[end + 1]?.type === 'assistant' && entries[end + 1]?.message?.id === e.message.id) end++;
    out.push({ at: e.timestamp, row: summarise(id, entries.slice(0, end + 1), agentUsage(dir, id)) });
  });
  return out;
}

/** The row with the transcript's `cost-state` records left out. */
function withoutCostState(id) {
  const entries = parse(readFileSync(join(dir, `${id}.jsonl`), 'utf8')).filter((e) => e.type !== 'cost-state');
  return summarise(id, entries, agentUsage(dir, id));
}

let same = 0;
let gone = 0;
const reproduced = [];
const failed = [];
for (const row of committed) {
  const mine = kit.get(row.id);
  if (mine === undefined) {
    gone++;
    continue;
  }
  if (sorted(mine) === sorted(row)) {
    same++;
    continue;
  }
  const hit = cuts(row.id).find((c) => c.row !== null && sorted(c.row) === sorted(row));
  const file = join(dir, `${row.id}.jsonl`);
  const modified = statSync(file).mtimeMs;
  const late = modified > commitTime ? withoutCostState(row.id) : null;
  if (hit !== undefined) reproduced.push(`${row.id.slice(0, 8)} (${row.title}): reproduced by the cut at its --current run, ${hit.at}`);
  else if (late !== null && sorted(late) === sorted(row))
    reproduced.push(`${row.id.slice(0, 8)} (${row.title}): reproduced without the cost-state record appended after ${sha} (file modified ${new Date(modified).toISOString()})`);
  else {
    const fields = Object.keys({ ...row, ...mine }).filter((k) => JSON.stringify(row[k]) !== JSON.stringify(mine[k]));
    failed.push(`${row.id.slice(0, 8)} (${row.title}): ${fields.map((k) => `${k} ${JSON.stringify(row[k])} → ${JSON.stringify(mine[k])}`).join('; ')}`);
  }
}
const newer = [...kit.keys()].filter((id) => !committed.some((r) => r.id === id)).length;
const latest = committed.at(-1);

console.log(`Game ledger at ${sha}: ${committed.length} rows; transcripts in ${dir}`);
console.log(`- identical when recomputed by the kit: ${same}`);
console.log(`- transcript gone (row kept by the ledger, not recomputable): ${gone}`);
console.log(`- reproduced once what was appended later is left out: ${reproduced.length}`);
for (const r of reproduced) console.log(`    ${r}`);
console.log(`- not reproduced: ${failed.length}`);
for (const f of failed) console.log(`    ${f}`);
console.log(`- sessions newer than the committed ledger (not compared): ${newer}`);
const latestOk = !failed.some((f) => f.startsWith(latest.id.slice(0, 8))) && kit.has(latest.id);
console.log(`Latest committed row ${latest.id.slice(0, 8)} (${latest.title}, ${latest.start}): ${latestOk ? 'reproduced' : 'NOT reproduced'}`);

// What the kit's own rates change, outside the check.
setPrices(KIT_PRICES);
console.log(`Rates: compared at the game's PRICES at ${sha}; the kit's differ: ${diffs.join('; ') || 'none'}`);
if (diffs.length > 0) {
  const moved = scan(dir).filter((r) => kit.has(r.id) && committed.some((c) => c.id === r.id) && r.listUSD !== kit.get(r.id).listUSD);
  const sum = (xs) => xs.reduce((s, x) => s + (x ?? 0), 0);
  console.log(
    `- committed rows whose list price the kit's rates change: ${moved.length} ` +
      `($${sum(moved.map((r) => kit.get(r.id).listUSD)).toFixed(2)} at the game's rates → $${sum(moved.map((r) => r.listUSD)).toFixed(2)} at the kit's)`,
  );
}
process.exitCode = failed.length === 0 && latestOk ? 0 : 2;
