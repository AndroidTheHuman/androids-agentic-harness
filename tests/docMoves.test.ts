// doc-moves: a move of text between documents cut nothing.
// Ported from Infinity Autobattler tests/docs.test.ts @ 636f378 (its "doc-moves" block). Changes:
// its own file, so a project can take the tool's tests without the budget test.

import { describe, expect, it } from 'vitest';
import { missingUnits, sentences, takeLabel, units } from '../tools/docMoves';

describe('doc-moves', () => {
  const old = '**Streams** (`createStreams`): one key per draw; keys are `<seed>:<key>`. A key is read once (`e.g. this`).';

  it('accepts a reflow: labels become headings, clauses become lines', () => {
    const moved = '### Streams (`createStreams`)\n\n- one key per draw\n- keys are `<seed>:<key>`.\n- A key is read once (`e.g. this`).';
    expect(missingUnits(old, [moved])).toEqual([]);
  });

  it('finds a cut clause, and finds it in another target', () => {
    const cut = '### Streams (`createStreams`)\n\n- one key per draw\n- A key is read once (`e.g. this`).';
    expect(missingUnits(old, [cut])).toEqual(['keys are `<seed>:<key>`.']);
    expect(missingUnits(old, [cut, '- keys are `<seed>:<key>`.'])).toEqual([]);
  });

  it('splits sentences outside backticks and brackets only, and reads bold labels', () => {
    expect(sentences('A `x. Y` b (c. D) e. F g.')).toEqual(['A `x. Y` b (c. D) e.', 'F g.']);
    expect(takeLabel('**Grades (D17):** a node')).toEqual({ label: 'Grades (D17)', rest: 'a node' });
    expect(takeLabel('**Tuning** adds a value.')).toEqual({ label: null, rest: '**Tuning** adds a value.' });
  });

  // added in the kit: the abbreviation rule and the units of a list with a horizontal rule
  it('does not split after an abbreviation, and skips rules and blank lines', () => {
    expect(sentences('Use a tool, e.g. Codex. Then stop.')).toEqual(['Use a tool, e.g. Codex.', 'Then stop.']);
    expect(units('# Title\n\n---\n- one; two\n')).toEqual(['Title', 'one', 'two']);
  });
});
