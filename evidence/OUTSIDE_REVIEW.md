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

Item 1 was settled after the owner's `meta/` review, below: the game's figures moved from the README's first sentence to its second paragraph.

## The owner's stranger read of the README, 2026-11-11

After the push, the owner commissioned a review of `README.md` from an agent with no context. Its text is `meta/readme-review.md`, the owner's and git-ignored, so it stays out of the repo (`docs/PLAN.md` → "Revision 2026-11-11"). Its verdict: the README asks readers "to evaluate the evidence before they fully understand the thing being evaluated". Its biggest question: what happens differently "when I use this harness instead of simply giving Claude Code a well-written `CLAUDE.md` and asking it to maintain a progress file?"

The owner decided on 2026-11-11:
- The README leads with the kit, then where it came from. This also settles H2 item 1.
- The new material goes on the README, about 1,100 words above the setup sections.
- The lite tier is clarified in text; an installer stays parked (`docs/IDEAS.md`, 2026-11-10, the plugin line).
- The README is drafted in that session, without a brief, and checked by a stranger read and a Codex claims check before the owner approves it.

| Review | Point | Answered in |
|---|---|---|
| §1 | What the product is; what installing it does; manual or automated; is the ledger central | The opening paragraph; "What enforces each rule" |
| §2 | How a handoff moves between sessions; who accepts proposed lines; what is enforced | "A session, start to end", steps 2 and 4, and the trimmed handoff; "What enforces each rule" |
| §3 | What a session and a package are | "How it works", first paragraph |
| §4 | Which document holds what; whether `HANDOFF.md` is overwritten | "How it works", the documents table |
| §5 | Which rules a test, the ledger, an instruction or the owner enforces | "What enforces each rule" |
| §6 | What each figure establishes: group sizes, reproduction against accuracy, what adoption means | "What the evidence shows", as three kinds of claim |
| §7 | An installer; an existing repo; other languages; the ledger alone | "Lite tier": the paragraph before step 0, and step 0; "On a clone". The installer: parked |
| §8 | Terms | The gate (step 3); the start-read budget (the enforcement table); cold re-cache ("The session ledger"); change classes, bootstrapping by reference, typed-playtest, procedural saturation ("Full tier") |
| §9 | What using it is like | "A session, start to end", the login example |
| §10 | Who it is for; when the overhead pays | "What it adds…", last paragraph; "Limits" |
| Last question | Against a `CLAUDE.md` and a progress file | "What it adds to a CLAUDE.md and a progress file" |
| "One thing I would not change" | Keep the negative results | Kept: the 58%, the price error, the overhead figures |

## Stranger read of the new README, 2026-11-11

A fresh sub-agent (`general-purpose`, Sonnet) read only `README.md`, with one Read and no other tool. It answered ten questions drawn from the review's sections, then listed what was still unclear. Each answer was scored right, partly or wrong against the files behind it. The bar was 10 of 10, with one repeat allowed.

| Run | Right | Partly | Wrong | The miss |
|---|---|---|---|---|
| 1 | 9 | 1 | 0 | Q3: who accepts a handoff's proposed lines. The README described the next session's checks and merge, but not who accepts the lines or what a failed check does |
| 2 | 10 | 0 | 0 | none |

Between the runs:
- Step 2 gained "corrects any proposed line a check disproves" and "The session accepts the lines, not you; a conflict the documents can't settle goes to you" (`skills/session-handoff/SKILL.md:58`; `templates/CLAUDE.lite.md` → Precedence).
- Step 4 names the `session-handoff` skill.
- The documents table says handoffs come "one at a time" (`SKILL.md:62`).

Still unclear, and what was done:

