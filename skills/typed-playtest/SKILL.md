---
name: typed-playtest
description: The typed-players pattern - persona sub-agents use the product blind, write fixed-format logs a tool validates, and their judgments become an observations file and a findings register ranked by reach. Use when a playtest brief is active or the owner asks for one. Adapt the scope and the formats per project.
---

# Typed-players playtest (a pattern)

<!-- Generalized from Infinity Autobattler's .claude/skills/typed-playtest/SKILL.md @ 636f378, which
     ran four times (116 findings). What ports is the method: blind personas, fixed formats a tool
     checks, an agreement control, priority by reach over a large sample. What doesn't port is the
     game's content; each project writes its own tool, formats and metrics. One model plays every
     persona, so this is a structured inspection, not a stand-in for human users. -->

## When it earns its cost

The gates check the invariants they were written for. They cannot say whether output is clear, varied or worth using. A typed playtest does that at a phase checkpoint, at the cost of several sub-agents reading a lot (the source project's runs re-read 24–77M tokens across the players). Run it at checkpoints, not per change.

## 1. Prepare (one session)

1. **A tool writes the run folder** at a fresh seed: one shared rules file for players (player terms only, generated from the same tables the product prints, never written by hand), and per player the files they open in order. Players see opaque ids, never internal seeds or scores. A `README.md` for the run session (not for players) maps ids back to inputs, so every case replays.
2. **Launch the personas in one message, as background sub-agents**, each with the prompt template below and absolute paths. Each replies `done: <n> files`. The run session does not read the logs.
3. **The tool checks every log** against the formats. A player with problems gets **one** follow-up message listing them; whatever stays malformed goes to the register's limits.
4. Commit the tool and the logs. Record the run's cost from the ledger (its Agents column).

## 2. Personas

Five is enough to separate a product problem from a taste. Give each an id, a goal, and how much it uses the product. The source project's set, for a collection game: a Collector (breadth), a Powerscaler (judges claims against evidence), a Newcomer (reads everything literally), an Optimizer (looks for the best play), a Veteran (heavy use, sees only the compact view). **Keep the personas across runs so runs compare.** Change one only with the owner.

A shared first slice that every persona uses is the **agreement control**: when ≥ 3 of 5 react the same way to the same item, it's the item, not the persona.

## 3. Prompt template

```text
You are testing <product>. You are <persona name>.
<persona paragraph, verbatim from the brief>
Read <run folder>/<rules file> first. Then work in this order:
<per step: "Before opening step k, write the Expect line of <log folder>/step-k.md. Then read <run>/<player>/step-k.md and finish your log.">
Finally write <log folder>/final.md.
Rules:
- Read only the rules file, the files in <run>/<player>/ and your own logs. Don't open any other file, run commands or search. You are a user, not a developer.
- Write each log in exactly the format below; a tool checks it.
- Your complaints are the most valuable thing you produce: a report that finds nothing wrong has failed. Be specific: cite the item id and quote the line you mean. Praise is welcome when it is just as specific.
- React as your persona would, in the first person.
<the log formats>
When you are done, reply with one line: "done: <number of files written>".
```

Fixed reaction words make tallies possible (the source used: cool, fine, meh, confused, wrong). `final.md` asks for ranked dissatisfactions (dealbreaker, annoyance, nitpick), the best moments, and whether the persona would come back tomorrow (1–5).

## 4. Bias controls

Players are blind (only the rules file, their folder, their logs). Never mention known problems. Every judgment cites an item. The shared slice separates the product from taste. Formats are fixed and checked by the tool. Priority comes from reach over a large sample, not from the number of mentions. The register states that one model played every persona, and that anticipation is described, not felt.

## 5. Assimilate (one or two sessions)

**Observations.** Read the logs through a compact extract (a script that keeps the non-table lines and the `wrong` and `confused` rows), never raw. One row per judgment: an id, its kind, a verbatim quote of at most 25 words, the items it cites, and the finding ids (filled in later). A script checks that every line the rule names has a row and that every quote is verbatim.

**The register.** One finding per sentence about the product, with:
- the personas who raised it (n of 5) and the shared-slice agreement;
- the evidence (observation ids);
- a **metric** over a large sample (a count over many generated cases, a share of sessions) and its value: reproduced, rare (< 1%), not reproduced, or qualitative;
- its layer and change class, a deadline group, and a priority (reach, then personas, then agreement, then severity);
- candidate directions, which are candidates, not decisions, and a target that a test can check without a player.

Then a table against the previous register, one row per earlier finding, **on its metric, not on persona counts**: fixed, improved, unchanged or regressed. Then a blind check: for each known problem carried in, did a player surface it unprompted? Wishes go to `docs/IDEAS.md`.

Nothing in the product changes in these sessions. The owner reads the register; the next plan picks from it.
