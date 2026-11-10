# Project context

What exists in this repo now, one fact per line. Sessions don't append here directly: a handoff proposes lines and the next session merges them after checking (`CLAUDE.md` → Mandatory rules 5). History is in `docs/archive/CHANGELOG.md`.

## Now

- Package C is done in its own repo, `C:\Users\xande\token-ledger` (a working name): brief 001 closed 2026-11-10 at `e5b817b`. `docs/C_KICKOFF.md` holds its question, its kickoff prompt and the adoption timing fixed before the run.
- Next (the owner, 2026-11-10): a public release this week, then package E; package D is deferred (`docs/PLAN.md` → "Revision 2026-11-10").
- The game repo is at commit `636f378` and clean; `evidence/NUMBERS.md` is measured from that commit.
- No remote; "agentic-harness" is a working name.

## Packages

| Package | What | Status |
|---|---|---|
| A | Case study, decision log, resume lines, evidence scripts | done 2026-11-08 (`a47a55a`, owner feedback folded in at `293d222`) |
| B | The kit: templates, skills, tools, examples, the kit's own CLAUDE.md | done 2026-11-08 (`1f0b3a3`) |
| C | A research project built live from scratch with the kit; times the lite-tier adoption | done 2026-11-10 in `token-ledger` (`e5b817b`); kickoff `4dc0840` |
| D | Rule trials: a rules registry with metrics and a `retro` command | deferred by the owner until after the public release (2026-11-10) |
| E | Presentation, led by the owner | next, after the price fix: a public release this week |

## The kit

- `templates/` holds the lite and full `CLAUDE.md`, `PROJECT_CONTEXT.md`, `IDEAS.md`, `MODEL_CHOICE.md`, `AGENTS.md`, `KICKOFF_PROMPT.md`, `REFERENCE.md` and one brief template per kind (plan, implementation, research, playtest, design).
- `skills/` holds session-handoff, brief-spec, preflight-check, outside-review, design-critique and typed-playtest; this repo's sessions read them by path.
- `tools/sessions.ts` measures any project: `--project` or `--slug` with a required `--ledger`; `--gate` sets the gate command (default `npm run check`).
- `.claude/settings.json` runs the ledger's prompt hook in this repo.
- `npm run check` is typecheck plus 27 tests in 4 files; `tests/docs.test.ts` budgets this repo's start read (CLAUDE.md, PROJECT_CONTEXT.md's head, docs/PLAN.md, HANDOFF.md) at 20k tokens.
- `evidence/ledger-port-check.mjs` reproduces every game ledger row at `636f378` whose transcript survives (170 on 2026-11-08).
- `evidence/owner-turns.mjs` writes the owner's prompts to `evidence/private/`, which git ignores.
- `evidence/adoption-time.mjs <project folder>` times a lite-tier adoption: the project's first session, from its first entry to its first successful `npm run sessions -- --current`, against a 15-minute wall-clock bar (exit 0 met, 1 not met, 2 nothing to time).
- `tests/docs.test.ts` counts `HANDOFF.md` in the start read only when it exists.
- The kit's skills live only in `skills/`; adopters copy them to `.claude/skills/` (README lite step 3). Decided 2026-11-09, at the owner's delegation.

## Evidence

- `node evidence/measure.mjs "<game repo>"` exits 0 and regenerates `evidence/NUMBERS.md` from the game repo's HEAD; `MEMORY_DIR` gives it the owner-memory folder to count.
- Every figure in `CASE_STUDY.md` and `RESUME.md` appears in `evidence/NUMBERS.md`.
- `evidence/OUTSIDE_REVIEW.md` records run H1 (Codex, read-only): 64 claims checked, 8 items returned, all triaged and acted on.
- Outside item 5's two worked examples are `examples/05-worked-examples.md`.
- Package C's research question is the plan's draft, kept unchanged by the owner on 2026-11-09 (`docs/C_KICKOFF.md` → The question).
- The Codex claims check of `README.md` and `examples/05-worked-examples.md` waits for package E, which checks the final public text once (decided 2026-11-09, at the owner's delegation).
- The lite-tier adoption, timed 2026-11-10 by `node --no-warnings evidence/adoption-time.mjs "C:/Users/xande/token-ledger"`: session `22d76ec3`, 1.4 min wall clock, 12 model calls, 18 tool calls, peak 72k, $0.64; bar met, exit 0. That session had read `docs/C_KICKOFF.md` first, so it knew it was timed (its friction item 8); the owner's permission-prompt count wasn't recorded.
- token-ledger's "built with the kit" record is its `docs/research/FINDINGS.md` → "How this was built".

## Things to be aware of

- `CASE_STUDY.md` and `RESUME.md` are stubs aimed at a recruiter; their framing waits for package E.
- Running `npm run sessions` inside the game repo rewrites the game's ledger files; package A restored them with `git checkout`. This repo's own `npm run sessions -- --project=<game> --ledger=<dir>` writes only to `<dir>`.
- Claude Code appends a `cost-state` record to a transcript after the session, sometimes hours later and without a timestamp, so a ledger row's Cost and Lines can fill in after the row was first written.
- Transcripts older than about 30 days are deleted; the game's transcripts survive from 2026-10-08.
- Omni's surviving worktree session dates from 2026-03-17; its file was modified on 2026-10-28.
