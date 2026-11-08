# Outside review of the case study

**Run H1, 2026-11-08.** Codex CLI 0.167.0 (default model), `codex exec -s read-only`, run from the game repo at `636f378`. The prompt asked it to:
1. check the factual claims in CASE_STUDY.md and DECISIONS.md against the repo;
2. object as a senior engineer screening internship applicants.

It was capped at 8 items. Codex reported 64 claims checked and returned 8 items. Afterwards, `git status` on the game repo was clean.

Codex read the drafts while one edit was in progress: the commit-linkage line, which I had checked myself while it ran.

Triage: every item was checked against the cited file. "Confirmed" means the repo backs the item; "objection" means a framing point I accepted.

| # | Codex verdict | Item | Triage | Change made |
|---|---|---|---|---|
| 1 | WRONG | "A test holds that read to 20k tokens, so the cost of starting can't creep up" | Confirmed. `tests/docs.test.ts:6` says the brief "comes on top and is not budgeted here"; tokens are characters ÷ 2.2 | Says "the shared read", "estimated", and that the brief comes on top (CASE_STUDY, DECISIONS row 7) |
| 2 | WRONG | Decision 5: "each with agreement counts and a metric over 100k cards" | Confirmed. The run 4 register uses tallies from logs and saves, and run 3 uses battle samples | Now "a persona count and, where one applies, a tally or a bulk metric over cards or battles" |
| 3 | WRONG | "When a step needs judgment, the rule is to stop and ask me" | Confirmed. `CLAUDE.md` escalates design conflicts only; sessions make smaller calls and list them for review | Role section now separates the two |
| 4 | OVERCLAIM | "The gates prove the code does what the briefs say" | Confirmed. Outside audits found gaps after green gates (`docs/MODEL_CHOICE.md` outside log, step-back runs) | Now "check the invariants and regressions they were written for"; RESUME's interview answer says the same |
| 5 | OBJECTION | Inherited vs original: what did the owner contribute, given that the harness came from Omni? | Accepted | Added the two generations: what came from Omni, and what this project added. Still open: two worked examples (original prompt, rejected alternatives, result), for package B's `examples/` |
| 6 | OBJECTION | Volume figures lead; tooling is nearly half the source (`docs/codebase/1_DOCS.md:105`) | Accepted | "In short" now leads with what the harness does and the measured rule change; the volume figures follow. The tooling share went into "What didn't work" |
| 7 | OBJECTION | Persona playtests don't establish human enjoyment; one model played all five | Confirmed (`docs/playtests/rf161e0e0/REGISTER.md:22` says so) | Typed-playtest row now calls it a structured inspection, not a stand-in for players |
| 8 | UNSUPPORTED | "A lite tier takes an afternoon to adopt" | Confirmed: nothing measures adoption | Now "hasn't yet been tried on another project; timing its adoption is the next step" (package C) |

Precision: 8 of 8 confirmed or accepted. All 8 were new: Claude's drafts and checks hadn't caught any of them.
