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

## [0.3.0] — 2026-09-28 — CS Foundations Tier 1: complete real lesson content

**Added**
- `content/cs-foundations/tier-1/*.mdx` (8 files) + matching `*.quiz.json` (8 files, 5 questions each): Python Core Syntax, Loops & Iteration, Functions & Scope, Core Data Structures I, Working with Text & Files, Math Primer (Algebra & Functions), Discrete Math I (Logic & Sets), and Intro to Probability & Statistics (including the information-theory/entropy primer added during the structural-fix pass, so AI/ML's Tier 1 has real prerequisite content to point to). Written by 8 parallel agents sharing the tier's goal/checkpoint/format context, assuming Tier 0 is complete (no re-explaining terminal/git/environment basics).

**Status:** CS Foundations Tiers 0-1 are now both fully content-complete — 95 hours of real material across 14 lessons.

## [0.4.0] — 2026-09-28 — CS Foundations Tier 2: complete real lesson content

**Added**
- `content/cs-foundations/tier-2/*.mdx` (8 files) + matching `*.quiz.json` (8 files, 5 questions each): Big-O & Complexity Analysis, Core Data Structures II, Sorting & Searching, Discrete Math II (Induction, Recursion & Combinatorics), Graph Theory Fundamentals, Object-Oriented Thinking (the canonical OOP-concepts lesson other tracks point to), Testing & Debugging Discipline, and Small Independent Projects (written as 3 minimal-hand-holding project briefs rather than a guided walkthrough, matching this tier's "Builder" framing). Assumes Tiers 0-1 are done; scaffolding is deliberately lighter per the tier's own goal statement.

**Status:** CS Foundations Tiers 0-2 are now fully content-complete — 174 hours of real material across 22 lessons.

## [0.5.0] — 2026-09-28 — CS Foundations Tier 3: complete real lesson content

**Added**
- `content/cs-foundations/tier-3/*.mdx` (8 files) + matching `*.quiz.json` (8 files, 5 questions each): Divide & Conquer + Recursion Mastery, Dynamic Programming, Greedy Algorithms & Graph Algorithms II, Complexity Classes (P, NP, and Why It Matters), Multi-File Project Architecture, Reading Real Codebases, Second Language for Contrast (Go primary, with Java/Rust comparison callouts), and Math Primer II — the complete linear-algebra/calculus/convex-optimization/numerical-stability foundation that AI/ML's Tier 1 assumes as a hard prerequisite. Two of the eight lesson files were written directly to disk by their own agents mid-run (they read `content/README.md` and matched its convention independently) before the batch's structured output was assembled over them with equivalent final content — noted here since it briefly meant Tier 3 files rode along in the Tier 2 commit.

**Status:** CS Foundations Tiers 0-3 are now fully content-complete — 258 hours of real material across 30 lessons. Tiers 4-5 remain as syllabus only (`docs/curriculum/cs-foundations.md`).

## [0.6.0] — 2026-09-28 — Added Track 9: Cybersecurity & Ethical Hacking

**Context:** Explicit user request: "I would like white hat and ethical hacking to be included, but on their respective level" — i.e. a full 6-tier progression like every other track gets, not a single bolted-on module. This also directly resolves a HIGH-priority gap the original reviewer pass flagged (MASTERFILE.md §5): personal digital security/privacy literacy was entirely absent — the curriculum taught securing systems for others but never the learner's own accounts.

**Process:** Designed via a 2-agent pass (Design → Safety Review), not the original 8-track pattern, because this content carries real legal/ethical stakes that a single self-review can't be trusted on. The design agent produced the full 6-tier track under strict, explicit constraints (every exercise confined to systems the learner owns, an isolated VM lab, or named legal practice platforms — OWASP Juice Shop/DVWA/WebGoat, PortSwigger Web Security Academy, TryHackMe, HackTheBox, picoCTF, OverTheWire, VulnHub — never a real system without authorization). A second agent then adversarially reviewed the result specifically for legal/ethical framing, real-world-targeting risk, format consistency, and offense/defense balance.

**Safety review result:** `safe_to_ship: false` on the first pass — not for any legal/ethical framing failure (the reviewer found the CFAA/authorization framing and legal-platform-only discipline solid throughout, and found zero instances of real-system targeting), but for a legitimate content-balance issue: the track's own summary claimed "blue-team/defensive work gets equal billing to offensive work throughout," which its actual Tier 1-3 hour allocation didn't support (Tier 1 was 100% offense-framed, Tier 3 had zero dedicated defensive module). Applied all 3 required fixes before shipping:
- Tier 1's OWASP Top 10 module now requires actually coding and verifying a fix for 3+ vulnerability categories, not just narrating one (module renamed "Exploit *and* Fix," +3h).
- Tier 3 gained a new, real, hour-weighted module: "Detection Engineering & Logging Basics for AD" (~18h) — the learner instruments their own Active Directory lab (Sysmon, Windows Event Logs) to detect the exact Kerberoasting/pass-the-hash attacks they just ran, closing the attack→detect→harden→re-attack loop a tier earlier than the original draft (which introduced defense for the first time only as an optional Tier 4 path).
- Reworded the summary and Tier 4 goal to make an honest claim: defensive weight grows starting in Tier 1, becomes dedicated in Tier 3, reaches full parity only at Tier 4's Blue Team path — rather than overclaiming uniform parity throughout.
- Also fixed a minor consistency nit: Tier 4's Red Team C2/evasion content now names a specific legal open-source C2 framework (Sliver/Mythic) for isolated lab use, matching the track's otherwise-rigorous practice of naming an exact legal venue for every technique.

**Added**
- `docs/curriculum/cybersecurity-ethical-hacking.md` — full 6-tier syllabus (~516 estimated hours): Tier 0 (law/ethics framing + personal digital security/privacy literacy + legal lab setup), Tier 1 (Linux/networking for security + OWASP Top 10 exploit-and-fix + crypto fundamentals), Tier 2 (independent TryHackMe/HackTheBox practice, scripting, Metasploit, digital forensics), Tier 3 (formal pentest methodology, an Active Directory home lab, detection engineering, mobile/API security), Tier 4 (bug bounty fundamentals + a choice of Red Team / Blue Team / Application Security specialization paths + cloud security), Tier 5 (contributing to real security tooling, competitive CTF, responsible vulnerability disclosure on disclosed CVEs).
- MASTERFILE.md §4 — track summary card and link, updated to "9 Tracks × 6 Tiers," total hours updated to ~3,718h.
- MASTERFILE.md §4.5 — new ownership row: Cybersecurity & Ethical Hacking is the canonical owner of deep application security/exploit development/pentesting/red-blue-team operations; Software Engineering and DevOps's existing security modules annotated as pointing here for depth; Capstones' security/red-blue specialization branch reworded to draw on this track's Tiers 2-4 instead of teaching pentesting from scratch.
- MASTERFILE.md §4.6 — recommended path updated: this track's Tier 0 is worth doing early (like AI/ML's), Tiers 1-5 are a third specialization option alongside the AI/ML + Platforms pair, picked up in Phase 3 only if security is a genuine interest.
- `app/src/lib/tracks.ts` and `docs/diagrams/curriculum-map.mmd` updated to list all 9 tracks.

**Not yet done:** lesson prose for this track (only the syllabus exists, same as the other 7 non-CS-Foundations tracks).

## [0.7.0] — 2026-09-28 — Multi-device delivery: Android (PWA) + Windows/macOS/Linux (Docker)

**Context:** Explicit request: make the GitHub repo's app usable on a Galaxy Z Fold 5 and Galaxy Tab S9 FE (both connected over the same network), plus PC across Windows, multiple Linux distros, and macOS. The app was already a local-first Next.js server; this makes that one server reachable, installable, and identically buildable everywhere, without changing the single-learner architecture.

**Added**
- `app/public/manifest.json`, `app/public/sw.js`, `app/public/offline.html`, `app/public/icons/{icon,icon-maskable}.svg` — a minimal, honest PWA layer: installable home-screen icon on Android, a service worker that's cache-first for static build assets and network-first-with-offline-fallback for page navigations (not a full offline-first sync engine — this app is server-rendered against a live DB).
- `app/src/components/RegisterServiceWorker.tsx`, mounted from `app/src/app/layout.tsx`, which also now exports `viewport` (`viewportFit: 'cover'` + safe-area-inset padding) so content stays clear of a foldable's hinge/system-bar area on both the Z Fold 5's folded (phone-width) and unfolded (tablet-width) states, and on the Tab S9 FE.
- `app/Dockerfile` (Debian-slim/glibc, not Alpine — avoids Prisma engine/musl mismatches), `app/docker-entrypoint.sh` (runs `prisma db push` before every start so a fresh volume just works), root `docker-compose.yml`, root `.dockerignore` — `docker compose up --build` gives identical behavior on Windows, macOS, and any Linux distro with Docker installed.
- `docs/running-on-your-devices.md` — per-OS native setup (Windows/macOS/any Linux distro via nvm or distro package managers), the Docker path, finding your PC's LAN IP on each OS, installing as a PWA on Android, and an honestly-documented caveat: full PWA install criteria want a secure context (HTTPS/localhost), a LAN IP is neither, so the doc gives both the always-works fallback (use it as a plain browser tab) and the proper fix (`mkcert` for a locally-trusted cert).

**Changed**
- `app/package.json` — `dev` and `start` now bind `0.0.0.0` instead of the default, so other devices on the same Wi-Fi can reach the server (`dev:local-only` added for anyone who wants the old localhost-only behavior back).

**Caught and fixed before shipping:** the first Dockerfile draft used `app/` as the build context, which would have silently failed at build time — `velite.config.ts`'s `root: '../content'` needs the repo-root `content/` directory, which lives *outside* an `app/`-scoped build context and Docker cannot reach files outside its context. Fixed by moving the build context to the repo root (`docker-compose.yml`'s `context: .`, `dockerfile: app/Dockerfile`) and adjusting the Dockerfile's `COPY` paths accordingly.

**Status:** MASTERFILE.md §3.7 documents this as a standing architectural section, not a one-off note — it's the reference for what "multi-device" means for this app going forward.
