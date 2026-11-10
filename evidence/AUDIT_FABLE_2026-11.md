# Audit of the agentic harness, 2026-11

Claude Fable 5 (`claude-fable-5-2`), effort high; 2026-11-10; kit `4dc0840`, token-ledger `e5b817b` (game read at `636f378`).

## Verdict

The process is sound for what it claims: claims wait for a check, readings were fixed before the data was read, and a failed trial was honoured. One measurement defect is confirmed: the ledger mixes two cost figures that disagree by about 29% on every Sonnet session and labels the result "list price", which reaches the game's total, the routing reading (Q11) and the "a fifth to a quarter, not half" lesson. No major change is justified; four small ones are, and the headline "cut per-session cost 58%" is not backed as a statement about the cost of the work.

Labels used below: **confirmed** (reproduced from committed files by a command), **plausible** (evidence points that way, not reproduced), **speculative**.

## Findings

### 1. `PRICES` has Sonnet 5.5's cache-read rate at twice the published one; the ledger mixes that figure with the right one, and its own check never trips (confirmed)

**Settled 2026-11-10.** The owner checked the live price page (`platform.claude.com/docs/en/about-claude/pricing`): Sonnet 5.5 cache reads are $0.10/MTok, 0.05 × base input. `tools/sessionMeasures.ts:152` has `cacheRead: 0.2`. So `PRICES` is wrong, Claude Code's recorded cost is right, and every computed figure that includes a Sonnet call is too high. The table this finding first cited (the `claude-api` skill's, cached 2026-10-06) gave $0.20 and is wrong on this rate.

Scripts named below are in `evidence/audit-2026-11/`.

**Issue and evidence.**

- `tools/sessions.ts:326` takes Claude Code's recorded `costUSD` where one exists and the computed `listUSD` otherwise. `evidence/measure.mjs:135` does the same, so `evidence/NUMBERS.md` reports "$1,433 at list price" from the mix.
- The legend printed into every ledger says "the two agree to the cent on almost every session that has both" (`tools/sessions.ts:376-377`). That was true when it was written: on 2026-10-13 the check covered 63 rows, all on Opus (game `SESSION_HANDOFF_2026-10-13-3.md:46`). On the game's ledger at `636f378`, 57 of the 180 rows that have both differ by more than $0.05, and 33 by more than $1 (`1-ledger-summary.mjs`).
- The split is by model. Of 37 Sonnet rows with a recorded cost, 36 are recorded below the computed figure; recorded is 70.6% of computed over those rows ($159.35 against $225.57). Of 143 Opus rows, 122 agree within 5 cents and 21 are recorded slightly above (`3-cost-by-model.mjs`).
- A least-squares fit of cost on the rows' own token columns shows where the gap is. Computed cost recovers the price table exactly (Sonnet: cache read $0.200/M, write $4.03/M, output $9.95/M). Recorded cost on the same 36 Sonnet rows implies cache read $0.101/M with write and output about unchanged. On 138 Opus rows both imply $0.200/M. So Claude Code accounts Sonnet cache reads at about half the rate in `PRICES` (`tools/sessionMeasures.ts:152`), which is the published rate (`4-rate-fit.mjs`).
- The legend's next sentence is wrong for the same reason: "Cache reads cost the same on Opus 5.5 and Sonnet 5.5 ($0.20 per million), so for the same tokens a Sonnet session costs a fifth to a quarter less, not half" (`tools/sessions.ts:384-385`).
- `priceCheck` (`tools/sessions.ts:357-365`) prints only the median and the largest difference. Run on the game today (`npm run sessions -- --project=<game> --ledger=<scratch dir>`) it prints "median difference $0.01, largest $2.88 (8e754090)". The median hides a gap that sits in one model's rows, and nothing fails.

**What it reaches.**

