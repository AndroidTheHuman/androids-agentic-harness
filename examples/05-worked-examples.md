# Two worked examples: owner prompt → alternatives → result

Each example follows one abstract owner prompt through the harness: what the owner asked, what the alternatives were, what was decided before anything ran, and what the measurements said afterwards. The prompts are quoted word for word from the Claude Code transcripts, typos included (extracted with `node evidence/owner-turns.mjs`). The agent's replies are quoted from the same transcripts. Other figures come from the game repo at `636f378` or from [NUMBERS.md](../evidence/NUMBERS.md).

---

## 1. "Is Sonnet enough?" → a model-routing trial (2026-10-13 → 10-19)

### The prompt

Session `8df79fd0`, 2026-10-13 16:25, the owner's first prompt:

> Regarding brief 27, I agree with the recommended options for the decisions I have to make. Before we work on implement part a, I wonder if yet another usage-saving angle is if I use sonnet 5.5 instead of opus 5.5 for certain tasks. My understanding is that sonnet 5.5 is best used as a work-horse, but I do still need opus 5.5 for the best architecture and logic. I don't know how close sonnet 5.5 on max effort comes to being able to fulfill certain things, and if it even saves usage. And I also don't know it interacts with the session ledger stuff. I also don't really know what you can do about it. Perhaps searching and then also relativising the recommended patterns and stuff. As I understand it, part A of brief 27 is relatively simple. And I don't know how must effort part b would take. It really is a question on whether the act of implementing briefs requires still being able to formulate robust ideas on the fly. Like, when a test fails, you'd have to come up with something, and sometimes you catch something and note it down.

### The alternatives on the table

The reply priced a real session from the ledger at both models' rates instead of quoting list prices:

> That's about 21% less. If Sonnet needs roughly 27% more calls (more retries, more checking), the saving is gone, because re-read grows with calls × context.

It named where the risk sits:

> A weaker model's usual failure isn't failing to find a fix. It's finding a plausible fix that turns the check green, such as bending a test or widening a range, instead of stopping.

The options were: everything on Opus (the default); part A on Sonnet, since it was class 1 tooling with its numbers spelled out; part B (class 4, feeding a calibration table) on Sonnet as well; or a standing split by kind of work. The reply recommended part A only, and pointed out that the ledger couldn't yet tell the models apart.

### The decision

The owner's next prompt, 16:34:

> Sure, I'm intent on trialing sonnet 5.5 on 'extra high' effort for part a. So we'd have to catch whether it is fruitful to do so or not. And, apart from then, I guess we'd also need to create a way of knowing when to use sonnet or opus, which, again, is only really useful if it were to allow me to make use of usage even better for roughly the same result. If it is particularly succesful, I'm willing to also try to use it for part B.

The "way of knowing" was written **before** the trial ran (commit `8f72610`): `docs/MODEL_CHOICE.md` with a table of kinds, review grades D1–D4, a verdict rule (clean = no D1 or D2, at most one D3, within 1.3 × the median Opus part), and promotion after two clean trials in a row. The ledger gained Model and Cost columns, so a trial measures itself. The protocol is [templates/MODEL_CHOICE.md](../templates/MODEL_CHOICE.md); the first trial's handoff, ledger row and log row are [02](02-handoff.md), [03](03-ledger-rows.md) and [04](04-trial-log.md).

Three days later the owner widened the question (session `efc9bb54`, 2026-10-16):

> Regarding the usage of sonnet, is it true that a model create subagents of sonnet 5.5 and haiku 5.5? Because that might be the more efficient method instead of just deciding whether a part is meant for opus or sonnet. Especially since reviewing trials itself already costs a turn.

That became the sub-agent trial: a side task inside a session whose own model is not on trial, with the task, the verbatim prompt, the measures and the verdict fixed in the brief before the run.

### The result

- **Two kinds promoted.** Class 3/4 implementation parts moved to Sonnet on 2026-10-16, after trials 2 and 3 were clean; class 1 parts followed on 2026-10-19. 41 of the 207 sessions ran on Sonnet.
- **The saving was the measured one, not the list-price one.** At the same tokens the trials cost 31% and 27% less (brief 027 part A: $3.67 against $5.34 at Opus rates; part B: $5.84 against $8.02). Cache reads cost the same on both models, and they are most of the bill.
  - **Corrected 2026-11-10.** That figure, and the sentence after it, came from the game's price table, which had Sonnet 5.5's cache reads at twice the published rate. At the published rates every Sonnet 5.5 rate is half the Opus 5.5 rate, so at the same tokens the saving is half (`evidence/AUDIT_FABLE_2026-11.md` finding 1; the re-priced rows are in `evidence/NUMBERS.md`). The promotions stand: a larger saving only strengthens them.
