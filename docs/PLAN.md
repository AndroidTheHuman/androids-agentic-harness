<!-- Copied word for word from C:/Users/xande/.claude/plans/this-is-a-bit-dapper-volcano.md on 2026-11-08 (package B), so the plan lives in the repo it steers. The owner approved it in plan mode on 2026-11-08; "Revision after package A" is the owner feedback after package A. Edit only to record an owner decision. -->

# Meta brief: the agentic harness as a portfolio piece

Kind: meta (outside plan 053). Nothing in the game repo changes, so no game handoff is written (see A5).

## Context
Xander is heading into internship season and wants his agentic workflow on his portfolio and resume. He wrote almost none of the code: his role is orchestrator. So the piece to show is **the harness plus the decisions he made with it**, not the game.

Measured 2026-11-08 (to be re-derived by script in package A):
- **Repo:** 327 commits in 6 weeks (2026-09-26 → 11-08); src 45.0k lines in 236 files; tests 22.5k lines with 1,687 tests; Markdown 72.4k lines.
- **Process record:** 54 briefs; 163 archived handoffs; 39 outside reviews; 116 playtest findings over 4 runs.
- **Ledger:** 207 sessions, 15.2k calls, about $1,433 at list price (a relative measure; he is on a subscription).
- **Before and after the per-session rules:** per-session averages in September vs October were peak 451k → 269k, re-read 30.7M → 13.8M, $14.83 → $6.14. Brief 013's session (906k peak, 95M re-read, 6 commits) is what produced the "one package per session" rule.
- **Lineage:** this is the harness's second version. It began as Omni's steering docs; the measurement, model routing, outside review and persona playtests were added here. Verify the exact split in DESIGN_ARCHIVE → "Steering docs for agents".
- **Game state:** the phase-3 exit read missed PX1 ("the cards have nothing to do"). The process caught it; the product isn't the showcase.

## Answers to the owner's questions (the short form goes in chat too)
1. **Extract rather than show the game? Yes.** The headline is the harness plus the orchestrator role, and the game is the case-study testbed.
   - The game repo can stay private ("available on request"). Verbatim excerpts in the public kit carry the evidence: one real brief, one handoff, ledger rows and a trial-log row, each with its source commit hash.
   - Commit etiquette: the game's commits follow a documented convention (one commit per brief part, the brief id in the message, the snapshot reason included). That's defensible if anyone asks. The new repos use Conventional Commits from day one.
2. **Speed:** what the harness gives is *sustained throughput*, not a fast first app. A median implementation brief takes about 3.5 sessions and about $23, and per-session cost halved between September and October.
   - The overhead is real (docs ≈ code, about 1 doc line per src line), so the kit gets a **lite tier**.
   - The demo measures its own speed with its own ledger.
3. **Abstract prompting:** abstract prompting isn't the impressive part on its own. Two things are:
   - the pipeline that turns abstract intent into briefs that leave no judgment calls and into verified results (content-spec, plan briefs, owner questions with every symbol defined);
   - the record of where that pipeline failed and what you changed.
   - Frame it as delegation design: what a tech lead does.
   - Interviewers will probe whether you understand the system. The decision log (A2) doubles as interview prep.
4. **"Research is its own project": yes.** The brief kinds are *work types*, each with its own deliverable and acceptance rule:
   - research: a tool, a corpus, metrics, and hand codes with an agreement check;
   - playtest: a findings register;
   - plan: decisions plus WP rows.
   - This extends agentic work beyond code, and it's one of the most portable pieces.

