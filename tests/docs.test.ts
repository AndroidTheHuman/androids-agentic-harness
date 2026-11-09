// The session-start read has a size budget.
// Ported from Infinity Autobattler tests/docs.test.ts @ 636f378. Changes: the documents are
// settings (below) instead of the game's names; the start read may include whole documents
// beside PROJECT_CONTEXT.md's head, and a start document can be read only if present (the handoff);
// the brief checks run only when the briefs folder exists; the
// doc-moves tests moved to tests/docMoves.test.ts. As shipped, the settings name this repo's own
// documents: the kit runs on itself. To adopt it, copy this file and edit the settings block.
//
// The start read is what CLAUDE.md's read order has every session read. A session that writes a
// brief or a plan reads all of PROJECT_CONTEXT.md; every other session reads its head (the "Now"
// block through the section named HEAD_ENDS_AFTER). Each plan brief adds its reading-rule slice.
// An implementation brief comes on top and is not budgeted here.
//
// Tokens are real tokens, estimated as characters ÷ 2.2. In the game, measured from transcripts
// on 2026-10-14, reading a 65.5k-character file cost about 29.5k tokens, and a transcript of
// 2026-10-12 gave about 2.1 characters per token. Characters ÷ 4, the usual rule of thumb,
// undercounts by about 1.8 times. When a merge breaks a budget, move facts word for word to the
// document that owns them (`npm run doc-moves` checks the move); never cut.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// ── Settings: edit for your project ─────────────────────────────────────────────────────────
const CHARS_PER_TOKEN = 2.2;
const HEAD_READ_TOKENS = 20_000; // every session
const FULL_READ_TOKENS = 45_500; // a session that writes a brief or a plan
const MAX_LINE = 1_000; // one fact per line in the current-state documents
const CONTEXT = 'PROJECT_CONTEXT.md';
const HEAD_ENDS_AFTER = 'Packages'; // the head runs from the top through this `## ` section
const START_READ = ['CLAUDE.md', CONTEXT, 'docs/PLAN.md', 'HANDOFF.md']; // CLAUDE.md's read order, in full
const IF_PRESENT = ['HANDOFF.md']; // start documents that may be absent (between a merge and the next handoff)
const ONE_FACT_PER_LINE = [CONTEXT];
const BRIEFS = 'docs/briefs';
const CHANGELOG = 'docs/archive/CHANGELOG.md';

const text = (path: string) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
const tokens = (s: string) => Math.ceil(s.length / CHARS_PER_TOKEN);

