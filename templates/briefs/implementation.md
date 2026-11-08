# Brief <NNN> — <name> (<plan NNN WP<k>, if any>)

**Status:** draft (<date>). <Approved by the owner on <date>, with <changes>.> <Part A done (`<sha>`).>
**Kind:** implementation brief<, in <n> parts>. <One line per part: what it builds.>
**Size:** <S | M | L><, in <n> parts (§7)>.
**Model:** <per part, from `docs/MODEL_CHOICE.md`'s table, with the reason>.
**Cost estimate:** <per part: the expensive runs it makes (gates, samples, outside reads)>.
**Reading rule:** every part reads §1, §2, §3, §7's head and its own block in §7, §8, §9 and §11's head. <Part A also reads §5 and §10 A.> <Part B also reads …, plus part A's handoff.>

<!-- A brief is done when a fresh session could build it with no judgment calls; every judgment
     call left in it is a gap. Write it with the brief-spec skill. Section numbers are what the
     Reading rule and tests/docs.test.ts refer to: keep "## <n>. <Title>" headings. -->

## 1. Intent

<One paragraph: what should exist afterwards, what a user or reader notices, and which goal of the plan or vision it serves.>

## 2. Where things stand

<Every fact from PROJECT_CONTEXT.md and the code that this work relies on, with file paths. An implementing session reads only PROJECT_CONTEXT.md's head, so this section carries the rest.>

## 3. Decisions

| # | Decision | Why | Owner |
| --- | --- | --- | --- |
| D1 | <what is fixed> | <the reason, or the evidence> | <approved / recommended, the owner may change it> |

## 4. What to build

### 4.1 <Piece>

<Exact names, signatures, rows, output lines. Never "similar to X": give the values.>

## 5. Expected effect

<The numbers a session checks before it commits: test counts, snapshot diff, output of a named command at a named input. A check whose expected value isn't written here can't fail.>

## 6. Tests

- `<test file>`: <what it asserts>. Write it before the code where you can.

## 7. Parts

Each part ends at its checkpoint (§11), its commit and its handoff naming the next package and its model.

### Part A — <name> (<model>)

- **Working set, about <n>k tokens** (characters ÷ 2.2, measured <date>): <files and their sizes>.
- **Order:** <numbered steps, starting with the merge of the last handoff>.
- **Checkpoint:** §11 A.

## 8. Files

| File | Change | Part |
| --- | --- | --- |
| `<path>` | <new / edit: what> | <A> |

## 9. Must not

- <What the session must not change, add or weaken, e.g. "no existing test changes", "nothing under `src/core/`".>

## 10. Docs

- <Which documents change and how: PROJECT_CONTEXT.md lines go through the handoff as `[PROPOSED]`.>

## 11. Verification

- [ ] `<gate command>` → all pass (record the count).
- [ ] <command> → <expected output from §5>.

### A

- [ ] <part A's checkpoint numbers>.
