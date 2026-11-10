// The game's list-price table at a revision, and a way to compute with it. Shared by
// ledger-port-check.mjs (which proves the port at the game's rates) and reprice.mjs (which moves the
// game's committed rows to the kit's corrected rates, audit finding 1). Read-only: `git show` only.

import { execFileSync } from 'node:child_process';
import { PRICES } from '../tools/sessionMeasures.ts';

/** The kit's own table, as loaded. */
export const KIT_PRICES = Object.freeze({ ...PRICES });

/** PRICES as the game committed it at <rev>, parsed from its tools/sessionMeasures.ts. */
export function gamePrices(game, rev) {
  const src = execFileSync('git', ['-C', game, 'show', `${rev}:tools/sessionMeasures.ts`], { encoding: 'utf8', maxBuffer: 1 << 26 });
  const table = {};
  for (const m of src.matchAll(/'(claude-[a-z0-9-]+)': \{ input: ([\d.]+), output: ([\d.]+), cacheRead: ([\d.]+), write5m: ([\d.]+), write1h: ([\d.]+) \}/g))
    table[m[1]] = { input: +m[2], output: +m[3], cacheRead: +m[4], write5m: +m[5], write1h: +m[6] };
  if (Object.keys(table).length === 0) throw new Error(`no PRICES found in the game's tools/sessionMeasures.ts at ${rev}`);
  return table;
}

/** Each rate that differs between two tables, as "<model> <rate> <from> → <to>". */
export function rateDiffs(from, to) {
  return Object.keys({ ...from, ...to }).flatMap((m) =>
    Object.keys({ ...from[m], ...to[m] })
      .filter((k) => from[m]?.[k] !== to[m]?.[k])
      .map((k) => `${m} ${k} ${from[m]?.[k] ?? '—'} → ${to[m]?.[k] ?? '—'}`),
  );
}

/** Makes the ledger price with <table> until the next call; setPrices(KIT_PRICES) restores the kit's. */
export function setPrices(table) {
  for (const m of Object.keys(PRICES)) delete PRICES[m];
  Object.assign(PRICES, table);
}
