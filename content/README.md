# Content authoring format

Every lesson is one `.mdx` file under `content/<trackId>/tier-<N>/<slug>.mdx`, with frontmatter matching the schema in `app/velite.config.ts`:

```mdx
---
trackId: cs-foundations
tier: 0
title: What Even Is a Computer?
order: 1
estimatedHours: 4
---

Lesson body in MDX (Markdown + JSX) goes here...
```

CS Foundations' Tier 0 (`content/cs-foundations/tier-0/`) has all 6 modules written as real, complete lessons — use it as the reference example for tone, the "Do this" / "Check on learning" structure, and quiz-question style before writing any other track's content.

`app/velite.config.ts` compiles every file matching this pattern into a typed JSON index (`.velite/lessons.json`) at build time. `prisma/seed.ts` then mirrors that index into the `Module` table so progress, quizzes, and checkpoints can reference a stable `moduleId` (`<trackId>/tier-<tier>/<slug>`).

Quiz questions for a lesson live in a sibling `<slug>.quiz.json` file (array of `QuizQuestion` objects, shape defined in `app/src/components/QuizRunner.tsx`) — kept separate from lesson prose so quizzes can be regenerated/revised independently.

See `MASTERFILE.md` §4 for the curriculum map overview, and `docs/curriculum/<track-id>.md` for each track's full tier-by-tier module list, quiz types, checkpoint project, and curated resources — that's the syllabus this directory's `.mdx` files should be written against, module by module.
