# Ideas

Parked ideas, one line each, dated. Nothing here is built without the owner's go-ahead.

- 2026-11-08: Price Haiku 5.5 and Fable 5.1 in `tools/sessionMeasures.ts`'s PRICES from the published list, so sub-agent trials on Haiku stop showing as "unpriced". Left out of package B so the port reproduces the game's rows exactly.
- 2026-11-08: A `npm run kit:init -- <target repo> [--lite|--full]` that copies the chosen tier's files and the hook. Package C's timed adoption should show whether copying by hand is the slow step.
- 2026-11-08: Keep `.claude/skills/` and `skills/` in step automatically (a test that the installed copy matches the kit's), once the kit installs its own skills.
- 2026-11-09: Move `evidence/adoption-time.mjs` into `tools/` with a test, so any adopter can time their own setup against the lite tier's 15-minute target.
- 2026-11-10: Make token-ledger run on anyone's Claude Code transcripts: every folder under `~/.claude/projects` (or a flag) instead of the four hardcoded in `src/corpus.ts`, the rule timeline as an optional file instead of the game repo (`src/report.ts`), the gate as a flag, and dashboard panels that hide without data. The owner sees it as the stronger portfolio project; after the public release.
- 2026-11-10: Package the kit's skills and ledger hook as a Claude Code plugin, so adopting the lite tier is one install instead of copying files.
- 2026-11-10: The Fable audit's findings 3 (a claims check over reader-facing text after the last part that writes it), 4 (the context guard can't fire in a one-prompt session), 5 (a model trial costs about what it saves on a small project) and 7 (cap the lite handoff) are parked until after the public release (`evidence/AUDIT_FABLE_2026-11.md`).
