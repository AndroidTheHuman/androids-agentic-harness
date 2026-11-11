# Session handoff — 2026-11-11 · package E, this repo's side: public release (brief `E_RELEASE`, one part) · Opus 5.5 xhigh

The owner approved `docs/E_RELEASE.md` unchanged. This session merged the release-brief handoff, then built the brief in full. The release commit is `de4600b`. The repo is pushed to `github.com/AndroidTheHuman/androids-agentic-harness`, and the owner switched it to public. The owner approved the README's new top and the privacy lists in chat, and decided that the volume objection (H2 item 1) waits for their `meta/` review.

## Check first done this session (the release-brief handoff)

- `npm run check` (PowerShell) → 32/32 in 5 files, typecheck clean.
- `git log -1 --format=%ae` on `a391816` → the noreply address. `git log --format='%h %ae'`: the 6 commits through `917a546` carry the student address.
- `git ls-files RESUME.md` → empty; `RESUME.md` is on disk.
- From Git Bash after `cd /c/…`, `npm run check` → "5 failed, no tests" (reproduced). `npx vitest run` under the same path passed, so the failure is specific to `npm run check`.
- The owner approved the brief; its Status line says so.
- The proposed lines were merged: one changelog line with `a391816` in place of "the commit that adds this handoff", and five `PROJECT_CONTEXT.md` changes. The handoff is archived as `docs/archive/2026-11/HANDOFF_2026-11-11_release-brief.md`, byte-identical to the original (`cmp`).

## Files changed

| Path | Change | Type |
|---|---|---|
| `README.md` | new top: title, a first-person paragraph, links, What it showed, Limits, On a clone; H2 fixes in Why and "What you get"; an `AGENTS.md` sentence; License | behavioural (public text) |
| `LICENSE`, `.gitattributes`, `AGENTS.md`, `evidence/PRIVACY.md` | new | structural |
| `tests/kit.test.ts` | the reference checks read `.gitignore` (§4.5) | behavioural |
| `.gitignore`, `CASE_STUDY.md` | `CASE_STUDY.md` git-ignored and untracked, kept on disk | structural |
| `package.json` | `"license": "MIT"` | structural |
| `evidence/measure.mjs`, `evidence/NUMBERS.md` | the header comment and line 3; regenerated | behavioural (one line of output) |
| `CLAUDE.md` | the precedence wording and Key documents rows (§4.7); Owner rule 5 names the remote (close commit) | docs |
| `evidence/OUTSIDE_REVIEW.md` | the title, a note on the case study, H1's precision clarified, run H2 | docs |
| `examples/05-worked-examples.md`, `examples/README.md` | line 84's note; H2 corrections beside the old text | docs |
| `PROJECT_CONTEXT.md`, `docs/archive/CHANGELOG.md`, the archived handoff | the merge | merge |
| `docs/E_RELEASE.md` → `docs/archive/2026-11/E_RELEASE.md` | Status set to approved; archived at the close | docs |
| `docs/session-ledger.json`, `docs/SESSION_LEDGER.md` | this session's row | generated |
| git config | remote `origin`; `main` tracks `origin/main` | config (no file) |

## Verification status

### The gate
**Status**: VERIFIED · **Evidence**: `npm run check` (PowerShell) → typecheck clean, 32/32 in 5 files. It ran after every batch, the last time before the release commit. `tsc --noEmit` exit 0 after the `kit.test.ts` change. **Risk**: Low.

### The `.gitignore`-aware tests (§4.5, §6)
**Status**: VERIFIED · **Evidence**:
- With §4.5 in place and the old README, `npx vitest run tests/kit.test.ts` → 1 failed, "README.md links CASE_STUDY.md".
- With the `CASE_STUDY.md` link removed from line 5 in place, it failed on "README.md links RESUME.md".
- The README was restored from a scratch copy (`git diff --quiet`), then rewritten. The gate passed after.

**Risk**: Low.

