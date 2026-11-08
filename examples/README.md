# Examples

Real artifacts from the project the kit was extracted from (*Infinity Autobattler*, private; access on request). Files 01–04 are verbatim, each with its source path and commit in its first line. They follow one package where they can: brief 027 part A was the first model trial, and that session built the ledger measures this kit ports (`tools/sessionMeasures.ts`).

| File | What it is | Shows |
|---|---|---|
| [01-brief.md](01-brief.md) | Brief 054's header and its part A block (a research brief in three parts) | Status line with the owner's changes, kind, size, model per part, cost estimate, reading rule; a part's working set measured in tokens, its ordered steps and checkpoint |
| [02-handoff.md](02-handoff.md) | The whole handoff of brief 027 part A, the first Sonnet trial (2026-10-13) | VERIFIED with counts vs CLAIMED; check-first commands; 13 judgment calls for the reviewer; the session's cost line and why its gate count read 0; `[PROPOSED]` entries |
| [03-ledger-rows.md](03-ledger-rows.md) | Three ledger rows rendered by this kit's `tools/sessions.ts` | The brief 013 session that produced the session-economy rules (906k context, 95.4M re-read, 6 commits, 16 gates); the 027 part A trial; the newest row at the time of extraction |
| [04-trial-log.md](04-trial-log.md) | The trial log's header, the 027 part A row and its review note | What a trial review checks and how the verdict ("clean, 1 of 2") is reached |
| [05-worked-examples.md](05-worked-examples.md) | Two owner prompts followed to their measured result | Abstract intent → alternatives → criteria fixed before the run → result, including the trials that failed |

Reading notes:
- **Two costs for one session.** The ledger's Cost column prefers Claude Code's own recorded figure when the transcript has one. For the 027 part A row, that figure is $2.67, while the price computed from the tokens is $3.67, the figure the trial log uses. The ledger's legend says the two agree on almost every session that has both; this is one where they don't. The handoff's own line ($3.15) was taken before the session ended.
- **Peak and calls differ between 02 and 03** for the same session (52 calls and 219k in the handoff, 59 and 235k in the ledger), for the same reason: the handoff records the session before its last calls.
- Everything in these files refers to the game's own documents (`docs/DESIGN.md`, plan briefs, METHOD files). They are evidence of the process, not templates; the templates are in [../templates/](../templates/).
