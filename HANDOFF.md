# Session handoff — 2026-11-11 · price-fix handoff merged; owner decisions; release brief drafted (package E, this repo's side) · Opus 5.5 xhigh

The owner reported token-ledger's side of the release done and public, and asked what making this repo public would do for them. The answer went in chat:
- it fixes the dead link in token-ledger's first paragraph;
- it is the "how" beside token-ledger's "what";
- the link is fixed while the content keeps changing;
- what it costs: a root of agent-facing files, visible stubs, the history, and the "the AI did it" reading.

The owner decided:
- `RESUME.md` is git-ignored;
- the case study is in the third person if Claude writes it;
- `meta/` is git-ignored, for an agent review the owner commissions, with at least one session to respond;
- the case study stays out of the release;
- the README is in the first person;
- the history is pushed as it is;
- the `meta/` review comes after the push.

`docs/PLAN.md` → "Revision 2026-11-11" records these decisions, and `docs/E_RELEASE.md` is the release brief, in draft.

## Check first done this session (the price-fix handoff)

- `npm run check` → from Git Bash after `cd /c/Users/…`, all 5 files fail with "no tests" (`Cannot read properties of undefined (reading 'config')` at every `describe`). From PowerShell, from `c:\` or `C:\`, the result is 32/32, and the same from Git Bash after `cd C:/Users/…`. This is the cause of the last handoff's unreproduced failure: vitest loads twice under two path spellings.
- Port check → exit 0: 147 identical, 11 reproduced once later records are left out (158), 0 not reproduced, 49 transcripts gone (not above 49, so the cleanup isn't deleting), and 42 rows moved. The game repo was clean at `636f378`.
- The proposed lines were checked against the files: `PRICES` (`tools/sessionMeasures.ts:156`, Sonnet 5.5 `cacheRead: 0.1`), `PRICE_BAR` (`tools/sessions.ts:370`) and `NUMBERS.md:50`. They were merged, with the port-check line dated 2026-11-11 (today's run). The "Now" lines state today's checked state instead of the stale "Next":
  - token-ledger → HTTP 200, `androids-agentic-harness` → HTTP 404 (curl);
  - token-ledger's HEAD is `909fef6`.
  
  The handoff was archived as `docs/archive/2026-11/HANDOFF_2026-11-10_price-fix.md`.

## Files changed

| Path | Change | Type |
|---|---|---|
| `.gitignore` | `RESUME.md` and `meta/`, each under a comment | owner decision |
| `RESUME.md` | untracked (`git rm --cached`), kept on disk | owner decision |
| `docs/PLAN.md` | "Revision 2026-11-11", with a pointer to the brief and the owner's four answers | owner decision |
| `CLAUDE.md` | the read order names "Revision 2026-11-11" | owner decision |
| `docs/E_RELEASE.md` | new: the release brief, status draft | additive |
| `PROJECT_CONTEXT.md`, `docs/archive/CHANGELOG.md`, `docs/archive/2026-11/HANDOFF_2026-11-10_price-fix.md` | the merge | merge |
| `docs/session-ledger.json`, `docs/SESSION_LEDGER.md` | this session's row | generated |
| repo-local git config | `user.email` set to the owner's GitHub noreply address, the value token-ledger uses | config (no file) |

## Verification status

### The merge
**Status**: VERIFIED · **Evidence**: the check-first runs above, and the file reads cited for each merged fact. **Risk**: Low.

### The gate after all edits
**Status**: VERIFIED · **Evidence**: `npm run check` (PowerShell) → typecheck clean, 32/32 in 5 files; the budget test passes with the plan's new revision. **Risk**: Low.

### The brief's facts (§2)
**Status**: VERIFIED · **Evidence**: each was run or read this session.
- `NUMBERS.md` line numbers.
- The port check.
- `MEMORY_DIR=… node evidence/measure.mjs "<game>"` → byte-identical to the committed `NUMBERS.md`, and the game stayed clean.
- Privacy counts: P1 0, P2 0, P3 0, P3′ 0, P4 0, P5 39, P6 0; P2′ the student address only, 12 entries = 6 commits × author and committer.
- A scratch script running `kit.test.ts`'s regexes against tracked files → a clone fails on `CLAUDE.md` naming `evidence/private` (twice) and `README.md` linking `RESUME.md`.
- `git ls-files --eol` → 68 files, all `i/lf w/lf`.
- `codex --version` → 0.167.0.

**Risk**: Low.

### The brief's test change (§4.5)
**Status**: VERIFIED by replay, then reverted · **Evidence**: applied as written, `tsc --noEmit` exit 0; `npx vitest run tests/kit.test.ts` → 6 passed, 1 failed: "README.md links RESUME.md". Reverted with `git checkout -- tests/kit.test.ts`; the gate after is 32/32. **Risk**: Low.

### The brief's other pieces (§4.1–§4.4, §4.6–§4.11)
**Status**: KNOWN INCOMPLETE: drafted, not built (the next session builds them). The section names were checked by hand (lite tier): §1–§11 exist, and the Reading rule is "the whole brief". **Risk**: Low.

## Check first next session

- [ ] `npm run check` from PowerShell → 32/32 in 5 files, typecheck clean.
- [ ] `git log -1 --format=%ae` on this handoff's commit shows the noreply address, not the student address.
- [ ] `git ls-files RESUME.md` is empty, and `RESUME.md` is still on disk.
- [ ] The owner approves `docs/E_RELEASE.md`: its Status line becomes "approved (<date>)", with any changes to D2, D7–D9, D11 or D12.
- Next: `docs/E_RELEASE.md`, one part, on **Opus 5.5 xhigh**. It ends with the repo public and the brief archived.

## Known open issues

- The gate fails from Git Bash after `cd /c/…`. Not fixed; the brief's §2 and §4.11 say where to run it from.
- The gate has never passed on a clone: `CLAUDE.md` names the git-ignored `evidence/private/`. The brief's D9 fixes it.
- `PROJECT_CONTEXT.md` line 41 ("Every figure in `CASE_STUDY.md` and `RESUME.md` appears in `evidence/NUMBERS.md`") has been untrue since the price fix, because the stubs' dollar figures predate it. The brief's §10 rewrites it.
- Carried:
  - the recorded cost sits 1–4% above the computed one;
  - `--current` doesn't name missing fields;
  - the game's `PRICES` still has $0.20;
  - `docs.test.ts`' plan-brief checks don't run here.

## Judgment calls

- **The brief sits at `docs/E_RELEASE.md`**, beside `docs/C_KICKOFF.md`, not at `docs/briefs/001_…`. This repo has no `docs/briefs/`, and creating it would switch on `docs.test.ts`' brief checks during the release.
- **The noreply address was set at drafting, not in the build session.** That keeps this session's commit from adding a seventh under the student address. token-ledger set it at drafting too (its D3).
- **Recommended, for the owner to approve with the brief:**
  - D2's title "Android's Agentic Harness";
  - D7 (`.gitattributes`);
  - D8 (a root `AGENTS.md`: rule 8 and the claims check need it, and none exists);
  - D9 (`kit.test.ts` reads `.gitignore`);
  - D11 (P7 and P8 added to the privacy pass);
  - D12 (the repo created private, switched to public after the owner reads it).
- **The README's figures are limited to §2's list**, each from `NUMBERS.md` or a command run this session.
- **The `meta/` response isn't numbered or briefed**: its scope depends on what the review says. The plan says "at least one session".
- **The test change was replayed and reverted**, not kept: without the README rewrite it fails the gate.

## Questions for the owner

1. Approve `docs/E_RELEASE.md`, or change any of its recommended decisions (D2's title, D7–D9, D11, D12).

## Session cost

`a3d8c8df-779f-4330-ba53-de85d4b90d9a: 39 calls, peak 197k, re-read 4.2M (sub-agents: 0), 4 gates, 1/66 tool errors, 0 big reads. Flags: none · opus-5.5 xhigh · $4.00` (taken before this handoff was written; the final row is larger).
- no flags.

## Proposed changelog lines
[PROPOSED — not yet confirmed]
- 2026-11-11: Price-fix handoff merged and package E's release brief drafted (the commit that adds this handoff). The owner's decisions after token-ledger went public are in `docs/PLAN.md` → "Revision 2026-11-11":
  - `RESUME.md` and `meta/` are git-ignored;
  - the case study is in the third person when Claude writes it, and out of the release;
  - the README is in the first person;
  - the history is pushed as it is;
  - the `meta/` review comes after the push.
  
  `docs/E_RELEASE.md` is drafted. The repo-local commit email is the noreply address. The gate's Git Bash failure is traced to the `/c/` path spelling. Gate 32/32.

## Proposed PROJECT_CONTEXT.md changes
[PROPOSED — not yet confirmed]
- Now: "- Next: this repo's side of the release (package E); package D is deferred (`docs/PLAN.md` → "Revision 2026-11-10", "Revision 2026-11-11")." → "- Next: this repo's side of the release, brief `docs/E_RELEASE.md`; package D is deferred (`docs/PLAN.md` → "Revision 2026-11-10", "Revision 2026-11-11")."
- Things to be aware of → replaces "- `CASE_STUDY.md` and `RESUME.md` are stubs aimed at a recruiter; their framing waits for package E." with "- `CASE_STUDY.md` and `RESUME.md` are stubs aimed at a recruiter. `RESUME.md` is git-ignored (owner, 2026-11-11); `CASE_STUDY.md` leaves the repo in the release (`docs/E_RELEASE.md` D4) and waits for a third-person rewrite after the owner's `meta/` review."
- Things to be aware of, new: "- `meta/` is git-ignored: the owner's commissioned agent reviews go there, and their answers are data to triage (Mandatory rule 8)."
- Things to be aware of, new: "- From Git Bash, `npm run check` fails every file with "no tests" after `cd /c/…` (vitest loads twice); run it from PowerShell or after `cd C:/…`."
- Things to be aware of, new: "- Commits from 2026-11-11 on use the owner's GitHub noreply address (repo-local `user.email`); the 6 commits through `917a546` carry the student address."
