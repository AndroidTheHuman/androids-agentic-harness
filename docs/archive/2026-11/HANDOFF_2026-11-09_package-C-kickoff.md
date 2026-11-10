# Session handoff — 2026-11-09 · package C kickoff · Opus 5.5 xhigh

Package B's handoff was checked, merged and archived (`docs/archive/2026-11/HANDOFF_2026-11-08_package-B.md`). The owner settled package C's two open questions: they kept the research question as drafted, and chose a cold start in a new folder. Package C's research project therefore starts in its own repo, from a kickoff prompt, with its adoption timed by a rule committed before the run. This session wrote no brief: package C's brief is the first piece of work of the research project's first session.

## Check first done this session (package B's handoff)

- `npm run check` → typecheck clean, 27/27 tests in 4 files. VERIFIED.
- `node --no-warnings evidence/ledger-port-check.mjs "C:/Users/xande/infinity autobattler"` → exit 0. 207 rows: 159 identical, 11 reproduced once the later-appended records are left out (the latest row, `4d89f881`, by the cut at its `--current` run), 37 transcripts gone, 0 not reproduced. Same as on 2026-11-08. VERIFIED.
- The proposed lines' facts: `.claude/settings.json` exists, and `.gitignore` lists `evidence/private/`. Package B's commit is `1f0b3a3`. VERIFIED, then merged. Commit `f141c87` (neutral owner wording; it had no handoff) got its own changelog line.
- Codex claims check (optional): not run. See the judgment calls.

## Files changed

