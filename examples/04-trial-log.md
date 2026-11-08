<!-- Verbatim from Infinity Autobattler `docs/MODEL_CHOICE.md` @ 636f378: lines 126–129, 130 and 140 (the Trial log's header, brief 027 part A's row and its note). Not edited; it refers to files and briefs of that repo, which is private. -->

## Trial log

| Date | Package | Model | Calls | Peak | Re-read | Cost | At Opus rates | `/usage` change (session, week) | D1 / D2 / D3 / D4 | Review cost | Verdict |
| --- | --- | --- | --: | --: | --: | --: | --: | --- | --- | --: | --- |
| 2026-10-13 | brief 027 part A (class 1) | Sonnet 5.5 xhigh | 59 | 235k | 10M | $3.67 | $5.34 | session 72 → 82% (+10), week 72 → 74% (+2) | 0 / 0 / 0 / 3 | $1.54 | clean (1 of 2) |

[…]

- **027 A.** The D4s: `verifyCarry` doesn't itself refuse a carried source (`carrySource` always hands it the calibrated row, and the table rule rejects such a row on write, so it can't reach the table); `(at opus-5.5 rates)` prints when any call, sub-agents included, ran on another model, where the brief says the main model; the ledger legend has the brief's Model and Cost sentences in another order. The judgment calls the handoff lists are ones the reviewer would have made too. The bar: 59 calls and 10M re-read against 101 and 17.7M. The part is smaller than the median's parts (class 1; no snapshot, census or 10M wait), but not by half: about 800 lines of code and tests, against WP1 part B's 1,191 lines in 78 calls. No `other iterations`: the `advisorModel` field on its entries sits on every recent transcript, Opus ones included, so it is a client setting, not an advisor run. `/usage`: +2 weekly points for $3.67 is about 0.5 points per dollar, but the weekly reading moves in whole points, so ±0.5 of the 2 is noise. The first Opus figure comes from the review session's readings (before: session 82%, week 74%): session 82 → 87% (+5), week 74 → 74%, for a $2.25 session.
