# The Manual

A holistic, self-taught coding curriculum — plus the app that delivers it — spanning programming languages, software engineering, computer hardware/systems, AI/ML and prompt engineering, and cross-platform development (PC, mobile, web, embedded).

**Start here:** [`MASTERFILE.md`](./MASTERFILE.md) — the canonical architecture and curriculum map. See [`CHANGELOG.md`](./CHANGELOG.md) for how this project has evolved.

## Layout

- `content/` — the curriculum itself: MDX lessons + quizzes, organized `<track>/tier-<0-5>/`.
- `app/` — the Next.js app that serves lessons, runs quizzes, tracks progress, and schedules spaced-repetition review.
- `docs/diagrams/` — Mermaid diagrams of the curriculum map and app architecture.

## Running the app

```bash
cd app
cp .env.example .env
npm install
npm run build   # compiles content/ via Velite, then builds Next.js
npx prisma db push
npm run db:seed
npm run dev
```
