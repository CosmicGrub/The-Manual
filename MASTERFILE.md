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

### Computer Science & Programming Foundations

_Full tier-by-tier syllabus: [`docs/curriculum/cs-foundations.md`](./docs/curriculum/cs-foundations.md) (~406 estimated hours across all 6 tiers)_

This is the bedrock track of The Manual: computational thinking, discrete math, algorithms & data structures, complexity/Big-O, and the algebra/stats/logic primer every other track (web, mobile, systems, hardware, security, AI/ML) quietly depends on. Unlike some tracks in this curriculum, no tier here is "light" — this track is designed to run at full depth from Tier 0 through Tier 5, because it IS the rigor the other seven tracks borrow. The one deliberate scoping choice: Tier 4's "Advanced Algorithms Specialization" module offers three alternate deep-dive paths (competitive-programming algorithms, compilers/PL theory, or theory-of-computation) rather than forcing all three — full compiler construction and deep systems/OS work are intentionally left to their own dedicated tracks elsewhere in The Manual, so this track goes deep on algorithmic and mathematical reasoning rather than becoming a systems track in disguise. A single teaching language (Python) carries Tiers 0-2 for maximum focus; Tier 3 deliberately introduces a second, statically-typed language purely for conceptual contrast, not as a switch of primary language.

*Modules per tier — T0: 6 modules · T1: 8 modules · T2: 8 modules · T3: 8 modules · T4: 7 modules · T5: 5 modules*

### Programming Language Mastery

_Full tier-by-tier syllabus: [`docs/curriculum/languages.md`](./docs/curriculum/languages.md) (~330 estimated hours across all 6 tiers)_

A deliberate polyglot path from absolute-beginner terminal literacy to research-adjacent programming-language design, built around nine languages chosen for maximum real-world and cross-platform leverage: Python, JavaScript/TypeScript, C, C++, Rust, Java or C#, Go, SQL, and Bash/shell — plus an explicit meta-skill module on transferring concepts to pick up any future language quickly. Tier 0 sets up a reproducible multi-language dev environment and git literacy (intentionally light on general computer-literacy, which the CS Foundations track owns). Tier 1 builds core Python fluency with parallel JS exposure. Tier 2 adds TypeScript, a real systems language (C) with pointers and manual memory, and SQL. Tier 3 goes practitioner-level with C++, Java/C#/Go, advanced SQL, and reading/contributing to real codebases. Tier 4 goes deep into Rust's ownership model, advanced C++, Go concurrency/performance, and cross-language performance engineering, capped by a real open-source contribution. Tier 5 formalizes the "learn any language fast" meta-skill, builds a toy interpreter/compiler, and surveys comparative type systems/paradigms.

*Modules per tier — T0: 6 modules · T1: 6 modules · T2: 6 modules · T3: 6 modules · T4: 6 modules · T5: 6 modules*

### Software Engineering & Architecture

_Full tier-by-tier syllabus: [`docs/curriculum/software-engineering.md`](./docs/curriculum/software-engineering.md) (~272 estimated hours across all 6 tiers)_

This track is where "I can write code" turns into "I can build and maintain systems other people (or future-you) can trust." It covers version control as a real collaboration discipline, testing (unit/integration/e2e/TDD) as a design tool, SOLID and clean/hexagonal architecture, relational and NoSQL data modeling, API design, code review as a practiced craft, and system design fundamentals up through distributed-systems thinking. Tier 0 is intentionally light — general terminal/file/variable literacy is owned by CS Foundations. Tier 5's assessment shifts deliberately from quizzes to portfolio/peer/upstream-maintainer review. Throughout, this track is the connective tissue for the other seven: it turns raw language syntax and algorithms into maintainable systems, and makes the AI/ML track's "have the AI write the code" workflows safe rather than reckless.

*Modules per tier — T0: 4 modules · T1: 6 modules · T2: 6 modules · T3: 7 modules · T4: 6 modules · T5: 5 modules*

### Hardware & Computer Systems

_Full tier-by-tier syllabus: [`docs/curriculum/hardware-systems.md`](./docs/curriculum/hardware-systems.md) (~532 estimated hours across all 6 tiers)_

Takes a learner from "what is a bit, physically" to designing their own CPU on an FPGA and landing a real patch in an upstream kernel or RTOS. Runs bottom-up through digital logic/boolean algebra, computer architecture (CPU/memory/cache/buses), boot sequences, OS internals (processes/threads/memory/filesystems/scheduling), networking (TCP/IP/DNS/HTTP), embedded systems/electronics, and assembly language — the physical and systems layer every other track ultimately runs on. No tier is filler: even Tier 0 builds toward real gate-level circuits, and Tier 5 is explicitly scoped away from unreachable silicon fabrication toward the genuinely reachable frontier for a self-learner — FPGA-realized novel architectures, reproduced research results, and real upstream systems contributions.

*Modules per tier — T0: 5 modules · T1: 5 modules · T2: 5 modules · T3: 6 modules · T4: 6 modules · T5: 5 modules*

### AI, Machine Learning & Prompt Engineering

_Full tier-by-tier syllabus: [`docs/curriculum/ai-ml-prompting.md`](./docs/curriculum/ai-ml-prompting.md) (~410 estimated hours across all 6 tiers)_

