# @the-manual/core

Framework- and storage-agnostic business logic shared by The Manual's two
forks: `app/` (Next.js + Prisma + SQLite, the PC/LAN fork) and `mobile/`
(Capacitor + local on-device SQLite, the fully standalone Android fork).

No Prisma types, no Next.js APIs, no Capacitor APIs — every function here
takes plain data in and returns plain data out, so both forks' storage layers
can feed it their own shape without either one owning the logic. See
MASTERFILE.md §3.6.5 for why this split exists and what still lives
per-fork (actual DB reads/writes, UI, routing).

- `srs.ts` — SM-2 spaced-repetition scheduling.
- `suggestedNext.ts` — the deterministic "what's next" adaptive-sequencing algorithm.
- `quizGrading.ts` — multiple-choice/short-answer grading.
- `checkpoints.ts` — the shared self-rubric.
- `types.ts` — the plain-data shapes (`Lesson`, `ProgressRow`, `QuizQuestion`) everything above is written against.

No build step — both forks import the TypeScript source directly via a path
alias (`app/tsconfig.json`'s `paths`, and `mobile/`'s bundler config once it
exists) and let their own compiler transpile it, rather than publishing a
compiled package two consumers would have to keep in sync.
