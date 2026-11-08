# Brief <NNN> — <phase name> plan

**Status:** draft (<date>). <Approved by the owner on <date>, with <changes>.>
**Kind:** plan brief. It fixes decisions, targets and the target model, and orders the work into packages. Each work package (WP) becomes its own brief via `brief-spec`, unless its row says it "runs from this row", in which case the row is the brief and this plan's approval approves it. **Nothing else in this brief is implemented directly.**
**Reading rule:** an implementation session reads §1, §4 and its own WP row in §7, not the whole plan.
**Evidence:** <the registers, reviews, measurements and owner answers this plan is drawn from, with paths>.

<!-- A plan stays in docs/briefs/ until its last work package is archived. tests/docs.test.ts
     budgets its reading-rule slice (the sections named, plus the longest WP row) in every
     session's start read, so keep §1 and §4 tight. WP rows start with "| **WP<k>**". -->

## 1. Goal

<What is true at the end of this phase that isn't now, in a few sentences.>

## 2. Where things stand

<What exists, what the last phase's exit test found, what the owner asked for.>

## 3. Exit test

| # | Measure | Base | Target | How measured |
| --- | --- | --- | --- | --- |
| X1 | <metric> | <now> | <target> | `<command>` |

## 4. Decisions

| # | Decision | Why |
| --- | --- | --- |
| D1 | <fixed for every WP> | <evidence or owner answer> |

## 5. Target model

<The shape of what the phase builds: data, flows, interfaces. Enough that each WP brief can be written without reopening a decision.>

## 6. Process rules

- <Rules for this phase only, e.g. "a row that meets an open design choice stops and asks the owner".>

## 7. Work packages

| WP | What | Kind | Depends on | Model | Done when |
| --- | --- | --- | --- | --- | --- |
| **WP1** | <what it builds or decides> | <implementation / research / design / playtest> | — | <model> | <its acceptance test> |

## 8. Open decisions (pinned in the WP briefs)

- <A decision this plan leaves to a WP brief, and who makes it.>

## 9. Risks

- <What could make the exit test unreachable, and the early signal.>

## 10. Doc updates

- <Which living documents change when the plan is approved.>

## 11. Must not

- <What no WP may do.>

## 12. Parked, kept open

- <Ideas considered and left out, with the reason; they go to IDEAS.md.>