## Package A — case study, decision log, resume lines (this session, after approval)
New sibling repo `C:\Users\xande\agentic-harness\` (working name; `git init`; never pushed without the owner's go-ahead).
1. `evidence/measure.mjs` plus `evidence/NUMBERS.md`.
   - A read-only script over the game repo: git log/rev-list, `docs/session-ledger.json`, the brief and handoff counts, line counts.
   - Every number in the case study is produced here, with the command next to it.
   - The September/October split comes from the ledger rows, with no hand arithmetic.
2. `evidence/DECISIONS.md`: 8–12 owner decisions, each with its date, its source (a memory file, STEP_BACK Q&A, a brief's Status line, the changelog) and the failure or evidence that prompted it. Examples:
   - brief 013 → one package per session;
   - Omni's unchecked claims → verified vs claimed;
   - Haiku trial at 40% recall → the kind stays on Opus;
   - cold-read precision of 22% → reviews stay on request;
   - the doc budget → docs move word for word and are never cut;
   - the PX1 miss → battles before the economy.
3. `CASE_STUDY.md` (portfolio page, about 1,200 words):
   - role;
   - the loop as a Mermaid diagram (idea → plan brief → brief/parts → session [read order → check-first → work → gate → handoff verified/claimed/PROPOSED] → next session verifies and merges; side loops: outside review, typed playtest, ledger → rules);
   - about 10 portable components, each with the failure it prevents;
   - measured results;
   - **what didn't work** (the Criticism section below, verbatim in spirit);
   - a link to the kit.
4. `RESUME.md`: 2–3 bullet variants (general SWE, AI/dev-tools) plus a 3-sentence portfolio blurb, every figure taken from NUMBERS.md.
5. **Outside read (Codex)**, following `.claude/skills/outside-review/SKILL.md`, use C plus a claims check:
   - `codex exec -s read-only` run from the game repo, with the prompt in the scratchpad;
   - the task: verify every number in the case study against the repo, flag overclaims, and say what a skeptical hiring engineer would object to (8 items max);
   - triage each item (confirmed / wrong / known) and record it in `evidence/OUTSIDE_REVIEW.md`, then run `git status` on the game repo to confirm Codex wrote nothing.
   - **Logging:** this session needs no game handoff, because the session ledger records it automatically. The kit repo keeps a `HANDOFF.md` from its first commit (dogfooding).
6. Commit in the kit repo with a `docs:` message. Offer once to publish the case study as a private claude.ai page for a rendered review.

## Revision after package A (owner feedback, 2026-11-08)
- Run from `C:\Users\xande\agentic-harness\` from package B on. Read the game repo by absolute path, read-only.
- The parts that came from Omni count as the owner's decisions. Bootstrapping by reference (frozen copies of another project, a port rule, a kickoff prompt) is a decision of its own: DECISIONS row 2.
- CASE_STUDY and RESUME are stubs. Presentation (audience, form, voice) is its own package, **E**, led by the owner.
- Original prompts: the owner doesn't dig for them.
  - Transcripts from 2026-10-10 onward survive (172 files), and package B extracts the owner's turns by script.
  - Text from before then is in the repo: `KICKOFF_PROMPT.md`, `STEP_BACK.md` answers, brief Status lines.
- New harness additions are welcome where they (a) close the self-improvement loop, or (b) let the kit build an impressive project live from scratch. They become packages C and D.
- New order: **B** kit → **C** live research project → **D** rule trials (loop closing) → **E** presentation.

## Package B — the kit (next session, Opus: judging what's portable is the product)
Also, from the revision:
- the kit's own `CLAUDE.md` (dogfooding: the kit runs on itself);
- the ledger takes the project slug as a parameter, so it measures the kit's own sessions;
- the bootstrap-by-reference technique as a component: `templates/KICKOFF_PROMPT.md` plus the `reference/` port rule;
- `examples/` drawn from extracted owner turns and repo-recorded owner text.
Adds to the kit repo:
- `README.md` (why, a **lite tier** that takes 15 minutes to adopt vs the full tier, setup);
- `templates/`: CLAUDE.md (read order, precedence, rule slots, session economy), PROJECT_CONTEXT.md, a brief per kind, IDEAS.md, MODEL_CHOICE.md with the trial protocol, AGENTS.md;
- `skills/`: generalized session-handoff, preflight-check, brief-spec (from content-spec), outside-review, design-critique (generic categories), typed-playtest (as a pattern);
- `tools/`: sessions.ts and sessionMeasures.ts plus the hook snippet, docMoves.ts, the docs-budget test template;
- `examples/`: the verbatim excerpts from A.

Gate: the kit's `npm test` passes (ported sessionMeasures and doc-moves tests, the budget test on the kit's own docs), and `sessions` run on the real transcripts reproduces the game ledger's latest row.

## Package C — live demo: a research project from scratch with the kit (brief on Opus; parts on Sonnet per MODEL_CHOICE)
- **Question:** "Where do my coding-agent sessions spend their tokens, and which harness rules change that?"
- **Inputs:**
  - the owner's abstract prompt, kept verbatim;
  - the game repo's `tools/sessions.ts`, pointed at by reference (the bootstrap technique, live).
- **Output, the research brief kind:**
  - a tool: a standalone ledger CLI plus a static dashboard with sample data;
  - a corpus: every surviving transcript across projects (the game from 2026-10-10, the Omni worktree, the kit's own sessions);
  - metrics, and a hand-coded check with an agreement score;
  - a findings register.
- The ledger measures the demo's own build: sessions, wall clock, cost, tests, outside findings.

## Package D — rule trials: closing the loop (Opus)
- Today the loop closes through the owner: a flag in the ledger → the owner notices → a new rule.
- D gives every process rule a metric and a target in a rules registry, for example "one package per session: peak context ≤ 250k".
- A `retro` command reads the ledger (from C) and the handoffs, then reports each rule as met, unmet or unmeasured. For an unmet rule it drafts a process brief: the change, the metric it should move, and a keep-or-revert test over the next N sessions.
- This is the MODEL_CHOICE trial protocol applied to rules. The owner approves; the harness proposes and measures.
- First target: the game's own rules. The 250k rule is unmet at 58% of sessions.

## Package E — presentation (owner-led, Opus)
- The owner decides audience, form (page, README, talk, recorded or live demo) and voice. Claude brings options and drafts only on the owner's direction.
- The stubs from A, plus the material from B to D, are the inputs.

## Criticism (goes into the case study; honest limits)
- n = 1: one person, one project, 6 weeks, no control group. Phrase results as observations. The best quasi-evidence is the September → October before/after.
- Overhead: Markdown at 72k lines vs src at 45k. Brief drafting is 19% of spend and merge-only sessions another 6%. Small changes "eat a day or two" (procedural saturation). Weekly commits fell from 77 to 12, partly because of the design step-back.
- 65% of sessions still peak above the 250k soft limit. The rule isn't met at the median.
- The harness guarantees correctness, not fun. PX1 missed, but the playtest machinery is what caught it.
- Much of the gating is domain-specific (calibration, census): portable as patterns, not as code. It's also tied to the Claude Code transcript format and hooks.
- Risk of being read as "the AI did it". Mitigations: the decision log, the "what I'd change" section, and being able to walk through the architecture in an interview.

## Verification
- A: every figure in CASE_STUDY/RESUME appears in NUMBERS.md with its command; `node evidence/measure.mjs` reruns cleanly; each Codex item is triaged; `git status` on the game repo is clean.
- B: kit `npm test` green; the ledger row matches.
- C: the demo's own ledger rows and handoffs exist; its dashboard opens with the sample data.
