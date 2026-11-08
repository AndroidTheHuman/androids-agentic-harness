<!-- Verbatim from Infinity Autobattler `docs/briefs/054_SYNERGY_PASS.md` @ 636f378: lines 1–25 (the header) and 321–342 (§7, part A). The other sections are left out. Not edited; it refers to files and briefs of that repo, which is private. -->

# Brief 054 — The synergy research pass (plan 053 WP2)

**Status:** approved (2026-11-08) by the owner, with D10's ranking and overflow rules added at their question.
**Kind:** research brief, in three parts. Nothing in the game changes.
- Part A builds the synergy reader and its report, the TFT trait side set and the codes checker in the research tool, and copies this brief's register and taxonomy into the findings document.
- Part B codes the hand reads blind and tallies them against the reader.
- Part C runs the report, reads the outside sources and writes the findings, ending in at most six mechanics, one line each, for WP4's fixed list.

**Size:** M, in three parts (§7).
**Model:** A on Sonnet 5.5 xhigh: a class 1 tool part whose brief gives its expected numbers, a kind `docs/MODEL_CHOICE.md` has promoted. B and C on Opus 5.5 xhigh: the coding and the findings are judgment.
**Cost estimate:**
- A: a part cold read (Codex), one gate, a rebuild of one source from files on disk (no network), a metrics run at n 2,000 before and after, one synergy run, three smoke samples and a probe of six web topics.
- B: 12 sample calls (more where a sample is split) and the tally.
- C: one synergy run at n 10,000, the final tally, at most six web reads plus any Gemini answers the owner saved, and the findings.

**Depends on:** plan 053 (approved 2026-11-08), its WP2 row; WP1 (done, `e0b84b6`); briefs 034, 036 and 046, which built the corpus and the tool (archived in `docs/archive/2026-10/`).
**Evidence:**
- `docs/window/DIARY.md` day 1 (2026-11-02), the owner's question; `docs/battle/MECHANIC_LIST.md` line 5;
- plan 053 §2.3, §5.1, D3, §6 rules 2 and 5, §11;
- `docs/research/TOPCARDS.md` TF4, TF9, TF12; `docs/research/FORMAT.md` FF11;
- `docs/research/METHOD.md` §1–§4, §8–§12; `docs/meaning/EFFECT_IR.md` §1 rule 4, §2, §4, §7.

**Reading rule:** every part reads §1, §2, §3, §7's head and its own block in §7, §8, §9 and §11's head. Part A also reads §4, §5, §6, §10, §11 A and §12, plus `docs/research/METHOD.md` §2, §4, §11 and §12. Part B also reads §5.3, §5.4, §5.7, §6.1–§6.3 and §11 B, plus `docs/meaning/EFFECT_IR.md` §1 rule 4, §2, §4 and §7. Part C also reads §4, §5.5, §6.3, §6.4 and §11 C, plus METHOD §2, §8 and §9. A part learns what an earlier part built or coded from that part's handoff.
**How it got to draft:** written with `content-spec` in the session that merged handoff 2026-11-08-2. The question register (§4), the reader's rules (§5) and the taxonomy (§6.1) are part of this brief, so they are committed before any card is read (053 §6 rule 2). Before writing it, the session ran three counting scripts that printed counts only, no card text (§2.5).

[…]

## 7. Parts

[…]

### Part A — the tool and the register (Sonnet 5.5 xhigh)

- **Working set, about 104k tokens** (characters ÷ 2.2, measured 2026-11-08):
  - code: `src/cli/research.ts` (25,541 characters), `src/research/sample.ts` (6,728), `sources.ts` (8,263), `store.ts` (7,326), `build.ts` (4,104), `record.ts` (2,360), `signature.ts` (2,804), `ours.ts` (3,617), `normalise/tft.ts` (about 3,000), `src/effects/ir.ts` (about 15,600; the node types), `topcards.ts` lines 55–235 (about 9,000), `parts.ts` lines 165–190 and 530–570 (about 4,000), `metrics.ts` lines 588–625 (about 3,000), and the slices of `src/gen/boons.ts`, `src/describe/facts.ts` and `src/gen/types.ts` that §2.4 names (about 2,000);
  - tests: `tests/research.test.ts` lines 1–80 (its helpers, about 6,000);
  - docs: METHOD §2, §4, §11 and §12 (about 20,000); this brief's sections (about 55,000);
  - new code and tests written (about 50,000).
- **Order:**
  1. Merge this session's handoff and run its check-first items.
  2. **A part cold read** (`outside-review`, Codex, use B′) of this block, §5, §6.3, §8, §10 and §11 A; triage each item.
  3. **The before state.** `npm run research -- --metrics=all --game=all --n=2000` at a fresh seed; save the report to the scratchpad. Record the sha256 of `corpus/records/tft.jsonl`.
  4. **Write `docs/research/SYNERGY.md`** §1 (this brief's §4, then §2.5 as "Seen before this register") and §2 (§6.1, with its table as it stands), word for word, under a header that names this brief.
  5. **Build** §8's code and §10's tests, then METHOD.md, `docs/TOOLS.md` and `CLAUDE.md` (§12).
  6. `npm run research -- --rebuild=cdragon-tft`, then `--status`; check the hash and the side set (§11 A).
  7. **The after state.** The same metrics command at the same seed and n; the two reports must be identical but for their timestamp line.
  8. `npm run research -- --synergy=all --n=2000` at a fresh seed: every section prints for every game. Its numbers go into the handoff as found; part A sets no expectation on them and draws no conclusion.
  9. **Smoke runs**, the only cards part A reads: `--sample=mtg --where=payoff=yes --n=2`; `--sample=hearthstone-bg --where=reward=tribe --where=synergy=lord --n=2`; `--sample=tft-trait --where=rarity.rank=1 --n=2`.
  10. `--synergy-codes` on two crafted files in the scratchpad, never committed: one valid (exit 0, a tally), one with an error of each kind §6.3 lists (exit 2).
  11. **The probe** (§6.4): `SYNERGY.md` §3 gets each topic's URL and status. Write the Gemini prompts, if any.
  12. Run `npm run check` (`2>&1 | tail -15`), commit, and write the handoff. If prompts exist, its first line asks the owner to run them before part C, and says part C goes ahead without them if they aren't run.
- **Checkpoint:** §11 A.

[…]
