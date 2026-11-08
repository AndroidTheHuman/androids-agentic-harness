// The kit's own consistency: what the README and the templates point at exists, the skills are
// well-formed, ported files say where they came from, and the hook snippet is the one installed.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const text = (path: string) => readFileSync(path, 'utf8').replace(/\r\n/g, '\n');
const skills = readdirSync('skills');

describe('skills', () => {
  it('each has a SKILL.md whose frontmatter names its folder and describes when to use it', () => {
    expect(skills.length).toBeGreaterThan(0);
    for (const s of skills) {
      const body = text(join('skills', s, 'SKILL.md'));
      const front = /^---\n([\s\S]*?)\n---\n/.exec(body)?.[1] ?? '';
      expect(front, `${s}: name`).toMatch(new RegExp(`^name: ${s}$`, 'm'));
      expect(front, `${s}: description`).toMatch(/^description: .{40,}$/m);
    }
  });

  it('every skill a CLAUDE.md names in its skills table exists', () => {
    for (const f of ['CLAUDE.md', 'templates/CLAUDE.md', 'templates/CLAUDE.lite.md']) {
      const named = [...text(f).matchAll(/^\| `([a-z-]+)` \|/gm)].map((m) => m[1] as string);
      expect(named.length, f).toBeGreaterThan(0);
      for (const n of named) expect(skills, `${f} names ${n}`).toContain(n);
    }
  });
});

describe('references', () => {
  // backticked or linked paths into the kit's own folders, without placeholders
  const KIT_PATH = /(?:`|\]\()((?:templates|skills|tools|tests|examples|evidence)\/[^`)\s<>*]*)/g;

  it('every kit path the README and CLAUDE.md name exists', () => {
    for (const f of ['README.md', 'CLAUDE.md', 'examples/README.md']) {
      const base = f.startsWith('examples/') ? 'examples' : '.';
      for (const m of text(f).matchAll(KIT_PATH)) {
        const p = (m[1] as string).replace(/\/$/, '');
        expect(existsSync(join(base, p)) || existsSync(p), `${f} names ${p}`).toBe(true);
      }
    }
  });

  it('every relative Markdown link in the kit resolves', () => {
    const docs = ['README.md', 'CLAUDE.md', 'examples/README.md', 'examples/05-worked-examples.md'];
    for (const f of docs) {
      const dir = f.includes('/') ? f.slice(0, f.lastIndexOf('/')) : '.';
      for (const m of text(f).matchAll(/\]\((?!https?:)([^)#\s]+)/g)) {
        expect(existsSync(join(dir, m[1] as string)), `${f} links ${m[1]}`).toBe(true);
      }
    }
  });
});

describe('provenance', () => {
  it('every tool says where it was ported from and what changed', () => {
    for (const f of readdirSync('tools').filter((n) => n.endsWith('.ts'))) {
      const headComment = text(join('tools', f)).slice(0, 1200);
      expect(headComment, f).toMatch(/Ported from Infinity Autobattler \S+ @ [0-9a-f]{7}/);
      expect(headComment, f).toMatch(/Changes: /);
    }
  });

  it('every verbatim example names its source file and commit on its first line', () => {
    for (const f of readdirSync('examples').filter((n) => /^0[1-4]-.*\.md$/.test(n))) {
      expect(text(join('examples', f)).split('\n')[0], f).toMatch(/^<!-- Verbatim from Infinity Autobattler `[^`]+` @ [0-9a-f]{7}/);
    }
  });
});

describe('hook', () => {
  it('the snippet runs the ledger hook, and this repo has it installed', () => {
    const snippet = JSON.parse(text('tools/hook.settings.json')) as { hooks: { UserPromptSubmit: { hooks: { command: string }[] }[] } };
    const command = snippet.hooks.UserPromptSubmit[0]?.hooks[0]?.command;
    expect(command).toBe('node --no-warnings tools/sessions.ts --hook');
    expect(JSON.parse(text('.claude/settings.json'))).toEqual(snippet);
  });
});
