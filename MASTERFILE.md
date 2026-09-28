# The Manual — Masterfile

> **Canonical document.** This file, `CHANGELOG.md`, and `docs/diagrams/*.mmd` are the single source of truth for this project. They are amended in place, not duplicated — every design decision lives here, in the repo, and is mirrored to Google Drive (`The Manual (Coding Curriculum)` folder) after every change. See `CHANGELOG.md` for the history of *why* things changed.

## 0. Vision

A holistic, self-taught, multi-tier curriculum — and the app that delivers it — covering programming languages, software engineering, computer hardware/systems, AI/ML and prompt engineering, and cross-platform development (PC, mobile, web, embedded). Built for one learner (you) to go from absolute zero to genuine, provable expertise, with quizzes, checkpoints, and creative teaching methods baked in at every step — not just a reading list.

Two things ship together:
1. **The curriculum** — content, versioned as Markdown/MDX in `content/`.
2. **The app** — a small, real, locally-run learning platform in `app/` that serves that content, tracks progress, runs quizzes, and schedules spaced-repetition review.

---

## 1. Skill Tier System

Every track (below) is broken into the same 6 tiers, so progress is comparable across tracks and the dashboard can render one consistent skill-tree grid.

| Tier | Name | What it means |
|---|---|---|
| 0 | **Orientation & Literacy** | Absolute beginner. Can you use a terminal, understand what code/files/variables are, get a dev environment running. |
| 1 | **Foundations** | Core syntax/concepts of the domain, tightly guided exercises, heavy scaffolding. |
| 2 | **Builder** | Independent small projects applying fundamentals without hand-holding. |
| 3 | **Practitioner** | Intermediate. Real-world patterns, multi-file/multi-component projects, reading other people's code. |
| 4 | **Advanced / Specialist** | Deep specialization, performance, architecture-level thinking, contributing to larger systems. |
| 5 | **Expert / Innovator** | Research-adjacent. Novel systems, teaching/mentoring others, contributing upstream, inventing rather than applying. |

Tiers are a **soft gate** in the app (nudges, not hard locks) — this is self-study, not a paywall.

---

## 2. Pedagogy Toolkit

Every module draws from this menu for its quizzes and "creative methods" — never generic filler:

- **Micro-quizzes** — 5-10 questions, auto-gradable, spaced-repetition eligible.
- **Checkpoint projects** — gate to the next tier, rubric-graded, requires a real artifact (repo link, deployed app, etc.).
- **"Explain it back" / Feynman teach-backs** — free-text, self-graded, forces articulation over recognition.
- **Bug hunts / code-review katas** — given intentionally broken code, diagnose and fix.
- **Prompting drills** — get an AI to correctly help solve X; directly trains the "understand and prompt AI well" goal.
- **Build-then-break challenges** — build a feature, then try to break your own (or a peer's/AI's) implementation.
- **Spaced-repetition flashcards** — terminology and mental models, scheduled via SM-2 (see `app/src/lib/srs.ts`).
- **CTF-style / war-game challenges** — especially for security and debugging-heavy material.
- **Portfolio artifact requirement** — one shippable thing per tier, not just exercises.

---

## 3. App Architecture

### 3.1 Stack decision (recommended — see "Decisions Needed" in the chat response for what's still open)

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) + React + TypeScript + Tailwind | One deployable app, server + client components, no separate backend needed for a single learner. |
| Content | MDX files in `content/`, compiled by **Velite** into a typed JSON index | Git-versioned, diffable, reviewable curriculum — not locked in a database or CMS. |
| Data | **Prisma ORM**, SQLite by default | Zero-config, file-based, local-first. Every table is already `userId`-scoped, so switching `provider` to Postgres is the *entire* migration to a hosted/multi-user version. |
| API | Next.js Route Handlers (`app/api/**/route.ts`), plain REST/JSON | Simple, inspectable, no extra framework. |
| Auth | None yet (single local learner) | Deliberately deferred — see §3.5 Phase 2. |

### 3.2 File structure

