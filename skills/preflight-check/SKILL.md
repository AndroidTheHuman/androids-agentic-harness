---
name: preflight-check
description: Blast-radius analysis before a change to shared logic, a data shape or anything many consumers read (class 3 or 4 in the full tier). Run before the edit; it answers what the change could affect and what would catch it.
---

# Pre-flight protocol

<!-- Generalized from Infinity Autobattler's .claude/skills/preflight-check/SKILL.md @ 636f378
     (which came from Omni Engine). Its generator-specific contracts (stream keys, ladders, odds)
     became the "contracts at risk" checklist below. -->

## Purpose

The full-suite gate only catches regressions that tests cover. A one-line change to shared code can silently change a large share of outputs, or starve a consumer nobody tests, while every test stays green. This skill runs **before** the edit and answers: *what could this change affect, and what would catch it?*

The owner's earlier project learned this the hard way: a skip-logic change to a shared stat function passed the tests that were run and silently broke trait tags that had no test.

## When to run

Before any change that:
- edits logic that other modules call or read (a shared function, a pipeline stage, a sampler, a parser);
- changes a data shape, an ID scheme, a hash or fingerprint, or a formula whose output is stored or compared.

Not needed for: content rows and constants covered by a snapshot diff, output formatting, docs, or test-only changes.

## Protocol

### Step 1 — State the change precisely
File, function, current behaviour, new behaviour. Additive (a new branch or case) or substitutive (replaces logic)? Substitutive changes to shared code are the riskiest.

### Step 2 — Dependency map
List every consumer: callers, readers of the data it produces, generated reports, schemas, fixtures, tests. Use the project's dependency tool if it has one, else grep for the identifiers across the source, the tools and the tests. Include indirect readers (a report that prints a field, a detector that keys on it).

### Step 3 — Contracts at risk
Which of these could change?
- Keys and IDs (a renamed key can reshuffle or orphan everything keyed on it).
- Order (a list that must stay sorted, a tiebreak, an iteration order that output depends on).
- Honesty of reported numbers (every possible outcome counted; integer arithmetic where the project requires it).
- Derived values (scores, ranks, thresholds) and everything that reads them.
- Golden files and snapshots.
- Stored data shape (a migration needed once anyone keeps data).

### Step 4 — Impact estimate
State the expected diff in advance: which outputs change, for how many cases of a fixed sample, and what must not move. After the change, run the snapshot or sample command and compare with the estimate. A diff you didn't predict is a finding, even when the tests pass.

### Step 5 — Coverage gaps
For each contract at risk: which test would fail if it broke? Be honest: a test that exists but wouldn't catch *this* change doesn't count. For each gap, propose one assertion and say whether to add it before the change (to pin current behaviour) or with it.

### Step 6 — Verification plan
```
## Pre-flight: <file / function>
Additive | Substitutive
Expected to move: <…>   Must not move: <…>

Standard gate:
- [ ] <gate command> → all pass (record count)

Targeted:
- [ ] Snapshot or sample diff read (expected: …)
- [ ] Golden file: expected to change? yes/no. If yes: regenerate with the reason recorded
- [ ] <specific assertion> → <test>

New tests to add:
- [ ] <assertion> — before/with change
```

## Output
Put the pre-flight in your working notes; it becomes part of the session handoff.

## The key question
*What would I have to break for no currently-passing test to catch it?* Cover that with tests, or accept the risk explicitly in the handoff — never accidentally.
