# Handoff: package A (case study, decision log, resume lines)

2026-11-08 · Opus 5.5 xhigh · plan: `C:\Users\xande\.claude\plans\this-is-a-bit-dapper-volcano.md`

## Verified
- `node evidence/measure.mjs "<game repo>"` exits 0 and regenerates `evidence/NUMBERS.md` from game commit `636f378`. Set `MEMORY_DIR` to the Claude Code memory folder for the memory-file count. Every figure in CASE_STUDY.md, DECISIONS.md and RESUME.md is in NUMBERS.md.
- Outside review H1 (Codex, read-only): 64 claims checked, 8 items, all triaged and fixed (`evidence/OUTSIDE_REVIEW.md`).
- Game repo: `git status` clean. `npm run sessions -- --current` writes the game's ledger files, so I restored them with `git checkout`. The next game session's `npm run sessions` adds this session's row back from the transcripts.

## For the owner to check
- The case study, the decision log and the resume lines are written in your voice. Read them and change anything you wouldn't say. "Did you write the code? No, almost none" is deliberate: hiding it is worse.
- The split between the two generations comes from the port table in the game's `docs/archive/DESIGN_ARCHIVE.md` → "Steering docs for agents" and from changelog dates. The origin of the change classes isn't claimed either way.

## Known incomplete
- Codex item 5: two worked examples (your original prompt, the alternatives rejected, the result). Planned for package B's `examples/`. Package B needs your two original prompts, or permission to quote them from the session transcripts.
- The "Built with the kit" section and a timed lite-tier adoption: package C.
- Not pushed. No remote. "agentic-harness" is a working name.

## Next
- **Package B** (the kit), fresh session, Opus 5.5 xhigh.
  - Read: this file, the plan's package B section, and CASE_STUDY's "What carries over" table.
  - Port from the game repo: `.claude/skills/*`, `tools/sessions.ts`, `tools/sessionMeasures.ts`, `tools/docMoves.ts`, `tests/docs.test.ts`, `tests/sessionMeasures.test.ts`, `CLAUDE.md`, `AGENTS.md`, and the Rules, Trial protocol and Outside agents sections of `docs/MODEL_CHOICE.md`.
- **Package C** needs from you: the abstract prompt for the ledger-tool demo, a few sentences in your own words. It goes into the repo verbatim.

## Session cost
At the commit: 38 calls before the triage, peak 172k, re-read 6.5M, 1 sub-agent (1.9M), $5.14 list, no flags. Codex usage is separate.
