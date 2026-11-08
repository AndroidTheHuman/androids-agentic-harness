# Project context

What exists in this repo now, one fact per line. Sessions don't append here directly: a handoff proposes lines and the next session merges them after checking (`CLAUDE.md` → Mandatory rules 5). History is in `docs/archive/CHANGELOG.md`.

## Now

- Package B (the kit) was built on 2026-11-08; its facts are in `HANDOFF.md` as `[PROPOSED]` lines until the next session checks and merges them.
- Next: package C (a research project built live with the kit), on Opus 5.5 xhigh for its brief. It needs the owner's abstract prompt for the research question, in the owner's own words.
- The game repo is at commit `636f378` and clean; `evidence/NUMBERS.md` is measured from that commit.
- No remote; "agentic-harness" is a working name.

## Packages

| Package | What | Status |
|---|---|---|
| A | Case study, decision log, resume lines, evidence scripts | done 2026-11-08 (`a47a55a`, owner feedback folded in at `293d222`) |
| B | The kit: templates, skills, tools, examples, the kit's own CLAUDE.md | built 2026-11-08; handoff awaiting merge |
| C | A research project built live from scratch with the kit; times the lite-tier adoption | not started |
| D | Rule trials: a rules registry with metrics and a `retro` command | not started |
| E | Presentation, led by the owner | not started |

## Evidence

- `node evidence/measure.mjs "<game repo>"` exits 0 and regenerates `evidence/NUMBERS.md` from the game repo's HEAD; `MEMORY_DIR` gives it the owner-memory folder to count.
- Every figure in `CASE_STUDY.md` and `RESUME.md` appears in `evidence/NUMBERS.md`.
- `evidence/OUTSIDE_REVIEW.md` records run H1 (Codex, read-only): 64 claims checked, 8 items returned, all triaged and acted on.
- Outside item 5's open point, two worked examples of prompt → alternatives → result, was left to package B's `examples/`.
- A timed lite-tier adoption and a "built with the kit" record were left to package C.

## Things to be aware of

- `CASE_STUDY.md` and `RESUME.md` are stubs aimed at a recruiter; their framing waits for package E.
- Running `npm run sessions` inside the game repo rewrites the game's ledger files; package A restored them with `git checkout`. This repo's own `npm run sessions -- --project=<game> --ledger=<dir>` writes only to `<dir>`.
- Claude Code appends a `cost-state` record to a transcript after the session, sometimes hours later and without a timestamp, so a ledger row's Cost and Lines can fill in after the row was first written.
- Transcripts older than about 30 days are deleted; the game's transcripts survive from 2026-10-08.
