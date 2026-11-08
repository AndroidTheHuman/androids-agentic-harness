# Reference code from <earlier project>

<!-- Bootstrap by reference, part 2 of 2 (part 1: KICKOFF_PROMPT.md). Save as docs/REFERENCE.md.
     A new project starts from what the owner's earlier work already solved, without inheriting its
     mistakes or its dependencies: selected files are copied, frozen and read-only, and each one gets
     a verdict (port, pattern, data, anti-pattern) and the known issues to fix while porting. The
     same move works mid-project: point a session at a file from another repo instead of describing
     it. Generalized from Infinity Autobattler's docs/KERNEL_IMPORT.md @ 636f378, which held 63
     Omni Engine files under this rule. -->

`reference/<project>/` holds **read-only** copies of selected <earlier project> files, taken on <date> from its commit `<sha>`. Paths inside `reference/<project>/` mirror the source repo's own paths.

Rules:

- **Never import from `reference/`.** It is code from a different project with different dependencies. It won't type-check and shouldn't. A test can enforce this (no import path contains `reference/`).
- **Port, don't paste.** When a brief needs one of these, write a version in this project's own folders, with a header: `// Ported from <project> <path> @ <sha>. Changes: <one line>`.
- **Fix known issues while porting** (listed below). Don't port a known issue just to be faithful.
- If you need a file that isn't here, **ask the owner**. Don't guess its contents.
- Files the owner adds later go in a new section with the date, how they arrived (copied from the repo at a commit, or pasted), and whether they match that commit.

## Files and how to use them

| File in `reference/<project>/` | What it is | Use | When | Known issues to fix while porting |
| --- | --- | --- | --- | --- |
| `<path>` | <what it does, in one line> | **Port** / **Pattern** / **Data** / **Anti-pattern reference** | <phase or brief> | <what must not come across, e.g. global state, unseeded randomness, float weights> |

**Verdicts.** *Port*: rewrite it here, with the header. *Pattern*: take the shape, not the code. *Data*: copy the values into this project's own tables. *Anti-pattern reference*: read it to know what not to build, and say why in the Known issues column.
