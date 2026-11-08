// Doc move check.
// Ported from Infinity Autobattler tools/docMoves.ts @ 636f378. Changes: this header only.
//
// A doc diet moves text and never cuts it. This tool checks that every clause of a file as it
// stood at a git revision still appears, word for word, in the files it moved to.
//
//   npm run doc-moves -- <rev>:<file> <file> [<file> …]
//     e.g. npm run doc-moves -- HEAD~1:PROJECT_CONTEXT.md PROJECT_CONTEXT.md docs/archive/CHANGELOG.md
//
// The unit is a clause. Each line loses its list or heading marker and splits into sentences
// (at ". " before a capital, a digit, a backtick or "**", outside backticks and brackets). A
// sentence that opens with a bold label ("**Streams**:", "**Stored record** (…):") gives the
// label as a unit of its own, so a label may become a heading. The rest splits at top-level
// "; ", so a long sentence may become one line per clause. A unit is present when it is a
// substring of the targets, with "**", list and heading markers removed and whitespace
// collapsed on both sides. Exit 2 lists every missing unit.
//
// Runs under plain Node (type stripping), so it uses erasable TypeScript only.

import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ABBREVIATIONS = new Set(['e.g', 'i.e', 'vs', 'cf', 'etc']);
const MARKER = /^\s*(?:#{1,6}\s+|[-*+]\s+|\d+\.\s+)/;

/** Splits `text` where `boundary(i)` returns the length of a separator starting at i, outside backticks and brackets. The separator is dropped; `keep` chars of it stay on the left part. */
function splitTopLevel(text: string, boundary: (i: number) => { skip: number; keep: number } | null): string[] {
  const out: string[] = [];
  let depth = 0;
  let code = false;
  let start = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '`') code = !code;
    if (code || ch === '`') continue;
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    else if ((ch === ')' || ch === ']' || ch === '}') && depth > 0) depth--;
    else if (depth === 0) {
      const cut = boundary(i);
      if (cut !== null) {
        out.push(text.slice(start, i + cut.keep));
        start = i + cut.skip;
        i = start - 1;
      }
    }
  }
  out.push(text.slice(start));
  return out.map((s) => s.trim()).filter((s) => s.length > 0);
}

/** Sentences of one line of prose; the full stop stays on its sentence. */
export function sentences(line: string): string[] {
  return splitTopLevel(line, (i) => {
    if (!'.!?'.includes(line[i] ?? '') || line[i + 1] !== ' ') return null;
    if (!/[A-Z0-9`*"“]/.test(line[i + 2] ?? '')) return null;
    const word = /(\S+)$/.exec(line.slice(0, i))?.[1] ?? '';
    if (ABBREVIATIONS.has(word.toLowerCase())) return null;
    return { skip: 2, keep: 1 };
  });
}

/** Top-level clauses of a sentence, split at "; " (the semicolon is dropped). */
export function clauses(sentence: string): string[] {
  return splitTopLevel(sentence, (i) => (sentence[i] === ';' && sentence[i + 1] === ' ' ? { skip: 2, keep: 0 } : null));
}

/** A leading bold label ("**X**:", "**X:**", "**X** (…):") and the rest; label null when the sentence has none. A line that is only "**X**" is all label. */
export function takeLabel(s: string): { label: string | null; rest: string } {
  if (!s.startsWith('**')) return { label: null, rest: s };
  const close = s.indexOf('**', 2);
  if (close < 0) return { label: null, rest: s };
  let label = s.slice(2, close);
  let j = close + 2;
  if (label.endsWith(':')) return { label: label.slice(0, -1), rest: s.slice(j).trim() };
  if (j === s.length) return { label, rest: '' };
  if (s.startsWith(' (', j)) {
    let depth = 0;
    let code = false;
    for (let k = j + 1; k < s.length; k++) {
      const ch = s[k];
      if (ch === '`') code = !code;
      if (code || ch === '`') continue;
      if (ch === '(') depth++;
      else if (ch === ')' && --depth === 0) {
        label += s.slice(j, k + 1);
        j = k + 1;
        break;
      }
    }
  }
  if (s[j] === ':') return { label, rest: s.slice(j + 1).trim() };
  return { label: null, rest: s };
}

/** Removes what a move may change: "**", list and heading markers, runs of whitespace. */
export function normalise(text: string): string {
  return text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((l) => l.replace(MARKER, '').replaceAll('**', ''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Every clause unit of a document, normalised, in order. */
export function units(text: string): string[] {
  const out: string[] = [];
  for (const raw of text.replace(/\r\n/g, '\n').split('\n')) {
    const line = raw.replace(MARKER, '').trim();
    if (line === '' || /^-{3,}$/.test(line)) continue;
    for (const s of sentences(line)) {
      const { label, rest } = takeLabel(s);
      if (label !== null) out.push(normalise(label));
      for (const c of clauses(rest)) out.push(normalise(c));
    }
  }
  return out.filter((u) => u.length > 0);
}

/** The units of `old` that no target contains. */
export function missingUnits(old: string, targets: readonly string[]): string[] {
  const corpus = targets.map(normalise).join(' ');
  return units(old).filter((u) => !corpus.includes(u));
}

function main(args: readonly string[]): number {
  const [spec, ...targets] = args;
  if (spec === undefined || !spec.includes(':') || targets.length === 0) {
    console.error('usage: npm run doc-moves -- <rev>:<file> <file> [<file> …]');
    return 1;
  }
  const old = execFileSync('git', ['show', spec], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const missing = missingUnits(old, targets.map((t) => readFileSync(t, 'utf8')));
  const total = units(old).length;
  console.log(`${spec}: ${total - missing.length} of ${total} units present in ${targets.join(', ')}`);
  for (const u of missing) console.log(`  missing: ${u.length > 160 ? `${u.slice(0, 157)}…` : u}`);
  return missing.length === 0 ? 0 : 2;
}

if (resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) process.exitCode = main(process.argv.slice(2));
