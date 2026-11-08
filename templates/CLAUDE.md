# <Project name>: Claude Code project memory

<One paragraph: what the project is, who owns it, and what it is not. The owner is <name>. If it builds on another project, say which and point at `docs/REFERENCE.md`.>

<!-- Full tier. Replace every <…>. Generalized from Infinity Autobattler's CLAUDE.md @ 636f378:
     its rules are kept in order, and its project-specific contents became slots. Delete a rule
     only with a reason in docs/archive/CHANGELOG.md. -->

---

## Read order at the start of every session

1. This file.
2. `PROJECT_CONTEXT.md`: what exists in the code now, one fact per line. Every session reads its head: the "Now" block and the phase table. A session that writes a brief or a plan also reads the rest, since the brief's "Where things stand" is drawn from it. Every other session Greps the rest by heading when its work touches one. History is in `docs/archive/CHANGELOG.md`; read it only when a question needs it.
3. `<DESIGN_VISION.md>`: intent, pillars and what the project is NOT.
4. The **active brief** in `docs/briefs/`: the lowest-numbered implementation brief not in `docs/archive/`. Build only what it asks for, and only once its status is `approved` (a `draft` brief waits for the owner). A **plan brief** (`Kind: plan`) stays in `docs/briefs/` until its last work package is archived; its header's **Reading rule** names the sections an implementation session reads. Read those and your own WP row, never the whole plan. A brief in **parts** carries a Reading rule too: a part's session reads the sections it names, its own part's blocks, and the previous part's handoff. The other kinds (design, research, playtest) are in `brief-spec` → Brief kinds.
5. `<docs/DESIGN.md>`: the sections the brief points to.
6. The newest `docs/SESSION_HANDOFF_*.md`, if any: run its "Check first" items **before** new work, merge its `[PROPOSED]` entries (changelog lines to the end of `docs/archive/CHANGELOG.md`, current-state lines into `PROJECT_CONTEXT.md`), then move the handoff to `docs/archive/<YYYY-MM>/`. Only unmerged handoffs sit in `docs/`.

## Precedence when documents disagree

Active brief (for its own scope) > the plan brief it belongs to > `<the design sections that hold invariants>` > the rest of `<docs/DESIGN.md>` > `<DESIGN_VISION.md>` examples. If a conflict isn't settled by this order, stop and ask the owner. Never resolve design conflicts silently.

---

## Mandatory rules (always apply)

**1. <Project invariants> are non-negotiable.** <The rules whose breach is silent and expensive, and the paths they cover. The source project's: no `Math.random`, `Date` or `randomUUID` under its deterministic folders; randomness from keyed sub-streams; every sort with an explicit tiebreak. Name what enforces each one (a lint rule, a test), and never disable it to get green.>

**2. Full-suite gate.** After editing anything under `<src/>`, run `<npm run check>` (typecheck + lint + full test suite) and confirm it passes before claiming a change works or proposing a context line. Partial runs don't count.

**3. Classify every change before making it.** The gate grows with the risk:
- Class 1, interpretation (output text, tools, docs): the normal gate.
- Class 2, content and tuning (data rows, weights, constants): schema and consumer-coverage tests, plus `<snapshot command> --reason "<why>"`; the snapshot test fails until it is run, and the reason goes into the commit message.
- Class 3, shared logic (`<core folders>`): all of class 2, plus `preflight-check`, plus `<golden-file command>` with the reason if a golden file changes.
- Class 4, data shape and identity: all of class 3, plus a handoff note listing every consumer touched, and a migration once anyone keeps saved data.

If unsure, treat it as the higher class.

**4. Pre-flight before class 3/4 changes.** Run the `preflight-check` skill before editing `<core folders>`.

**5. Session handoff.** At the end of any session that changed code, run the `session-handoff` skill. Never append to `PROJECT_CONTEXT.md` or the changelog directly; the handoff proposes entries marked `[PROPOSED]` and the next session merges them after verifying. `tests/docs.test.ts` holds the session-start read to two budgets in real tokens (characters ÷ 2.2): 20k for what every session reads, 45.5k with all of `PROJECT_CONTEXT.md`. When a merge breaks one, move facts word for word to the document that owns them and check with `npm run doc-moves`; never cut.

**6. IDs.** Before anyone keeps saved data, renames are allowed when the consumer-coverage test passes. After: never rename or reuse a registry ID; a rename is an alias entry.

**7. Scope discipline.** Build only what the active brief asks for. Ideas, shortcuts you're tempted to take, and future-phase work go into `docs/IDEAS.md` as one-liners, not into code. Don't start the next phase or brief without the owner saying so.

