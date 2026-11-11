# Session handoff — 2026-11-10 · price fix (audit finding 1) and package C merged · Opus 5.5 xhigh

The owner brought a one-off strategy audit by Claude Fable 5 (`evidence/AUDIT_FABLE_2026-11.md`) and asked whether the work is getting closer to a public showcase. They decided: **D is deferred**, and **a public release comes this week**, because a résumé PDF goes out this week (`docs/PLAN.md` → "Revision 2026-11-10"). This session merged the package C kickoff's handoff, timed the adoption, triaged its friction, and fixed the kit side of the audit's finding 1. token-ledger's side is the next session.

## Check first done this session (the package C kickoff's handoff)

- `npm run check` → the first run failed all 4 files with "no tests" in 448 ms; four reruns were clean (27/27). Not reproduced; see the open issues.
- `node --no-warnings evidence/adoption-time.mjs "C:/Users/xande/token-ledger"` → session `22d76ec3`, 1.4 min wall clock, 12 calls, 18 tool calls, peak 72k, $0.64, **bar met, exit 0**. VERIFIED that it is a real adoption: before the cut, the session read the README, copied templates, wrote `package.json`, ran `npm install`, filled `CLAUDE.md` and `PROJECT_CONTEXT.md`, set the gate, then ran `--current`. Permission prompts: not recorded.
- Friction triage (token-ledger `docs/archive/2026-11/HANDOFF_2026-11-09.md`, items 1–8):

| # | Item | Done |
|---|---|---|
| 1 | No `git init` / `npm init` (P1 confirmed) | README lite step 0 |
| 2 | No gate in an empty project (P2 confirmed) | Step 1 names the kit's gate, `tsconfig.json` and three devDependencies |
| 3 | The ledger's test isn't copied | Step 4 copies `tests/sessionMeasures.test.ts` and `tests/sessions.test.ts` |
| 4 | "Set `GATE`" unclear; comment said "rule 2" | Step 4 says the default and `--gate`; the comment names no rule number |
| 5 | The Session column is transcript text | README Limits says to read it before committing to a public repo. Not changed in code: E's privacy pass decides |
| 6 | Template cites full-tier `docs.test.ts`; "at <commit>" before any commit | The comment already says "(full tier)"; the Gate line reads "(at <commit>, once there is one)" |
| 7 | `brief-spec` cites a full-tier test | It now says a lite project checks the names by hand |
| 8 | The session read `C_KICKOFF.md` and knew it was timed | Recorded with the timing (README, `PROJECT_CONTEXT.md`); can't be undone. P3 (permission prompts) stays unanswered |

- The kickoff's proposed lines: checked and merged. Its "Next" line was stale (package C closed at token-ledger `e5b817b`), so the merged Now lines state that instead. Handoff archived as `docs/archive/2026-11/HANDOFF_2026-11-09_package-C-kickoff.md`.

## Files changed

| Path | Change | Type |
|---|---|---|
| `tools/sessionMeasures.ts`, `tests/sessionMeasures.test.ts` | Sonnet 5.5 `cacheRead` 0.2 → 0.1; a test pins Sonnet at half of Opus; headers name the change | behavioural |
| `tools/sessions.ts` | *Cost* is `listUSD` first (`costOf`, exported); `priceCheck` per model, FAILED outside 0.95–1.05 (`PRICE_BAR`); legend's two price sentences; `GATE` comment; header | behavioural |
| `tests/sessions.test.ts` | New: `priceCheck` and `costOf` on synthetic rows (5 tests) | additive |
| `evidence/game-prices.mjs`, `evidence/reprice.mjs`, `evidence/game-repriced.json` | New: the game's PRICES at a rev; re-pricing of committed rows by difference, saved so it outlives the transcripts | additive |
| `evidence/ledger-port-check.mjs` | Compares at the game's committed rates; names the rate difference and the rows it moves | behavioural |
| `evidence/measure.mjs`, `evidence/NUMBERS.md` | Cost = re-priced list price; a line says what was re-priced; regenerated | behavioural, generated |
| `README.md` | Lite steps 0, 1, 4 (friction); the timing; port-check counts of today; Limits; line 15's figures | docs |
| `templates/MODEL_CHOICE.md`, `templates/PROJECT_CONTEXT.md`, `skills/brief-spec/SKILL.md` | The price lesson rewritten; friction 6 and 7 | docs |
| `examples/05-worked-examples.md`, `examples/README.md`, `evidence/DECISIONS.md` | Corrections added beside the "a fifth to a quarter" text, not over it | docs |
| `CASE_STUDY.md`, `RESUME.md` | "Out of date since 2026-11-10" under the stub banner | docs |
| `docs/PLAN.md`, `CLAUDE.md` | The owner's revision of 2026-11-10; read order and precedence name it | owner decision |
| `PROJECT_CONTEXT.md`, `docs/archive/CHANGELOG.md`, `docs/IDEAS.md` | The kickoff merged; three ideas (generic token-ledger, a plugin, audit findings 3–5 and 7) | merge, additive |
| `evidence/AUDIT_FABLE_2026-11.md`, `evidence/audit-2026-11/*.mjs` | The owner's audit and its four read-only scripts, committed as they were | evidence |
| `docs/session-ledger.json`, `docs/SESSION_LEDGER.md` | This session's row; the new legend | generated |

