# Kickoff prompt for the first build session

<!-- Bootstrap by reference, part 1 of 2 (part 2: REFERENCE.md). Before the first session, the
     owner prepares the steering docs (CLAUDE.md, PROJECT_CONTEXT.md, a vision, brief 001), the
     skills, and frozen read-only copies of what an earlier project already solved. This prompt then
     makes the first session read those itself and stop with a plan and its doubts before writing
     code. Generalized from Infinity Autobattler's docs/archive/2026-09/KICKOFF_PROMPT.md @ 636f378,
     the prompt that started that project on 2026-09-26. Replace every <…>. -->

Open Claude Code in this folder (`<folder>`) and paste the text below as your first message. It is written so the agent reads the steering docs itself; don't paste the docs.

---

You're starting a new project in this folder: <one sentence on what it is>. Nothing is built yet.

Before doing anything else:
0. <Only if the skills were prepared outside Claude Code:> Move every folder in `setup/claude-skills/` to `.claude/skills/` (so `.claude/skills/<name>/SKILL.md`), then delete the empty `setup/` folder.
1. Read `CLAUDE.md` and follow its read order (`PROJECT_CONTEXT.md`, `<DESIGN_VISION.md>`, then the active brief `docs/briefs/001_<NAME>.md`, then the sections of `<docs/DESIGN.md>` the brief references). Skim `docs/REFERENCE.md` and look at `<reference/<project>/<file>>` and `<…>`, since you'll port them.
2. Then stop and give me, in chat:
   - your implementation plan for brief 001, following its section order;
   - anything in the brief you think is ambiguous, contradictory, or impossible as written, with your proposed resolution;
   - any tooling or package choices beyond what the brief names.
   Don't write code until I reply.

After I approve:
- Implement brief 001 exactly. Its "Definition of done" is the finish line. Don't start the next phase, and don't tune beyond the values the brief gives; I'll tune after reading the results.
- Follow the mandatory rules in `CLAUDE.md`, especially <the project invariant>, the full-suite gate (`<gate command>`), and "stop and ask" whenever the brief and reality disagree.
- Anything you'd like to add that isn't in the brief goes into `docs/IDEAS.md` as a one-liner.
- Finish with the `session-handoff` skill and the final message the brief asks for.

If you run low on context mid-way, write a session handoff for the work so far (marked KNOWN INCOMPLETE where true) before stopping, so a fresh session can continue from it.