**8. Reference code is read-only.** Never import from `reference/`. Port what you need, with a header comment `// Ported from <project> <path> @ <sha>` and a note of what changed (`docs/REFERENCE.md`).

**9. Archival.** Finished briefs and merged handoffs move to `docs/archive/<YYYY-MM>/`. Never delete them. The repo root and the top level of `docs/` hold only living documents.

---

## Session economy (always apply)

Every model call re-reads the whole context, so a session costs roughly calls × context size. `docs/SESSION_LEDGER.md` measures it. In the source project, one session ran three work packages in one sitting, grew to 906k context and re-read 95M tokens over 200 calls. One package per session, kept under 250k, costs a fraction of that for the same work.

1. **One work package per session.** A session ends at the commit and handoff of the brief or part it started. An approval or "proceed" covers one package. Then stop and tell the owner to start a fresh session, which begins from the handoff and the brief. A brief written in **parts** counts each part as a package: one session, one commit, one handoff each. A part ends at its checkpoint, a state where the gate passes and the part's expected numbers hold.
2. **Context limits.** Over 250k: finish the current package, then hand off. Over 400k: finish only the step in progress. The prompt hook (`tools/sessions.ts --hook`) reports the size once it passes 250k, and the first time a prompt would re-cache a large idle session it stops that prompt. Follow what it says.
3. **Read narrowly.** For the big documents, Grep for the heading, then Read with `offset`/`limit`. A file costs about its characters ÷ 2.2 in tokens. Read each file once, and don't read it back after an edit. Cut long command output: `<gate> 2>&1 | tail -15` while it passes, and the failing lines when it doesn't.
4. **One gate per batch.** While iterating, run the affected tests. Run the full gate once per batch of edits and before claiming anything (rule 2). Changes to docs only need no gate.
5. **Shell quoting.** Never pass code or file content through heredocs or `node -e`/`python -c` with nested quotes. Write the script to the scratchpad and run it. After one quoting failure, switch to Write.
6. **No optional expensive checks.** Fresh clones, worktrees, and re-verifying work that is already archived need the owner's go-ahead first.
7. **Measure.** The `session-handoff` skill records the session with `npm run sessions -- --current` and quotes its flags.
8. **One model per session.** The owner picks the model and effort before the first prompt. Never switch inside a session: each model has its own cache. Which kind of package runs on which model, and the trial that moves a kind, are in `docs/MODEL_CHOICE.md`. The handoff names the next package's model.

---

## Skills (`.claude/skills/<name>/SKILL.md`)

| Skill | When to use |
|---|---|
| `preflight-check` | **Before** class 3/4 changes: blast radius, golden-file impact, coverage gaps |
| `session-handoff` | **At the end** of any session that changed code: verified vs claimed, `[PROPOSED]` entries |
| `brief-spec` | Turning an agreed idea into a brief with no judgment calls left; brief kinds; parts sized by working set |
| `design-critique` | Diagnosis only: what is broken or weak in the output, backed by samples |
| `typed-playtest` | A playtest brief: persona sub-agents, fixed-format logs a tool checks, a findings register |
| `outside-review` | Codex or Gemini, read-only: a cold read of a brief or part, a commit review, a second answer |

## Commands (the active brief may add more; keep this table current)

```bash
<npm run check>                      # typecheck + lint + full test suite (the gate)
<snapshot command> --reason "<why>"  # class 2+: rewrite the snapshot, print its diff
<golden command> --reason "<why>"    # class 3+: regenerate a golden file on purpose
npm run sessions                     # session cost ledger → docs/SESSION_LEDGER.md (--current: newest session only)
npm run doc-moves -- <rev>:<file> <file> …   # a doc move cut nothing (exit 2 lists what's missing)
```

**Seeds and samples:** omit `--seed` for a fresh sample and record the one the tool picks. Agents converge on the same few invented seeds, and every audit then reads the same cases.

## Key documents

| Document | Contents |
|---|---|
| `PROJECT_CONTEXT.md` | Current state, one fact per line: Now, phases and briefs, architecture as built, things to be aware of |
| `docs/archive/CHANGELOG.md` | The changelog, oldest first; merging sessions append to it |
| `<DESIGN_VISION.md>` | Intent, pillars, non-goals, owner answers |
| `docs/briefs/` | Numbered briefs; the active one is the lowest-numbered unarchived implementation brief |
| `docs/REFERENCE.md` | What is in `reference/` and how each file may be used |
| `docs/IDEAS.md` | Parked ideas; never built without the owner's go-ahead |
| `docs/SESSION_LEDGER.md` | Per-session token cost against commits delivered, with flags (generated; never edit by hand) |
| `docs/MODEL_CHOICE.md` | Which model runs which kind of package, the trial protocol, the trial and outside logs |
