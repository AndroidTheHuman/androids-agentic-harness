# Project context

What exists in the code right now, one fact per line. Sessions never append here directly: a handoff proposes lines marked `[PROPOSED]`, and the next session merges them after checking. History goes to `docs/archive/CHANGELOG.md`, not here.

<!-- Every session reads the head: "Now" through the phase table. Keep it short; `tests/docs.test.ts`
     budgets it (full tier). Below the head, one heading per area, one fact per line, each line
     under 1,000 characters. A changed fact replaces its old line; the old line goes nowhere
     unless it is history, which the changelog holds. -->

## Now

- Status: <what was last done, with its commit>.
- Next: <the next package and its brief>, on <model, effort>.
- Gate: <n>/<n> tests in <k> files at <commit>.
- <Any fingerprint, snapshot or version a session must check before its work.>

## Phases and briefs

| Phase | Brief | Kind | Status |
|---|---|---|---|
| <0> | <001 name> | <implementation> | <draft / approved / done (commit) / archived> |

## Architecture as built

### <Area>

- <One fact: what exists, where (`path`), and what it guarantees.>

## Things to be aware of

- <A trap a fresh session would fall into, and how to avoid it.>
