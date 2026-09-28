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

**Added (curriculum content, from the parallel design pass)**
- `docs/curriculum/<track-id>.md` × 8 — full tier-by-tier syllabus per track (modules, quiz types, checkpoint project, creative methods, curated resources), linked from MASTERFILE.md §4. ~3,265 estimated hours of curriculum mapped across all 8 tracks × 6 tiers.
- MASTERFILE.md §5 filled in with the independent reviewer's findings: 14 gaps, 8 redundancies, 14 prioritized recommended additions, 7 structural fixes, and 9 standout strengths to preserve. This is the running answer to "what more can we add."

**Open / deferred (see MASTERFILE.md §3.6 and §5 for the full list)**
- Full lesson *prose* content for all 8 tracks × 6 tiers (only Tier 0 of CS Foundations is fully written as MDX so far — the syllabus/map is complete, the lesson text is not; writing ~240 modules of lesson content is its own large, separate effort).
- `/tracks/[trackId]`, lesson pages, `/review`, `/checkpoints/[id]`, `/resources` UI routes.
- Multi-user auth, AI-graded "explain it back," adaptive sequencing.
- The reviewer's top structural fix — no cross-track sequencing/prerequisite map exists yet, so the 8 tracks currently read as 8 excellent but disconnected books. Recommended as the next design pass before writing lesson content at scale.

**Not synced this round:** Claude persistent memory / claude.ai Project knowledge — no tool in this session can write either; only the repo and Google Drive were updated.
