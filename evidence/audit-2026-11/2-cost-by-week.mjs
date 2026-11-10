// Read-only: committed game ledger (derived numbers only) via git show.
import { execFileSync } from 'node:child_process';
const show = (repo, spec) => execFileSync('git', ['-C', repo, 'show', spec], { encoding: 'utf8', maxBuffer: 1 << 28 });
const game = JSON.parse(show('C:/Users/xande/infinity autobattler', 'HEAD:docs/session-ledger.json'));
const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const f2 = (x) => (Math.round(x * 100) / 100).toFixed(2);
const weekOf = (iso) => {
  const d = new Date(iso);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - ((d.getUTCDay() + 6) % 7))).toISOString().slice(0, 10);
};

console.log('== cost-state (costUSD) vs computed list price (listUSD), by week, rows that have both');
const wk = {};
for (const r of game) (wk[weekOf(r.start)] ??= []).push(r);
for (const k of Object.keys(wk).sort()) {
  const rows = wk[k];
  const both = rows.filter((r) => r.costUSD != null && r.listUSD != null);
  const d = both.map((r) => r.listUSD - r.costUSD);
  console.log(`week of ${k}: rows ${rows.length}, with costUSD ${both.length}, list>cost by >$0.05: ${d.filter((x) => x > 0.05).length} (sum $${f2(sum(d.filter((x) => x > 0.05)))}), cost>list by >$0.05: ${d.filter((x) => x < -0.05).length} (sum $${f2(sum(d.filter((x) => x < -0.05)))}), within 5c: ${d.filter((x) => Math.abs(x) <= 0.05).length}`);
}

console.log('\n== rows where they differ by > $0.05: what else is true of them');
const both = game.filter((r) => r.costUSD != null && r.listUSD != null);
const diff = both.filter((r) => Math.abs(r.listUSD - r.costUSD) > 0.05);
const same = both.filter((r) => Math.abs(r.listUSD - r.costUSD) <= 0.05);
const prof = (label, rows) => console.log(`${label}: n ${rows.length}; with sub-agents ${rows.filter((r) => (r.agents ?? 0) > 0).length}; sonnet in model ${rows.filter((r) => /sonnet/.test(r.model ?? '')).length}; model switch ${rows.filter((r) => r.flags.includes('model switch')).length}; peak>250k ${rows.filter((r) => r.peakK > 250).length}; peak>300k ${rows.filter((r) => r.peakK > 300).length}; cold re-cache ${rows.filter((r) => r.coldCaches > 0).length}; hours>3 ${rows.filter((r) => r.hours > 3).length}`);
prof('list > cost', diff.filter((r) => r.listUSD > r.costUSD));
prof('cost > list', diff.filter((r) => r.listUSD < r.costUSD));
prof('agree      ', same);
console.log('list > cost rows (date, id, model, peak, agents, hours, list, cost, ratio):');
for (const r of diff.filter((r) => r.listUSD > r.costUSD).sort((a, b) => (a.start < b.start ? -1 : 1))) console.log(`  ${r.start.slice(0, 10)} ${r.id.slice(0, 8)} ${r.model} peak ${r.peakK}k agents ${r.agents} h ${r.hours} list ${f2(r.listUSD)} cost ${f2(r.costUSD)} ratio ${(r.costUSD / r.listUSD).toFixed(3)}`);
console.log('cost > list rows:');
for (const r of diff.filter((r) => r.listUSD < r.costUSD).sort((a, b) => (a.start < b.start ? -1 : 1))) console.log(`  ${r.start.slice(0, 10)} ${r.id.slice(0, 8)} ${r.model} peak ${r.peakK}k agents ${r.agents} h ${r.hours} list ${f2(r.listUSD)} cost ${f2(r.costUSD)} ratio ${(r.costUSD / r.listUSD).toFixed(3)} [${r.flags.join('; ')}]`);

console.log('\n== before / after 2026-10-02 on each cost measure');
const grp = (label, rows) => {
  const list = sum(rows.map((r) => r.listUSD ?? 0));
  const mix = sum(rows.map((r) => r.costUSD ?? r.listUSD ?? 0));
  const withLines = rows.filter((r) => r.linesAdded != null);
  const commits = sum(rows.map((r) => r.commits));
  console.log(`${label}: n ${rows.length}; mixed (costUSD ?? listUSD) total $${f2(mix)} avg $${f2(mix / rows.length)}; listUSD total $${f2(list)} avg $${f2(list / rows.length)}; commits ${commits}; listUSD per commit $${f2(list / commits)}; rows with Lines+ ${withLines.length}: listUSD $${f2(sum(withLines.map((r) => r.listUSD)))} over ${sum(withLines.map((r) => r.linesAdded))} lines = $${f2((sum(withLines.map((r) => r.listUSD)) / sum(withLines.map((r) => r.linesAdded))) * 1000)} per 1k lines; sessions with 0 commits ${rows.filter((r) => r.commits === 0).length}`);
};
grp('before 2026-10-02', game.filter((r) => r.start < '2026-10-02'));
grp('from 2026-10-02  ', game.filter((r) => r.start >= '2026-10-02'));
for (const k of Object.keys(wk).sort()) grp(`week of ${k}`, wk[k]);