| Run | Item | Action |
|---|---|---|
| 1 | Who accepts proposed lines | Fixed (above) |
| 1 | Whether `HANDOFF.md` is overwritten | Fixed: "one at a time" |
| 1 | The handoff's format is shown only in an excerpt | Fixed: step 4 names the skill |
| 1 | What a failed check-first item does | Fixed (above) |
| 1 | Cost off a subscription; what peak context is acceptable | Declined. "List price" names the cost, and the ledger's Limits say what it means on a subscription; the 250k limit is the rule |
| 2 | How large a package may be | Declined. `brief-spec` step 6 sizes parts; the README keeps "sized to end within a session in one commit" |
| 2 | What counts as a conflict the documents can't settle | Declined. The template's precedence order defines it |
| 2 | "11" in one section, "10 … and the newest row" in another | Confirmed; it predates this session. The ledger section now says "147 as they are and 11 once …" and splits the 11 as 10 + 1, from the port check run on 2026-11-11 (10 rows "without the cost-state record", 1 "by the cut at its --current run") |
| 2 | Non-TypeScript projects and other platforms are untested | Declined. The README says both projects were TypeScript |
| 2 | How much of 451k → 268k the rules caused | Declined. The README says observed, not caused, and why |

## Run H3, 2026-11-11: the README's new text

Codex CLI 0.167.0 (default model), `codex exec -s read-only --json`, run from this repo's root after the stranger reads, with the new README uncommitted (`outside-review` template D). The prompt told it to read `AGENTS.md` first, to check every factual claim in `README.md` (the text new since `0c0c9d7` first, the enforcement table against the files it names), and to say what a skeptical engineer who uses coding agents, opening the repo cold, would object to. It was capped at 8 items and returned 8. It ran 44 read commands and said the headline game figures agree with the evidence. Afterwards, `git status --short` differed only by this file, edited by Claude during the run.

| # | Codex verdict | Item | Triage | Change made |
|---|---|---|---|---|
| 1 | OVERCLAIM | "A wrong claim is caught here" (step 2): check-first items cover CLAIMED and KNOWN INCOMPLETE changes, and VERIFIED can rest on a code read (`skills/session-handoff/SKILL.md:29–42`) | Confirmed. New | "A claim the last session didn't verify is checked here" |
| 2 | WRONG | Lite step 1: the kit's `tsconfig.json` as a new project's gate. Its `include` is `tests` and `tools` only (`tsconfig.json:20`), and the step never names the `check` scripts (`package.json:12–14`) | Confirmed. The text predates this session; new to the checks | Step 1 names the `include` to extend and the three scripts |
| 3 | OVERCLAIM | "The prompt hook tells the model at each limit": it runs on `UserPromptSubmit` only (`tools/hook.settings.json:3`), so a single turn can cross both limits unwarned | Confirmed. New | "warns the model at your next prompt past each limit, not mid-turn" |
| 4 | OVERCLAIM | "fails the gate past 20k estimated tokens": implementation briefs are left out (`tests/docs.test.ts:12`) | Confirmed. Known: H2 item 2, and the rewrite had dropped its qualifier | The opening says "the standing documents"; the table row "the brief aside"; "What it adds" item 3 "the brief comes on top" |
| 5 | WRONG | A non-Node project "can skip [step 4] and run the ledger from a clone": the copied template and the handoff skill still run `npm run sessions -- --current` and name the hook (`templates/CLAUDE.lite.md:38,41`; `SKILL.md:51`) | Confirmed. New | Those lines need the clone's command or come out, and the README says so |
| 6 | OVERCLAIM | "the ledger shows how often it did": it doesn't see skipped approvals, direct edits, unchecked merges or a claim before a gate; it counts gate runs, not their order or result | Confirmed. New | "The ledger catches some breaks (context, commits), not all" |
| 7 | OVERCLAIM | "sub-agents included" in the ledger section: sub-agents add cost, re-read, a count and a peak (`tools/sessions.ts:161–175`); calls, final context, output and thinking are the main conversation's (`:283–293`) | Confirmed. The text predates this session; new to the checks | The sentence says which measures include sub-agents |
| 8 | OBJECTION | "where a wrong fact carried forward costs more than the paperwork": nothing shows the trade pays | Accepted in part. The sentence says when to consider the kit, but a reader can take it as a claim that it pays. Known: H2 item 7 and the audit's finding 2 | A sentence after it: whether it pays is unmeasured, and why |

