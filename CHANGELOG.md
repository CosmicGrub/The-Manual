# Changelog

All notable changes to The Manual (curriculum + app) are logged here. This file is canonical and amended in place — see `MASTERFILE.md` for current state, `docs/diagrams/` for the visuals each entry below corresponds to.

## [0.1.0] — 2026-09-28 — Initial architecture & curriculum design

**Context:** First real content in this repo (previously just a one-line README). Designed from scratch per the request: a holistic, multi-tier, multi-track, skill-based coding/AI/hardware curriculum for self-teaching, delivered as an actual app rather than a static reading list.

**Added**
- `MASTERFILE.md` — canonical doc: 6-tier skill system, pedagogy toolkit, app architecture (stack, schema, API, UI), and the 8-track curriculum map.
- 8 curriculum tracks designed via a parallel multi-agent pass (Architect → 8 independent track designers → Reviewer): CS & Programming Foundations, Language Mastery, Software Engineering & Architecture, Hardware & Computer Systems, AI/ML & Prompt Engineering, Platform & Cross-Platform Dev, DevOps & Tooling, Capstones & Career Launch.
- `app/` — minimal-but-real Next.js + TypeScript + Prisma (SQLite, Postgres-ready) scaffold: DB schema (`User`, `Module`, `QuizAttempt`, `Checkpoint`, `CheckpointSubmission`, `Progress`, `ReviewState`), 3 working API routes (`/api/progress`, `/api/quiz-attempts`, `/api/review-queue`), SM-2 spaced-repetition engine (`lib/srs.ts`), a `SkillTree` dashboard component, and a `QuizRunner` component (grades client-side, schedules per-question spaced review on misses).
- `content/` — MDX + Velite content pipeline, with one fully worked example lesson (`cs-foundations/tier-0/what-is-code.mdx` + matching quiz) establishing the authoring format.
- `docs/diagrams/curriculum-map.mmd` and `docs/diagrams/app-architecture.mmd` — visual representations of the tier/track structure and the app's data flow.
- Google Drive folder `The Manual (Coding Curriculum)/` created and seeded with `MASTERFILE.md`, `CHANGELOG.md`, and both diagrams, to keep repo ↔ Drive in sync per standing rule.

**Decisions made**
- Content lives as git-versioned MDX (source of truth), not in a database or third-party CMS.
- Single-user, local-first by default (SQLite); schema is `userId`-scoped throughout so multi-user/Postgres is a config change, not a rewrite.
- Tiers are a soft gate (nudge, not lock) — this is a self-study tool, not a paywalled course platform.

**Open / deferred (see MASTERFILE.md §3.6 and §5 for the full list)**
- Full lesson content for all 8 tracks × 6 tiers (only Tier 0 of one track is fully written so far — the map is complete, the content is not).
- `/tracks/[trackId]`, lesson pages, `/review`, `/checkpoints/[id]`, `/resources` UI routes.
- Multi-user auth, AI-graded "explain it back," adaptive sequencing.
- Reviewer-flagged gaps and recommended additions — see MASTERFILE.md §5.

**Not synced this round:** Claude persistent memory / claude.ai Project knowledge — no tool in this session can write either; only the repo and Google Drive were updated.