## Verification status

### The rate and the price check
**Status**: VERIFIED · **Evidence**: on the game's transcripts (`npm run sessions -- --project="<game>" --ledger=<scratch>`) the new check prints `opus-5.5 1.009 over 106 rows (2 off by > 5%); sonnet-5.5 1.011 over 39 rows (0 off by > 5%)`. The same check on the game's committed rows (old rate) prints `sonnet-5.5 0.706 over 37 rows (37 off by > 5%) OUTSIDE THE BAR`, the audit's 70.6%. The brief 027 part A row re-prices from $3.67 to $2.67, Claude Code's recorded figure to the cent. **Risk**: Low.

### The port check
**Status**: VERIFIED · **Evidence**: `node --no-warnings evidence/ledger-port-check.mjs "C:/Users/xande/infinity autobattler"` → exit 0; 207 rows: 147 identical, 11 reproduced once later records are left out, 0 not reproduced, 49 transcripts gone, latest row reproduced; "the kit's differ: claude-sonnet-5-5 cacheRead 0.2 → 0.1"; 42 committed rows move ($266.54 → $189.20 as scanned). **Risk**: Low.

### NUMBERS.md
**Status**: VERIFIED · **Evidence**: `node --no-warnings evidence/reprice.mjs "<game>" > evidence/game-repriced.json` → 42 rows, $265.76 → $188.42, 0 not re-priced. `MEMORY_DIR=<game memory> node evidence/measure.mjs "<game>" > evidence/NUMBERS.md` → exit 0. Changes: total $1,433 → $1,416; months $14.83 / $6.14 / $7.60 → $14.82 / $6.07 / $7.28; from 2026-10-02 $6.26 → $6.17. No token figure moved. **Risk**: Low.

### The gate
**Status**: VERIFIED · **Evidence**: `npm run check` → typecheck clean, 32/32 tests in 5 files (run again after this file was written). **Risk**: Low.

## Check first next session

- [ ] `npm run check` → 32/32 in 5 files, typecheck clean.
- [ ] Port check → exit 0, 0 not reproduced, 42 rows moved. If "transcript gone" is above 49, the cleanup is still deleting despite `cleanupPeriodDays` 365.
- Next: **token-ledger's price fix**, a session in `C:\Users\xande\token-ledger` on Opus 5.5 xhigh. Take the kit's `tools/sessionMeasures.ts` (and `sessions.ts` if wanted) at this commit; run `npm run ledger -- report`; apply Q1, Q8 and Q11 as the register wrote them (the audit expects Q11 to flip to met); update FINDINGS, METRICS and the trial rows in its `MODEL_CHOICE.md`. Its rows with no surviving transcript use its own `data/private/` snapshot.
- Then package E: names, a privacy pass on both repos, the Codex claims check on the final text, push.

## Known open issues

