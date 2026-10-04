# The Manual — Masterfile

> **Canonical document.** This file, `CHANGELOG.md`, and `docs/diagrams/*.mmd` are the single source of truth for this project. They are amended in place, not duplicated — every design decision lives here, in the repo, on the `claude/coding-curriculum-design-nfkmqz` branch. **The GitHub repo is the sole canonical location** (standing rule as of 2026-09-28 — see §6); nothing here is mirrored to Google Drive or anywhere else. See `CHANGELOG.md` for the history of *why* things changed.

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
├── docker-compose.yml           ← `docker compose up --build` — identical on Windows/macOS/any Linux distro
├── docs/
│   ├── running-on-your-devices.md   ← per-OS setup + Android (phone/tablet) LAN + PWA install guide
│   ├── curriculum/              ← full tier-by-tier syllabus per track
│   └── diagrams/
│       ├── curriculum-map.mmd       ← 9 tracks x 6 tiers
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
│   ├── cybersecurity-ethical-hacking/...
│   └── capstones-career/...
└── app/                         ← the delivery app
    ├── package.json / tsconfig.json / next.config.mjs / velite.config.ts
    ├── Dockerfile / docker-entrypoint.sh / .dockerignore
    ├── scripts/gen-precache-manifest.mjs   ← writes public/precache-manifest.json (content-hash versioned) after every `velite build`
    ├── public/manifest.json, sw.js, offline.html, icons/   ← PWA + full-curriculum offline precaching (§3.8)
    ├── prisma/schema.prisma, seed.ts
    └── src/
        ├── app/
        │   ├── page.tsx (dashboard), layout.tsx, api/*
        │   ├── tracks/[trackId]/page.tsx                    ← statically generated tier ladder
        │   ├── tracks/[trackId]/[tier]/[slug]/page.tsx      ← statically generated lesson + embedded quiz
        │   ├── review/page.tsx                              ← spaced-repetition queue
        │   ├── resources/page.tsx                           ← statically generated resource library
        │   └── checkpoints/[...id]/page.tsx                 ← statically generated checkpoint + submission form
        ├── components/          (SkillTree, QuizRunner, LessonProgressButton, ReviewQueueItem,
        │                         RegisterServiceWorker, OfflineOutboxFlusher, ResourceLibrary,
        │                         CheckpointSubmissionForm, ...)
        └── lib/                 (db.ts — Prisma client, srs.ts — SM-2, tracks.ts, content.ts — Velite
                                   lesson accessors, quizzes.ts — server-side quiz reads, user.ts,
                                   curriculumDocs.ts — reads docs/curriculum/*.md for resources +
                                   checkpoint briefs, checkpoints.ts — Checkpoint DB upsert + rubric,
                                   offlineOutbox.ts — IndexedDB write queue)
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

| `/api/checkpoint-submissions` | GET | This learner's submission history for one checkpoint (`?userId=&checkpointId=`), newest first. |
| `/api/checkpoint-submissions` | POST | Submit a checkpoint attempt (`{userId, checkpointId, artifactUrl, selfRubric}`); self-graded — `selfRubric` is a boolean array aligned to the fixed rubric in `app/src/lib/checkpoints.ts`, and `status` is derived (`passed` if every item is checked, else `needs_revision`). Upserts the `Checkpoint` row first (`ensureCheckpoint()`) so a submission never fails its foreign-key check regardless of seed timing — same reasoning as `ensureUser()`.

Not yet implemented: `/api/tracks` (a static track/tier listing endpoint — not currently needed since `getAllLessonParams()`/`getLessonsByTrack()` in `app/src/lib/content.ts` serve that purpose directly to server components at build time).

Every mutating endpoint above is called through `app/src/lib/offlineOutbox.ts`'s `postWithOfflineFallback()` from the client, not a raw `fetch` — see §3.8.

### 3.5 UI architecture

- `/` — **Dashboard**: skill-tree grid (`SkillTree.tsx`, 9 tracks × 6 tiers, color-coded by status, each track name links to its `/tracks/[trackId]` page). Dynamic (per-request Prisma read) — offline behavior via SW cache fallback, see §3.8.
- `/tracks/[trackId]` — tier ladder for one track: all 6 tiers, every written lesson linked, with a note pointing to `docs/curriculum/<trackId>.md` where a tier has no lessons yet. **Statically generated** (`generateStaticParams` over every track).
- `/tracks/[trackId]/[tier]/[slug]` — the lesson itself: rendered Markdown body (`dangerouslySetInnerHTML` from Velite's `s.markdown()` output — safe, this is our own authored content) + a "mark complete" button + an inline `QuizRunner` fed the matching `.quiz.json`, read server-side via `app/src/lib/quizzes.ts`. **Statically generated** (`generateStaticParams` over every lesson) — this is what makes a lesson's content *and* its quiz fully available offline with zero extra network request once cached.
- `/review` — today's spaced-repetition queue: due `ReviewState` rows resolved back to their source quiz question via `resolveQuizQuestionItem()`, graded 0-5 through `ReviewQueueItem.tsx`. Dynamic (today's due set is per-moment) — offline behavior via SW cache fallback, see §3.8.
- `/checkpoints/[...id]` — checkpoint brief (read from `docs/curriculum/<track>.md` via `app/src/lib/curriculumDocs.ts`, not duplicated into MDX) + a self-graded submission form (`CheckpointSubmissionForm.tsx`): artifact-URL link, a fixed 3-item self-rubric (`app/src/lib/checkpoints.ts` — deliberately uniform across all 54 checkpoints rather than regex-extracting inconsistent per-checkpoint criteria from free-form syllabus prose, see that file's comment), and submission history fetched client-side. **Statically generated** (`generateStaticParams` over all 54 track×tier checkpoints) — the catch-all `[...id]` segment is needed because a checkpoint's id contains slashes (`<trackId>/tier-<tier>/checkpoint`, matching `Checkpoint.id` in `schema.prisma`).
- `/resources` — curated resource library (301 resources across all 9 tracks, parsed from every `docs/curriculum/<track>.md`'s per-tier "Curated resources" list by `app/src/lib/curriculumDocs.ts`), filterable by track/tier plus free-text search (`ResourceLibrary.tsx`, client-side filtering over the full static list). **Statically generated**, linked from the dashboard and from each track page's per-tier header (deep-linked with `?track=&tier=` to open pre-filtered).

### 3.6 Phase 2 (deliberately deferred, schema-ready)

- **Multi-user auth** (NextAuth) — schema already carries `userId` everywhere.
- **Postgres migration** — one-line `provider` change in `schema.prisma`.
- **AI-graded "explain it back"** — currently self-graded; could pipe the answer to an LLM rubric grader.
- **Adaptive sequencing** — use `masteryScore` + `ReviewState` history to reorder what's suggested next, not just gate tiers linearly.

### 3.7 Multi-device delivery (added 2026-09-28, per explicit request)

Target devices: a **Galaxy Z Fold 5** and **Galaxy Tab S9 FE** (connected over the same Wi-Fi as whichever PC runs the server), plus the PC itself across **Windows**, **macOS**, and **any Linux distro**. Nothing here changes the single-learner/local-first architecture (§3.1) — it makes that one server reachable and installable from more places, not multi-tenant.

- **PC, any OS:** `docker compose up --build` (repo-root `docker-compose.yml` → `app/Dockerfile`, Debian-based so Prisma's glibc-built engines behave identically regardless of host OS or Linux distro) — or run Node.js natively per `docs/running-on-your-devices.md`'s per-OS instructions.
- **LAN reachability:** `next dev`/`next start` now bind `0.0.0.0` (`app/package.json`), so any device on the same Wi-Fi — not just the host machine — can reach `http://<host-LAN-IP>:3000`.
- **Android install (PWA):** `app/public/manifest.json` + `app/public/sw.js` (minimal service worker: cache-first for static assets, network-first-with-offline-fallback for page navigations) + SVG icons make the app installable from Chrome ("Install app") on both target devices, with a standalone window and its own home-screen icon.
- **Foldable/tablet-aware layout:** `app/src/app/layout.tsx` exports `viewport` with `viewportFit: 'cover'` and safe-area-inset padding, so content stays clear of a foldable's hinge/system-bar area whether the Z Fold 5 is folded (phone-width) or unfolded (tablet-width); nothing in the existing Tailwind layout assumed a fixed width to begin with.
- **Known limitation, documented rather than silently ignored:** full PWA install criteria technically want a secure context (HTTPS or `localhost`); a LAN IP is neither. Chrome on Android is lenient about this in practice, but `docs/running-on-your-devices.md` §4 gives the `mkcert`-based fix for anyone who hits it, plus the always-works fallback (use it as a normal browser tab — full functionality, just no home-screen icon).

Full setup, per-OS commands, and troubleshooting: **[`docs/running-on-your-devices.md`](./docs/running-on-your-devices.md)**.

### 3.8 Offline-first architecture (standing rule, added 2026-09-28)

**Standing rule: the app must be totally functional offline while always serving the most up-to-date curriculum content it can reach.** Not just an app-shell/icon that opens with no content — every written lesson, its quiz, and progress-tracking must work with zero network connection, and must refresh automatically the moment a connection is available again. This superseded §3.7's original, weaker claim ("live content still needs a real connection") and required building the lesson-viewing UI that §3.5 had deferred — you can't make offline content functional that the app can't display at all yet.

**How "totally offline" is actually achieved, not just claimed:**

- **Content is static, not server-rendered.** `/tracks/[trackId]` and every `/tracks/[trackId]/[tier]/[slug]` lesson page is generated at *build time* (`generateStaticParams`), with the lesson's quiz questions read server-side (`app/src/lib/quizzes.ts`) and baked directly into that static page. Once the service worker has a lesson page cached, reading it and taking its quiz needs no server at all — not "the PC's server is fast," genuinely zero network requests.
- **The service worker precaches the whole curriculum, not just the shell.** `app/scripts/gen-precache-manifest.mjs` runs after every `velite build` and lists every track/lesson URL in `public/precache-manifest.json`, keyed by a hash of the actual lesson content. `app/public/sw.js` fetches that manifest on install and caches every URL individually (not `cache.addAll`, which aborts the *entire* precache if even one URL fails) — one bad route can't silently take down offline access to everything else.
- **"Most up to date" is the cache-versioning strategy, not a one-time snapshot.** The precache-manifest's `version` is a content hash — it changes exactly when the curriculum genuinely changes (a rebuild with no content edits produces the same version, no wasted re-fetch). The service worker's `activate` handler deletes every cache except the current version's, and navigations are **network-first** (always try for the freshest page when online) with a cache fallback only when the network is unreachable — so the learner always sees live content when connected, and their last-synced snapshot when not.
- **Writes (quiz attempts, progress, review grades) are never lost to a dropped connection.** `app/src/lib/offlineOutbox.ts` is a small IndexedDB-backed outbox: every mutating call goes through `postWithOfflineFallback()`, which tries the network first and queues the request locally on failure. `OfflineOutboxFlusher.tsx` (mounted in the root layout) replays the queue on load and on the browser's `online` event. `QuizRunner` and `LessonProgressButton` both surface "saved offline — will sync" in the UI rather than silently succeeding or erroring.
- **Dynamic, per-user pages (`/`, `/review`) can't be statically generated** (they read live DB state), so their offline behavior is one tier down from lesson pages: the service worker serves the last cached snapshot when the network is unreachable, refreshed on every successful online visit — honest "last-known-state" behavior, not a crash or blank page.

**What this deliberately does not attempt:** a full bidirectional multi-device sync engine (if progress is recorded offline on the phone and separately offline on the PC before either syncs, last-write-wins per the existing `Progress`/`ReviewState` upsert semantics — there's no conflict-merge logic). That's a reasonable phase-2 addition (§3.6) once multi-user/multi-device usage is a real pattern, not a single learner's local-first app.

---

## 4. Curriculum Map (9 Tracks × 6 Tiers)

_The original 8 tracks were generated by a parallel multi-agent design pass (Architect → 8 track designers → Reviewer), 2026-09-28. A 9th track (Cybersecurity & Ethical Hacking) was added the same day via a separate design + safety-review pass, per explicit user request for white-hat/ethical-hacking content at every skill level — see CHANGELOG for the safety review's findings and the fixes applied before it shipped. Full detail — every tier's modules, quiz types, checkpoint project, creative methods, and curated resources — lives in `content/<track>/` as it's written; this section is the map, not a duplicate of the lesson content itself._

### Computer Science & Programming Foundations

_Full tier-by-tier syllabus: [`docs/curriculum/cs-foundations.md`](./docs/curriculum/cs-foundations.md) (~412 estimated hours across all 6 tiers)_

This is the bedrock track of The Manual: computational thinking, discrete math, algorithms & data structures, complexity/Big-O, and the algebra/stats/logic primer every other track (web, mobile, systems, hardware, security, AI/ML) quietly depends on. Unlike some tracks in this curriculum, no tier here is "light" — this track is designed to run at full depth from Tier 0 through Tier 5, because it IS the rigor the other seven tracks borrow. The one deliberate scoping choice: Tier 4's "Advanced Algorithms Specialization" module offers three alternate deep-dive paths (competitive-programming algorithms, compilers/PL theory, or theory-of-computation) rather than forcing all three — full compiler construction and deep systems/OS work are intentionally left to their own dedicated tracks elsewhere in The Manual, so this track goes deep on algorithmic and mathematical reasoning rather than becoming a systems track in disguise. A single teaching language (Python) carries Tiers 0-2 for maximum focus; Tier 3 deliberately introduces a second, statically-typed language purely for conceptual contrast, not as a switch of primary language.

*Modules per tier — T0: 6 modules · T1: 8 modules · T2: 8 modules · T3: 8 modules · T4: 7 modules · T5: 5 modules*

### Programming Language Mastery

_Full tier-by-tier syllabus: [`docs/curriculum/languages.md`](./docs/curriculum/languages.md) (~316 estimated hours across all 6 tiers — trimmed from the initial 330h by de-duplicating git/OOP/SQL/testing content now owned elsewhere, see MASTERFILE.md §4.5)_

A deliberate polyglot path from absolute-beginner terminal literacy to research-adjacent programming-language design, built around nine languages chosen for maximum real-world and cross-platform leverage: Python, JavaScript/TypeScript, C, C++, Rust, Java or C#, Go, SQL, and Bash/shell — plus an explicit meta-skill module on transferring concepts to pick up any future language quickly. Tier 0 sets up a reproducible multi-language dev environment and git literacy (intentionally light on general computer-literacy, which the CS Foundations track owns). Tier 1 builds core Python fluency with parallel JS exposure. Tier 2 adds TypeScript, a real systems language (C) with pointers and manual memory, and SQL. Tier 3 goes practitioner-level with C++, Java/C#/Go, advanced SQL, and reading/contributing to real codebases. Tier 4 goes deep into Rust's ownership model, advanced C++, Go concurrency/performance, and cross-language performance engineering, capped by a real open-source contribution. Tier 5 formalizes the "learn any language fast" meta-skill, builds a toy interpreter/compiler, and surveys comparative type systems/paradigms.

*Modules per tier — T0: 6 modules · T1: 6 modules · T2: 6 modules · T3: 6 modules · T4: 6 modules · T5: 6 modules*

### Software Engineering & Architecture

_Full tier-by-tier syllabus: [`docs/curriculum/software-engineering.md`](./docs/curriculum/software-engineering.md) (~269 estimated hours across all 6 tiers)_

This track is where "I can write code" turns into "I can build and maintain systems other people (or future-you) can trust." It covers version control as a real collaboration discipline, testing (unit/integration/e2e/TDD) as a design tool, SOLID and clean/hexagonal architecture, relational and NoSQL data modeling, API design, code review as a practiced craft, and system design fundamentals up through distributed-systems thinking. Tier 0 is intentionally light — general terminal/file/variable literacy is owned by CS Foundations. Tier 5's assessment shifts deliberately from quizzes to portfolio/peer/upstream-maintainer review. Throughout, this track is the connective tissue for the other seven: it turns raw language syntax and algorithms into maintainable systems, and makes the AI/ML track's "have the AI write the code" workflows safe rather than reckless.

*Modules per tier — T0: 4 modules · T1: 6 modules · T2: 6 modules · T3: 7 modules · T4: 6 modules · T5: 5 modules*

### Hardware & Computer Systems

_Full tier-by-tier syllabus: [`docs/curriculum/hardware-systems.md`](./docs/curriculum/hardware-systems.md) (~526 estimated hours across all 6 tiers)_

Takes a learner from "what is a bit, physically" to designing their own CPU on an FPGA and landing a real patch in an upstream kernel or RTOS. Runs bottom-up through digital logic/boolean algebra, computer architecture (CPU/memory/cache/buses), boot sequences, OS internals (processes/threads/memory/filesystems/scheduling), networking (TCP/IP/DNS/HTTP), embedded systems/electronics, and assembly language — the physical and systems layer every other track ultimately runs on. No tier is filler: even Tier 0 builds toward real gate-level circuits, and Tier 5 is explicitly scoped away from unreachable silicon fabrication toward the genuinely reachable frontier for a self-learner — FPGA-realized novel architectures, reproduced research results, and real upstream systems contributions.

*Modules per tier — T0: 5 modules · T1: 5 modules · T2: 5 modules · T3: 6 modules · T4: 6 modules · T5: 5 modules*

### AI, Machine Learning & Prompt Engineering

_Full tier-by-tier syllabus: [`docs/curriculum/ai-ml-prompting.md`](./docs/curriculum/ai-ml-prompting.md) (~381 estimated hours across all 6 tiers — Tier 1's math dropped from ~70h to ~42h after de-duplicating against CS Foundations' math spine, see MASTERFILE.md §4.5)_

Takes a learner from "what even is a token" to genuine AI/ML expertise: the math ML runs on, classical ML, neural networks/deep learning, NLP and the transformer architecture, LLM fundamentals (pretraining/fine-tuning/RLHF), prompt engineering as a real craft, building production systems with LLM APIs, agents/tool-use/RAG, evaluation/red-teaming/safety, and lightweight MLOps. This is deliberately the backbone track for the whole curriculum's AI-literacy goal — prompting isn't parked in one module, it's threaded through every tier at increasing sophistication (zero/few-shot → structured evaluation → agentic patterns → adversarial red-teaming → research-level interpretability) — while staying honest about deferring deep GPU microarchitecture to Hardware and on-platform shipping to Platforms.

*Modules per tier — T0: 5 modules · T1: 7 modules · T2: 6 modules · T3: 6 modules · T4: 6 modules · T5: 6 modules*

### Platform & Cross-Platform Development

_Full tier-by-tier syllabus: [`docs/curriculum/platforms.md`](./docs/curriculum/platforms.md) (~629 estimated hours across all 6 tiers)_

Takes a learner from "what is a terminal" to shipping and architecting real, production-grade software across every major surface: web (frontend/backend/full-stack), native mobile (iOS/Swift, Android/Kotlin), cross-platform mobile (React Native, Flutter), desktop (Electron, .NET MAUI, Qt), game dev basics, and cloud-native deployment. HTML/CSS/JS is the universal Tier-1 on-ramp because it transfers into every later surface. By Tier 3 the learner has shipped the *same product idea* to at least three surfaces, which is the only way "cross-platform tradeoffs" stops being trivia and becomes felt experience. From Tier 4 onward: architecture, performance, and cloud-native production patterns; Tier 5 moves from consuming frameworks to contributing to or inventing them.

*Modules per tier — T0: 4 modules · T1: 4 modules · T2: 5 modules · T3: 6 modules · T4: 6 modules · T5: 6 modules*

### DevOps, Tooling & Professional Practice

_Full tier-by-tier syllabus: [`docs/curriculum/devops-tooling.md`](./docs/curriculum/devops-tooling.md) (~317 estimated hours across all 6 tiers)_

Turns a self-learner into someone who can take code from a laptop to a reliable, observable, secure production system on any cloud, and work like a professional engineer while doing it. Runs from CLI fluency through Docker, CI/CD, Terraform/IaC, Kubernetes, observability, OWASP-level security, and SRE/platform-engineering leadership. Two deliberate scoping calls: Tier 0 here is heavier than a generic "orientation" tier elsewhere, because CLI fluency IS this track's home turf; and deep application-security/cryptography/exploit-development is kept out — this track only goes as deep as a working engineer needs for pipeline/supply-chain/infra security.

*Modules per tier — T0: 6 modules · T1: 7 modules · T2: 7 modules · T3: 7 modules · T4: 7 modules · T5: 6 modules*

### Capstones, Specializations & Career Launch

_Full tier-by-tier syllabus: [`docs/curriculum/capstones-career.md`](./docs/curriculum/capstones-career.md) (~352 estimated hours across all 6 tiers)_

The synthesis track — no single language or domain, just turning everything learned elsewhere into real, shipped, defensible work. At every tier the learner ships a cross-track capstone pulling together whatever fundamentals, languages, and systems knowledge they've accumulated so far. Starting at Tier 1 they sample six specialization branches (security/red-blue team, data engineering, robotics/IoT, game dev, ML research, systems/compilers), then progressively commit to one. Running in parallel: a real open-source contribution history and genuine DS&A + system-design interview fluency. Converges at Tier 5 in a self-designed "magnum opus" capstone at the intersection of two specializations, plus a teach-others-to-learn capstone that closes the curriculum's loop.

*Modules per tier — T0: 4 modules · T1: 4 modules · T2: 4 modules · T3: 5 modules · T4: 5 modules · T5: 5 modules*

### Cybersecurity & Ethical Hacking

_Full tier-by-tier syllabus: [`docs/curriculum/cybersecurity-ethical-hacking.md`](./docs/curriculum/cybersecurity-ethical-hacking.md) (~516 estimated hours across all 6 tiers, Tier 4 hours assume one specialization path)_

Closes two things at once: it teaches the learner to defend their own accounts and data (personal digital security — Tier 0 — which no other track covers), then builds a genuine white-hat progression on top of it — OWASP Top 10 web app security with real, coded remediation (Tier 1), independent CTF-platform practice (Tier 2), formal pentest methodology plus a real Active Directory home lab *and* the detection engineering to catch its own attacks (Tier 3), a choice of Red Team / Blue Team / Application Security specialization paths plus real bug-bounty basics (Tier 4), and research-level security work — contributing to real tooling, competing in real CTFs, responsible disclosure (Tier 5). Every exercise, at every tier, is confined to systems the learner owns, an isolated VM lab, or platforms that explicitly grant permission to be attacked for learning (OWASP Juice Shop/DVWA/WebGoat, PortSwigger Web Security Academy, TryHackMe, HackTheBox, picoCTF, OverTheWire, VulnHub) — never a real system without authorization. Added after the initial 8-track design, per explicit request, and put through its own safety-and-consistency review before shipping (see CHANGELOG).

*Modules per tier — T0: 4 modules · T1: 6 modules · T2: 5 modules · T3: 6 modules · T4: 6 modules · T5: 4 modules*

**Total estimated content:** ~3,718 hours across all 9 tracks (~3,202h across the original 8 after the de-duplication pass in §4.5, plus ~516h for the added Cybersecurity & Ethical Hacking track — see CHANGELOG). At a sustainable 10-15 hrs/week self-study pace, that's roughly 5-7 years to run every track to Tier 5 uniformly; §4.6's recommended path gets real AI + cross-platform competence in Year 1-2 instead, with full depth (including security specialization) added by choice afterward.

---

## 4.5 Canonical Ownership — De-duplication Policy

_Locked in 2026-09-28, resolving the reviewer's redundancy findings below. Applied to `docs/curriculum/*.md` on the same date — see CHANGELOG for exactly what was trimmed vs. only cross-referenced._

One track owns each topic's full depth; every other track that touches it teaches only its own angle and points to the owner instead of re-teaching from scratch.

| Topic | Canonical owner | Everyone else |
|---|---|---|
| General terminal/OS/computer literacy | **CS Foundations** Tier 0 | All other tracks' Tier 0 assumes this and only adds track-specific Tier-0 content. |
| Git/GitHub fundamentals | **CS Foundations** Tier 0 ("Git Day Zero") | Other tracks add only their own workflow norms (DevOps's GitOps angle, SE's PR-review etiquette), not the base commands. |
| Math spine (linear algebra, probability/stats, calculus, discrete math) + depth extensions (information theory, convex optimization, numerical stability) | **CS Foundations** Tiers 1 & 3 | **AI/ML** Tier 1 applies this math to ML — it does not re-derive it from zero. |
| OOP concepts (classes, inheritance, polymorphism, composition) | **CS Foundations** Tier 2 (concepts) + **Software Engineering** Tier 2 (SOLID/pattern application) | **Language Mastery** keeps only per-language OOP *syntax*. |
| SQL | **Software Engineering** Tier 1 | **Language Mastery** keeps only "calling SQL from your language" driver/ORM usage. |
| Testing/TDD philosophy | **Software Engineering** Tiers 1-2 | **Language Mastery** keeps only per-language test-runner mechanics (pytest/Jest syntax). |
| CI/CD | **DevOps** Tier 2 | **Software Engineering** Tier 3 keeps a lightweight "what CI gates your PRs" pointer only. |
| Deep networking (TCP/IP/DNS protocol theory) | **Hardware & Computer Systems** Tier 3 | **Software Engineering** and **DevOps** keep only their applied angles (HTTP-for-APIs, networking-for-ops) and point here for depth. |
| Deep application security, exploit development, penetration testing, red/blue team operations | **Cybersecurity & Ethical Hacking** (all tiers) | **Software Engineering** Tier 4 and **DevOps** Tiers 3-4 keep only their own angles (secure coding basics, pipeline/supply-chain/infra security) and point here for real offensive/defensive depth. **Capstones'** security/red-blue specialization branch (Tier 1 taster, Tier 4 deep-dive) now draws directly on this track's Tiers 2-4 rather than teaching pentesting from scratch. |

**Open-source contribution reconciliation:** a single real, externally-merged OSS PR may satisfy every track's open-source-contribution checkpoint gate simultaneously — once per learner, not once per track. The underlying skill (navigating a real contribution end to end) transfers; nothing is gained by requiring a separate PR per track.

**Tier-5 assessment policy (uniform across all 9 tracks):** from Tier 4 onward, assessment shifts from auto-graded quizzes toward portfolio, peer, and maintainer/community review — because expertise at that level is demonstrated by what's shipped and who's taught, not by what can be answered on a test. This was already explicit in CS Foundations, Software Engineering, Platforms, and DevOps; it now applies explicitly to Hardware Systems, AI/ML, Capstones, and (built in from the start) Cybersecurity & Ethical Hacking too.

## 4.6 Recommended Learning Path

_You asked for a concrete recommendation rather than choosing the sequencing yourself — here it is, built around your stated priorities (AI literacy + prompting, cross-platform building) and the prerequisite structure above. Treat phase boundaries as soft, not gates._

**Phase 0 — Universal Tier 0 (CS Foundations alone, ~4-6 weeks).** Everything else's Tier 0 now assumes this is done. Nothing else starts until this is solid.

**Phase 1 — Bedrock trio (~6-9 months).** Run these three concurrently, in lockstep tier-by-tier: **CS Foundations** Tiers 1-2 (algorithms, discrete math), **Language Mastery** Tiers 0-1 (Python + JS fluency), **Software Engineering** Tiers 0-1 (git workflows, testing, SQL — the things everything downstream assumes). Optionally sample **AI/ML** Tier 0 in parallel purely for orientation and motivation — it's now light and doesn't assume anything from this phase.

**Phase 2 — Math spine + first real AI literacy (~6-9 months).** **CS Foundations** Tier 3 (now including the info-theory/optimization/numerical-stability extensions) unlocks the real payoff: **AI/ML** Tiers 1-2 (now that the math prerequisite is genuinely met, not re-taught). Continue **Language Mastery** Tier 2 and **Software Engineering** Tier 2 alongside.

**Phase 3 — Choose your primary specialization (Year 2+).** Given your stated goals, the recommended primary pair is **AI/ML & Prompt Engineering** (Tiers 3-5) run alongside **Platform & Cross-Platform Development** (Tiers 1-3) — so AI work has somewhere real to ship. Pick up **Hardware Systems** and **DevOps & Tooling** to "just enough" depth (Tiers 1-2) to support those two, not maxed to Tier 5 unless systems/hardware becomes a specialization in its own right.

**Running throughout, not a separate phase:** **Capstones, Specializations & Career Launch** — its capstones draw on whatever the other tracks have reached so far (see the per-tier track mapping now added to `docs/curriculum/capstones-career.md`), and its open-source-contribution and interview-prep threads are meant to run continuously, not be deferred to the end.

**Cybersecurity & Ethical Hacking's place in this path:** its Tier 0 (personal digital security & privacy literacy) is worth doing early, alongside Phase 1 — like AI/ML's Tier 0, it's light and doesn't assume anything from this phase. Tiers 1-5 (the actual white-hat progression) are a genuine third specialization option alongside the AI/ML + Platforms pair recommended above; pick it up in Phase 3 if security is a real interest, not as a default.

**Deferred / opportunistic:** Hardware Systems and DevOps Tiers 3-5, Cybersecurity Tiers 1-5 (unless chosen as a specialization), and any track's Tier 5, are worth pursuing only where they match genuine interest or a chosen specialization — not as a uniform finish line. At ~3,718 total hours across 9 tracks, running all of them to Tier 5 is a multi-year undertaking; this path is designed to get real AI + cross-platform building competence in Year 1-2, with depth (security included) added by choice afterward.

---

## 5. Reviewer Findings — Gaps, Redundancies, Recommended Additions

_Independent reviewer pass across the original 8 tracks (2026-09-28, before Cybersecurity & Ethical Hacking was added as a 9th track — that track got its own dedicated safety-and-consistency review instead, see CHANGELOG). This is the running answer to "what more can we add to improve this" — treat it as a backlog, not a one-time list; re-run this review as tracks fill out._

### Gaps across all 8 tracks

- **Math depth**: linear algebra/probability/calculus are rebuilt from scratch independently in CS Foundations and again in AI/ML, but real depth topics needed for genuine AI literacy are missing entirely — information theory (entropy, KL divergence, cross-entropy loss), convex optimization theory beyond basic gradient descent, numerical stability/floating-point error analysis, multivariable calculus. No single authoritative math spine other tracks build on.
- **Personal digital security & privacy literacy** (password managers, 2FA, phishing recognition, safe browsing, basic privacy/ToS literacy) is entirely absent — existing security content is all about securing systems for others, never the learner's own digital self-defense.
- **Accessibility/inclusive design** is reduced to one bullet in one Platforms module. No WCAG, screen-reader testing, keyboard-only navigation, or accessible mobile/desktop design anywhere.
- **Agentic AI-assisted software development** (the dominant 2026 coding paradigm) is under-covered relative to your explicit ask — no module on spec-driven development for coding agents, reviewing large AI-generated diffs at scale, context engineering, or multi-agent SWE orchestration as its own discipline.
- **Eval-driven development** exists narrowly for LLM output (AI/ML Tier 2-4) but is never generalized as a cross-cutting engineering practice the way TDD is generalized in Software Engineering.
- **Data literacy for non-ML purposes** (spreadsheets, dashboards, descriptive statistics, A/B testing, causal inference, statistical fallacies) is missing entirely.
- **Technical writing & communication** as a standalone, progressively-built skill (not just embedded artifacts like READMEs/ADRs) is never explicitly taught.
- **Career/soft skills beyond interviewing**: no behavioral interviewing, negotiation, remote-collaboration norms, or freelancing/consulting basics.
- **GPU/parallel programming** (CUDA/Metal/compute shaders) is never taught hands-on, despite the AI-centric framing.
- **UX/UI & product design fundamentals** (visual design, typography/color theory, user research) are absent — Platforms teaches how to build UI but never how to design or validate one.
- **Legal/IP literacy** beyond "pick an OSS license" is missing (licensing depth, contracts, IP ownership of AI-generated code, compliance obligations).
- **Spatial/emerging platforms** (AR/VR/XR, wearables) are absent despite your "various other platforms" ask.
- **Functional programming** gets one Tier-5 survey module total — a major paradigm systematically under-taught vs. imperative/OOP.
- **No pacing guidance**: hours-per-module exist, but nothing states weekly pace, whether tracks run in parallel or sequentially, or total calendar time — a real usability gap (see §4's rough estimate above, and the sequencing gap below).

### Redundancies to cross-reference instead of duplicate

- Terminal/CLI literacy is independently re-taught in near-identical form in ≥6 tracks' Tier 0s; only 3 tracks explicitly defer to CS Foundations.
- Git/GitHub fundamentals are fully retaught in essentially every track's Tier 0, even tracks that already declared Tier 0 "light" on general literacy.
- Linear algebra & probability/statistics are taught twice at near-identical depth (CS Foundations Tiers 1/3, then AI/ML Tier 1 from zero) instead of AI/ML treating CS Foundations as a prerequisite.
- SQL fundamentals are full standalone modules in both Language Mastery Tier 2 and Software Engineering Tier 1, with no stated canonical owner.
- Unit testing/TDD basics are full modules in both Language Mastery Tier 2 and Software Engineering Tier 1-2.
- OOP fundamentals are introduced three separate times (CS Foundations T2, Language Mastery T2, Software Engineering T2) at overlapping depth.
- CI/CD and GitHub Actions are taught fully in both Software Engineering T3 and DevOps T2, without cross-referencing.
- Core networking (IP/DNS/ports/HTTP) is taught independently in Hardware T3, Software Engineering T1, and DevOps T1.

### Recommended additions (prioritized backlog — the direct answer to "what more can we add")

- **[HIGH] Master cross-track sequencing map / prerequisite matrix** — nothing states what order to walk the 8 tracks in, or which track's Tier N hard-requires another's Tier N. Without this, The Manual is 8 excellent but disconnected books, not one curriculum.
- **[HIGH] Unified math spine** shared between CS Foundations and AI/ML (not duplicated), extended with information theory, convex optimization, numerical stability.
- **[HIGH] Personal Digital Security & Privacy Literacy module** — early, cross-cutting, learner-facing (not just "how to secure systems for others").
- **[HIGH] Agentic AI-Assisted Development module/track** (spec-driven dev, reviewing AI-generated diffs at scale, context engineering, multi-agent SWE workflows) — the most direct answer to your "better prompting AI and developing things" goal; current content treats AI mainly as an API/chat partner rather than the dominant agentic coding paradigm.
- **[HIGH] Open-source contribution reconciliation policy** — a merged OSS PR is used as a hard checkpoint gate 20+ times across tracks with no rule on whether one contribution can satisfy multiple gates.
- **[MEDIUM] Accessibility & Inclusive Design module** (WCAG, screen readers, assistive tech, accessible testing across web/mobile/desktop).
- **[MEDIUM] UX/UI & Product Design Fundamentals module** (visual design, typography/color theory, lightweight user research).
- **[MEDIUM] Data Literacy & Applied Statistics module** (spreadsheets, dashboards, A/B testing, causal inference, statistical fallacies).
- **[MEDIUM] Technical Writing & Communication thread** across tiers, not just embedded artifacts.
- **[MEDIUM] GPU/Parallel Programming module** (CUDA/Metal/compute shaders) — bridges Hardware's CPU-concurrency depth and AI/ML's conceptual-only GPU treatment.
- **[MEDIUM] Career & Soft Skills expansion** (behavioral interviewing, negotiation, freelancing/consulting, remote collaboration norms).
- **[LOW] Functional Programming deep-dive branch** (Haskell/Elixir/Clojure/F#).
- **[LOW] Spatial Computing / AR-VR-XR platform module.**
- **[LOW] Business & Monetization for Shipped Products module** (App Store economics, SaaS pricing, indie monetization).

### Structural fixes needed

- Inconsistent Tier-0 scoping policy across tracks — needs one explicit curriculum-wide rule for what every Tier 0 assumes vs. teaches.
- No declared cross-track tier synchronization (finish a whole track before the next, vs. advance tier-by-tier across all 8 in parallel) — later tracks' tiers explicitly assume earlier tracks' tiers, so this ambiguity makes the curriculum hard to actually execute.
- The 20+ "land a real OSS PR" checkpoints across tracks aren't reconciled with each other.
- CS Foundations' Tier 3 "second statically-typed language" isn't mapped to Language Mastery's own explicit language sequence.
- Inconsistent Tier-5 assessment philosophy (some tracks explicitly retire quizzes for portfolio/peer review; others don't, without explanation).
- Wildly uneven per-tier hour totals (e.g., Hardware/Platforms Tier 1 run ~75+ hrs vs. AI/ML Tier 0's ~30 hrs) with no stated weekly pace.
- Capstones' per-tier goals say each capstone "combines tracks' Tier-N material" but never specify which 2-3 tracks feed which capstone tier.

### Standout strengths (don't dilute these)

- A single, consistent 6-tier skeleton applied identically across all 8 tracks gives the whole curriculum a coherent, navigable shape.
- Explicit, self-aware scope boundaries in track summaries show unusually high design discipline and honesty about what each track will and won't cover.
- The `ai_prompting_connection` / `cross_platform_connection` fields on every track directly operationalize your two core meta-goals instead of leaving them as vague aspirations.
- Creative methods (Feynman teach-backs, build-then-break, CTF-style war-games, spaced repetition, prompting drills graded against ground truth) are structurally embedded in every tier, not a one-off gimmick.
- High-quality, mostly free/official resource curation per module (MIT OCW, CS50, official vendor docs, primary-source papers) rather than generic reading lists.
- Checkpoint projects consistently produce public, portfolio-worthy artifacts as a side effect of coursework.
- Hardware track's honest Tier-5 scoping (away from unreachable silicon fabrication, toward genuinely achievable FPGA/research-reproduction work).
- Capstones' Tier 1 "sample all six specialization branches, then commit" design elegantly solves premature specialization.
- Deliberate assessment-shape evolution (auto-graded quizzes → portfolio/peer/maintainer review by Tier 4-5) correctly mirrors how real-world expertise is actually verified.

---

## 6. Sync Status

| Location | Status |
|---|---|
| Repo (`claude/coding-curriculum-design-nfkmqz`) | **Sole canonical location**, per standing rule set 2026-09-28. This is the file being edited. |
| Google Drive | **Discontinued as of 2026-09-28.** An early checkpoint (`MASTERFILE.md`, `CHANGELOG.md`, both diagrams) was briefly mirrored to a `The Manual (Coding Curriculum)` Drive folder earlier in this project's first session; that mirror is now stale/unmaintained and should be disregarded — the repo is authoritative. |
| Claude memory / Project knowledge | Not available from this session — no tool here can write either. Out of scope now that Drive sync is also discontinued for this project. |

Decision log lives in `CHANGELOG.md`.