| Path | Change | Type |
|---|---|---|
| `PROJECT_CONTEXT.md`, `docs/archive/CHANGELOG.md` | Package B's `[PROPOSED]` lines merged; a changelog line for `f141c87` | merge |
| `docs/archive/2026-11/HANDOFF_2026-11-08_package-B.md` | Package B's handoff, archived | moved |
| `docs/C_KICKOFF.md` | The question and its provenance; the research project's folder; the adoption timing rule and bar; predictions P1–P3; the kickoff prompt (a stub in the owner's voice) | new |
| `evidence/adoption-time.mjs` | Times a lite-tier adoption from a project's first transcript, using the ledger's own `summarise` on the transcript cut at its first successful `--current` run; exit 0 met, 1 not met, 2 nothing to time | new |
| `tests/docs.test.ts` | `HANDOFF.md` counts in the start-read budget only when it exists (`IF_PRESENT`); the provenance header names the change | behavioural |
| `docs/IDEAS.md` | One line: move `adoption-time.mjs` into `tools/` for adopters | additive |
| `docs/session-ledger.json`, `docs/SESSION_LEDGER.md` | This session's row | generated |
| `C:\Users\xande\token-ledger\` (outside this repo) | Created empty, for the research project | new folder |

## Verification status

### The gate
**Status**: VERIFIED · **Evidence**: `npm run check` → typecheck clean, 27/27 tests in 4 files, run after this file was written (so the budget test counts it). **Risk**: Low

### `evidence/adoption-time.mjs`
**Status**: VERIFIED on this repo's transcripts; not yet run on a real adoption. **Evidence**:
- On this repo's folder (earliest transcript: package B's `fa59a5f7`) → cut at 23:00:06Z. Wall clock 18.7 min; 63 calls, peak 296k and $7.00, which equal package B's own `--current` summary line. Bar not met, exit 1.
- On the same `.jsonl` given by path → the same result.
- On this session's prefix `2203dd1d` before it ran `--current` → exit 2.
- On the missing folder `token-ledger` → exit 2; with no arguments → the usage line, exit 2.
- Not exercised: a `--current` result that is an error, or one that prints a different session's row. Both are skipped by code (`is_error !== true` and the full id in the result).

**Risk**: Low. One thing to watch: a session that is resumed or compacted into a new transcript before its first `--current` would be timed from the new file.

### The budget test change
**Status**: VERIFIED · **Evidence**: before the change, with `HANDOFF.md` archived and no new one written, 2 tests failed with ENOENT on `HANDOFF.md`; after it, 27/27; with this handoff present, 27/27. **Risk**: Low. The test now passes in a fresh adopter's project before its first handoff.

### `docs/C_KICKOFF.md`
**Status**: CLAIMED. The kickoff hasn't been pasted yet. **Risk**: Medium. Whether it gets a cold session through adoption and a brief draft without questions is what the run shows.

## Check first next session

- [ ] `npm run check` → 27/27, typecheck clean.
- [ ] After the research project's first session, and within 30 days of it, while its transcript survives: run `node --no-warnings evidence/adoption-time.mjs "C:/Users/xande/token-ledger"`. Record wall clock, work time, calls, the exit code and the number of permission prompts the owner answered.
- [ ] Triage that session's friction list against P1–P3 in `docs/C_KICKOFF.md`: for each item, fix the README or template, or say why not.
- Next: the owner opens `C:\Users\xande\token-ledger` in Claude Code on **Opus 5.5 xhigh** and pastes the kickoff from `docs/C_KICKOFF.md`. That session adopts the lite tier, drafts research brief 001 and stops for approval. The brief then names a model for each part (the plan: parts on Sonnet per MODEL_CHOICE). This repo's next session merges this handoff together with the timing and the friction triage.

## Known open issues

- `docs.test.ts`' plan-brief and parts checks still don't run here: brief 001 lives in the research project, not in this repo.
- `CASE_STUDY.md`'s last section still says the kit "is being assembled" (a stub, left for package E).
- `PRICES` lists Opus 5.5 and Sonnet 5.5 only (`docs/IDEAS.md`). A part run on Haiku would show as unpriced.
- `docs/PLAN.md` still names the game's `tools/sessions.ts` as package C's reference input. The kickoff points at the kit's port instead (see the judgment calls). The plan is kept word for word, so the difference is recorded in `docs/C_KICKOFF.md`, not edited into the plan.

## Judgment calls

- **The research question**: the owner was asked whether the draft was a default. Options: keep it, aim it at package D, or write their own. The owner kept it. Recorded as drafted by Claude and kept by the owner, word for word.
- **Staging**: the owner was asked between a cold start in a new folder and a warm start in this session. They took the cold start: a session that had already read the kit can't time a cold adoption, and the research project's ledger then covers its whole build. This is why this session wrote no brief.
- **Skills location** (left to Claude): the skills stay in `skills/` only. That keeps one source and needs no test to keep copies matched. README lite step 3 already tells adopters to copy them to `.claude/skills/`, and the research project exercises that path. The parked idea about keeping two copies in step stays parked.
- **Codex claims check of README and `examples/05`** (left to Claude): deferred to the start of package E. E reframes the public text, so a check now would check text that will change. Package B already checked the figures against NUMBERS.md, and a run bills the ChatGPT plan. E checks the final text once.
- **The kickoff points at the kit's `tools/sessions.ts`, not the game's** (the plan's wording): package B ported it with the project as a parameter. The game's original stays readable through the kickoff's game-repo pointer.
- **The kickoff doesn't mention the timing**, so the session doesn't rush its reading to beat a bar.
- **README left as shipped before the run**: P1–P3 are written down as predictions instead of being fixed first. The timing then tests the kit as it is, and the friction list confirms or refutes each prediction.
- **The timing rule was corrected before the run**: my first wording said work time separates waits on permission prompts. The ledger counts them as work (package B's cut shows work = wall clock = 18.7 min), so the rule now reads a miss alongside the number of permission prompts instead.
- **`adoption-time.mjs` is in `evidence/`, not `tools/`**: it backs one claim (package C's timing). Making it a kit tool is parked in IDEAS.
- **The budget-test fix** is in scope because the merge exposed it, and an adopter's first session hits it too.

## Questions for the owner

1. The kickoff in `docs/C_KICKOFF.md` is a draft in your voice. Paste it as is, or rewrite it in your own words first? Whatever you paste is the recorded input.

## Session cost

`2203dd1d-8d57-4116-b7e2-28ead4323927: 28 calls, peak 135k, re-read 2.7M (sub-agents: 0), 2 gates, 0/37 tool errors, 0 big reads. Flags: none · opus-5.5 xhigh · $2.45` (taken before this handoff was written; the final row is larger).
- no flags.

## Proposed changelog lines
[PROPOSED — not yet confirmed]
- 2026-11-09: Package C kickoff (the commit that adds this handoff): package B merged and archived; `docs/C_KICKOFF.md` (the question the owner kept, the adoption timing rule with its 15-minute wall-clock bar and predictions P1–P3 committed before the run, the kickoff prompt); `evidence/adoption-time.mjs`; the budget test counts `HANDOFF.md` only when present; the research project's empty folder `C:\Users\xande\token-ledger`; gate 27/27.

## Proposed PROJECT_CONTEXT.md changes
[PROPOSED — not yet confirmed]
- Now: replaces "- Next: package C (a research project built live with the kit), on Opus 5.5 xhigh for its brief. It needs the owner's abstract prompt for the research question, in the owner's own words." with:
  - "- Package C runs in its own repo, `C:\Users\xande\token-ledger` (a working name); `docs/C_KICKOFF.md` holds its question, its kickoff prompt and the adoption timing fixed before the run."
  - "- Next: the research project's first session, on Opus 5.5 xhigh, from the kickoff in `docs/C_KICKOFF.md`: it adopts the lite tier and drafts research brief 001."
- Packages → C: "kickoff ready 2026-11-09 (`<sha>`); runs in `C:\Users\xande\token-ledger`".
- The kit → new line: "- `evidence/adoption-time.mjs <project folder>` times a lite-tier adoption: the project's first session, from its first entry to its first successful `npm run sessions -- --current`, against a 15-minute wall-clock bar (exit 0 met, 1 not met, 2 nothing to time)."
- The kit → new line: "- `tests/docs.test.ts` counts `HANDOFF.md` in the start read only when it exists."
- The kit → new line: "- The kit's skills live only in `skills/`; adopters copy them to `.claude/skills/` (README lite step 3). Decided 2026-11-09, at the owner's delegation."
- Evidence → new line: "- Package C's research question is the plan's draft, kept unchanged by the owner on 2026-11-09 (`docs/C_KICKOFF.md` → The question)."
- Evidence → new line: "- The Codex claims check of `README.md` and `examples/05-worked-examples.md` waits for package E, which checks the final public text once (decided 2026-11-09, at the owner's delegation)."
