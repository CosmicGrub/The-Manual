# Content authoring format

Every lesson is one `.mdx` file under `content/<trackId>/tier-<N>/<slug>.mdx`, with frontmatter matching the schema in `app/velite.config.ts`:

```mdx
---
trackId: cs-foundations
tier: 0
title: What Is Code, Actually?
order: 1
estimatedHours: 1.5
---

Lesson body in MDX (Markdown + JSX) goes here...
```

`app/velite.config.ts` compiles every file matching this pattern into a typed JSON index (`.velite/lessons.json`) at build time. `prisma/seed.ts` then mirrors that index into the `Module` table so progress, quizzes, and checkpoints can reference a stable `moduleId` (`<trackId>/tier-<tier>/<slug>`).

Quiz questions for a lesson live in a sibling `<slug>.quiz.json` file (array of `QuizQuestion` objects, shape defined in `app/src/components/QuizRunner.tsx`) — kept separate from lesson prose so quizzes can be regenerated/revised independently.

See `MASTERFILE.md` for the full 8-track x 6-tier curriculum map this content fills in.
