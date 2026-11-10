// Re-prices the game's committed ledger rows at the kit's rates, for measure.mjs (audit finding 1:
// the game's PRICES has Sonnet 5.5's cache read at $0.20 per million; the live price page says $0.10).
// Read-only: `git show` on the game, its transcripts by path; it prints JSON and writes nothing.
//
//   node --no-warnings evidence/reprice.mjs "<game repo>" [<rev>] > evidence/game-repriced.json
//
// For each committed row whose transcript survives, the transcript is measured twice by the kit's
// ledger code, at the game's rates and at the kit's, and the difference is added to the committed
// list price. Taking the difference keeps every other part of the committed figure as the game
// wrote it (a row cut at its own --current run, for one). Only rows that move are written. A row
// that ran a model whose rate changed but whose transcript is gone can't be re-priced; it is listed.
// The file outlives the transcripts, as the ledger's rows do.

import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { shortModel } from '../tools/sessionMeasures.ts';
import { scan, slugOf, transcriptDir } from '../tools/sessions.ts';
import { KIT_PRICES, gamePrices, rateDiffs, setPrices } from './game-prices.mjs';

const [game, rev = 'HEAD'] = process.argv.slice(2);
if (game === undefined) {
  console.error('usage: node --no-warnings evidence/reprice.mjs "<game repo>" [<rev>] > evidence/game-repriced.json');
  process.exit(2);
}

const sha = execFileSync('git', ['-C', game, 'rev-parse', '--short', rev], { encoding: 'utf8' }).trim();
const committed = JSON.parse(execFileSync('git', ['-C', game, 'show', `${rev}:docs/session-ledger.json`], { encoding: 'utf8', maxBuffer: 1 << 28 }));
const dir = transcriptDir(slugOf(game));
const atGame = gamePrices(game, rev);
const rates = rateDiffs(atGame, KIT_PRICES);
const changed = [...new Set(rates.map((d) => shortModel(d.split(' ')[0])))];

setPrices(atGame);
const before = new Map(scan(dir).map((r) => [r.id, r]));
setPrices(KIT_PRICES);
const after = new Map(scan(dir).map((r) => [r.id, r]));

const cents = (x) => Math.round(x * 100) / 100;
const rows = {};
const notRepriced = [];
for (const row of committed) {
  const a = before.get(row.id);
  const b = after.get(row.id);
  if (a !== undefined && b !== undefined) {
    const delta = (b.listUSD ?? 0) - (a.listUSD ?? 0);
    if (Math.abs(delta) >= 0.005 && row.listUSD !== undefined) rows[row.id] = { from: row.listUSD, to: cents(row.listUSD + delta) };
    continue;
  }
  const ranChanged = changed.some((m) => (row.model ?? '').includes(m)) || (row.atOpusUSD !== undefined && changed.some((m) => !m.startsWith('opus')));
  if (ranChanged && !existsSync(join(dir, `${row.id}.jsonl`))) notRepriced.push({ id: row.id, model: row.model ?? null, listUSD: row.listUSD ?? null });
}

const sum = (xs) => cents(xs.reduce((s, x) => s + x, 0));
process.stdout.write(
  JSON.stringify(
    {
      generatedBy: `node --no-warnings evidence/reprice.mjs "<game repo>" ${rev === 'HEAD' ? '' : rev}`.trim(),
      game: sha,
      rates,
      moved: Object.keys(rows).length,
      fromUSD: sum(Object.values(rows).map((r) => r.from)),
      toUSD: sum(Object.values(rows).map((r) => r.to)),
      notRepriced,
      rows,
    },
    null,
    1,
  ) + '\n',
);
