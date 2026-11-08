# Brief <NNN> — <name> (playtest)

**Status:** draft (<date>).
**Kind:** playtest brief. It runs typed players (persona sub-agents) over the product as it stands and produces a findings register. It fixes nothing: it is done when the owner has read the register.
**Size:** <M>, in <n> parts: A, the tool and the run; B, the register.
**Model:** <players on the session's model unless a trial says otherwise>.
**Reading rule:** every part reads §1, §2, §4, §7's head and its own block in §7, and §9.

<!-- The protocol is the typed-playtest skill. One model plays every persona, so this is a
     structured inspection with fixed formats, not a stand-in for human players; the register
     says so. -->

## 1. Intent

<What this checkpoint must find out, and which earlier findings it re-measures.>

## 2. Where things stand

<What players will see; the last register's findings and their metrics.>

## 3. Owner direction

<The owner's words on what to look at, verbatim.>

## 4. Design

- **Personas:** <id, what each does, how much each plays; keep the set across runs so runs compare>.
- **What players see:** <files the tool writes per player; ids that leak nothing a player shouldn't know>.
- **Log formats:** <exact headings and fields per log; the tool checks them>.
- **Agreement control:** <a shared slice all personas play, to separate the product from taste>.
- **Bias controls:** players are blind (only their files); no known misses mentioned; every judgment cites an item; fixed formats checked by the tool.

## 5. Decisions

| # | Decision | Why |
| --- | --- | --- |

## 6. Files

| File | Change | Part |
| --- | --- | --- |

## 7. Parts

### Part A — the tool and the run

- **Order:** build the tool; launch the players in one message as background sub-agents; check every log with the tool; one follow-up message per player with problems; commit the logs.

### Part B — the register

- **Order:** observations through a compact extract (never the raw logs); findings with persona counts and agreement; a metric over a large sample for each finding where one applies; priority by reach, not by mentions.

## 8. Expected result

<What the run costs (sub-agent re-read), and what the register contains.>

## 9. Must not

- Fix anything, tell players about known issues, or rank findings by how often they were mentioned.