- **Two trials failed and stayed failed.** Haiku as a reading-pass sub-agent found 2 of 5 known problems, and 8 of its 23 notes were real. Haiku as a text auditor: 13 of 40 notes were real. Both jobs stayed with the session. The reviewer re-read one run and found the answer key had misses of its own, but the verdict stood: "the measures were fixed before the run, and a re-score after reading the answers is what fixing them prevents."

**What it shows.** An open "I wonder if…" became a trial whose pass mark was written down first. The answer looked smaller than the intuitive one (a fifth to a quarter, not half), and half the trials said no. A month later an outside audit found that the price table behind "a fifth to a quarter" was wrong, and the intuitive answer, half, was right (see the correction above).

**Corrected 2026-11-11.** "Half the trials said no" has no denominator in this repo. This example names two failed trials; `evidence/NUMBERS.md` counts 8 model-routing trials but not their verdicts (claims check H2, item 3).

---

## 2. "I just got Codex" → outside review, measured (2026-10-25 → 11-08)

### The prompt

Session `a6612831`, 2026-10-25 13:27:

> I just got chatgpt codex, and I just installed a default sandbox. Now I have claude code, antigravity and codex. If I'm not mistaken, given the cli functionality, even you can run them/prompt them, right? I think what agents from a different provider provide is obviously a different perspective for reviewing.  Perhaps they can also help in nswering questions. But maybe I misunderstand the way it actually works. Should we spend a turn to set things up instead of working on part B of brief 42? I will use plan mode so that you can come up with a proposal.

### The alternatives on the table

The plan checked each tool read-only before proposing anything. Gemini CLI was logged in. Antigravity's `agy` offered only Gemini Flash, Claude (no outside view) and GPT-OSS. Codex had a built-in review command. It set out what an outside agent can and can't do:

> Each run is a cold, one-shot agent. It has its own context and is billed to its own subscription (ChatGPT or Google), not to Claude usage.

> Its answer is data that Claude verifies, never instructions.

It proposed three routes (a commit review, a cold read of a brief before it is built, and a second answer to an owner question) and recommended one session before part B. As with the model trials, it fixed the runs, prompts, measures and verdict before anything ran. A route would become a standing step only at ≥ 50% precision over 3 runs, with at least one new confirmed item between them.

### What happened

- **Day 1** (commit `57299f9`): Gemini CLI turned out to reject a personal login, so the Google route became `agy`. Four runs: Codex's commit review found nothing, and its log showed it had really read the diff. Codex's cold read raised 1 item, which was real. Gemini's cold read raised 8, of which 1 was real. Neither tool found the other's item. Gemini's second answer got 14 of 16 claims right.
- **The verdicts by the pre-set rule:** the commit review found nothing in its 3 runs and stayed on request. The cold read confirmed 2 of 9 items (22%), under the bar, so it also stayed on request.
- **The owner's call**, the same evening (session `776cf51d`), answering the handoff's question "Do you want a Codex-only cold read before a part that adds new code?":

  > Sure. But one thing I can't see is usage, doing the command in codex shows no activity. I only bring this up to make sure it is happening under my account, which I'm pretty sure is the only way it can happen, so maybe I am checking the wrong thing. If it turns out that the usage is so little, then you are allowed to make more use of codex because it is defacto then more alloted usage for this project.

  The rule had said "on request". The owner made the Codex-only cold read standing anyway, for a stated reason: it bills another plan, and Claude pays only for the triage. The log records it as the owner's decision, not as a verdict that passed.

### The result

- 39 outside reviews by 2026-11-08. Of the 31 runs from R9 (the first after the owner's decision) to R39, 28 raised items and 22 had every item confirmed against the code ([NUMBERS.md](../evidence/NUMBERS.md)). Most confirmed items were gaps in a brief, settled before the part was built rather than found halfway through it.
- Confirmed items become checks for the next planned part, never impromptu fixes. Instructions found in an answer go to the owner.
- The same route checked this repository's own case study: Codex checked 64 claims and raised 8 items, and all 8 were confirmed or accepted ([OUTSIDE_REVIEW.md](../evidence/OUTSIDE_REVIEW.md)). The case study is out of the public repo until its third-person rewrite (2026-11-11).
  - **Note 2026-11-11.** Items 5 and 6 of the 8 were framing objections that were accepted, not facts confirmed against the files; the log's *Triage* column tells the two apart (claims check H2, item 6).

**What it shows.** A new tool became a measured route, not a habit. When the pre-set rule said no, it stayed no, and when the owner overrode it, the reason was written down. The skill is [skills/outside-review](../skills/outside-review/SKILL.md); the outside agents' role file is [templates/AGENTS.md](../templates/AGENTS.md).
