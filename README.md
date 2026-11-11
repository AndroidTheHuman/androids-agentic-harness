# Android's Agentic Harness

A kit for running one software project through many short Claude Code sessions. Each session starts from the same few documents and ends with a handoff that keeps what it checked apart from what it only claims; the kit instructs the next session to re-run those checks before it accepts the changes the handoff proposes to the project's recorded state. A ledger built from Claude Code's transcripts measures every session. The kit is Markdown templates, Claude Code skills, and the ledger with its prompt hook; the full tier adds a test that caps the standing documents every session reads first.

I built it while directing Claude Code through a 44-day, 207-session build of a 45k-line TypeScript game, *Infinity Autobattler* (a private repo); Claude Code sessions wrote the code and the documents under my direction. [Android's Agent Token Ledger](https://github.com/AndroidTheHuman/androids-agent-token-ledger), a study of where my coding-agent sessions spend their tokens, was then built from an empty folder with the lite tier. I'm publishing it to show how I work with coding agents: a kit that grew over months of use and is still changing, not a finished product.

[How it works](#how-it-works) · [Evidence](evidence/) · [Two worked examples](examples/05-worked-examples.md) · [Decision log](evidence/DECISIONS.md) · [Lite tier: start here](#lite-tier-start-here)

## How it works

A **session** is one Claude Code conversation, stored as one transcript file. A **package** is one approved piece of work, sized to end within a session in one commit. Each document has one job:

| Document | Holds | Changed by |
|---|---|---|
| `CLAUDE.md` | The rules and the start read's order; Claude Code loads it into every session | You, rarely |
| `PROJECT_CONTEXT.md` | What exists now, one fact per line: the shared state | The next session, merging a handoff's proposed lines after their checks; never the session that did the work |
| A brief (`docs/briefs/`) | One package's spec, with every design decision made | Drafted by a session or by you; approved by you |
| `HANDOFF.md` | What the last session verified, what it only claims, what to check first, the lines it proposes | Written at a session's end, one at a time; merged and archived by the next |
| `docs/IDEAS.md` | Parked, unapproved ideas | Any session, one line each |
| `docs/archive/` | Finished briefs, merged handoffs, the changelog | Moves only, no deletes |

A plan, when the work needs one, is a brief that orders the packages.

### A session, start to end

Say you want login added to an app:

1. **Brief.** A session drafts it with the `brief-spec` skill, or you write it: routes, storage, the tests that must pass. You approve it.
2. **Start.** A fresh session reads `CLAUDE.md`, the head of `PROJECT_CONTEXT.md`, the brief and the last handoff. It runs the handoff's check-first items, corrects any proposed line a check disproves, then merges the lines and archives the handoff. The session accepts the lines, not you; a conflict the documents can't settle goes to you. A claim the last session didn't verify is checked here, one session after it was made.
3. **Build.** It builds only what the brief asks, and runs the **gate**, the full check command (here `npm run check`: typecheck and tests), before claiming anything works.
4. **Hand off.** It writes `HANDOFF.md` with the `session-handoff` skill, marking each change VERIFIED (with the command and its result) or CLAIMED, records its ledger row (`npm run sessions -- --current`), and commits.
5. **You** read the handoff, answer its questions, and start the next session.

This repo's last handoff, trimmed ([in full](docs/archive/2026-11/HANDOFF_2026-11-11_package-E-release.md)):

```
### The gate
**Status**: VERIFIED · **Evidence**: `npm run check` (PowerShell) → typecheck clean, 32/32 in 5 files. …

## Check first next session
- [ ] `npm run check` from PowerShell → 32/32 in 5 files, typecheck clean.
- [ ] `curl -s -o /dev/null -w "%{http_code}" https://github.com/…/androids-agentic-harness` → 200.

## Proposed PROJECT_CONTEXT.md changes
[PROPOSED — not yet confirmed]
- Now, replaces "- No remote yet. …" with "- The remote is `origin` (…); `main` tracks it. …"
```

The next session ran both checks, merged the lines and archived the file.

### What the check proves, and when a session fails

A VERIFIED change carries its evidence: the gate's count, a named command's output, or a code read with file and lines. Every other change carries the check that would verify it, and the next session runs those checks before it merges. So nothing reaches `PROJECT_CONTEXT.md` without named evidence or a second session's check. That checks evidence, not truth: a login test that misses a case passes in both sessions. What stands against a weak test is the brief, which names the tests that must pass and which you approve.

When a session can't get the gate green, or reaches its context limit mid-package, it doesn't claim the work: it hands off with the change marked KNOWN INCOMPLETE, the check that would close it and what is left, and the next session continues the package. A package that turns out bigger than one session ends the same way; a brief that is large from the start is split into parts, a session each (`brief-spec`, step 6). A decision the brief didn't settle goes into the handoff's judgment calls, with the options and the reason, for you to read.

The session's own authority stops at the evidence. It may correct a proposed line to what its check shows. It doesn't change an approved brief, start the next one, or settle a conflict that the precedence order in `CLAUDE.md` (the active brief, then `PROJECT_CONTEXT.md`, then everything else) leaves open: those stop for you.

### What enforces each rule

| Rule | Enforced by |
|---|---|
| Read `CLAUDE.md` first | Claude Code, which loads it |
| The rest of the start read; check first, then merge | Instructions only |
| The start read's budget, the brief aside (full tier) | A test: `tests/docs.test.ts` fails the gate past 20k estimated tokens |
| The gate before any claim | An instruction; the ledger counts gate runs afterwards |
| The shared state changes only through a checked handoff merge | An instruction and the `session-handoff` skill |
| One package per session | An instruction; the ledger flags a session with more than one commit as a possible break, but it can't count packages |
| Hand off past 250k tokens of context; past 400k, finish only the current step | The prompt hook warns the model at your next prompt past each limit, not mid-turn, and can't stop it; the ledger flags sessions over 250k |
| Don't resume a large session whose cache expired | The hook blocks the first prompt after an idle hour, once |
| Approve briefs; push | You |

A rule that lives only in `CLAUDE.md` is an instruction the model can ignore. The ledger catches some breaks (context, commits), not all.

## What it adds to a CLAUDE.md and a progress file

Those two are this kit's core too. It adds four things:

1. **Claims are checked before they become state.** A progress file is written by the session that did the work and trusted by every later one; here a claim reaches the shared state only with its evidence named or after the next session's check (what that proves: above). This came from an earlier project whose agents appended confident, wrong summaries.
2. **Every session is measured**: model calls, context, re-read tokens, cost, commits and gate runs, with flags for rule breaks.
3. **The standing start read has a budget** (full tier; the brief comes on top), and `tools/docMoves.ts` proves that text moved out of it was moved, not cut.
4. **You direct at the level of packages.** "Let's work on package A" is a whole prompt: the session finds the brief, the state and the last handoff itself. An idea that comes up mid-session goes into `docs/IDEAS.md` as one line, not into the code, and a plan brief later picks from the parked ideas and orders them into packages. The game parked 183 ideas over its 44 days ([NUMBERS.md](evidence/NUMBERS.md)).

It suits one developer directing Claude Code on one project for dozens of sessions, where a wrong fact carried forward costs more than the paperwork. Whether it pays there is unmeasured: nothing counts the wrong facts it stopped, or compares a unit of work's cost with a simpler workflow ([the audit](evidence/AUDIT_FABLE_2026-11.md), finding 2). No team has used it. I don't claim it beats a simpler setup, and leaner ones may exist; it is one that has been used and improved over months, and the convenience I'd point to first is the fourth item.

## What the evidence shows

*Peak context* is the largest context of one model call in a session; *cost* is list price from token counts, a relative measure on a subscription. The figures support three different claims:

- **An agent can set it up.** In one trial, a Claude Code session working from a prepared kickoff prompt, and knowing it was timed, set up the lite tier with the ledger in token-ledger's empty folder in 1.4 minutes of wall clock and 12 model calls, from its first entry to its first successful `npm run sessions -- --current` (`node --no-warnings evidence/adoption-time.mjs "<project folder>"`). That times an agent's setup, not a person's first read of this page; token-ledger's build is the use.
- **Its measurements reproduce.** The ported ledger recomputes 158 of the game's committed rows from their transcripts with 0 differences, 11 of them once records Claude Code appended later are left out; 49 transcripts are gone (`node --no-warnings evidence/ledger-port-check.mjs "<game repo>"`, 2026-11-11). So the port matches the original, which doesn't make the original right: an audit I commissioned from Claude Fable 5 found it priced Sonnet 5.5's cache reads at twice the published rate. The fix re-priced 42 of the game's rows ($265.76 → $188.42; [the audit](evidence/AUDIT_FABLE_2026-11.md), finding 1).
- **What changed: observed, not shown to be caused.** After one session ran 200 calls to a 906k peak, I added the session-economy rules on 2026-10-02: the ledger, the hook, one package per session, briefs in parts. Average peak context per session fell from 451k to 268k and average cost from $14.82 to $6.17, the project's first 16 sessions against the 191 after ([NUMBERS.md](evidence/NUMBERS.md)). The work changed too, and splitting work into more sessions lowers per-session figures by itself ([the audit](evidence/AUDIT_FABLE_2026-11.md), finding 2). 58% of sessions still peaked over 250k, against 81% before.

## Limits

- One person, one project, no control group: observations, not effects.
- The process has a cost: 1.61 lines of Markdown per line of source, and brief or plan drafting at 19% of spend ([NUMBERS.md](evidence/NUMBERS.md)).
- The game's repo is private, so the scripts behind its figures rerun only on my machine; their outputs are committed.
- The kit is the part of the game's workflow that carries over to another project, not all of it, and it is still changing: the next improvements wait in [docs/IDEAS.md](docs/IDEAS.md).

## On a clone

Needs Node ≥ 22.18. `npm install`, then `npm run check` runs the typecheck and the 32 tests. `npm run sessions -- --project=<path> --ledger=<dir>` builds a ledger from your own Claude Code transcripts for the project at `<path>`, with or without the rest of the kit. `evidence/measure.mjs`, `reprice.mjs` and `ledger-port-check.mjs` need the game's repo.

## What's in the kit

| Folder | Contents |
|---|---|
| `templates/` | `CLAUDE.lite.md` and `CLAUDE.md` (full); `PROJECT_CONTEXT.md`; `IDEAS.md`; `MODEL_CHOICE.md` with the trial protocol; `AGENTS.md` for outside agents; `KICKOFF_PROMPT.md` and `REFERENCE.md` (bootstrapping by reference); `briefs/` with one template per kind of work: plan, implementation, research, playtest, design |
| `skills/` | `session-handoff`, `brief-spec`, `preflight-check`, `outside-review`, `design-critique`, `typed-playtest`; copy them to `.claude/skills/` |
| `tools/` | `sessions.ts` and `sessionMeasures.ts` (the cost ledger and its prompt hook), `hook.settings.json` (the hook snippet), `docMoves.ts` (proves a doc move cut nothing) |
| `tests/` | The ported ledger and doc-moves tests; `docs.test.ts`, the start-read budget test, as a template whose settings name this repo's own documents; `kit.test.ts`, which keeps the kit's cross-references honest |

Every ported file starts with `Ported from Infinity Autobattler <path> @ 636f378. Changes: …`.

## Lite tier: start here

Setup is copying and filling four templates and two skills; the ledger is optional. Needs Claude Code; step 4 also needs Node ≥ 22.18 (it runs the `.ts` tools directly).

**The smallest useful setup is the workflow alone**: steps 0–3 and 5, Markdown and skills, for a project in any language, with your own test command as the gate. Without step 4, delete what names the ledger or the hook: in your `CLAUDE.md`, the `npm run sessions` lines and the hook's sentence; in your copy of `session-handoff`, step 6. **Step 4 adds the measurement**, now or later. A project that isn't Node can run the ledger from a clone of this repo instead (On a clone), with the clone's command in those lines. Both projects that have used the kit are TypeScript.

Timed once, on 2026-11-09, against a 15-minute bar fixed before the run: a Claude Code session given a kickoff prompt set up the workflow and the ledger in an empty folder in 1.4 minutes of wall clock, 12 model calls (`node --no-warnings evidence/adoption-time.mjs "<project folder>"`). It knew it was being timed, and it says nothing about how long a person new to the kit takes.

0. In an empty folder, run `git init` and `npm init -y` first: steps 1 and 4 expect a repo and a `package.json`. In an existing repo, skip this step.
1. Copy `templates/CLAUDE.lite.md` to `CLAUDE.md` and fill its slots: the project paragraph, the gate command, and the one invariant whose breach is most expensive. A project with no gate yet can take the kit's: `npm run check` (`tsc --noEmit`, then `vitest run`), with the kit's `tsconfig.json` (whose `include` names only `tests` and `tools`: add your source folders), its `typecheck`, `test` and `check` scripts from `package.json`, and its three devDependencies (`typescript`, `vitest`, `@types/node`).
2. Copy `templates/PROJECT_CONTEXT.md` to `PROJECT_CONTEXT.md` and write the "Now" block. Copy `templates/IDEAS.md` to `docs/IDEAS.md`, and create `docs/briefs/` and `docs/archive/CHANGELOG.md` (a title, then `## Changelog`).
3. Copy `skills/session-handoff/` and `skills/brief-spec/` into `.claude/skills/`.
4. **Optional: the measurement.** Copy `tools/sessions.ts` and `tools/sessionMeasures.ts` into `tools/`, and `tests/sessionMeasures.test.ts` and `tests/sessions.test.ts` into `tests/`, so the gate covers them. `GATE` at the top of `sessions.ts` is `npm run check`; change it only if your gate command differs (or pass `--gate`). Add `"sessions": "node --no-warnings tools/sessions.ts"` to `package.json`'s scripts. Merge `tools/hook.settings.json` into `.claude/settings.json`.
5. Write brief 001 from `templates/briefs/implementation.md`, or ask the first session to draft it with `brief-spec` and stop for your approval.

What you get: the same start for every session, briefs that leave a fresh session no design decisions, only smaller calls it lists for review, handoffs where claims wait for a check, a gate before any claim, one package per session, and, with step 4, a ledger row for every session (`npm run sessions -- --current`).

## Full tier: when sessions number in the dozens and wrong answers are expensive

| Add | The failure it prevents |
|---|---|
| Change classes 1–4 and `preflight-check` (in `templates/CLAUDE.md`) | A risky change getting the same light check as a doc edit. A change's class is how far it reaches: 1 output text, tools and docs; 2 data rows and constants; 3 shared logic; 4 data shape. The gate grows with the class |
| `tests/docs.test.ts` and `tools/docMoves.ts` | The start read growing without bound, or being "fixed" by deleting facts. Moves are proven word for word |
| `templates/MODEL_CHOICE.md` | Using the expensive model everywhere, or a cheap one blindly. A cheaper model earns a kind of work through trials whose pass criteria are fixed before the run |
| `skills/outside-review` and `templates/AGENTS.md` | One model family's blind spots. Read-only runs from another provider; every item triaged |
| Brief kinds (`templates/briefs/`) | Treating all work as coding. Plans, research (tool, corpus, metrics, hand codes with an agreement score), playtests and design each have their own deliverable and acceptance rule |
| `skills/typed-playtest`, `skills/design-critique` | Judging output by impression alone. Blind persona sub-agents (player types) write fixed-format logs a tool checks; findings are ranked by reach. A structured inspection, not a stand-in for real users |
| `templates/KICKOFF_PROMPT.md` and `templates/REFERENCE.md` | A new project starting cold, or re-solving what an earlier one solved. Bootstrapping by reference: the new project's first session reads frozen, read-only copies of an earlier project's files under a port rule, instead of starting from blank templates, and a first prompt makes it read the docs and stop with a plan and its doubts |

The full tier has a cost the source project measured: 1.61 lines of Markdown per line of source, and brief drafting at 19% of spend. Small changes paid the full ceremony: "procedural saturation", a description in the [decision log](evidence/DECISIONS.md) (row 13), not a metric. Add pieces when a failure they prevent has happened or would be expensive, not all at once.

## The session ledger

```bash
npm run sessions                      # this repo's sessions → docs/session-ledger.json, docs/SESSION_LEDGER.md
npm run sessions -- --current         # the newest session only, for the handoff
npm run sessions -- --project=<path> --ledger=<dir>   # another project's sessions, written to <dir>
npm run sessions -- --gate="<command>"                # count a different gate command
```

It reads Claude Code's transcripts (`~/.claude/projects/<slug>/*.jsonl`). Sub-agents count in a session's cost and re-read, with their number and largest context; the session's calls, final context, output and thinking are the main conversation's alone. For each session it records wall clock, work and wait time, prompts, model calls, peak and final context, tokens re-read from cache, output and thinking tokens, the model and effort, cost at list price (and at the strong model's rates when another model ran), tool errors, gate runs, commits and lines added. It flags context over 250k, re-read over 30M, more than one commit, cold re-caches (one call writing 150k or more of cache, usually a large session resumed after its cache expired), big reads, long waits and model switches. Rows outlive their transcripts, which Claude Code deletes after about 30 days.

The port is checked against the source: `node --no-warnings evidence/ledger-port-check.mjs "<game repo>"` recomputes every row the game committed at `636f378` whose transcript survives, at the game's own rates. On 2026-11-11 all 158 match: 147 as they are and 11 once what Claude Code appended later is left out (for 10, a cost record appended hours later; for the newest, everything after the point where its own session recorded it). The other 49 rows' transcripts are gone. The kit's rates differ from the game's in one place: Sonnet 5.5's cache read, which the game's table had at twice the published rate. That changes the price of 42 of the game's rows; `evidence/NUMBERS.md` uses the corrected prices.

Limits: it reads Claude Code's transcript format, which can change; `PRICES` in `sessionMeasures.ts` lists only Opus 5.5 and Sonnet 5.5 (checked against the live price page on 2026-11-10), and other models show as "unpriced"; on a subscription the cost is a relative measure, not a bill. The *Session* column is Claude Code's title for the session or, without one, the first 60 characters of your first prompt: transcript text, so read it before you commit the ledger to a public repo.

## This repo runs on the kit

`CLAUDE.md` here follows the lite template, plus the budget test and outside review. `PROJECT_CONTEXT.md` holds the state, `HANDOFF.md` the last session's verified and proposed lines, `docs/PLAN.md` the approved plan, and `docs/SESSION_LEDGER.md` this repo's own sessions. `npm run check` is the gate: typecheck plus the tests, including the budget test on these documents. `AGENTS.md` sets the role of outside agents: read-only.

## License

MIT, see [LICENSE](LICENSE).