- **Recorded above computed on many rows from 2026-10-21 on.** After the fix, 36 game rows still show Claude Code's recorded cost 1–4% above the computed one, about $0.11 per Sonnet session and $0.20 per Opus session. It scales with the model's price, so it looks like a call billed on the session's model that isn't in the transcript. Plausible, not verified. The per-model check absorbs it.
- The audit's "`--current` names any field the newest row lacks": not done. At `--current` time the recorded cost and *Lines +* never exist yet (Claude Code appends them after the session), so it would fire every time.
- The game's own `PRICES` and committed `listUSD` still carry $0.20: a game session's job.
- `CASE_STUDY.md` and `RESUME.md` are marked out of date and not rewritten (E).
- The first gate run's "no tests" failure: four reruns were clean; the working directory's drive-letter case (`c:\` vs `C:\`) changed around then, which may be the cause.
- 12 game transcripts were deleted between 2026-11-09 and 11-10; the oldest now is from 2026-10-11.
- `docs.test.ts`' plan-brief and parts checks still don't run here.

## Judgment calls

- **The price check is per model, on totals, with a ±5% bar**, not the audit's per-row 1%: after the fix, the per-row rule still failed 36 rows on the gap above. A wrong rate moves a whole model (0.706), so the total catches it. Rows off by more than 5% are counted but don't fail.
- **Re-pricing by difference, saved to a committed file**: the committed list price plus (kit rates − game rates) on the same transcript keeps every other part of the game's figure, and `NUMBERS.md` stays reproducible after the transcripts go.
- **The port check computes at the game's rates**, read from the game's source at `<rev>`, so it still proves the port exactly; the rate difference is reported by name, not loosened.
- **Corrections beside the old text** in `examples/05`, `examples/README.md` and `DECISIONS.md` row 10: they are a record of what was believed. The trials' own percentages weren't recomputed (part-level figures from the game's trial log).
- **README line 15** leads with peak context (451k → 268k) and says "per session, not per unit of work" (audit finding 2).
- **No `claude-api` skill lookup for prices**: the owner checked the live price page; the audit traced the wrong rate to that skill's cached table.
- **This session wasn't one package**: the merge, the timing and the friction triage were the kickoff handoff's check-first items, and the fix was the owner's go-ahead in this session.

## Questions for the owner

1. The repo names and the link for the PDF (it can't change): slugs and titles for the kit and token-ledger, on `github.com/AndroidTheHuman`.
2. Optional: how many permission prompts you answered in token-ledger's first session (P3). "Don't know" is a fine answer.

## Session cost

`7e12dfde-77d2-42c8-8900-68b33117095b: 64 calls, peak 211k, re-read 9.6M (sub-agents: 0), 3 gates, 0/105 tool errors, 1 big reads. Flags: none · opus-5.5 xhigh · $5.25` (taken before this handoff was written; the final row is larger).
- no flags.

## Proposed changelog lines
[PROPOSED — not yet confirmed]
- 2026-11-10: Price fix and package C merged (the commit that adds this handoff): Sonnet 5.5's cache read $0.20 → $0.10 per million (audit finding 1, the owner's check of the live price page); *Cost* is the computed list price; the price check is per model and fails outside 0.95–1.05; the port check computes at the game's rates and names the 42 rows the correction moves; `evidence/reprice.mjs` and `game-repriced.json`; `NUMBERS.md` regenerated ($1,433 → $1,416; $6.26 → $6.17 from 2026-10-02); "a fifth to a quarter, not half" corrected in the template, examples and decision log; stubs marked out of date; the adoption timed (1.4 min, met) and its 8 friction items triaged; the Fable audit committed; D deferred and a public release next (owner); gate 32/32.

## Proposed PROJECT_CONTEXT.md changes
[PROPOSED — not yet confirmed]
- The kit: "`npm run check` is typecheck plus 27 tests in 4 files" → "32 tests in 5 files".
- The kit: the port-check line → "- `evidence/ledger-port-check.mjs` reproduces, at the game's own rates, every game ledger row at `636f378` whose transcript survives (158 on 2026-11-10; 49 transcripts gone), and names the rows the kit's corrected rate moves (42)."
- The kit, new: "- `PRICES` has Sonnet 5.5's cache read at $0.10 per million, the live price page's rate (checked 2026-11-10); the game's copy still has $0.20."
- The kit, new: "- The ledger's *Cost* is the computed list price; its price check compares it with Claude Code's recorded cost model by model and says FAILED outside 0.95–1.05."
- Evidence, new: "- `evidence/NUMBERS.md` uses the game's list prices re-priced at the kit's rates (`evidence/reprice.mjs` → `game-repriced.json`: 42 rows, $265.76 → $188.42)."
- Evidence, new: "- `evidence/AUDIT_FABLE_2026-11.md` is a one-off strategy audit by Claude Fable 5 (2026-11-10): finding 1 fixed in the kit, 2 and 6 go to E, 3–5 and 7 parked in `docs/IDEAS.md`."
- Things to be aware of, new: "- Claude Code's recorded cost sits 1–4% above the computed one on many rows from 2026-10-21 on, on both models, scaling with the model's price; the cause is unverified."
- Things to be aware of: the transcripts line → "- Transcripts older than about 30 days were deleted; `cleanupPeriodDays` is 365 since 2026-11-09, but the game's oldest transcript on 2026-11-10 is from 2026-10-11."
