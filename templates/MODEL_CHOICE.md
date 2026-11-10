# Model choice

Which model runs which kind of package, and how a kind earns a cheaper model. The aim: the same result for less usage. A kind moves to another model only on trial evidence; until then it runs on the strongest model.

<!-- Generalized from Infinity Autobattler's docs/MODEL_CHOICE.md @ 636f378 (Rules, Trial protocol,
     Outside agents). Its trial and outside logs are in examples/. Replace every <…>; keep the
     rule that verdict criteria are fixed before a trial runs. -->

## Rules

1. The owner picks the model and effort before the session's first prompt. Never switch inside a session: each model has its own cache, so a switch writes the whole context again (the ledger flags `model switch`).
2. The handoff names the next package's model and effort from the table below.
3. A session on a model that is still on trial for its kind of package is a trial. Its handoff lists its judgment calls, and the next session, on the strong model, reviews it before its own work (Review, below).

## Table

| Kind of package | Runs on | Status |
| --- | --- | --- |
| Implementation part whose brief gives the expected numbers | <strong model, effort> | not tried |
| Content or data part with expected numbers | <strong model, effort> | not tried |
| Handoff merge and trial review | <strong model, effort> | fixed while any kind is on trial: the reviewer must be the stronger model |
| Briefs, plan briefs, design critique, playtest findings | <strong model, effort> | not for trial: the judgment is the product |
| Outside review (`outside-review`) | an outside agent, read-only | per route; see Outside agents |

## What a trial weighs

- **Price.** Take the rates from the live price page, not a remembered table. The source project's table had the cheaper model's cache-read rate at twice the published one, which made its saving look like a fifth to a quarter when, at the same tokens, it was half (found by an outside audit and corrected on 2026-11-10). Most of a session's cost is usually cache reads, re-read on every call, so that one rate decides most of the saving. At half the price, a cheaper model that re-reads about twice the tokens saves nothing. The ledger prints each session at its own model's rates and, when another model ran, at the strong model's rates. Its price check compares the computed cost with Claude Code's recorded one, model by model, and says FAILED when a model is more than 5% off.
- **Usage.** A subscription's meter is the real measure, and providers don't publish how they weigh each model. While a kind is on trial, read the meter (`/usage` in Claude Code) before the first prompt and after the last answer.
- **Result.** The review.

## Trial protocol

**Usage readings.** While any kind is on trial, the owner reads `/usage` (the current window and the weekly figure) before each session's first prompt and after its last answer. The pair goes into the next session's first prompt.

**The trial session** works like any other. Its handoff has a **Judgment calls** section: each decision the brief didn't settle (what came up, the options, which it took, why), including how it handled any expected number that missed.

**Review.** The next session, on the strong model, runs it after its Check first items and before its own work:
- It reads the trial commit (`git show --stat <sha>`, then the files) against the part's items in the brief, and reads the Judgment calls.
- It grades each finding:
  - **D1**: a behaviour bug, or a deviation from the brief that the handoff doesn't report.
  - **D2**: a check made green the wrong way: a weakened test, band or expected number, or a number reported as met that isn't.
  - **D3**: a judgment call the reviewer would have made differently, with a consequence; or something the session should have noted and didn't.
  - **D4**: wording, naming, style.
- It fixes D1 and D2 there, under the usual class and gate.
- It runs `npm run sessions -- --current` when the review and its fixes are done. That figure is the review's cost: the trial's tax.

**Verdict.**
- **Clean**: no D1 or D2, at most one D3. The checkpoint was met without the owner stepping in on something the brief settles. Calls and re-read are within 1.3 × the reference: the median of the last five strong-model parts of the same kind in the ledger (<calls>, <re-read>, <cost>, measured <date>). The bar is rough, since parts differ in size; the reviewer says when the part is clearly bigger or smaller than the median.
- **Fail**: any D1 or D2, or the bar exceeded with no reason in the part's size.
- **Mixed**: anything else. The kind stays on trial for one more package.
- If the ledger flags `other iterations`, an advisor or fallback model ran inside the calls. The trial then measured that pairing, not the model alone, and the log says so.

**Sub-agent trials** test a model on a side task inside a session whose own model is not on trial, so a result has one cause. The brief fixes the task, the verbatim prompt, the measures and the verdict before the run. The ledger counts sub-agents apart (its Agents column). The next session reviews the run as above.

**Promotion.** Two clean trials in a row move a kind to its trial model. Reviews then stop, and the handoff's usual checks remain. A fail moves the kind back to the strong model with the reason in the log, and trying it again needs the owner. While a kind is on trial, the review's cost comes on top of the session's. Only promotion makes the saving real.

## Outside agents

Agents from other providers read the repo without writing to it: `AGENTS.md` sets their role and answer format, and the `outside-review` skill holds the tools, commands and templates. They bill the owner's other plans, not Claude usage. The session pays for the triage.

**Routes:**
- A commit review at the start of the next session, beside the merge.
- A cold read of a brief or part, before it is approved or built.
- A second answer to an owner question, put beside Claude's own.

**Measures (fix them before run 1):**
- For each run: the model, wall time, items N, confirmed (D1–D3, or a gap), new (not in the handoff, the brief or the known issues), precision = confirmed ÷ N, and the session calls spent on triage.
- For a second answer: the claims checked and the claims wrong. The owner judges whether it helped.

**Verdict after a route's 3 runs:**
- The route becomes a standing step (commit review in `session-handoff`'s next-session checks; cold read in `brief-spec`) when its precision is ≥ 50% and its 3 runs found at least one new confirmed item between them. Otherwise it stays on request.
- A run with N = 0 counts toward the 3 and adds nothing to precision.

### Outside log

| Date | Run | Route and target | Tool, model | Wall | N | Confirmed | New | Precision | Triage calls | Note |
| --- | --- | --- | --- | --: | --: | --: | --: | --: | --: | --- |

## Trial log

| Date | Package | Model | Calls | Peak | Re-read | Cost | At strong-model rates | `/usage` change | D1 / D2 / D3 / D4 | Review cost | Verdict |
| --- | --- | --- | --: | --: | --: | --: | --: | --- | --- | --: | --- |
