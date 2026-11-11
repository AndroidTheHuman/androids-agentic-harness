# Package E, this repo's side — public release

**Status:** draft (2026-11-11). D1 and D3–D6 and D10's timing are the owner's (2026-11-11); the rest are recommended, and the owner approves them with the brief.
**Kind:** implementation brief, one part.
**Size:** S, one part (§7).
**Model:** Opus 5.5 xhigh: public text and the triage of an outside check, as in token-ledger's release (its brief 002).
**Cost estimate:** about four gates, one Codex claims check, one regeneration of `evidence/NUMBERS.md` (reads the game repo), one clean clone with `npm install`.
**Reading rule:** one part: the session reads the whole brief.

<!-- Written with skills/brief-spec. Its precedent is token-ledger's
     docs/archive/2026-11/002_PUBLIC_RELEASE.md; reused parts name their source there. -->

## 1. Intent

`github.com/AndroidTheHuman/androids-agentic-harness` exists and is public, so the link in token-ledger's README and on the owner's résumé resolves. A visitor arriving from either learns from the README's first screen what this repo is, what it showed and where it falls short, and can run the gate on a clone. The bar is "a visitor isn't confused or misled", not "finished": the link is fixed, the content keeps changing (`docs/PLAN.md` → "Revision 2026-11-11"). The case study, the response to the owner's `meta/` review and package D come later.

## 2. Where things stand

Checked 2026-11-11 at drafting unless a line says otherwise.

- token-ledger is public: `https://github.com/AndroidTheHuman/androids-agent-token-ledger` → HTTP 200. Its README's first paragraph links `https://github.com/AndroidTheHuman/androids-agentic-harness` → HTTP 404.
- This repo: branch `main`, no remote. The 6 commits through `917a546` carry the owner's student address as author and committer. From this brief's drafting commit on, the repo-local `user.email` is the owner's GitHub noreply address, the value `git -C C:/Users/xande/token-ledger config user.email` prints.
- `.gitignore` holds `node_modules/`, `evidence/private/`, `RESUME.md` and `meta/`, each of the last two under a comment line. `RESUME.md` is untracked since 2026-11-11 and still on disk. `CASE_STUDY.md` is tracked, a stub marked "Out of date since 2026-11-10".
- **The gate**: `npm run check` is typecheck plus 32 tests in 5 files. Run it from PowerShell, or after `cd C:/…` in Git Bash. After `cd /c/…`, vitest loads twice and all 5 files fail with "no tests" (reproduced 2026-11-11). token-ledger's part C ran its clone from an upper-case `C:\` for the same reason.
- **The gate has never passed on a clone.** `tests/kit.test.ts` "references" checks two things on disk: that every backticked or linked path into a kit folder exists (line 35), and that every relative link in `README.md`, `CLAUDE.md`, `examples/README.md` and `examples/05-worked-examples.md` resolves (line 45). A scratch script ran the same regexes against tracked files. A clone fails on:
  - `CLAUDE.md` naming `evidence/private` twice (Owner rule 4, Mandatory rule 7), which is git-ignored;
  - `README.md:5` linking `RESUME.md`;
  - once §4.1 runs, the same line's `CASE_STUDY.md` link too.

  §4.5's code was replayed at drafting and reverted. The typecheck was clean, and the path test skipped `evidence/private`. With `README.md` still linking `RESUME.md`, exactly one test failed: "README.md links RESUME.md".
