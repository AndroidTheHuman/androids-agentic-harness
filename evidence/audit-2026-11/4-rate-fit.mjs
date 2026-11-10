// Read-only: least-squares fit of cost on the ledger's token columns (derived numbers only).
// cost ≈ a·(cache reads, M) + b·(cache writes, M) + c·(output, M), no intercept; sessions without sub-agents.
import { execFileSync } from 'node:child_process';
const game = JSON.parse(execFileSync('git', ['-C', 'C:/Users/xande/infinity autobattler', 'show', 'HEAD:docs/session-ledger.json'], { encoding: 'utf8', maxBuffer: 1 << 28 }));

function solve3(A, y) {
  const M = A.map((r, i) => [...r, y[i]]);
  for (let i = 0; i < 3; i++) {
    let p = i;
    for (let r = i + 1; r < 3; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r;
    [M[i], M[p]] = [M[p], M[i]];
    for (let r = 0; r < 3; r++) {
      if (r === i) continue;
      const f = M[r][i] / M[i][i];
      for (let c = i; c < 4; c++) M[r][c] -= f * M[i][c];
    }
  }
  return [0, 1, 2].map((i) => M[i][3] / M[i][i]);
}
function fit(rows, y) {
  const X = rows.map((r) => [r.reReadM, r.cacheWriteK / 1000, r.outK / 1000]);
  const A = [0, 1, 2].map((i) => [0, 1, 2].map((j) => X.reduce((s, x) => s + x[i] * x[j], 0)));
  const b = [0, 1, 2].map((i) => X.reduce((s, x, k) => s + x[i] * y[k], 0));
  const w = solve3(A, b);
  const res = X.map((x, k) => y[k] - (x[0] * w[0] + x[1] * w[1] + x[2] * w[2]));
  const worst = Math.max(...res.map(Math.abs));
  return `cache read $${w[0].toFixed(3)}/M, cache write $${w[1].toFixed(2)}/M, output $${w[2].toFixed(2)}/M (worst residual $${worst.toFixed(2)})`;
}
for (const [label, re] of [['sonnet-5.5', /^sonnet-5\.5/], ['opus-5.5', /^opus-5\.5/]]) {
  const rows = game.filter((r) => re.test(r.model ?? '') && r.costUSD != null && r.listUSD != null && (r.agents ?? 0) === 0 && !r.flags.some((f) => f.startsWith('unpriced')));
  console.log(`${label}, n ${rows.length}`);
  console.log(`  computed listUSD implies: ${fit(rows, rows.map((r) => r.listUSD))}`);
  console.log(`  recorded costUSD implies: ${fit(rows, rows.map((r) => r.costUSD))}`);
}