Takes a learner from "what even is a token" to genuine AI/ML expertise: the math ML runs on, classical ML, neural networks/deep learning, NLP and the transformer architecture, LLM fundamentals (pretraining/fine-tuning/RLHF), prompt engineering as a real craft, building production systems with LLM APIs, agents/tool-use/RAG, evaluation/red-teaming/safety, and lightweight MLOps. This is deliberately the backbone track for the whole curriculum's AI-literacy goal — prompting isn't parked in one module, it's threaded through every tier at increasing sophistication (zero/few-shot → structured evaluation → agentic patterns → adversarial red-teaming → research-level interpretability) — while staying honest about deferring deep GPU microarchitecture to Hardware and on-platform shipping to Platforms.

*Modules per tier — T0: 5 modules · T1: 7 modules · T2: 6 modules · T3: 6 modules · T4: 6 modules · T5: 6 modules*

### Platform & Cross-Platform Development

_Full tier-by-tier syllabus: [`docs/curriculum/platforms.md`](./docs/curriculum/platforms.md) (~635 estimated hours across all 6 tiers)_

Takes a learner from "what is a terminal" to shipping and architecting real, production-grade software across every major surface: web (frontend/backend/full-stack), native mobile (iOS/Swift, Android/Kotlin), cross-platform mobile (React Native, Flutter), desktop (Electron, .NET MAUI, Qt), game dev basics, and cloud-native deployment. HTML/CSS/JS is the universal Tier-1 on-ramp because it transfers into every later surface. By Tier 3 the learner has shipped the *same product idea* to at least three surfaces, which is the only way "cross-platform tradeoffs" stops being trivia and becomes felt experience. From Tier 4 onward: architecture, performance, and cloud-native production patterns; Tier 5 moves from consuming frameworks to contributing to or inventing them.

*Modules per tier — T0: 4 modules · T1: 4 modules · T2: 5 modules · T3: 6 modules · T4: 6 modules · T5: 6 modules*

### DevOps, Tooling & Professional Practice

_Full tier-by-tier syllabus: [`docs/curriculum/devops-tooling.md`](./docs/curriculum/devops-tooling.md) (~326 estimated hours across all 6 tiers)_

Turns a self-learner into someone who can take code from a laptop to a reliable, observable, secure production system on any cloud, and work like a professional engineer while doing it. Runs from CLI fluency through Docker, CI/CD, Terraform/IaC, Kubernetes, observability, OWASP-level security, and SRE/platform-engineering leadership. Two deliberate scoping calls: Tier 0 here is heavier than a generic "orientation" tier elsewhere, because CLI fluency IS this track's home turf; and deep application-security/cryptography/exploit-development is kept out — this track only goes as deep as a working engineer needs for pipeline/supply-chain/infra security.

*Modules per tier — T0: 6 modules · T1: 7 modules · T2: 7 modules · T3: 7 modules · T4: 7 modules · T5: 6 modules*

### Capstones, Specializations & Career Launch

_Full tier-by-tier syllabus: [`docs/curriculum/capstones-career.md`](./docs/curriculum/capstones-career.md) (~354 estimated hours across all 6 tiers)_

The synthesis track — no single language or domain, just turning everything learned elsewhere into real, shipped, defensible work. At every tier the learner ships a cross-track capstone pulling together whatever fundamentals, languages, and systems knowledge they've accumulated so far. Starting at Tier 1 they sample six specialization branches (security/red-blue team, data engineering, robotics/IoT, game dev, ML research, systems/compilers), then progressively commit to one. Running in parallel: a real open-source contribution history and genuine DS&A + system-design interview fluency. Converges at Tier 5 in a self-designed "magnum opus" capstone at the intersection of two specializations, plus a teach-others-to-learn capstone that closes the curriculum's loop.

*Modules per tier — T0: 4 modules · T1: 4 modules · T2: 4 modules · T3: 5 modules · T4: 5 modules · T5: 5 modules*

**Total estimated content:** ~3,265 hours across all 8 tracks (rough — see Reviewer Findings below: no pacing/sequencing guidance exists yet, which is itself flagged as a high-priority gap). At a sustainable 10-15 hrs/week self-study pace, that's roughly 4-6 years to run every track to Tier 5; most learners should expect to specialize (per §5) rather than max out all 8 tracks uniformly.

---

## 5. Reviewer Findings — Gaps, Redundancies, Recommended Additions

_Independent reviewer pass across all 8 tracks. This is the running answer to "what more can we add to improve this" — treat it as a backlog, not a one-time list; re-run this review as tracks fill out._

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
| Repo (`claude/coding-curriculum-design-nfkmqz`) | Canonical — this is the file being edited. |
| Google Drive (`The Manual (Coding Curriculum)/`) | Mirrored after every amendment to this file. |
| Claude memory / Project knowledge | **Not available from this session** — this CLI session has no tool to write Claude's persistent memory or claude.ai Project knowledge. If you want this mirrored there too, do it from a claude.ai chat session, or ask and I'll flag exactly what's missing. |

Decision log lives in `CHANGELOG.md`.