- Every tracked file is LF in the index and the working tree (`git ls-files --eol`: all `i/lf w/lf`).
- There is no root `AGENTS.md`. `CLAUDE.md` Mandatory rule 8 and `skills/outside-review` template D both point to one; `templates/AGENTS.md` is the template.
- **Regenerating `NUMBERS.md`**: `MEMORY_DIR="C:/Users/xande/.claude/projects/c--Users-xande-infinity-autobattler/memory" node evidence/measure.mjs "C:/Users/xande/infinity autobattler" > <file>` reproduces the committed `evidence/NUMBERS.md` byte for byte, and the game repo stays clean (`636f378`). Line 3, written by `evidence/measure.mjs:36`, says "Every figure in CASE_STUDY.md and RESUME.md comes from this file." The comment at `measure.mjs:1` says "the case study and resume".
- **Public text that mentions the case study**: `README.md:5–6`, `evidence/OUTSIDE_REVIEW.md:1` (the title) and `:4`, and `examples/05-worked-examples.md:84`.
- **Privacy checks at drafting** (counts only; the commands are §4.9's):
  - P1 secrets: 0.
  - P2 addresses in file content: 0.
  - P3 phone: 0.
  - P3′ full name: 0 lines (this brief adds §4.2's).
  - P4 transcripts or `evidence/private/` in history: 0.
  - P5 `xande`: 39 lines.
  - P6 blobs over 1 MB: 0.
  - P2′ addresses in commit metadata: the student address on all 6 commits.
- **Material from the private game repo**: `examples/01`–`04` are verbatim excerpts, each naming its source file and `636f378` in line 1. `examples/05` quotes owner prompts. 15 lines in tracked Markdown match P4″'s owner-quote pattern.
- `docs/SESSION_LEDGER.md`'s *Session* column is Claude Code's session title, or the first 60 characters of the first prompt (README → Limits).
- `evidence/OUTSIDE_REVIEW.md` holds run H1 (Codex CLI 0.167.0, `codex exec -s read-only`, 2026-11-08), with a table whose columns are `#`, `Codex verdict`, `Item`, `Triage` and `Change made`. `codex-cli 0.167.0` is installed.
- **The README** (73 lines) has these parts:
  - `# Agentic harness`, then a paragraph;
  - three link bullets (lines 5–7);
  - `## Why` (lines 9–15, three numbered points);
  - `## What's in the kit`, `## Lite tier: start here`, `## Full tier: …`, `## The session ledger`, `## This repo runs on the kit`.
- **Figures the README may use** (`evidence/NUMBERS.md` at `636f378`, or a command):
  - 44 days (line 11), 207 sessions (54), 44,966 lines of TypeScript in `src/` (12).
  - Before and after 2026-10-02 (lines 77–78): average peak 451k → 268k, average cost $14.82 → $6.17, sessions peaking over 250k 81% → 58%.
  - 1.61 Markdown lines per `src/` line (17); brief or plan drafting is 19% of spend (95).
  - 42 rows re-priced, $265.76 → $188.42 (50).
  - Port check, 2026-11-11 (`node --no-warnings evidence/ledger-port-check.mjs "<game repo>"`): 147 identical, 11 reproduced once later records are left out, 0 not reproduced, 49 transcripts gone.
  - The adoption: 1.4 minutes of wall clock, 12 model calls, and the session knew it was timed (`README.md:30`).

## 3. Decisions

| # | Decision | Why | Owner |
| --- | --- | --- | --- |
| D1 | Scope: a public release of this repo. Not the case study, not the `meta/` response, not package D. | A link for the résumé matters now; the content can change after. | Owner, 2026-11-11 |
| D2 | The repo is `androids-agentic-harness`; the README's title is "Android's Agentic Harness"; `package.json`'s name stays `agentic-harness`. | token-ledger's README already links the slug (its brief 002 D2). The title is the plan's working name (Revision 2026-11-10). | Slug: owner. Title: recommended |
| D3 | The history is pushed as it is. Commits from this brief's drafting on use the noreply address (§2). | The student address is already public on token-ledger's first 31 commits; the old `RESUME.md` in history is a stub marked out of date. | Owner, 2026-11-11 |
| D4 | `CASE_STUDY.md` leaves the release: untracked and git-ignored like `RESUME.md`. The draft stays on disk for the third-person rewrite after the owner's `meta/` review. Public text that mentions it says it is out of the repo until then. | Visible stubs read as unfinished. | Leaving it out: owner, 2026-11-11. The mechanism: recommended |
| D5 | The README is in the first person singular for the owner, with token-ledger's voice rules (its D8): "I" is the subject only of sentences about the owner's own decisions and actions, and the first paragraph says Claude Code sessions wrote the code under the owner's direction. No filler: cut summarising openers and closers, unsourced hedges, intensifiers ("robust", "powerful", "comprehensive", "seamless"), "not just X but Y", "it's worth noting", and a list of three where the content is two. | The two linked READMEs read alike; "I directed…" is the owner's claim to make. | Owner, 2026-11-11 |
| D6 | MIT license, token-ledger's text. | Without a license others can view but not reuse. | Owner, 2026-11-11 (no objection to MIT) |
| D7 | A root `.gitattributes` forcing LF, as token-ledger's D15. | A Windows clone with `core.autocrlf=true` would otherwise check out CRLF. | Recommended |
| D8 | A root `AGENTS.md`, filled from `templates/AGENTS.md` (§4.4). | Rule 8 and the claims check's prompt point to it, and it doesn't exist. | Recommended |
| D9 | `tests/kit.test.ts` learns `.gitignore`. The path check skips a folder `.gitignore` keeps out of the repo. The link check fails a link to an ignored path. | A git-ignored folder is named on purpose and absent from every clone, while a link to an ignored file is broken for every visitor. The local gate then fails where a clone would. | Recommended |
| D10 | One outside check before the push: a Codex claims check (`skills/outside-review` use D) over the public text, logged as run H2. No stranger read: the owner's `meta/` review after the push replaces it. No cold read of this brief. | The deadline; token-ledger's D10 made the same call. | Review after the push: owner, 2026-11-11. The rest: recommended |
| D11 | The privacy pass is token-ledger's P1–P6, plus P7 (the ledger's *Session* column) and P8 (excerpts of the private game repo), recorded in `evidence/PRIVACY.md`. The owner approves the P4″, P7 and P8 lists before the push. | The game repo is private, and examples quote it verbatim. | Recommended |
| D12 | The owner creates the GitHub repo **private** and empty. After the push the owner reads the rendered page, then switches it to public. | Links and rendering are checked before anyone else sees them; token-ledger pushed private first too. | Recommended |

## 4. What to build

### 4.1 `CASE_STUDY.md` out of the repo

Append to `.gitignore`:

```
# The case study waits for its third-person rewrite, after the owner's meta/ review (owner, 2026-11-11).
CASE_STUDY.md
```

Then `git rm --cached -q CASE_STUDY.md`. The file stays on disk.

### 4.2 License

`LICENSE`, new, exactly:

```
MIT License

Copyright (c) 2026 Xander van der Vuurst

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

`package.json`: the line `"license": "MIT",` goes after the `"description"` line. Don't run `npm install` in the repo.

### 4.3 Line endings

`.gitattributes`, new, exactly:

```
# Every text file is checked out with LF line ends, as the tools write them and the index stores them,
# so a Windows clone with core.autocrlf=true gets the same bytes (brief E_RELEASE D7).
* text=auto eol=lf
```

Then `git add .gitattributes` and `git add --renormalize .`. `git diff --cached --name-only` lists `.gitattributes`, the files §4.1 already staged and nothing else. If another file appears, stop and show it to the owner.

### 4.4 `AGENTS.md`

New, at the root:

```markdown
# Agents other than Claude Code

This repo is a kit for directing AI coding agents on long-running work (templates, skills, a session cost ledger and doc-budget tests), with the evidence of how it was built and used. Claude Code sessions build it under the rules in `CLAUDE.md`. The owner is Xander.

<!-- Filled from templates/AGENTS.md (brief E_RELEASE D8). Codex reads AGENTS.md on its own;
     other agents are told to read it in their prompt. -->

## Your role

Unless the owner tells you otherwise in this conversation, you are an outside reviewer and you only read:
- Don't edit, create or delete files, and don't commit.
- Read files and use `git log`, `git show` and `git diff`. Don't run `npm` scripts or the scripts in `evidence/`: `npm run sessions` writes the ledger files, `evidence/owner-turns.mjs` writes `evidence/private/`, and Claude runs the gate.
- Read what your prompt names. Skip `CLAUDE.md`'s session read order: it is for the sessions that build.
- Claude checks your answer finding by finding before anything acts on it.

## What counts as a defect here

- **A figure without a command** (`CLAUDE.md` Mandatory rule 3): a number in `README.md` or `examples/` that neither `evidence/NUMBERS.md` nor a script output quoted with its command backs. A correction set beside older text (`examples/`, `evidence/DECISIONS.md`) keeps the older text on purpose; report the older figure only when no correction sits beside it.
- **A port without its header** (`CLAUDE.md` Mandatory rule 4): a file taken from another project that doesn't start with `Ported from <project> <path> @ <sha>. Changes: …`.
- **A deviation from the brief** the change implements. This repo's packages are in `docs/PLAN.md`; a package's brief sits in `docs/` while it is active and in `docs/archive/` once done.
- **A check made green the wrong way:** a weakened test or expected number, or a number reported as met that isn't.
- **A behaviour bug:** a concrete input or state that gives a wrong result.
```

Then the `## Answer format` section of `templates/AGENTS.md` (lines 24–42), copied unchanged.

### 4.5 `tests/kit.test.ts`

Inside `describe('references', …)`, after the `KIT_PATH` line, add:

```ts
  // What .gitignore keeps out of the repo. A named ignored folder (evidence/private/) is named on
  // purpose and absent from every clone; a link to an ignored path is broken for every visitor.
  const IGNORE = text('.gitignore').split('\n').map((l) => l.trim()).filter((l) => l !== '' && !l.startsWith('#'));
  const ignored = (path: string) => {
    const p = path.replace(/\\/g, '/').replace(/^\.\//, '').replace(/\/$/, '');
    return IGNORE.some((l) => (l.endsWith('/') ? p === l.slice(0, -1) || p.startsWith(l) : p === l));
  };
```

- In the path test, after `const p = …;`, add `if (ignored(p)) continue;`.
- In the link test, replace the `expect` line with:

```ts
        const target = join(dir, m[1] as string);
        expect(existsSync(target) && !ignored(target), `${f} links ${m[1]}`).toBe(true);
```

### 4.6 `NUMBERS.md`'s header

- `evidence/measure.mjs:1`: the comment becomes `// Recomputes the game's numbers that README.md and examples/ cite, from the game repo.`
- `evidence/measure.mjs:36`: the sentence `Every figure in CASE_STUDY.md and RESUME.md comes from this file.` becomes `The figures README.md and examples/ cite come from this file or from a command quoted beside them.`
- Regenerate with §2's command into `evidence/NUMBERS.md`. `git diff --stat evidence/NUMBERS.md` shows 1 line changed, line 3.

### 4.7 Other mentions of the case study and the résumé

- `CLAUDE.md`, Precedence: `` `CASE_STUDY.md` and `RESUME.md` (stubs) `` → `` `CASE_STUDY.md` and `RESUME.md` (git-ignored drafts) ``.
- `CLAUDE.md`, Key documents. Change these rows:
  - `README.md` → `The public front page: what this is, what it showed, its limits; then the kit and its setup`.
  - The `CASE_STUDY.md`, `RESUME.md` row → `Git-ignored drafts on the owner's machine: the case study waits for its third-person rewrite; the résumé lines stay local`.
  - The `evidence/` row gains `` `PRIVACY.md` `` after `` `OUTSIDE_REVIEW.md` ``.

  Add `` | `AGENTS.md` | The role and answer format of outside agents (read-only) | `` after the `README.md` row.
- `evidence/OUTSIDE_REVIEW.md`. The title becomes `# Outside reviews`. Under it goes one new paragraph: `Run H1 checked the case study's first draft. The case study is out of the public repo until its third-person rewrite (owner, 2026-11-11).`
- `examples/05-worked-examples.md:84`: append ` The case study is out of the public repo until its third-person rewrite (2026-11-11).` to the line.

### 4.8 The README

Rewrite the top, down to `## What's in the kit`. Keep everything from that heading on, with two changes:
- `## This repo runs on the kit` gains the sentence ``AGENTS.md` sets the role of outside agents: read-only.``
- A last section, `## License`, says `MIT, see [LICENSE](LICENSE).`

The new top, in order:

1. **`# Android's Agentic Harness`**, then one paragraph of at most 110 words (D5) saying:
   - (a) It is the process I used to direct Claude Code through a 44-day, 207-session build of a 45k-line TypeScript game, *Infinity Autobattler* (a private repo), turned into a kit of templates, skills and a session cost ledger.
   - (b) Claude Code sessions wrote the code and the documents under my direction.
   - (c) The evidence sits beside the kit: figures regenerated by script, the decisions, and where it didn't work.
   - (d) It links `[Android's Agent Token Ledger](https://github.com/AndroidTheHuman/androids-agent-token-ledger)`: a study of where my coding-agent sessions spend their tokens, built from an empty folder with this kit's lite tier.
2. **A line of links**: `[Evidence](evidence/) · [Two worked examples](examples/05-worked-examples.md) · [Decision log](evidence/DECISIONS.md) · [Lite tier: start here](#lite-tier-start-here)`.
3. **`## Why`**: lines 11–15 of the current README, unchanged.
4. **`## What it showed`**: four bullets. Each is one or two sentences, with its source as a link or a command in parentheses:
   - (a) The 250k context limit is still broken in most sessions: 58% peaked over it after the rules, 81% before (`NUMBERS.md`, before and after).
   - (b) The ported ledger reproduces the source project's own records: 158 committed rows recomputed from their transcripts, 0 that differ, 49 whose transcripts are gone (the port check's command).
   - (c) The lite tier was adopted in an empty folder in 1.4 minutes of wall clock and 12 model calls, by a session that knew it was timed (`evidence/adoption-time.mjs`).
   - (d) A one-off audit I commissioned from another model (Claude Fable 5) found the ledger pricing Sonnet 5.5's cache reads at twice the published rate. The fix re-priced 42 of the game's rows ($265.76 → $188.42), and the corrections sit beside the old figures, not over them (`evidence/AUDIT_FABLE_2026-11.md` finding 1; `NUMBERS.md`).
