// Read-only: reads committed ledger JSON (derived numbers only) from the three repos via git show.
import { execFileSync } from 'node:child_process';

const show = (repo, spec) => execFileSync('git', ['-C', repo, 'show', spec], { encoding: 'utf8', maxBuffer: 1 << 28 });
const GAME = 'C:/Users/xande/infinity autobattler';
const KIT = 'C:/Users/xande/agentic-harness';
const TL = 'C:/Users/xande/token-ledger';

const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length === 0 ? NaN : s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const f2 = (x) => (Math.round(x * 100) / 100).toFixed(2);

function describe(name, rows) {
  console.log(`\n== ${name}: ${rows.length} rows`);
  const both = rows.filter((r) => r.costUSD != null && r.listUSD != null);
  const onlyCost = rows.filter((r) => r.costUSD != null && r.listUSD == null);
  const onlyList = rows.filter((r) => r.costUSD == null && r.listUSD != null);
  const neither = rows.filter((r) => r.costUSD == null && r.listUSD == null);
  console.log(`costUSD&listUSD ${both.length}, costUSD only ${onlyCost.length}, listUSD only ${onlyList.length}, neither ${neither.length}`);
  const costOf = (r) => r.costUSD ?? r.listUSD ?? 0;
  console.log(`sum costOf (costUSD ?? listUSD) $${f2(sum(rows.map(costOf)))}; sum listUSD (where present) $${f2(sum(rows.map((r) => r.listUSD ?? 0)))}; sum costUSD (where present) $${f2(sum(rows.map((r) => r.costUSD ?? 0)))}`);
  if (both.length) {
    const d = both.map((r) => r.listUSD - r.costUSD);
    const abs = d.map(Math.abs);
    console.log(`rows with both: sum listUSD $${f2(sum(both.map((r) => r.listUSD)))} vs sum costUSD $${f2(sum(both.map((r) => r.costUSD)))}; median |diff| $${f2(median(abs))}; |diff| > $0.05: ${abs.filter((x) => x > 0.05).length}; > $1: ${abs.filter((x) => x > 1).length}; list > cost by >$0.05: ${d.filter((x) => x > 0.05).length}; cost > list by >$0.05: ${d.filter((x) => x < -0.05).length}`);
    const worst = both.map((r) => ({ id: r.id.slice(0, 8), start: r.start.slice(0, 10), list: r.listUSD, cost: r.costUSD, d: r.listUSD - r.costUSD, flags: r.flags.join('; ') })).sort((a, b) => Math.abs(b.d) - Math.abs(a.d)).slice(0, 8);
    for (const w of worst) console.log(`  ${w.start} ${w.id} list ${f2(w.list)} cost ${f2(w.cost)} diff ${f2(w.d)} [${w.flags}]`);
  }
  const flagCount = {};
  for (const r of rows) for (const fl of r.flags ?? []) {
    const k = fl.replace(/\d+(\.\d+)?k?m?/g, 'N');
    flagCount[k] = (flagCount[k] ?? 0) + 1;
  }
  console.log('flags:', JSON.stringify(flagCount));
  console.log(`rows without agents field ${rows.filter((r) => r.agents === undefined).length}; without model ${rows.filter((r) => r.model === undefined).length}; without workMin ${rows.filter((r) => r.workMin === undefined).length}`);
  console.log(`tool errors ${sum(rows.map((r) => r.toolErrors))} of ${sum(rows.map((r) => r.tools))} tool results; gates ${sum(rows.map((r) => r.gates))}; commits ${sum(rows.map((r) => r.commits))}; linesAdded null ${rows.filter((r) => r.linesAdded == null).length}`);
  return { costOf };
}

const game = JSON.parse(show(GAME, 'HEAD:docs/session-ledger.json'));
const { costOf } = describe('game ledger @ HEAD', game);

// before / after E1 (2026-10-02, the kit's NUMBERS split) on the game ledger: per session and per delivered unit
const split = (label, rows) => {
  const cost = sum(rows.map(costOf));
  const commits = sum(rows.map((r) => r.commits));
  const lines = sum(rows.map((r) => r.linesAdded ?? 0));
  const linesRows = rows.filter((r) => r.linesAdded != null).length;
  console.log(`${label}: n ${rows.length}; cost $${f2(cost)}; avg/session $${f2(cost / rows.length)}; commits ${commits}; $/commit ${f2(cost / commits)}; lines+ ${lines} (rows with a figure: ${linesRows}); $/1k lines+ ${f2((cost / lines) * 1000)}; calls ${sum(rows.map((r) => r.calls))}; costUSD present ${rows.filter((r) => r.costUSD != null).length}; listUSD present ${rows.filter((r) => r.listUSD != null).length}; agents field present ${rows.filter((r) => r.agents !== undefined).length}`);
};
console.log('\n== game: before / after 2026-10-02 (start date, UTC string compare)');
split('before 2026-10-02', game.filter((r) => r.start < '2026-10-02'));
split('from 2026-10-02  ', game.filter((r) => r.start >= '2026-10-02'));
split('2026-10-02..10-08', game.filter((r) => r.start >= '2026-10-02' && r.start < '2026-10-09'));
split('2026-10 (month)  ', game.filter((r) => r.start.startsWith('2026-10')));
split('2026-11 (month)  ', game.filter((r) => r.start.startsWith('2026-11')));

console.log('\n== game: weekly cost, commits, sessions');
const wk = {};
for (const r of game) {
  const d = new Date(r.start);
  const k = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - ((d.getUTCDay() + 6) % 7))).toISOString().slice(0, 10);
  (wk[k] ??= []).push(r);
}
for (const k of Object.keys(wk).sort()) {
  const rows = wk[k];
  const cost = sum(rows.map(costOf));
  const commits = sum(rows.map((r) => r.commits));
  console.log(`week of ${k}: sessions ${rows.length}, cost $${f2(cost)}, commits ${commits}, $/commit ${commits ? f2(cost / commits) : '-'}, median peak ${median(rows.map((r) => r.peakK))}k, >250k ${rows.filter((r) => r.peakK > 250).length}`);
}
console.log(`peak > 250k overall: ${game.filter((r) => r.peakK > 250).length} of ${game.length}`);

describe('kit ledger @ HEAD', JSON.parse(show(KIT, 'HEAD:docs/session-ledger.json')));
const tl = JSON.parse(show(TL, 'HEAD:docs/session-ledger.json'));
describe('token-ledger ledger @ HEAD', tl);
for (const r of tl) console.log(`  ${r.start.slice(0, 16)} ${r.id.slice(0, 8)} ${r.model} prompts ${r.prompts} calls ${r.calls} peak ${r.peakK}k reread ${r.reReadM}M cost ${r.costUSD} list ${r.listUSD} atOpus ${r.atOpusUSD ?? '-'} gates ${r.gates} commits ${r.commits} lines ${r.linesAdded} work ${r.workMin} errs ${r.toolErrors}/${r.tools} [${r.flags.join('; ')}]`);