Precision: 7 of 8 confirmed, 1 objection accepted in part.

## The owner's second stranger read, 2026-11-11

The same reviewer read the revised README (uncommitted, after run H3). Its text is `meta/readme-review2`, git-ignored like the first. Its verdict: "a coherent, credible proposition", with no further rewrite advised. It asked for three targeted changes (a failure path, the verification guarantee stated precisely, a visibly modular lite tier) and five smaller ones.

The owner decided on 2026-11-11:
- The README's job is to show how the owner works with coding agents and harnesses; it doesn't have to satisfy every point, and the kit can improve.
- On simpler alternatives: the README doesn't claim this kit beats them. It is one that improved over months of use, and its chief convenience is directing at the level of packages ("let's work on package A"), with ideas parked in `docs/IDEAS.md` and sequenced into a later package.
- The kit needn't carry every part of the game's workflow, and the README can say so.
- Implement the review's suggestions, then commit.

| Review | Point | Triage | Change made |
|---|---|---|---|
| §1 | Re-running a handoff's checks verifies the evidence, not the claim; what of claims with no command, or a weak test | Confirmed. `session-handoff` step 3 gives every CLAIMED or KNOWN INCOMPLETE item a check, and VERIFIED rests on named evidence (step 2), so the README's guarantee was wider than the skill's | New section "What the check proves, and when a session fails", first paragraph: evidence, not truth; the brief's tests stand against a weak test. "What it adds" item 1 points to it |
| §2 | One package per session isn't one commit | Confirmed | The enforcement row: the ledger flags more than one commit as a possible break and can't count packages |
| §3 | "No direct edits to `PROJECT_CONTEXT.md`" reads as absolute, yet the next session edits it | Confirmed | The row reads "The shared state changes only through a checked handoff merge"; the documents table says who merges: "the next session … never the session that did the work" |
| §4 | What happens when a session fails | Confirmed | Same section, second paragraph: a red gate or a context limit hands off KNOWN INCOMPLETE and the next session continues; an oversized package ends the same way, a large brief is split into parts (`brief-spec` step 6); unsettled decisions go in the handoff's judgment calls |
| §5 | The session's authority: what it corrects alone, what needs the owner | Confirmed | Same section, third paragraph: it may correct a proposed line to what its check shows; an approved brief, the next brief and a conflict the precedence order (`templates/CLAUDE.lite.md` → Precedence) leaves open stop for the owner |
| §6 | The 1.4-minute adoption reads as a setup-time estimate | Confirmed | Evidence bullet "An agent can set it up": a prepared kickoff, an agent, not a person's first read. The lite tier drops "Target: about 15 minutes" for the bar fixed before the run, and says the trial says nothing of a person new to the kit |
| §7 | The lite tier asks too many decisions; can the workflow be adopted without the ledger | Confirmed: it can | The lite tier names the workflow alone (steps 0–3 and 5) as the smallest useful setup, says what to delete without step 4, and marks step 4 "Optional: the measurement". The numbers stay, so `docs/C_KICKOFF.md` and `PROJECT_CONTEXT.md`'s "README lite step 3" still point right |
| §8 | The opening says the next session re-runs the checks, as if guaranteed | Confirmed | "the kit instructs the next session to re-run those checks before it accepts the changes the handoff proposes" |
| Owner | Purpose; simpler alternatives; package-level direction; the kit is not all of the game's workflow | The owner's decisions above | The second paragraph says why it's published; "What it adds" gains item 4 (183 parked ideas, `evidence/NUMBERS.md`) and a closing sentence on simpler setups; Limits gains a bullet |

No outside check ran on these changes: they are scoped to the review's points, and each new statement about the kit was checked against the file it describes.