5. **`## Limits`**: four bullets.
   - One person, one project, no control group: observations, not effects.
   - The figures are per session, not per unit of work (the audit's finding 2).
   - The process has a cost: 1.61 lines of Markdown per line of source, and brief drafting at 19% of spend (`NUMBERS.md`).
   - The evidence scripts read the game's repo, which is private, so they rerun only on my machine; their outputs are committed.
6. **`## On a clone`**: Node ≥ 22.18. `npm install`, then `npm run check` runs the typecheck and the 32 tests. `npm run sessions -- --project=<path> --ledger=<dir>` builds a ledger from your own Claude Code transcripts for the project at `<path>`. `evidence/*.mjs` need the game's repo; their outputs (`evidence/NUMBERS.md`, `evidence/game-repriced.json`) are committed.

The top, from the title to `## What's in the kit`, is at most 600 words: `awk '/^## What.s in the kit/{exit} {print}' README.md | wc -w`. Every figure in it is one of §2's. The handoff lists each figure with its file and line, or its command.

### 4.9 Privacy pass

Run the checks in Git Bash at the repo root, after §4.1–§4.8 and a green gate, before the commit. Then write `evidence/PRIVACY.md`:
- a header: the date, HEAD before the commit, and "covers HEAD and every commit";
- one table row per check, with the columns check, command, result and decision.

`H` stands for `git log -p --all --format=`.

| Check | Command | Expected |
| --- | --- | --- |
| P1 secrets | `H \| grep -cE 'sk-ant-[A-Za-z0-9_-]{20,}\|ghp_[A-Za-z0-9]{36}\|gho_[A-Za-z0-9]{36}\|github_pat_[A-Za-z0-9_]{20,}\|AKIA[0-9A-Z]{16}\|-----BEGIN [A-Z ]*PRIVATE KEY-----\|xox[abp]-[0-9A-Za-z-]{10,}\|AIza[0-9A-Za-z_-]{35}'` | 0 |
| P2 addresses in content | `H \| grep -oE '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}' \| sort \| uniq -c` | none, or only `noreply@anthropic.com` and the owner's noreply address |
| P2′ addresses in metadata | `git log --all --format='%ae%n%ce%n%B' \| grep -oE '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}' \| sort \| uniq -c` | the student address (the 6 commits through `917a546`, kept by D3), the owner's noreply address, `noreply@anthropic.com` (co-author lines) |
| P3 phone and contact | `H \| grep -cE '\+31[ -]?[0-9]\|\b06[ -]?[0-9]{8}\b\|zigg[o]'` | 0 |
| P3′ full name | `git grep -n -i 'vuurs[t]'` | `LICENSE:3` and this brief's §4.2 |
| P4 transcript files | `git log --all --name-only --format= \| grep -cE '^evidence/private/\|^meta/\|\.jsonl$'` | 0 |
| P4″ the owner's quoted words | `git grep -n -E '"[^"]*( [^"]*){3,}"' -- '*.md' \| grep -i owner` | Read each hit. The owner's own words go into a list (file:line, first five words) for the owner to approve. |
| P5 user-name paths | `git grep -c -i 'xande'` | Counts per file, kept as token-ledger kept them (its D9). |
| P6 large blobs | `git rev-list --objects --all \| git cat-file --batch-check='%(objecttype) %(objectsize) %(rest)' \| awk '$1=="blob" && $2>1000000'` | none |
| P7 the ledger's *Session* column | `grep '^\| 20' docs/SESSION_LEDGER.md \| cut -d'\|' -f3` | Listed for the owner to approve. |
| P8 excerpts of the private game repo | `head -1 examples/0[1-4]*.md` | Each file and its source listed for the owner to approve. |

If P1, P2, P2′ or P3 turns up anything outside the Expected column, stop. Don't write the value into any file; tell the owner the check and the commit. Removing an item from P4″, P7 or P8 means rewriting history, which D3 rules out without the owner, so stop and ask.

### 4.10 Claims check (run H2)

1. Write the prompt to `evidence/private/outside/h2-prompt.md` (git-ignored), exactly:

   > Read AGENTS.md first and follow it.
   >
   > Check every factual claim in README.md, examples/README.md and examples/05-worked-examples.md against the repo: counts, dates, file contents, what the code does. Figures about the game come from evidence/NUMBERS.md and the files in evidence/; the game's own repo is not available to you. Then say what a skeptical hiring engineer, opening this repo from a résumé link, would object to.
   >
   > Report at most 8 items, the most important first, each marked WRONG, OVERCLAIM, UNSUPPORTED or OBJECTION, with the claim quoted and the evidence (file:line or the command you would run).

2. Run it in the background: `codex exec -s read-only --json -o evidence/private/outside/h2.md - < evidence/private/outside/h2-prompt.md > evidence/private/outside/h2.log 2>&1`. When it ends, `git status --short` must show only this session's own changes. If Codex wrote anything, stop and tell the owner.
3. Triage each item against the lines it cites (`skills/outside-review` step 3, use D). Write the result into `evidence/OUTSIDE_REVIEW.md` as a new section, `## Run H2, <date>: the public text`. It opens with a paragraph shaped like H1's (tool and version, command, what was asked, the cap, items returned, `git status` after), then a table with H1's columns. Fix every item confirmed WRONG, OVERCLAIM or UNSUPPORTED. In `examples/`, a fix is a correction beside the old text, not over it. For each OBJECTION, record whether it is accepted or declined, and why. Then run the gate.

### 4.11 Approval, commit, clone, push

1. **Approval.** The owner reads the README's new top and `evidence/PRIVACY.md`'s P4″, P7 and P8 lists, and approves them in chat. Apply the owner's changes, run the gate, and commit: `docs: public release (package E, this repo's side): README for a visitor, license, AGENTS.md, privacy pass, claims check H2`, with `test:` changes named in the body.
2. **Clean clone.** From PowerShell, or Git Bash after `cd C:/…`:
   - `git clone C:/Users/xande/agentic-harness <scratchpad>/clone`, then `npm install` in the clone;
   - `npm run check` → 32 tests in 5 files, before any other command;
   - `git ls-files --eol` shows no `w/crlf`;
   - `npm run sessions -- --project="C:/Users/xande/agentic-harness" --ledger=<scratchpad>/ledger` exits 0;
   - `git status --short` in the clone is empty, or lists only `package-lock.json`.

   A failure is fixed in the repo with a new commit, and the clone is made again.
3. **The empty repo.** The owner creates `androids-agentic-harness` on github.com as **private**, with no README, license or `.gitignore`. An optional About text for the owner: "A kit for directing AI coding agents on long-running work, with the evidence of how it was built."
4. **Push**, on the owner's go-ahead in this session:
   - `git remote add origin https://github.com/AndroidTheHuman/androids-agentic-harness.git`, then `git push -u origin main`. Never force.
   - `git ls-remote origin main` must equal `git rev-parse HEAD`.
5. **Public.** The owner reads the repo page on GitHub, then switches it to public (Settings → General → Danger Zone → Change visibility). Then `curl -s -o /dev/null -w "%{http_code}" https://github.com/AndroidTheHuman/androids-agentic-harness` must print `200`.
6. **Close.**
   - `git mv docs/E_RELEASE.md docs/archive/2026-11/E_RELEASE.md`;
   - write the handoff, commit it, and `git push` (the same go-ahead covers it);
   - `git ls-remote origin main` must again equal HEAD;
   - `git -C "C:/Users/xande/infinity autobattler" status --short` must be empty.

## 5. Expected effect

- `npm run check` → 32 tests in 5 files, typecheck clean, locally and in the clean clone.
- `git ls-files CASE_STUDY.md RESUME.md meta evidence/private` → empty.
- `git diff --cached --name-only`, right after §4.3's renormalize → `.gitattributes` plus §4.1's `CASE_STUDY.md`, and nothing else.
- `git diff --stat evidence/NUMBERS.md` → 1 line, line 3.
- The README top → ≤ 600 words, and every figure is one of §2's.
- Privacy → P1, P3, P4 and P6 are 0, and P2/P2′ match §4.9's Expected column.
- GitHub → the repo URL returns 200, and `git ls-remote origin main` equals HEAD.

## 6. Tests

- `tests/kit.test.ts`: the two "references" tests change as in §4.5. No test is added or removed, so the count stays 32.
- Check it can fail: in a scratch copy of `README.md`, a link to `RESUME.md` must make the link test fail. Run that once before the README rewrite, then revert it.

## 7. Parts

One part, ending at §4.11's close.

- **Working set, about 32k tokens** (71,238 characters ÷ 2.2, measured 2026-11-11): this brief, `README.md`, `CLAUDE.md`, `tests/kit.test.ts`, `evidence/OUTSIDE_REVIEW.md`, `templates/AGENTS.md`, `examples/README.md`, `examples/05-worked-examples.md`, `.gitignore`, `package.json`. `evidence/measure.mjs` gets two one-line edits read with `offset`/`limit`.
- **Order:**
  1. Merge this session's `HANDOFF.md`.
  2. The owner approves this brief.
  3. §4.1 to §4.7.
  4. §6's fail check, then §4.8.
  5. Gate.
  6. §4.9, then §4.10.
  7. §4.11.
- **Checkpoint:** §11.

## 8. Files

| File | Change |
| --- | --- |
| `.gitignore` | `CASE_STUDY.md` with its comment |
| `CASE_STUDY.md` | untracked, kept on disk |
| `LICENSE`, `.gitattributes`, `AGENTS.md`, `evidence/PRIVACY.md` | new |
| `package.json` | `"license": "MIT"` |
| `tests/kit.test.ts` | the `.gitignore`-aware reference checks |
| `evidence/measure.mjs`, `evidence/NUMBERS.md` | the header line; regenerated |
| `CLAUDE.md` | precedence wording; four rows of Key documents |
| `evidence/OUTSIDE_REVIEW.md` | title, note, run H2 |
| `examples/05-worked-examples.md` | line 84's note; claims-check corrections beside old text |
| `README.md` | the new top; `AGENTS.md` sentence; `## License` |
| `docs/E_RELEASE.md` | archived at the close |

## 9. Must not

- No history rewrite and no force push. No push without the owner's go-ahead in that session; the switch to public is the owner's.
- No figure in the README that isn't one of §2's (`CLAUDE.md` Mandatory rule 3).
- No case study or résumé text written; `CASE_STUDY.md` and `RESUME.md` aren't edited.
- No change to the game repo or to token-ledger.
- No test assertion changed beyond §4.5; the test count stays 32.
- No correction written over old text in `examples/` or `evidence/DECISIONS.md`.
- Nothing from `meta/` or `evidence/private/` is committed or quoted.

## 10. Docs

- `PROJECT_CONTEXT.md`, through the handoff as `[PROPOSED]`:
  - Now: the repo is public, at its URL;
  - The kit: `AGENTS.md`, `LICENSE`, `.gitattributes`, the `.gitignore`-aware reference tests;
  - Evidence: `PRIVACY.md`, run H2;
  - lines 41 and 53, which name `CASE_STUDY.md` and `RESUME.md`, rewritten for the git-ignored drafts.
- `docs/archive/CHANGELOG.md`: one line, through the handoff.
- `docs/PLAN.md`: no change; the brief is archived at the close.

## 11. Verification

- [ ] `npm run check` (PowerShell) → 32 passed in 5 files.
- [ ] §6's fail check: the link test fails on a `RESUME.md` link, then passes once it is reverted.
- [ ] `git diff --stat evidence/NUMBERS.md` → line 3 only; the game repo's `git status --short` is empty.
- [ ] The README top word count is ≤ 600; the handoff maps each figure to its source.
- [ ] `evidence/PRIVACY.md` has 11 rows; the owner approved P4″, P7 and P8.
- [ ] Run H2 is triaged in `evidence/OUTSIDE_REVIEW.md`; every confirmed item is fixed or its declining is recorded.
- [ ] Clean clone: 32 tests, no `w/crlf`, the ledger exits 0, the clone's status is clean.
- [ ] `git ls-remote origin main` equals HEAD after each push; the repo URL returns 200 once it is public.
