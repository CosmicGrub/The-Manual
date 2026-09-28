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

**Not synced this round:** Claude persistent memory / claude.ai Project knowledge — no tool in this session can write either.

**Policy change (same session):** per explicit user instruction, this project stops using Google Drive — **the GitHub repo is now the sole canonical location** for `MASTERFILE.md`, `CHANGELOG.md`, and everything else. The `The Manual (Coding Curriculum)` Drive folder created earlier this session (seeded with an early checkpoint of these files plus both diagrams) is not being cleaned up or further maintained; treat it as stale. No more Drive writes will happen for this project going forward.

## [0.1.1] — 2026-09-28 — Structural fixes (de-duplication + sequencing) per locked-in decisions

**Context:** After presenting the initial 8-track design, the user was asked to lock in baseline decisions (AskUserQuestion). They chose: fix the reviewer's structural findings *before* writing lesson content; recommend a concrete cross-track sequencing path rather than picking one themselves; start real lesson content with CS Foundations once structure is fixed; hold app development for now. This entry covers the structural-fix half of that decision.

**Added**
- MASTERFILE.md §4.5 — a canonical-ownership de-duplication policy: one track now owns each topic's full depth (general Tier-0 literacy → CS Foundations; git → CS Foundations; math spine + new depth extensions → CS Foundations; OOP concepts → CS Foundations/Software Engineering; SQL → Software Engineering; testing/TDD → Software Engineering; CI/CD → DevOps; deep networking → Hardware Systems), plus a one-PR-satisfies-every-track's-OSS-gate reconciliation policy and a uniform Tier-5 quiz-retirement policy.
- MASTERFILE.md §4.6 — the recommended cross-track learning path the user asked for: Phase 0 (CS Foundations Tier 0 alone) → Phase 1 (bedrock trio: CS Foundations + Language Mastery + Software Engineering, Tiers 1-2) → Phase 2 (math spine completion unlocks AI/ML Tiers 1-2) → Phase 3 (primary specialization pair: AI/ML + Platforms, with Hardware/DevOps at supporting depth) → Capstones running throughout, not deferred to the end.

**Changed (docs/curriculum/*.md, all 8 tracks)**
- `cs-foundations.md`: added information-theory (Tier 1) and convex-optimization/numerical-stability (Tier 3) extensions to the math spine; marked explicit canonical-owner status for literacy, git, math, and OOP concepts.
- `languages.md`: trimmed Tier 0 git module to polyglot-specific conventions only (6h→2h); trimmed Tier 2 SQL module to driver/ORM usage only (8h→3h); trimmed Tier 2 testing module to runner-syntax only (6h→4h); added OOP cross-reference.
- `software-engineering.md`: marked SQL and testing/TDD modules as canonical-owner; trimmed CI module to a lightweight pointer (5h→2h) since DevOps Tier 2 is now the canonical CI/CD depth; added HTTP↔networking cross-reference to Hardware Tier 3.
- `hardware-systems.md`: cut the fully-redundant "Terminal & OS Literacy" module from Tier 0 (28h→22h) now that CS Foundations Tier 0 owns it; marked networking module as canonical deep version; added Tier-5 assessment-policy framing.
- `ai-ml-prompting.md` (the largest change): Tier 1's from-scratch linear algebra/probability/calculus modules (~70h) rewritten as ML-application-only modules assuming CS Foundations' math spine as a hard prerequisite (~42h) — cuts ~28h of pure duplication while keeping all ML-specific content; trimmed Tier 0's redundant terminal-basics line; updated resource list to stop re-citing the same MIT OCW/Khan Academy courses CS Foundations already cites; added Tier-5 assessment-policy framing.
- `platforms.md`: trimmed Tier 0 git module to platform-specific conventions only (8h→2h).
- `devops-tooling.md`: Tier 0 rewritten with explicit "why heavier, and only for CLI-specific depth" framing per the reviewer's inconsistency finding, cutting the parts that were pure re-teaching of CS Foundations basics (24h→15h) while keeping and justifying the ops-specific depth that makes this track's Tier 0 legitimately different; marked CI/CD module as canonical owner; added networking cross-reference.
- `capstones-career.md`: trimmed Tier 0 git module (4h→2h); added the specific track-list feeding Capstone #2 and #3 (the reviewer's flagged gap — capstones previously said "combines tracks' material" without naming which ones).

**Net effect:** total estimated curriculum content drops from ~3,265h to ~3,202h — a modest reduction, because most of the fix was re-scoping/cross-referencing rather than pure deletion (CS Foundations also *gained* the new math-depth content it now has to carry for two tracks).

**Deliberately not done in this pass** (scope note for transparency): the OOP three-way overlap (CS Foundations/Language Mastery/Software Engineering) and the three-way networking overlap (Hardware/Software Engineering/DevOps) were resolved with cross-reference notes and canonical-owner framing, not full content removal — each track's version teaches a genuinely different angle (concepts vs. syntax vs. applied design; deep protocol theory vs. HTTP-for-APIs vs. networking-for-ops), so the reviewer's fix ("reference each other" rather than "delete") was applied literally rather than over-trimmed.

## [0.2.0] — 2026-09-28 — CS Foundations Tier 0: first complete real lesson content

**Context:** Per the locked-in decision to start real (non-example) lesson content with CS Foundations, wrote all 6 Tier-0 modules as complete lessons via a 6-way parallel content-writing pass (one agent per module, sharing the tier's goal/checkpoint/format context).

**Added**
- `content/cs-foundations/tier-0/*.mdx` (6 files) + matching `*.quiz.json` (6 files, 5 questions each): "What Even Is a Computer?", "The Command Line & Filesystem", "Setting Up a Real Dev Environment", "Version Control Literacy: Git Day Zero", "Algorithmic Thinking Without Code", "What Is a Variable, Really?" — every lesson has a "What you'll leave this lesson knowing" outcomes list, a numbered hands-on "Do this" section with real OS-specific instructions, and a "Check on learning" self-check section, per the format established in `content/README.md`.

**Removed**
- `content/cs-foundations/tier-0/what-is-code.mdx` and its quiz — the illustrative placeholder from the initial scaffold, now fully superseded by the real module list above (its ground — terminal/hello-world literacy — is now properly split across "The Command Line & Filesystem" and "Setting Up a Real Dev Environment").

**Changed**
- `content/README.md` — updated its example frontmatter to a real lesson (`what-is-a-computer.mdx`) instead of the now-removed placeholder, and points to the finished Tier 0 as the reference example for tone/structure/quiz style.

**Status:** CS Foundations Tier 0 is the first fully content-complete tier in The Manual — 27 hours of real material across 6 lessons, ready to seed into the app (`npm run db:seed`) and actually be studied from. All other tracks/tiers still have only their `docs/curriculum/*.md` syllabus, not lesson prose.