### `NUMBERS.md` (§4.6)
**Status**: VERIFIED · **Evidence**: `MEMORY_DIR=… node evidence/measure.mjs "C:/Users/xande/infinity autobattler"` → exit 0. `git diff -U0` → one hunk, `@@ -3 +3 @@`. The game repo's `git status --short` was empty at `636f378`. **Risk**: Low.

### The README top (§4.8)
**Status**: VERIFIED · **Evidence**: `awk '/^## What.s in the kit/{exit} {print}' README.md | wc -w` → 598 (cap 600). Each figure and its source:
- 44 days: `NUMBERS.md:11`.
- 207 sessions: `NUMBERS.md:54`.
- 45k lines: `NUMBERS.md:12` (44,966).
- 451k → 268k, $14.82 → $6.17, 81% → 58%: `NUMBERS.md:77–78`.
- 158 rows, 11, 0, 49: the port check (`node --no-warnings evidence/ledger-port-check.mjs "<game repo>"`) as of 2026-11-11, quoted in the brief's §2 from the last session's run. Not re-run this session.
- 1.4 minutes, 12 calls: `node --no-warnings evidence/adoption-time.mjs "C:/Users/xande/token-ledger"`, as recorded in `PROJECT_CONTEXT.md`.
- 42 rows, $265.76 → $188.42: `NUMBERS.md:50`.
- 1.61: `NUMBERS.md:17`.
- 19%: `NUMBERS.md:95`.
- 32 tests: the gate.

**Risk**: Low.

### The privacy pass (§4.9)
**Status**: VERIFIED · **Evidence**: `evidence/PRIVACY.md` has 11 rows. P1, P3, P4 and P6 are 0. P2, P2′ and P3′ match the brief's Expected column. Each history check was also run on the staged release. The owner approved P4″, P7 and P8 in chat. **Risk**: Low.

### Claims check H2 (§4.10)
**Status**: VERIFIED · **Evidence**: Codex exit 0, 7 items. `git status --short` was identical before and after (diffed). The triage is in `evidence/OUTSIDE_REVIEW.md`:
- 4 confirmed and fixed;
- 1 objection accepted;
- 2 declined, one of them waiting for the `meta/` review (owner).

**Risk**: Low.

### Clean clone (§4.11 step 2)
**Status**: VERIFIED · **Evidence**: the clone is of `de4600b`, in the scratchpad, run from PowerShell:
- `npm install` → 63 packages;
- `npm run check` → 32/32 in 5 files;
- `git ls-files --eol | Select-String w/crlf` → nothing;
- `npm run sessions -- --project="C:/Users/xande/agentic-harness" --ledger=<scratch>` → exit 0, 7 sessions;
- `git status --short` → ` M package-lock.json` only.

**Risk**: Low.

### Push and public (§4.11 steps 4–6)
**Status**: VERIFIED · **Evidence**:
- `git push -u origin main` → new branch, no force.
- `git ls-remote origin main` = `git rev-parse HEAD` = `de4600b`.
- After the owner's switch, `curl -s -o /dev/null -w "%{http_code}" https://github.com/AndroidTheHuman/androids-agentic-harness` → 200 (Git Bash).
- The close commit's push is checked the same way, in the session's last message.

**Risk**: Low.

## Check first next session

- [ ] `npm run check` from PowerShell → 32/32 in 5 files, typecheck clean.
- [ ] `git fetch -q && git status -sb` → `main...origin/main` with nothing ahead or behind.
- [ ] `curl -s -o /dev/null -w "%{http_code}" https://github.com/AndroidTheHuman/androids-agentic-harness` → 200.
- [ ] `git -C "C:/Users/xande/infinity autobattler" status --short` → empty, at `636f378`.
- Next: the response to the owner's `meta/` review (`docs/PLAN.md` → "Revision 2026-11-11"). The owner has begun `meta/` with a review of the README (2026-11-11, after the push); this session didn't read it. One session responds to it, on **Opus 5.5 xhigh** (public text and the triage of an outside review). H2's declined item 1 (volume over ability) goes into that response. Package D stays deferred.

## Known open issues