/** PROJECT_CONTEXT.md's head, which every session reads: up to the first `## ` heading after HEAD_ENDS_AFTER's. */
function head(doc: string): string {
  const at = doc.search(new RegExp(`^## ${HEAD_ENDS_AFTER}$`, 'm'));
  if (at < 0) return doc;
  const next = doc.slice(at + 3).search(/^## /m);
  return next < 0 ? doc : doc.slice(0, at + 3 + next);
}

/** Section `n` of a brief (`## <n>. …`), heading included, up to the next `## ` heading; '' when absent. */
function section(brief: string, n: number): string {
  const start = brief.search(new RegExp(`^## ${n}\\. `, 'm'));
  if (start < 0) return '';
  const next = brief.slice(start + 3).search(/^## /m);
  return next < 0 ? brief.slice(start) : brief.slice(start, start + 3 + next);
}

/** What a plan brief's reading rule has a session read: the sections it names, plus its longest work-package row. */
function readingSlice(brief: string): { rule: string | null; sections: number[]; rowSection: number | null; slice: string } {
  const rule = /\*\*Reading rule:\*\*([^\n]*)/.exec(brief)?.[1] ?? null;
  if (rule === null) return { rule, sections: [], rowSection: null, slice: brief };
  const row = /WP row in §(\d+)/.exec(rule);
  const rowSection = row?.[1] === undefined ? null : Number(row[1]);
  const sections = [...rule.matchAll(/§(\d+)/g)].map((m) => Number(m[1])).filter((n) => n !== rowSection);
  const parts = sections.map((n) => section(brief, n));
  if (rowSection !== null) {
    const rows = section(brief, rowSection)
      .split('\n')
      .filter((l) => l.startsWith('| **'));
    parts.push(rows.reduce((a, b) => (b.length > a.length ? b : a), ''));
  }
  return { rule, sections, rowSection, slice: parts.join('\n') };
}

const briefs = existsSync(BRIEFS)
  ? readdirSync(BRIEFS)
      .filter((f) => f.endsWith('.md'))
      .map((f) => ({ file: f, body: text(join(BRIEFS, f)) }))
  : [];
const planBriefs = briefs.filter((b) => /^\*\*Kind:\*\* plan\b/m.test(b.body));
const partBriefs = briefs.filter((b) => /^\*\*Kind:\*\* (implementation|research)\b/m.test(b.body) && /^## \d+\. Parts$/m.test(b.body));

/** The start read in real tokens: the start documents, with PROJECT_CONTEXT.md whole or its head, and each plan brief's slice. */
function startRead(whole: boolean): { total: number; breakdown: string } {
  const parts = [
    ...START_READ.filter((f) => !IF_PRESENT.includes(f) || existsSync(f)).map((f) => (f === CONTEXT && !whole ? { name: `${f} head`, body: head(text(f)) } : { name: f, body: text(f) })),
    ...planBriefs.map((b) => ({ name: `${b.file} (reading rule)`, body: readingSlice(b.body).slice })),
  ].map((p) => ({ name: p.name, tokens: tokens(p.body) }));
  return { total: parts.reduce((s, p) => s + p.tokens, 0), breakdown: parts.map((p) => `${p.name} ${p.tokens}`).join(', ') };
}

describe('session-start read', () => {
  it(`every session's read fits ${HEAD_READ_TOKENS / 1000}k tokens: the start documents with ${CONTEXT}'s head, and each plan brief slice`, () => {
    const pc = head(text(CONTEXT));
    expect(pc).toMatch(/^## Now$/m);
    expect(pc).toMatch(new RegExp(`^## ${HEAD_ENDS_AFTER}$`, 'm'));
    const { total, breakdown } = startRead(false);
    expect(total, `head read ${total} tokens: ${breakdown}`).toBeLessThanOrEqual(HEAD_READ_TOKENS);
  });

  it(`a session that writes a brief or a plan, reading all of ${CONTEXT}, fits ${FULL_READ_TOKENS / 1000}k tokens`, () => {
    const { total, breakdown } = startRead(true);
    expect(total, `full read ${total} tokens: ${breakdown}`).toBeLessThanOrEqual(FULL_READ_TOKENS);
  });

  it('every brief in parts has a reading rule that names sections that exist', () => {
    for (const b of partBriefs) {
      const rule = /\*\*Reading rule:\*\*([^\n]*)/.exec(b.body)?.[1] ?? null;
      expect(rule, `${b.file} has no **Reading rule:**`).not.toBeNull();
      const named = [...(rule ?? '').matchAll(/§(\d+)/g)].map((m) => Number(m[1]));
      expect(named.length, `${b.file}: the rule names no section`).toBeGreaterThan(0);
      for (const n of named) expect(section(b.body, n), `${b.file} §${n}`).not.toBe('');
    }
  });

  it("every plan brief's reading rule names sections that exist and a table of WP rows", () => {
    for (const b of planBriefs) {
      const r = readingSlice(b.body);
      expect(r.rule, `${b.file} has no **Reading rule:**`).not.toBeNull();
      for (const n of r.sections) expect(section(b.body, n), `${b.file} §${n}`).not.toBe('');
      expect(r.rowSection, `${b.file}: the rule names no "WP row in §<n>"`).not.toBeNull();
      expect(r.slice.split('\n').at(-1), `${b.file}: §${r.rowSection} has no "| **" row`).toMatch(/^\| \*\*/);
    }
  });
});

describe('current-state documents', () => {
  it('keep one fact per line', () => {
    for (const f of ONE_FACT_PER_LINE) {
      const long = text(f)
        .split('\n')
        .map((l, i) => ({ line: i + 1, length: l.length }))
        .filter((l) => l.length > MAX_LINE);
      expect(long, `${f}: lines over ${MAX_LINE} chars`).toEqual([]);
    }
  });

  it(`${CONTEXT} holds no history: the changelog lives in the archive, oldest first`, () => {
    expect(text(CONTEXT)).not.toMatch(/^## (Changelog|Status)\b/m);
    expect(existsSync(CHANGELOG)).toBe(true);
    const log = text(CHANGELOG);
    const at = log.search(/^## Changelog$/m);
    expect(at).toBeGreaterThan(0);
    const entries = log
      .slice(at)
      .split('\n')
      .filter((l) => l.startsWith('- '));
    expect(entries.length).toBeGreaterThan(0);
    const dates = entries.map((l) => /^- (\d{4}-\d{2}-\d{2})\b/.exec(l)?.[1] ?? `undated: ${l.slice(0, 60)}`);
    expect(dates.filter((d) => d.startsWith('undated'))).toEqual([]);
    expect(dates).toEqual([...dates].sort());
  });
});
