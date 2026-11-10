// Read-only: committed game ledger (derived numbers only) via git show.
import { execFileSync } from 'node:child_process';
const show = (repo, spec) => execFileSync('git', ['-C', repo, 'show', spec], { encoding: 'utf8', maxBuffer: 1 << 28 });
const game = JSON.parse(show('C:/Users/xande/infinity autobattler', 'HEAD:docs/session-ledger.json'));
const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const f2 = (x) => (Math.round(x * 100) / 100).toFixed(2);
const pct = (x) => (Math.round(x * 1000) / 10).toFixed(1) + '%';
const median = (xs) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const sonnetOnly = game.filter((r) => /^sonnet-5\.5/.test(r.model ?? '') && !/\+/.test(r.model ?? ''));
const opusOnly = game.filter((r) => /^opus-5\.5/.test(r.model ?? '') && !/\+/.test(r.model ?? ''));
console.log(`rows: sonnet-only main model ${sonnetOnly.length}, opus-only ${opusOnly.length}, other ${game.length - sonnetOnly.length - opusOnly.length}`);

const sBoth = sonnetOnly.filter((r) => r.costUSD != null);
console.log(`sonnet rows with a recorded cost: ${sBoth.length} of ${sonnetOnly.length}; recorded below computed by > $0.05 on ${sBoth.filter((r) => r.listUSD - r.costUSD > 0.05).length}; within 5c on ${sBoth.filter((r) => Math.abs(r.listUSD - r.costUSD) <= 0.05).length}`);
console.log(`  sum listUSD $${f2(sum(sBoth.map((r) => r.listUSD)))}, sum costUSD $${f2(sum(sBoth.map((r) => r.costUSD)))}, recorded/computed ${pct(sum(sBoth.map((r) => r.costUSD)) / sum(sBoth.map((r) => r.listUSD)))}; per-row ratio median ${median(sBoth.map((r) => r.costUSD / r.listUSD)).toFixed(3)}, min ${Math.min(...sBoth.map((r) => r.costUSD / r.listUSD)).toFixed(3)}, max ${Math.max(...sBoth.map((r) => r.costUSD / r.listUSD)).toFixed(3)}`);
const sAt = sBoth.filter((r) => r.atOpusUSD != null);
console.log(`  of those, with atOpusUSD ${sAt.length}: atOpus $${f2(sum(sAt.map((r) => r.atOpusUSD)))}; saving vs Opus rates by computed list ${pct(1 - sum(sAt.map((r) => r.listUSD)) / sum(sAt.map((r) => r.atOpusUSD)))}; by Claude Code's recorded cost ${pct(1 - sum(sAt.map((r) => r.costUSD)) / sum(sAt.map((r) => r.atOpusUSD)))}`);

const oBoth = opusOnly.filter((r) => r.costUSD != null);
console.log(`opus rows with a recorded cost: ${oBoth.length} of ${opusOnly.length}; within 5c ${oBoth.filter((r) => Math.abs(r.listUSD - r.costUSD) <= 0.05).length}; recorded above computed by > $0.05: ${oBoth.filter((r) => r.costUSD - r.listUSD > 0.05).length}; sum listUSD $${f2(sum(oBoth.map((r) => r.listUSD)))}, sum costUSD $${f2(sum(oBoth.map((r) => r.costUSD)))}`);

// M10-style: what routing saved, on each measure
const off = game.filter((r) => r.atOpusUSD != null);
const total = sum(game.map((r) => r.listUSD ?? 0));
console.log(`\nrows that ran a call off Opus: ${off.length}; atOpus − listUSD = $${f2(sum(off.map((r) => r.atOpusUSD - r.listUSD)))} = ${pct(sum(off.map((r) => r.atOpusUSD - r.listUSD)) / total)} of the ledger's listUSD total $${f2(total)}`);
const offCost = off.map((r) => r.atOpusUSD - (r.costUSD ?? r.listUSD));
console.log(`the same with Claude Code's recorded cost where one exists (${off.filter((r) => r.costUSD != null).length} of ${off.length} rows): $${f2(sum(offCost))} = ${pct(sum(offCost) / total)} of the same total`);

// what the Cost column mixes
const mixed = sum(game.map((r) => r.costUSD ?? r.listUSD ?? 0));
console.log(`\nCost column (costUSD ?? listUSD) total $${f2(mixed)} vs listUSD total $${f2(total)}: ${pct(1 - mixed / total)} lower`);
console.log(`rows with no recorded cost: ${game.filter((r) => r.costUSD == null).length}; by month: ${['2026-09', '2026-10', '2026-11'].map((m) => `${m} ${game.filter((r) => r.start.startsWith(m) && r.costUSD == null).length}/${game.filter((r) => r.start.startsWith(m)).length}`).join(', ')}`);
console.log(`rows with Lines+ null by month: ${['2026-09', '2026-10', '2026-11'].map((m) => `${m} ${game.filter((r) => r.start.startsWith(m) && r.linesAdded == null).length}/${game.filter((r) => r.start.startsWith(m)).length}`).join(', ')}`);