- `npm run sessions` exits 0 when its price check says FAILED, and fails on a model's totals, not on single rows (H2 item 5). `examples/README.md` now says so beside the old text. Whether the check should fail the command is open.
- Public files cite the git-ignored drafts by line, and a visitor can't open them:
  - `evidence/AUDIT_FABLE_2026-11.md` finding 2 (`CASE_STUDY.md:10`, `RESUME.md:14`);
  - the archived handoffs;
  - `evidence/OUTSIDE_REVIEW.md`'s H1 table.
  
  `OUTSIDE_REVIEW.md` says the case study is out of the repo. The audit doesn't.
- The audit says its scripts in `evidence/audit-2026-11/` are "(uncommitted)"; they are committed.
- Carried:
  - from Git Bash, `npm run check` fails after `cd /c/…`;
  - the recorded cost sits 1–4% above the computed one;
  - `--current` doesn't name missing fields;
  - the game's `PRICES` still has $0.20;
  - `docs.test.ts`' plan-brief checks don't run here.

## Judgment calls

- **The renormalize check (§4.3).** `git add --renormalize .` also staged every tracked file this session had edited: the merge, and §4.2's `package.json`. The brief expected only `.gitattributes` and `CASE_STUDY.md`, but its own §4.2 edit comes before §4.3. I went on because no file outside this session's edits appeared, and `git diff --cached | grep -c $'\r'` → 0. `HANDOFF.md` was restored from the index for the renormalize, which failed while it was missing, then removed again.
- **`tests/kit.test.ts` was CRLF on disk** (`i/lf w/crlf`), left by the last session's `git checkout` under the system-wide `core.autocrlf=true`. It had no content diff, so it was checked out again under the new `.gitattributes` before §4.5.
- **§6's fail check** removed the `CASE_STUDY.md` link from README line 5 in place. The test stops at its first failing link, and that one came before `RESUME.md`.
- **README deviations from §4.8:**
  - The Why sentence on the budget test changed. §4.8 says to keep Why unchanged, but §4.10 says to fix every confirmed overclaim, and H2 item 2 confirmed it.
  - "On a clone" names `measure.mjs`, `reprice.mjs` and `ledger-port-check.mjs`, not `evidence/*.mjs`: `adoption-time.mjs` and `owner-turns.mjs` don't need the game. Its "outputs are committed" clause was dropped to stay under 600 words; Limits says it.
  - The port-check bullet adds "(11 once later records are left out)" beside "0 that differ".
  - The adoption bullet says "token-ledger's empty folder".
  - The audit bullet names "Claude Fable 5" without "another model", to fit the cap.
- **The privacy pass went past §4.9:**
  - Each history check was also run on `git diff --cached`.
  - A block-quote scan was added: P4″'s pattern finds no owner words, while the block quotes in `examples/05` hold five of the owner's prompts.
  - The research question was listed as Claude's draft, kept by the owner.
  - P5's count includes `PRIVACY.md`'s own command line.
- **H1's precision line** got a clarification beside it (H2 item 6). The old line stays.
- **`CLAUDE.md` Owner rule 5** said "No remote exists yet". The close commit replaces that sentence with the remote's name, since it would be false from the push on.

## Questions for the owner

- None open. The volume objection waits for the `meta/` review (owner, 2026-11-11).

## Session cost

`41d507d5-b59b-4f85-a87e-6915833af5a7: 65 calls, peak 193k, re-read 8M (sub-agents: 0), 8 gates, 1/96 tool errors, 1 big reads. Flags: 8 gates · opus-5.5 xhigh · $4.46` (taken before this handoff was committed; the final row is larger).
- 8 gates. The brief required three: check-first, the clone, and the reproduction of the Git Bash failure (a deliberate failing run). The rest came one per batch: after the README, during the Codex run, after the H2 fixes, and with this handoff in the budget. Next session: single test files while iterating, and `npm run check` once before the commit.

