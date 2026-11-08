# Handoff: package A (case study, decision log, resume lines)

2026-11-08 · Opus 5.5 xhigh · plan: `C:\Users\xande\.claude\plans\this-is-a-bit-dapper-volcano.md` (read its "Revision after package A" first)

## Start the next session here
Open Claude Code in **`C:\Users\xande\agentic-harness`**, not the game repo. The game's `CLAUDE.md` rules (snapshot, calibration, read order) would load there and don't apply to this work. The session reads the game repo by absolute path, read-only. The game's memory files don't load here, so the owner's preferences that matter are listed below.

First prompt: "Read HANDOFF.md and the plan it names, then do package B."

## Owner feedback (2026-11-08); carry forward until this repo has its own CLAUDE.md
- The parts that came from Omni are the owner's decisions. So is bootstrapping by reference: showing a new session files from another of his projects (DECISIONS row 2).
- Writing in the owner's voice is acceptable only as a stub. CASE_STUDY and RESUME are stubs aimed at a recruiter. Presentation (audience, form, voice) is package E, led by the owner. When in doubt, defer framing to E.
- New harness additions are welcome when they close the self-improvement loop or let the kit build an impressive project from scratch (packages C, D).
- Don't ask the owner to dig through history. Owner prompts come from:
  - transcripts in `C:\Users\xande\.claude\projects\c--Users-xande-infinity-autobattler\*.jsonl`, which survive from 2026-10-10 (172 files). Extract the user turns by script.
  - the game repo, which keeps older owner text: `docs/archive/2026-09/KICKOFF_PROMPT.md`, `docs/STEP_BACK.md` answers, briefs' Status lines, quotes in the changelog.
  - Omni's transcripts are gone except one worktree session (2026-10-28).
- Commits: Conventional Commits; never push without the owner's go-ahead.

## Verified
- `node evidence/measure.mjs "<game repo>"` exits 0 and regenerates `evidence/NUMBERS.md` from game commit `636f378`. Set `MEMORY_DIR` for the memory-file count. Every figure in the stubs is in NUMBERS.md.
- Outside review H1 (Codex, read-only): 64 claims checked, 8 items, all triaged and fixed (`evidence/OUTSIDE_REVIEW.md`).
- Game repo: `git status` clean. `npm run sessions -- --current` writes the game's ledger files, so I restored them with `git checkout`. The next game session's `npm run sessions` adds this session's row back.

## Known incomplete
- Codex item 5's two worked examples (prompt → alternatives → result): package B's `examples/`, from the extracted prompts.
- A timed lite-tier adoption and a "Built with the kit" record: package C.
- No remote; "agentic-harness" is a working name.

## Next
- **B** (the kit), Opus 5.5 xhigh: the plan's package B plus its revision lines.
  - Port from the game repo: `.claude/skills/*`, `tools/sessions.ts`, `tools/sessionMeasures.ts`, `tools/docMoves.ts`, `tests/docs.test.ts`, `tests/sessionMeasures.test.ts`, `CLAUDE.md`, `AGENTS.md`, `docs/KERNEL_IMPORT.md`, `docs/archive/2026-09/KICKOFF_PROMPT.md`, and the Rules, Trial protocol and Outside agents sections of `docs/MODEL_CHOICE.md`.
- Then **C** (live research project), **D** (rule trials), **E** (presentation).
- C needs the owner's abstract prompt for the research question, in his own words.

## Session cost
At the first commit: 38 calls, peak 172k, re-read 6.5M, 1 sub-agent (1.9M), $5.14 list, no flags. Codex usage is separate.
