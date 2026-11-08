---
name: design-critique
description: Structured failure-mode analysis of a system's output. Diagnosis only, no proposals. Use when asked what's broken, dull, incoherent or unbalanced, ideally with a sample of real output as evidence.
---

# Design critique protocol

<!-- Generalized from Infinity Autobattler's .claude/skills/design-critique/SKILL.md @ 636f378.
     Its categories were written for generated game characters; here they are the general failure
     modes of any system that produces many outputs (generated content, search results, reports,
     recommendations, API responses). Proposals belong to a separate step the owner asks for. -->

## Purpose

Surface failure modes and root causes in a fixed structure. You are an adversarial critic, not a collaborator with suggestions. Your output ends at a diagnosis.

## Before you begin

Read the project's vision or goals document: it is the lens, not the norms of the genre. Get evidence: a recent sample of real output (or produce one at a fresh, recorded seed or input set), plus traces for anything you cite. A critique without samples is a hypothesis list; label it that way.

## Protocol

### Step 1 — Gather evidence
Samples, traces, test output, code reads. Cite the input or seed of each case.

### Step 2 — Symptom or root?
For each finding: root cause, symptom (of what?), or unknown.

### Step 3 — Categories

- **Incoherent outputs**: allowed by every rule, yet wrong to a reader (contradictory parts, impossible combinations). Which rule or condition is too loose?
- **Mush**: coherent but forgettable or interchangeable. Flat distributions, weak labels, too few axes that tell outputs apart?
- **Rank mismatches**: where the system's own score or tier contradicts how the output reads (a dull case ranked high, a striking one ranked low). Which input dominates the score?
- **Dead or unreachable content**: options never produced, branches no input reaches, data nothing reads.
- **Distribution skew**: one option crowding out the rest; rates outside their target bands.
- **Readability**: can a reader judge one output in seconds? Are names doing work that structure should do?
- **Scaling risk**: what gets worse as content or traffic grows 10× (collisions, repetition, one input dominating)?

### Step 4 — Questions, not verdicts
- ✅ "Is it intended that 38% of outputs of kind X share option Y?"
- ❌ "Option Y is overused and should be cut."

### Step 5 — Confidence
Label each finding **Confirmed** (evidence cited), **Suspected** (partial evidence; say what would confirm it) or **Hypothesis** (from reading the design only).

## Output

```markdown
## Confirmed findings
### <category>
**Finding**: … **Evidence**: inputs / trace rows / file:line **Root or symptom**: … **Question**: …

## Suspected failure modes
**Suspicion**: … **Partial evidence**: … **What would confirm it**: …

## Open questions for the owner
```

## Not for
Proposing features, fixing things, or validating your own ideas. If you catch yourself proposing, stop and park it in `docs/IDEAS.md`.