## Proposed changelog lines
[PROPOSED — not yet confirmed]
- 2026-11-11: This repo's side of the public release (package E, brief `docs/archive/2026-11/E_RELEASE.md`, release commit `de4600b`): README rewritten for a visitor (first person; what it showed; limits; on a clone); MIT `LICENSE`; `.gitattributes` (LF); a root `AGENTS.md`; `CASE_STUDY.md` git-ignored; `kit.test.ts` reads `.gitignore`; privacy pass `evidence/PRIVACY.md` (the owner approved P4″, P7 and P8); Codex claims check H2 (7 items: 4 fixed, 1 objection accepted, 2 declined); clean clone 32/32; pushed to `github.com/AndroidTheHuman/androids-agentic-harness` and made public by the owner; gate 32/32.

## Proposed PROJECT_CONTEXT.md changes
[PROPOSED — not yet confirmed]
- Now, line 8: "…links this repo as `github.com/AndroidTheHuman/androids-agentic-harness`, which is a 404 until this repo is public." → "…links this repo as `github.com/AndroidTheHuman/androids-agentic-harness`, which resolves since this repo went public."
- Now, replaces "- Next: this repo's side of the release, brief `docs/E_RELEASE.md`; package D is deferred (`docs/PLAN.md` → "Revision 2026-11-10", "Revision 2026-11-11")." with:
  - "- This repo's side of the release is done: brief `docs/archive/2026-11/E_RELEASE.md`, release commit `de4600b`; the repo is public at `github.com/AndroidTheHuman/androids-agentic-harness` (HTTP 200, 2026-11-11)."
  - "- Next: the response to the owner's `meta/` review (begun with the README, 2026-11-11), at least one session; package D is deferred (`docs/PLAN.md` → "Revision 2026-11-10", "Revision 2026-11-11")."
- Now, replaces "- No remote yet. The public slug is `androids-agentic-harness` (token-ledger brief 002 D2)." with "- The remote is `origin` (`https://github.com/AndroidTheHuman/androids-agentic-harness.git`); `main` tracks it. Pushes need the owner's go-ahead."
- Packages, row E's status: "next, after the price fix: a public release this week" → "this repo's public release done 2026-11-11 (`de4600b`); the case study and the `meta/` response remain".
- The kit, new lines:
  - "- `AGENTS.md` at the root sets outside agents' role (read-only) and answer format; it is filled from `templates/AGENTS.md`."
  - "- `LICENSE` is MIT; `.gitattributes` checks every text file out with LF."
  - "- `tests/kit.test.ts` reads `.gitignore`: its path check skips a git-ignored folder, and its link check fails a link to a git-ignored path."
  - "- The gate passes on a clean clone after `npm install` (2026-11-11: 32/32, no CRLF)."
- Evidence, replaces "- Every figure in `CASE_STUDY.md` and `RESUME.md` appears in `evidence/NUMBERS.md`." with "- The figures `README.md` and `examples/` cite come from `evidence/NUMBERS.md` or from a command quoted beside them (`NUMBERS.md` line 3)."
- Evidence, replaces "- The Codex claims check of `README.md` and `examples/05-worked-examples.md` waits for package E, which checks the final public text once (decided 2026-11-09, at the owner's delegation)." with "- `evidence/OUTSIDE_REVIEW.md` records run H2 (Codex, read-only, 2026-11-11) on the public text: 7 items, 4 confirmed and fixed, 1 objection accepted, 2 declined. The volume objection waits for the owner's `meta/` review."
- Evidence, new: "- `evidence/PRIVACY.md` records the release's privacy pass (P1–P8, 2026-11-11) and the owner's approval of the quoted owner words, the ledger's session titles and the game excerpts."
- Things to be aware of, replaces "- `CASE_STUDY.md` and `RESUME.md` are stubs aimed at a recruiter. `RESUME.md` is git-ignored (owner, 2026-11-11); `CASE_STUDY.md` leaves the repo in the release (`docs/E_RELEASE.md` D4) and waits for a third-person rewrite after the owner's `meta/` review." with "- `CASE_STUDY.md` and `RESUME.md` are git-ignored drafts on the owner's machine (owner, 2026-11-11), stale since the price fix. The case study waits for a third-person rewrite after the owner's `meta/` review."
