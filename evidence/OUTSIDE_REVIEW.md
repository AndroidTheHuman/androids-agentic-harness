# Outside reviews

Run H1 checked the case study's first draft. The case study is out of the public repo until its third-person rewrite (owner, 2026-11-11).

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

H1's precision counts accepted objections: items 1–4, 7 and 8 were confirmed against the files, and items 5 and 6 were framing objections accepted (run H2, item 6).

## Run H2, 2026-11-11: the public text

Codex CLI 0.167.0 (default model), `codex exec -s read-only --json`, run from this repo's root with the release's changes staged (brief `E_RELEASE` §4.10). The prompt told it to read `AGENTS.md` first and asked it to:
1. check every factual claim in `README.md`, `examples/README.md` and `examples/05-worked-examples.md` against the repo, with the game's figures from `evidence/`;
2. say what a skeptical hiring engineer, opening the repo from a résumé link, would object to.

It was capped at 8 items and returned 7, none marked WRONG; it said the headline counts agree with the committed evidence. Afterwards, `git status --short` was unchanged.

Triage: every item was checked against the lines it cites. "Confirmed" means the repo backs the item; an objection is accepted or declined, with the reason. "New" means no earlier review, brief or handoff had raised it for this text.

| # | Codex verdict | Item | Triage | Change made |
|---|---|---|---|---|
| 1 | OBJECTION | "a 44-day, 207-session build of a 45k-line TypeScript game": volume shows activity more than engineering ability; the game can't be inspected, its tooling is nearly half its source (`NUMBERS.md:103`) and a phase exit missed its main target (`DECISIONS.md` row 13) | Declined for this release. The README claims the process and its measurements, not the game's quality, and says the game is private. How the work is presented is the owner's (package E); it goes to the owner's `meta/` review and the case study's rewrite. Known: H1 item 6 raised it for the case study | none; the owner, 2026-11-11: it waits for the `meta/` review |
| 2 | OVERCLAIM | "the active brief, the last handoff. A test can hold that read to a token budget" (`README.md:11`) | Confirmed. `tests/docs.test.ts:12`: "An implementation brief comes on top and is not budgeted here"; tokens are characters ÷ 2.2. New for the README (H1 item 1 found it in the case study) | "A test can hold that read, except an implementation brief, to an estimated token budget" |
| 3 | UNSUPPORTED | "half the trials said no" (`examples/05-worked-examples.md:48`) | Confirmed. The example names two failed trials; `NUMBERS.md:42` counts 8 model-routing trials without verdicts. New | A correction beside the sentence, not over it |
| 4 | OVERCLAIM | "briefs a fresh session can build without judgment calls" (`README.md`, "What you get") | Confirmed. `examples/README.md:8` shows 13 judgment calls in an accepted handoff. New | "briefs that leave a fresh session no design decisions, only smaller calls it lists for review" |
| 5 | OVERCLAIM | "its price check fails when a model's two figures drift apart" (`examples/README.md:14`) | Confirmed. `priceCheck` prints "Price check FAILED" (`tools/sessions.ts:400`), and `main` still returns 0 (`:559`); rows more than 5% off are counted, not failed on. New | A correction beside the sentence |
| 6 | OBJECTION | "all 8 were confirmed or accepted": accepted framing objections count as precision (`OUTSIDE_REVIEW.md`, H1) | Accepted. H1's triage column tells the two apart, and its precision line didn't. New | A note beside `examples/05-worked-examples.md`'s line, and the paragraph above H2 in this file |
| 7 | OBJECTION | "$14.82 to $6.17": a per-session metric doesn't show the kit earns its overhead, since splitting work into sessions lowers it by itself | Declined. The README says so twice: "per session, not per unit of work" in Why, and Limits' second and third bullets. Measuring the cost of a unit of work is the audit's finding 2, which waits for package D. Known | none |

Precision: 4 of 7 confirmed, 1 objection accepted, 2 declined.