| Figure | Where | Computed, with the wrong rate | With Claude Code's recorded cost where one exists | Script |
|---|---|--:|--:|---|
| Game total, 207 rows | `NUMBERS.md`, `README.md`, stubs | $1,493.41 | $1,432.67 | `1-ledger-summary.mjs` |
| Average per session from 2026-10-02 | `NUMBERS.md`, `README.md:15`, stubs | $6.58 | $6.26 | `2-cost-by-week.mjs` |
| Saving against Opus rates, 37 Sonnet rows | "a fifth to a quarter, not half" (`tools/sessions.ts:384-385`, `templates/MODEL_CHOICE.md:27`, `examples/05-worked-examples.md:47`) | 28.8% | 49.7% | `3-cost-by-model.mjs` |
| What routing saved (Q11's bar is 10%) | token-ledger `FINDINGS.md` Q11, `METRICS.md` M10 | $104.68, 7.0% | $170.25, 11.4% (recorded on 38 of 43 rows) | `3-cost-by-model.mjs` |

Neither column is the corrected figure. The right-hand one still carries the wrong rate on every row with no recorded cost: 27 of the game's 207 rows, and 6 of token-ledger's 7, both Sonnet trials among them (`1-ledger-summary.mjs`). The corrected figures need the rate fixed and the rows recomputed from their transcripts.

What moves:

- **The kit.** `NUMBERS.md`'s total and averages; the legend; `templates/MODEL_CHOICE.md:27`; `examples/05-worked-examples.md:47`. The worked example's conclusion reverses: by the recorded cost, the saving on the game's Sonnet rows is 49.7%, which is about half.
- **token-ledger.** Its tool prices with the kit's `PRICES` (`src/attribute.ts:5`), so every cost figure that includes a Sonnet call moves: the corpus total ($1,179.69), M1 to M8, M9's cost row and M10.
  - Q11 reads 7.0% against a 10% bar on the wrong rate, and 11.4% by the recorded cost, so its "not met" is likely to become "met".
  - Q1 and Q8 sit at their bars (output 29.35% against 30%; 30.1% against 30%). Q1's output share can only rise, since output dollars don't change and the total falls. Q8 can move either way.
  - Both trial rows' costs ($4.76, $3.77) are too high, so the savings they report are too low, including "a 33% saving at list price, in line with the source project's −31% and −27%" (`docs/MODEL_CHOICE.md:105`).
- **The game.** The port is word for word, so the game's own `PRICES` and its committed `listUSD` on Sonnet rows carry the same error. That fix belongs to a game session.

The register's rule still holds: no threshold moves. The data is corrected and each reading is applied again as written.

token-ledger uses `listUSD` throughout, so its game total ($1,500.21 over 208 rows) and the kit's ($1,433 over 207) are two published "list price" figures for the same ledger.

**Failure scenario.** Package D drops routing as a lever on Q11's "not met", and package E shows "a fifth to a quarter, not half" as a worked example. Both rest on the wrong rate. And since Claude Code has largely stopped recording a cost (below), the computed figure is the only one new rows get, so from here on nothing would contradict it.

**Severity** high (it touches headline figures and at least one registered reading). **Likelihood** certain: the disagreement is in the committed rows. **Confidence** high: the disagreement and its location are reproduced, and the owner's check of the price page settles which side is wrong.

**Existing safeguards.** The price check exists and printed the gap at every handoff since mid-October, but it has no threshold and no per-model view. "Every figure has a command" held, and is why this took minutes to find. The port check proves the kit reproduces the game's rows; it says nothing about the prices. FINDINGS → Limits doesn't mention the disagreement.

**A related silent change.** Claude Code largely stopped recording `cost-state`: 14 of 175 October rows lack a recorded cost, against 11 of 16 November rows (`3-cost-by-model.mjs`) and 6 of 7 token-ledger rows (`1-ledger-summary.mjs`). Cost switched source and Lines + went empty without any flag. The "format can change without an error" limit has already happened once.

**Smallest experiment.** The price page has settled which side is wrong, so what is left is to confirm the fix. Set Sonnet's `cacheRead` to 0.1 in a scratch copy of the two tools and run it on the game into a scratch ledger. Expected: the 36 Sonnet rows' computed cost lands within cents of the recorded one (the fit's worst residual is $0.18), and no row differs by more than $1. I did not run it: this review edits no tool.

**Cost to address.** Small, about one session in the kit and one in token-ledger.

- **The kit:** the rate and its test; both legend sentences (the agreement one becomes a count of rows off by more than 1%, by model, that can fail); Cost renders `listUSD` only and the recorded figure gets its own column; `--current` names any field the newest row lacks; `measure.mjs` uses `listUSD`; regenerate `NUMBERS.md`; the port header names the changed rate.
- **The port check** will stop reproducing the game's Sonnet rows until the game's copy is fixed. Have it say so by name; don't loosen it.
- **token-ledger:** take the fixed tool, run `npm run ledger -- report`, and re-read FINDINGS and the trial log.
- **Timing:** re-pricing a row needs its transcript, so do it while they survive (`cleanupPeriodDays` is 365 since 2026-11-09).

**Recommendation.** Now, before package D reads Q11 and before package E quotes a cost.

### 2. The headline result is per session, and nothing in the harness measures cost per unit of work (confirmed for the figures, plausible for the risk)

**Issue and evidence.**

- `CASE_STUDY.md:10` says the rule "cut average per-session token cost by 58%"; `RESUME.md:14` and `:19` say the same. token-ledger's `FINDINGS.md:101-103` rules out exactly this: no rule "caused" a change, and E1 didn't lower "the cost of the work", because E1 itself split work across more sessions. The stubs predate that rule; the lag is by design, but the claim is live in the repo that will be shown.
- The ledger's two delivery measures don't show the fall. On the game's ledger, computed list price per commit went from $5.65 before 2026-10-02 to $4.12 after, but by week it runs $2.21 (week of 10-05), $3.31, $5.47, $6.08, $9.11 (week of 11-02). Per 1,000 lines added, on rows that have a figure, it went from $6.69 to $8.45 (all from `evidence/audit-2026-11/2-cost-by-week.mjs`).
- Both delivery measures are degrading. Lines + is empty on 6 of 7 token-ledger rows. Commits counts the handoff loop's own commits: 13 of token-ledger's 28 commits are merges or handoffs, so the `N commits` flag ("several work packages in one session") fired on 6 of 7 sessions that each did one package (rows and flags from `evidence/audit-2026-11/1-ledger-summary.mjs`; the commit counts from `git log --format=%s` in token-ledger).
- The game has a per-brief cost script (`measure/per-brief.mjs`, quoted in `NUMBERS.md`). The kit doesn't.

**Failure scenario.** Package D gives each rule a target on a per-session share (M8, M3, M4). A rule that splits work into more, smaller sessions improves all three while each extra session pays the fixed start again (BASE + DOC.STEER is 24.5% of cost) and the cost per closed brief rises. The registry would report the rule as met.

**Severity** medium-high. **Likelihood** medium. **Confidence** high on the figures; medium on the risk, since commits and lines are weak measures of work too.

**Existing safeguards.** FINDINGS → "may not" is the right rule and was written before I looked. `docs/PLAN.md` → Criticism admits n = 1. Neither gives package D a measure of the work.

**Smallest experiment.** Cost per closed brief: sum `listUSD` over the sessions whose commits name a brief (323 of 327 game commits do), before and after E1 and by brief kind. It needs the committed ledger and `git log` only.

**Cost to address.** About one session: the per-brief script in the kit, and `commits` leaving out handoff and merge commits (or `$/commit` dropped).

**Recommendation.** Now, as package D's first metric. Each rule's target is then read beside cost per closed brief.

### 3. Reader-facing text has no check once a kind is promoted (the part D caption case)

**Issue and evidence.**

- The caption error was caught before brief 001 closed, by the Opus trial review (token-ledger `docs/MODEL_CHOICE.md:99`). The same review found a second stale reader-facing fact: "How this was built" froze part D's row at 36 calls and $2.21 (`:104`).
- That review exists only because part D was a trial. After promotion "reviews then stop" (`:57`).
- Nothing else reads a page's words. Part D's checkpoint is a test that `data.js` matches `summary.json`, and the owner seeing "all five panels with data" (brief 001, lines 279-281). The privacy test scans JSON and `data.js`, not `index.html`. Check-first items re-run commands; they don't re-read prose.
- The one outside run (D10) was a claims check of `FINDINGS.md` in part C, before part D wrote the dashboard, the closing section and the README.

**Testing the owner's idea.** The gap is real: on the second clean trial, or on any strong-model part, the same error would ship. A cold read is the wrong instrument, though. The kit's cold read (`outside-review` use B) reads a brief before it is built, and the game measured it at 22% precision (brief 001 D10). Checking a caption against its source is a claims check (use D), which exists, is ported, and returned 8 confirmed items of 8 on its one run here in 3 min 18 s and 20 triage calls. So the smallest fix is not a new step. It is the existing step's target and timing: the claims check names every file a reader will take as fact (the page's text included) and runs after the last part that writes one.

For this dashboard an even smaller guard exists: text that states a method fact comes from data. The panel's headings already print each window's dates from `rules.json`; the hand-written caption is what drifted.

**Failure scenario.** "UI part over fixed data" is promoted after one more clean trial. The next page states a window, a denominator or an n wrongly; the gate, the owner's look and the handoff all pass, and package E shows the page.

**Severity** medium. **Likelihood** medium-high after promotion (two stale reader-facing facts in one part). **Confidence** high.

**Smallest experiment.** On the next brief with a page, run use D once after the last part with the page's text in its target list. Record N, confirmed and new in the outside log, as the route's rule already asks.

**Cost to address.** One line in `templates/briefs/research.md` and one in `brief-spec`; per brief, one Codex run and its triage. The trade-off: run late, an item can reopen an earlier part, where D10's early run let part D fix what it found.

**Recommendation.** Now. Prefer it to a new cold-read route.

### 4. The context guard cannot fire in a one-prompt session, and the 250k rule has no other enforcement (confirmed)

**Issue and evidence.**

- The guard is a `UserPromptSubmit` hook (`tools/hook.settings.json`, `tools/sessions.ts:441-484`). `templates/CLAUDE.lite.md:38` tells the session "the prompt hook reports this; follow what it says".
- In package C, 6 of 7 sessions had one prompt. The hook ran once, before any work, at a context near zero. Session `874927de` then peaked at 286k without a warning.
- `CASE_STUDY.md:79` already states the limit. The new evidence is that the kit's own working style (a kickoff prompt, then run to the handoff) makes it the normal case.
- The size estimate that should keep a part under the limit missed on first use: part A's working set was put at about 75k (brief 001, line 225), and the session reached 286k with step 4 half done. `brief-spec` step 6 says the formula is the game's and needs a dozen parts to re-measure.
- The hook swallows every error (`tools/sessions.ts:498-502`), so a format change turns it off silently.

**Failure scenario.** Package D makes the 250k limit its first rule (M8: 30.1% of main-thread cost is past 250k). The only live enforcement can't fire in the sessions the kit produces, so the rule is measured after the fact and never applied during one.

**Severity** medium. **Likelihood** high. **Confidence** high.

**Existing safeguards.** The ledger's `context` flag, after the session. The idle guard half of the hook does work as designed, but Q7 puts cold re-caches at 0.3% of cost.

**Smallest experiment.** Register the same script on a hook that fires inside a turn (check first that Claude Code's `PostToolUse` accepts added context) in one project, and count warnings over five sessions.

**Cost to address.** Small if that hook type takes the same output; otherwise a line in the template saying the limit is self-policed.

**Recommendation.** Now, since it is package D's first target; or remove the sentence that says the hook reports it.

### 5. On a small project a model trial costs about what it saves, and the meter readings can't be compared (plausible)

**Issue and evidence.**

- Part A's trial cost $4.76 against $7.66 at Opus rates, and its review $3.62 (not separable from other work). Part D's cost $3.77 against $5.65, and its review $1.86 (token-ledger `docs/MODEL_CHOICE.md:87-88`). The protocol says so itself: "only promotion makes the saving real". A four-part brief never reaches promotion.
- The cost bar (within 1.3 × 101 calls and 17.7M re-read, the game's medians) didn't bind: both trials were small parts at 56 and 62 calls.
- `/usage` is called "the real measure", but the log holds readings only for the two trial sessions. With no Opus session beside them, +16 and +11 points can't be read as a saving.
- The size of the saving is itself open until finding 1 is settled: 28.8% or 49.7% on the game's Sonnet rows.

**Failure scenario.** Trials keep running on short projects, each paying a review that cancels its saving, and the verdicts carry a cost comparison that the bar and the meter can't support.

**Severity** low-medium. **Likelihood** medium. **Confidence** medium (n = 2).

**Existing safeguards.** The protocol's decision side works: criteria were fixed first, part A's fail was taken by the letter, and the kind was narrowed instead of retried. The review also found two latent D1s and the caption, so its cost bought checks as well as a verdict.

**Smallest experiment.** Record `/usage` before and after the next five sessions on either model. No code.

**Cost to address.** None beyond the readings. Optionally one line: a brief proposes a trial only when the kind is expected to recur at least as often as two reviews cost.

**Recommendation.** Later. Add no machinery.

### 6. "A blind hand coder at κ 0.970" describes a model's read of a sample drawn by the tool's own labels (confirmed wording issue)

**Issue and evidence.** token-ledger's `FINDINGS.md:99` lets package E say the classifier "agreed with a blind hand coder at κ 0.970 over 180 units". The coder was an Opus sub-agent (`FINDINGS.md:141`). The sample is 15 units per code, picked by the tool's own code (`PROJECT_CONTEXT.md:38`). Two things follow. A reader takes "hand coder" to mean a person. And agreement on a sample stratified by the predicted label mostly shows the written rules are unambiguous to a second reader of the same rules; it is not the corpus's agreement rate and it doesn't bound misses by cost, which FINDINGS notes for GATE only.

**Failure scenario.** Package E quotes κ 0.970 as human validation; an interviewer asks who coded.

**Severity** low-medium. **Likelihood** medium. **Confidence** high on the facts (I did not read `HANDREAD.md` or brief §6 in full).

**Existing safeguards.** Limits lists the sample size and the uncoded codes. "How this was built" names the sub-agent. The "may" claim doesn't.

**Smallest experiment.** The owner codes 30 of the 180 units blind and compares with both the tool and the sub-agent.

**Cost to address.** One clause in the "may" list ("coded by a second model, 15 units per tool code").

**Recommendation.** Now for the wording (it is the owner's to make in E); the owner's own read only if E leans on the figure.

### 7. The handoff is the kit's largest cost on a small project; its core earned its place, its volume did not (plausible)

**Issue and evidence.**

- token-ledger's seven handoffs total 94,633 characters; its `src/` is 95,184. Tracked Markdown is 224,359 characters against 161,756 of source and tests.
- Each merge that followed a handoff inserted between 6 and 19 lines. Most of a handoff is read once by the next session and archived.
- Many check-first items re-run the gate with its expected count, which the next session's own gate does anyway.
- The loop did catch a wrong claim: one handoff's "prints none" was corrected by the next (`HANDOFF_2026-11-10_5fa6cda1.md:32`).

**What earned its cost in package C:** the brief with its register and stop condition; verified against claimed with the next-session merge; the trial review; the claims check; the privacy test (it caught a latent D1 at the first full report). **Ceremony there:** handoff length, the `N commits` flag, the prompt hook, the parts-sizing formula. **No cost because unused:** `preflight-check`, `design-critique`, `typed-playtest`, the doc budget and doc moves. Package C took `MODEL_CHOICE.md` and `outside-review` from the full tier only when it needed them, which is the tier design working.

**On the lag.** The kit's `PROJECT_CONTEXT.md` still says package C is "not started". That is the loop as designed, and I don't count it as a defect: a session that starts here merges before it works. The cost is that the kit's state is wrong for any reader who isn't a session.

**Failure scenario.** An adopter on a small project sees Markdown outgrow code in two days and drops the handoff whole, losing the part that works.

**Severity** low. **Likelihood** medium. **Confidence** medium.

**Smallest experiment.** On the next small project, cap the lite handoff (files, status for items that aren't VERIFIED, check-first, proposed lines; judgment calls only for trials) and count what the next session had to rediscover.

**Cost to address.** An edit to one skill.

**Recommendation.** Later, after package D.

## Three highest-value next actions

1. Fix Sonnet 5.5's cache-read rate in `PRICES` ($0.20 → $0.10/MTok, per the live price page) in the kit and in token-ledger's copy; the game's copy is a game session's job. Then make Cost one measure (`listUSD` in the ledger and in `measure.mjs`), replace the agreement sentence with a per-model count that can fail, regenerate `NUMBERS.md` and token-ledger's outputs, re-read Q1, Q8 and Q11 as the register wrote them, and retire the "a fifth to a quarter, not half" lesson.
2. Before package D sets a target, add cost per closed brief to the kit and read every rule's metric beside it. Stop reading `N commits` and `$/commit` until handoff commits are left out.
3. Close a brief that has reader-facing output only after the existing claims check has covered that output, run after the last part that writes it.

## What I would deliberately leave unchanged

- **Verified against claimed, merged by the next session.** It caught a wrong claim in six merges, and the lag is the price of the check.
- **The question register committed before any scan**, with readings applied as written. Q1 at 29.35% against a 30% bar was read as not met, and Q8 at 30.1% as met.
- **Stop conditions and failing by the letter.** Part A stopped at calibration instead of amending its brief, and its trial failed on two latent D1s that changed no number.
- **The claims check by an outside agent**, read-only: 8 of 8 confirmed, one tool bug found.
- **The full-suite gate** (27 of 27 here today) and **the privacy test** with `data/private/` git-ignored.
- **"Every figure has a command."** Findings 1 and 2 came from committed JSON in minutes because of it.
- **Rows that outlive their transcripts, and the port check.** It proves the port, which is all it claims.
- **The lite tier's size and the add-when-needed full tier.** Package C used it as intended.
- **Port headers and `docs/IDEAS.md`.** Cheap, tested, and they kept scope.
- **T0′.** It is disclosed, M1, M8, M9 and M10 don't rest on it, and the API's rule that thinking blocks are passed back unchanged is consistent with it. If package D targets thinking first, one regression of context growth on the previous call's thinking tokens would test it directly.

## Files read

Kit (`C:\Users\xande\agentic-harness`): `CLAUDE.md`, `PROJECT_CONTEXT.md`, `README.md`, `docs/PLAN.md`, `docs/IDEAS.md`, `templates/CLAUDE.lite.md`, `tools/sessions.ts`, `tools/sessionMeasures.ts`, `evidence/NUMBERS.md`, `skills/session-handoff/SKILL.md`; parts of `skills/outside-review/SKILL.md` (lines 44-63) and `skills/brief-spec/SKILL.md` (lines 40-74); by Grep: `HANDOFF.md`, `CASE_STUDY.md`, `RESUME.md`, `evidence/measure.mjs`, `tests/*.ts` (test names), templates, skills and examples for cost and cold-read wording. Committed `docs/session-ledger.json` through `git show`.

token-ledger (`C:\Users\xande\token-ledger`): `CLAUDE.md`, `PROJECT_CONTEXT.md`, `docs/MODEL_CHOICE.md`, `docs/research/FINDINGS.md`, `docs/research/METRICS.md`, `docs/IDEAS.md`, `docs/archive/2026-11/001_TOKEN_SPEND.md` (headings and lines 219-308); by Grep: the archived handoffs, `docs/archive/CHANGELOG.md`, `src/attribute.ts`, `src/report.ts`, `tests/privacy.test.ts`. Committed `docs/session-ledger.json` through `git show`; `git log`.

Game (`C:\Users\xande\infinity autobattler`): by Grep only (`docs/TOOLS.md`, `docs/SESSION_LEDGER.md`, `docs/archive/2026-10/027_RARITY_V4.md`, one archived handoff); committed `docs/session-ledger.json` through `git show`; `git log`, `git status`.

Not read: `templates/CLAUDE.md` (full tier), `evidence/DECISIONS.md`, `evidence/OUTSIDE_REVIEW.md`, `tools/docMoves.ts`, three skills (`preflight-check`, `design-critique`, `typed-playtest`), token-ledger's `HANDREAD.md`, `OUTSIDE_REVIEW.md` and most of `src/`. Findings don't rest on them, and the review says nothing about their content.

## Commands behind the figures

- Findings 1 and 2: four scripts in `evidence/audit-2026-11/` (uncommitted), each run as `node evidence/audit-2026-11/<name>`. They read each repo's committed `docs/session-ledger.json` with `git show HEAD:docs/session-ledger.json`, hold the three repos' absolute paths, and write nothing.
  - `1-ledger-summary.mjs`: each ledger's rows by cost field, the count of rows where recorded and computed cost differ, flags, and token-ledger's rows one by one.
  - `2-cost-by-week.mjs`: recorded against computed cost by week, and cost per session, per commit and per 1,000 lines added around 2026-10-02 and by week.
  - `3-cost-by-model.mjs`: the Sonnet and Opus rows apart, the saving against Opus rates and what routing saved on each measure, and rows with no recorded cost by month.
  - `4-rate-fit.mjs`: the least-squares fit of cost on `reReadM`, `cacheWriteK` and `outK` over rows without sub-agents.
- `npm run sessions -- --project="C:/Users/xande/infinity autobattler" --ledger=<scratchpad>`: the price check line quoted in finding 1 (145 rows with both, 159 sessions with a surviving transcript).
- `npm run check` here: 27 of 27 tests in 4 files.
- token-ledger: `git log --format=%s` for the commit counts; `git ls-files … | xargs cat | wc -c` for the character counts; `git log --shortstat` for the merge sizes.
- No raw transcript, `data/private/` or `evidence/private/` file was opened. The `sessions` tool read transcripts itself and wrote only to the scratchpad.
