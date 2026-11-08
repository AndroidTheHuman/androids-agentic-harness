# Resume and portfolio lines

> **Stub.** Claude drafted this from the evidence, aimed at a recruiter. The real wording, voice and format are decided with the owner in package E (presentation).

Every figure is from [evidence/NUMBERS.md](evidence/NUMBERS.md). Percentages: average session token cost $14.83 → $6.26 is −58%; average peak context 451k → 268k is −41%. Say "AI coding agents" plainly: hiding it is worse than stating it.

## Projects-section entry (pick one)

**General software engineering**

> **Infinity Autobattler: agentic engineering harness** · TypeScript, Claude Code, Codex
> - Designed and ran the process by which AI coding agents built a 45k-line TypeScript procedural game (22.5k lines of tests, 1,687 passing) in 44 days across 207 sessions.
> - Every session starts from a token-budgeted read and ends at a green gate. Its handoff separates verified results from claims, and the next session re-checks them before they enter shared project state.
> - Built a session cost ledger from the agents' transcripts. Its data drove a one-package-per-session rule that cut average peak context 41% and average per-session token cost 58%.

**AI / developer tools**

> **Agentic coding harness** · Claude Code, Codex, Gemini, TypeScript
> - Built tooling that measures coding agents: a ledger that parses transcripts into per-session calls, context, cost and rule-breaking flags, and a prompt hook that blocks costly idle re-caches. Cut average peak context 41% and per-session cost 58%.
> - Ran graded model-routing trials with pass criteria fixed before each run. Moved two kinds of implementation work to a cheaper model (27–31% lower cost per part) and rejected two sub-agent roles that failed on precision (35%, 33%).
> - Added cross-provider review (39 read-only Codex/Gemini runs, every item triaged) and blind persona sub-agent playtests (machine-checked logs, 116 findings over 4 runs).

**One line, when space is tight**

> Orchestrated AI coding agents through a harness I designed (briefs, verified handoffs, risk-scaled gates, a cost ledger) to build a 45k-line TypeScript game with 1,687 tests in 44 days.

## Portfolio blurb (3 sentences)

> I directed AI coding agents through 207 sessions to build a procedural card game in TypeScript: 45k lines and 1,687 tests in 44 days, almost none of it typed by me. My work was the harness: briefs that leave agents few judgment calls, handoffs where claims are re-checked before they count, gates that grow with the risk of a change, and a ledger that measures every session. When the measurements said a rule wasn't working, I changed it, and the case study shows both the wins and the misses.

## Questions to expect, and where the answer is

| Question | Short answer | Detail |
|---|---|---|
| Did you write the code? | No, almost none. I designed the process, made the design decisions, approved every plan, and changed the rules from measurements. | DECISIONS.md |
| How do you know the agents' code is right? | A full-suite gate on every change, determinism lint, snapshot and golden files that fail until a change is explained, handoffs re-verified by the next session, and outside review by another provider. It isn't proof: outside audits still found gaps, and those became checks for the next package. | CASE_STUDY → "What carries over" |
| What did it cost? | About $1,433 at list price over 207 sessions (subscription in practice). A median implementation brief: 3.5 sessions, $23. | NUMBERS.md |
| What went wrong? | 58% of sessions still exceed the context target; ceremony overhead ("procedural saturation"); the gates proved correctness but not fun. | CASE_STUDY → "What didn't work" |
| Would you use this at work? | The lite tier, yes: read order, briefs with checkpoints, verified handoffs, the gate, and a cost ledger. The full tier only for long-running, high-stakes work. | CASE_STUDY → last section |
| Pick one component and walk me through it. | Prepare two: the verified-vs-claimed handoff (why: a failure in an earlier project) and the cost ledger (what it measures, which rule it produced). | DECISIONS.md rows 1, 5 |