```
The-Manual/
├── MASTERFILE.md              ← this file (canonical)
├── CHANGELOG.md                ← canonical changelog
├── README.md
├── docs/
│   └── diagrams/
│       ├── curriculum-map.mmd       ← 8 tracks x 6 tiers
│       └── app-architecture.mmd     ← content → DB → API → UI data flow
├── content/                    ← curriculum source of truth (git-versioned MDX)
│   ├── README.md               ← authoring format
│   ├── cs-foundations/tier-<N>/<slug>.mdx (+ .quiz.json)
│   ├── languages/...
│   ├── software-engineering/...
│   ├── hardware-systems/...
│   ├── ai-ml-prompting/...
│   ├── platforms/...
│   ├── devops-tooling/...
│   └── capstones-career/...
└── app/                         ← the delivery app
    ├── package.json / tsconfig.json / next.config.mjs / velite.config.ts
    ├── prisma/schema.prisma, seed.ts
    └── src/
        ├── app/                 (dashboard `page.tsx`, `layout.tsx`, `api/*`)
        ├── components/          (SkillTree, QuizRunner, ...)
        └── lib/                 (db.ts — Prisma client, srs.ts — SM-2, tracks.ts)
```

### 3.3 Database schema

See `app/prisma/schema.prisma` (source of truth for exact fields). Summary:

- `User` — one row per learner (single row by default).
- `Module` — mirrors a `content/**/*.mdx` file: `trackId`, `tier`, `title`, `estimatedHours`.
- `QuizAttempt` — one row per submission of a module's quiz set (aggregate score + raw per-question `answers` JSON). Quiz *questions* themselves are content, not data — they live in `content/**/*.quiz.json` next to the lesson, read client-side, never duplicated into the DB.
- `Checkpoint` / `CheckpointSubmission` — tier-gate projects and their submissions.
- `Progress` — per-user, per-module status (`not_started` / `in_progress` / `completed`) + rolling mastery score.
- `ReviewState` — generic SM-2 spaced-repetition scheduling, keyed by `(userId, itemId, itemType)`. `itemId` is an individual quiz-question id (from a `.quiz.json` file) or flashcard id — granular per question, not per module — so review targets exactly what was missed.

### 3.4 API endpoints (implemented as stubs — see `app/src/app/api/`)

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/progress` | GET | This learner's status across every module. |
| `/api/progress` | POST | Mark a module `in_progress`/`completed`. |
| `/api/quiz-attempts` | POST | Submit a module's quiz attempt (`{userId, moduleId, score, answers, missedQuestionIds}`); updates mastery score and seeds per-question spaced review for each missed question id. |
| `/api/review-queue` | GET | Items due for spaced-repetition review right now. |
| `/api/review-queue` | POST | Grade a review item (0-5 recall quality); reschedules via SM-2. |

Not yet implemented (documented for the next build pass): `/api/checkpoints/:id/submit`, `/api/tracks` (static track/tier listing for client-side nav).

### 3.5 UI architecture

- `/` — **Dashboard**: skill-tree grid (`SkillTree.tsx`, 8 tracks × 6 tiers, color-coded by status), "continue where you left off."
- `/tracks/[trackId]` — tier ladder for one track *(not yet built)*.
- `/tracks/[trackId]/[tier]/[slug]` — lesson content (MDX) + inline `QuizRunner` *(not yet built)*.
- `/review` — spaced-repetition queue *(linked from dashboard; page not yet built)*.
- `/checkpoints/[id]` — checkpoint brief + submission form *(not yet built)*.
- `/resources` — curated resource library, filterable by track/tier *(not yet built)*.

### 3.6 Phase 2 (deliberately deferred, schema-ready)

- **Multi-user auth** (NextAuth) — schema already carries `userId` everywhere.
- **Postgres migration** — one-line `provider` change in `schema.prisma`.
- **AI-graded "explain it back"** — currently self-graded; could pipe the answer to an LLM rubric grader.
- **Adaptive sequencing** — use `masteryScore` + `ReviewState` history to reorder what's suggested next, not just gate tiers linearly.

---

## 4. Curriculum Map (8 Tracks × 6 Tiers)

_Generated by a parallel multi-agent design pass (Architect → 8 track designers → Reviewer), 2026-09-28. Full detail — every tier's modules, quiz types, checkpoint project, creative methods, and curated resources — lives in `content/<track>/` as it's written; this section is the map, not a duplicate of the lesson content itself._

<!-- CURRICULUM_TRACKS_PLACEHOLDER -->

---

## 5. Reviewer Findings — Gaps, Redundancies, Recommended Additions

_Independent reviewer pass across all 8 tracks. This is the running answer to "what more can we add to improve this" — treat it as a backlog, not a one-time list; re-run this review as tracks fill out._

<!-- REVIEWER_FINDINGS_PLACEHOLDER -->

---

## 6. Sync Status

| Location | Status |
|---|---|
| Repo (`claude/coding-curriculum-design-nfkmqz`) | Canonical — this is the file being edited. |
| Google Drive (`The Manual (Coding Curriculum)/`) | Mirrored after every amendment to this file. |
| Claude memory / Project knowledge | **Not available from this session** — this CLI session has no tool to write Claude's persistent memory or claude.ai Project knowledge. If you want this mirrored there too, do it from a claude.ai chat session, or ask and I'll flag exactly what's missing. |

Decision log lives in `CHANGELOG.md`.
