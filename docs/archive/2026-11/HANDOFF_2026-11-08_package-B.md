# Session handoff — 2026-11-08 · package B (the kit) · Opus 5.5 xhigh

Package B is built: templates, skills, the ported tools and their tests, examples, and the kit's own `CLAUDE.md`, `PROJECT_CONTEXT.md` and ledger. Package A's handoff was checked, merged into `PROJECT_CONTEXT.md` and the new changelog, and archived (`docs/archive/2026-11/HANDOFF_2026-11-08_package-A.md`). Its owner feedback now lives in `CLAUDE.md` → Owner rules.

## Check first done this session (package A's handoff)

- `node evidence/measure.mjs` at the committed version → exit 0, and its output equals the committed `evidence/NUMBERS.md` byte for byte (diffed against a temp file; game HEAD `636f378`, `MEMORY_DIR` set). VERIFIED. My first run sent the output to `/dev/null`, which checks nothing; the diff above is the real check.
- `git -C "<game>" status --short` → empty, at the start and after every game read. VERIFIED.
- Correction: Omni's surviving worktree session dates from **2026-03-17** (its prompts' timestamps). 2026-10-28 is the file's modification date. The game's transcripts with owner prompts run from **2026-10-08** (171 sessions; the extractor's count), not 2026-10-10.

## Files changed

| Path | Change | Type |
|---|---|---|
| `tools/sessions.ts`, `tools/sessionMeasures.ts`, `tools/docMoves.ts` | Ported @ `636f378`; `sessions.ts` takes `--project`, `--slug`, `--ledger` (required with either), `--gate`; exports its functions and `table()`; runs only as the entry point | new (port) |
| `tools/hook.settings.json`, `.claude/settings.json` | The UserPromptSubmit hook snippet; installed here | new |
| `tests/sessionMeasures.test.ts`, `tests/docMoves.test.ts`, `tests/docs.test.ts`, `tests/kit.test.ts` | Ported tests (+1 doc-moves case); the budget test with a settings block naming this repo's docs; kit consistency checks | new |
| `templates/` | `CLAUDE.lite.md`, `CLAUDE.md`, `PROJECT_CONTEXT.md`, `IDEAS.md`, `MODEL_CHOICE.md`, `AGENTS.md`, `KICKOFF_PROMPT.md`, `REFERENCE.md`, `briefs/{plan,implementation,research,playtest,design}.md` | new |
| `skills/` | `session-handoff`, `preflight-check`, `brief-spec` (from content-spec), `outside-review` (+ use D, claims check), `design-critique` (generic categories), `typed-playtest` (a pattern) | new |
| `examples/` | 01 brief 054 header + part A; 02 the brief 027 part A trial handoff; 03 three ledger rows; 04 the trial-log row and note; 05 two worked examples; README | new |
| `evidence/owner-turns.mjs` | Owner prompts from transcripts → `evidence/private/` (git-ignored) | new |
| `evidence/ledger-port-check.mjs` | The kit's ledger against the game's committed rows | new |
| `evidence/measure.mjs`, `evidence/NUMBERS.md` | One row: outside runs from R9 (31 runs; 28 raised items; 22 had every item confirmed) | behavioural, additive |
| `CLAUDE.md`, `PROJECT_CONTEXT.md`, `docs/PLAN.md`, `docs/IDEAS.md`, `docs/archive/CHANGELOG.md`, `README.md` | The kit's own steering docs; the plan copied word for word from `~/.claude/plans/`; README rewritten for the kit | new / rewritten |
| `package.json`, `package-lock.json`, `tsconfig.json`, `.gitignore` | vitest 5, TypeScript 6, @types/node; ignores `node_modules/`, `evidence/private/` | new |
| `docs/session-ledger.json`, `docs/SESSION_LEDGER.md` | This repo's ledger, first row: this session | generated |

## Verification status

### The gate
**Status**: VERIFIED · **Evidence**: `npm run check` → typecheck clean; 27/27 tests in 4 files (sessionMeasures 10, docMoves 4, docs 6, kit 7), run after this file was written. **Risk**: Low

### The ledger port reproduces the game's rows (the plan's gate)
**Status**: VERIFIED · **Evidence**: `node --no-warnings evidence/ledger-port-check.mjs "C:/Users/xande/infinity autobattler"` → exit 0. Of the 207 rows committed at `636f378`, 170 have a transcript and all 170 are reproduced: 159 identical as recomputed; 10 identical once the `cost-state` record is left out (every one of the 10 files was modified at 2026-11-08T15:12:46Z, after the commit, and the record has no timestamp); the latest row, `4d89f881`, identical when its transcript is cut at its own `--current` run (03:22:39Z). 37 transcripts are gone. Not reproduced: 0. **Risk**: Low

### The hook
**Status**: VERIFIED · **Evidence**: with a missing transcript path and with this session's live transcript (then under 250k) → exit 0, no output. The warning branch was not triggered live; its code is unchanged from the game's. **Risk**: Low

### The extractor
**Status**: VERIFIED · **Evidence**: `node evidence/owner-turns.mjs` on the three transcript folders → game 206 prompts in 171 sessions (2026-10-08 → 11-08, 170,928 characters); Omni worktree 2 prompts (2026-03-17); this repo 1. **Risk**: Low

### The outside-run row in NUMBERS.md
**Status**: VERIFIED · **Evidence**: the script's 28 and 22 match an independent awk count over the same table. My first version read the wrong cells (Confirmed and New instead of N and Confirmed) and was fixed before the regeneration; the diff against the committed NUMBERS.md is that one row only. **Risk**: Low

### Templates, skills, examples
**Status**: CLAIMED (generalized by reading; not yet used on a fresh project). Every figure in README and examples was checked against NUMBERS.md or a script output; the quotes in example 05 were copied from the extraction and transcripts. `tests/kit.test.ts` checks the links, the kit paths, skill frontmatter, provenance headers and the hook. **Risk**: Medium: whether the lite tier adopts in 15 minutes is package C's question.

## Check first next session

- [ ] `npm run check` → 27/27, typecheck clean.
- [ ] `node --no-warnings evidence/ledger-port-check.mjs "C:/Users/xande/infinity autobattler"` → exit 0, "not reproduced: 0". (The gone count grows as transcripts age out; that is expected.)
- [ ] Optional, the owner's call (bills the ChatGPT plan): a Codex claims check (`skills/outside-review`, use D) of `README.md` and `examples/05-worked-examples.md` against the game repo at `636f378`, as run H1 did for the case study.
- Next: package C, on Opus 5.5 xhigh for its brief (the plan: brief on Opus, parts per MODEL_CHOICE). It needs the owner's abstract prompt first.

## Known open issues

- `docs.test.ts`' plan-brief and parts checks don't run here: this repo has no `docs/briefs/`. Package C's demo will exercise them.
- The kit's skills live in `skills/`, not `.claude/skills/`, so the Skill tool doesn't list them here; sessions read them by path (`CLAUDE.md` says so). See the owner question.
- `CASE_STUDY.md`'s last section still says the kit "is being assembled"; it's a stub, so it is left for package E or the next merge.
- `PRICES` lists Opus 5.5 and Sonnet 5.5 only (`docs/IDEAS.md`).

## Judgment calls

- **This repo runs the lite handoff** (`HANDOFF.md` at the root, archived on merge), not the full tier's `docs/SESSION_HANDOFF_<date>.md`: the owner's first prompt names `HANDOFF.md`. The skill documents both paths.
- **The plan moved into the repo** as `docs/PLAN.md`, word for word under a provenance comment, so it can't vanish with `~/.claude/plans`. It's budgeted whole in the start read (about 5.4k tokens).
- **Two CLAUDE templates** (lite and full), not one with tier markers. Markers would make a 15-minute adoption a deletion exercise.
- **`--ledger` is required** with `--project` or `--slug`, so measuring another project can never write into it. The game's own default (`<root>/docs`) is kept for the repo's own sessions.
- **"Reproduces the latest row" made precise**: every surviving committed row, with the two known ways a transcript grows after its row was written handled by rules the check runs, not by explanation.
- **PRICES unchanged**, so the port check compares like with like; extending them is an idea.
- **Example package**: brief 027 part A, because its session built the measures this kit ports. The brief excerpt is from 054 instead, since 027 predates the reading rule and per-part models.
- **The examples are verbatim only where they say so** (01–04, generated from `git show 636f378:…`). 05 is written for this kit and quotes with session ids.
- **Skills generalized, not rewritten**: each keeps its source's steps and rules; game-only content became slots or was cut (typed-playtest's scopes, critique's character categories). `outside-review` gained use D, the claims check package A ran.
- **`.claude/settings.json` installed here** (dogfooding the hook); no permissions added.

## Questions for the owner

1. **Package C's research question**, in your own words. The plan's draft is "Where do my coding-agent sessions spend their tokens, and which harness rules change that?"
2. **Skills location.** Keep the kit's skills in `skills/` only (visible to a reader of the repo; sessions read them by path), or also install them in `.claude/skills/` with a test that the copies match?
3. **Codex claims check** of the README and the worked examples before package C: yes or no?

## Session cost

`fa59a5f7-b69f-4aae-af0c-a248141d8ceb: 63 calls, peak 296k, re-read 13M (sub-agents: 0), 1 gates, 0/114 tool errors, 1 big reads. Flags: context 296k · opus-5.5 xhigh · $7.00` (taken before this handoff was written; the final row is larger).
- context 296k: one package of about 40 new files, plus the source reads it needed (8 skills, 4 tools, 2 tests, CLAUDE.md, AGENTS.md, KERNEL_IMPORT.md, MODEL_CHOICE.md whole). MODEL_CHOICE.md was the big read; the next session that needs it Greps the section. Package C's brief should split its build into parts by working set (`skills/brief-spec` step 6).

## Proposed changelog lines
[PROPOSED — not yet confirmed]
- 2026-11-08: Package B, the kit (commit: the one that adds this handoff): `templates/` (lite and full CLAUDE.md, PROJECT_CONTEXT, IDEAS, MODEL_CHOICE with the trial protocol, AGENTS, KICKOFF_PROMPT and REFERENCE, five brief kinds), six `skills/`, the ledger and doc-moves tools ported from the game @ `636f378` with the project as a parameter, the hook installed here, `examples/` (four verbatim excerpts and two worked examples), the kit's own CLAUDE.md, PROJECT_CONTEXT.md and ledger; gate 27/27; the port check reproduces all 170 surviving game rows.

## Proposed PROJECT_CONTEXT.md changes
[PROPOSED — not yet confirmed]
- Now: replaces "Package B (the kit) was built on 2026-11-08; its facts are in `HANDOFF.md` as `[PROPOSED]` lines until the next session checks and merges them." with "- Package B (the kit) is done: commit <sha>, merged <date>."
- Packages → B: "done 2026-11-08 (`<sha>`)".
- New section `## The kit`, after Packages:
  - `templates/` holds the lite and full `CLAUDE.md`, `PROJECT_CONTEXT.md`, `IDEAS.md`, `MODEL_CHOICE.md`, `AGENTS.md`, `KICKOFF_PROMPT.md`, `REFERENCE.md` and one brief template per kind (plan, implementation, research, playtest, design).
  - `skills/` holds session-handoff, brief-spec, preflight-check, outside-review, design-critique and typed-playtest; this repo's sessions read them by path.
  - `tools/sessions.ts` measures any project: `--project` or `--slug` with a required `--ledger`; `--gate` sets the gate command (default `npm run check`).
  - `.claude/settings.json` runs the ledger's prompt hook in this repo.
  - `npm run check` is typecheck plus 27 tests in 4 files; `tests/docs.test.ts` budgets this repo's start read (CLAUDE.md, PROJECT_CONTEXT.md's head, docs/PLAN.md, HANDOFF.md) at 20k tokens.
  - `evidence/ledger-port-check.mjs` reproduces every game ledger row at `636f378` whose transcript survives (170 on 2026-11-08).
  - `evidence/owner-turns.mjs` writes the owner's prompts to `evidence/private/`, which git ignores.
- Evidence: replaces "Outside item 5's open point, two worked examples of prompt → alternatives → result, was left to package B's `examples/`." with "- Outside item 5's two worked examples are `examples/05-worked-examples.md`."
- Things to be aware of: "- Omni's surviving worktree session dates from 2026-03-17; its file was modified on 2026-10-28."
