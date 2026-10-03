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

## [0.8.0] — 2026-09-28 — Standing rule: totally functional offline, always up to date

**Context:** New standing rule: "this app must be totally functional offline while having the most up to date terms and curriculums." The previous PWA work (0.7.0) only cached the app shell — there was no way to even *view* a lesson through the app yet (those pages were still marked "not yet built" in MASTERFILE §3.5), so genuine offline functionality required building that UI first, not just expanding the service worker.

**Added**
- `app/src/app/tracks/[trackId]/page.tsx` and `app/src/app/tracks/[trackId]/[tier]/[slug]/page.tsx` — statically generated (`generateStaticParams`) tier-ladder and lesson pages. Lesson pages embed their quiz questions directly (read server-side via the new `app/src/lib/quizzes.ts`) so a cached lesson page needs zero extra requests to be fully functional offline, quiz included.
- `app/src/app/review/page.tsx` + `app/src/components/ReviewQueueItem.tsx` — the spaced-repetition review queue (linked from the dashboard since 0.1.0 but never built), resolving each due `ReviewState` back to its source question via `resolveQuizQuestionItem()`.
- `app/scripts/gen-precache-manifest.mjs` — runs after every `velite build`, writes `public/precache-manifest.json` listing every track/lesson URL plus a content-hash `version` (changes only when the curriculum actually changes).
- `app/public/sw.js` rewritten: precaches every URL in that manifest individually (not `cache.addAll`, which would abort the whole precache on one bad URL), versioned cache naming tied to the content hash, network-first navigation with cache/offline fallback.
- `app/src/lib/offlineOutbox.ts` (IndexedDB write queue) + `app/src/components/OfflineOutboxFlusher.tsx` — quiz attempts, progress, and review grades made offline are queued and replayed automatically on reconnect, never silently lost. `QuizRunner` and the new `LessonProgressButton` both surface "saved offline" in the UI.
- `app/src/lib/content.ts` — typed accessors over Velite's compiled lesson index, used by the new pages and the manifest script.
- MASTERFILE.md §3.8 — the standing offline-first architecture as a permanent reference, not a changelog-only note.

**Changed**
- `app/velite.config.ts` — lesson `body` switched from `s.mdx()` to `s.markdown()` (compiled HTML string, not an MDX component function): content has no embedded JSX, and this avoids pulling in an MDX component runtime just to render text. Rendered via `dangerouslySetInnerHTML` (safe — this is our own authored content).
- `app/tailwind.config.ts` / `package.json` — added `@tailwindcss/typography` to style that rendered HTML; removed the now-unused `next-mdx-remote` dependency.
- `app/src/lib/user.ts` — the default learner now has a fixed id (`LOCAL_USER_ID = 'local-learner'`) instead of a random `cuid()`, and a new `ensureUser()` is called from every mutating API route before it writes.

**Caught and fixed before shipping (three separate real bugs):**
1. A workflow-writing race from earlier work (Tier 4 lessons) resurfaced here: the assembly script had no protection against a completed workflow's structured output silently overwriting a better version of a file its own agent had already written directly to disk. Hardened `assemble_tier.py` (session scratchpad tooling) to refuse an overwrite that would shrink a file by more than 50%, or replace a non-empty quiz file with zero questions, and flag it for manual review instead.
2. The new lesson page initially set `userId` to the raw `DEFAULT_USER_NAME` env value instead of the actual database `User.id` — since these pages are statically generated with no DB access, there was no server-side lookup to get the real id from. Fixed by giving the default learner a fixed, well-known id instead of a random one, so static pages can reference it directly with zero database dependency.
3. `docker-entrypoint.sh` ran `prisma db push` but never `db:seed` — meaning every quiz-attempt/progress write in the Docker deployment would have failed its foreign-key check against a `Module` row that was never created. Fixed by adding the seed step to the entrypoint.
4. `OfflineOutboxFlusher` was written but never mounted in `layout.tsx` — the entire offline write-queue would have been dead code, silently never replaying queued requests on reconnect. Fixed by mounting it alongside `RegisterServiceWorker`.

**Deliberately not attempted:** a full bidirectional multi-device sync engine (conflict resolution if the same lesson is completed offline on two devices before either syncs) — last-write-wins via the existing upsert semantics is the honest current behavior, appropriate for a single-learner app; see MASTERFILE.md §3.8's own "what this doesn't attempt" note.

## [0.9.0] — 2026-09-28 — CS Foundations Tier 5: complete — track is now fully content-complete

**Added**
- `content/cs-foundations/tier-5/*.mdx` (5 files) + matching assessment files: Reading & Critiquing Research Papers, Original Problem-Solving & Research Methodology, Contributing Upstream to Core Infrastructure, Teaching & Mentoring as Mastery Proof, and The Frontier: Algorithms Underneath Modern AI. Per the tier's uniform Tier-5 policy, assessments here are mostly `explain_back`/portfolio-framed rather than auto-graded recognition questions.

**Caught by the hardened assembly tooling (from 0.8.0's fix), working as intended:** "Teaching & Mentoring as Mastery Proof" was flagged and correctly NOT overwritten — its own agent had already written a real 12,170-character lesson directly to disk mid-run, but the workflow's structured output for that same module came back as a 3,251-character meta-report about the work rather than the lesson itself (the exact failure pattern that caused actual data loss in Tier 4, before the safety threshold existed). The existing good file was kept; only the other 4 modules' structured output was written.

**Status:** CS Foundations is now the first fully content-complete track in The Manual — all 6 tiers, 412 hours, 54 lessons. The other 8 tracks still have only their `docs/curriculum/*.md` syllabus.

## [0.10.0] — 2026-09-28 — Language Mastery Tier 0: complete real lesson content

**Context:** Second track to get real lesson content, per §4.6's recommended path (Language Mastery is part of the "bedrock trio" alongside CS Foundations and Software Engineering). Tier 0 is a real test of the §4.5 de-duplication policy in practice, not just in the syllabus text: its topics (command line, editor setup, toolchains) sound similar to CS Foundations Tier 0 on the surface.

**Added**
- `content/languages/tier-0/*.mdx` (6 files) + matching quizzes: The Command Line & Filesystem Mental Model, Editor & Debugger Setup, What Code Actually Is (Interpreters vs Compilers vs VMs), Polyglot Repo Conventions, Installing & Managing Toolchains, and Hello World Across Five Languages. Each agent was explicitly instructed that CS Foundations Tier 0 is done and must not be re-taught — content stayed genuinely additive (e.g. the command-line lesson opens with a 2-sentence recap then moves straight to PATH-across-toolchains and stdin/stdout/stderr piping between programs in different languages, material CS Foundations never covered) rather than restating cd/ls/pwd with different words.

**Status:** Language Mastery Tier 0 complete (23h, 6 lessons). CS Foundations remains the only fully complete track; 8 tracks now have partial or no lesson content beyond their syllabus.

## [0.11.0] — 2026-09-28 — Language Mastery Tier 1: complete, plus the first real end-to-end build validation

**Context:** Continuing the tier-by-tier pattern. This entry also marks the first time `npm run build` (Velite → precache manifest → `next build`, i.e. the exact sequence the Docker image runs) was actually executed against this repo since the app scaffold was created — every prior tier's content was assembled and pushed without a build check. It did not pass on the first try; four separate pre-existing defects surfaced, all fixed here.

**Added**
- `content/languages/tier-1/*.mdx` (6 files) + matching quizzes: Python Syntax & Core Semantics, Data Structures in Practice, Functions/Modules & Basic OOP, Error Handling & Debugging Fundamentals, JavaScript Foundations in Parallel, Bash Scripting Basics. Written against the de-duplication fix from the previous commit — each module assumes CS Foundations Tier 1 fluency and stays additive (JS-parallel comparisons, deeper idioms) rather than re-teaching variables/control-flow/functions from scratch.
- `app/package-lock.json` — committed for the first time so dependency resolution is reproducible; its absence is what let the next bug ship silently.

**Caught and fixed by actually running the build (four separate pre-existing bugs, none introduced by this entry's own content work except #3):**
1. **`app/package.json` pinned `velite: "^0.1.2"`, a version that has never existed** (the registry jumps `0.1.1` → `0.2.0`) — `npm install` failed outright. Every tier written before this one was assembled and pushed without ever running `npm install`/`npm run build` to notice. Fixed by pinning `^0.1.1`.
2. **8 lesson files across CS Foundations and Language Mastery had an unquoted colon in their YAML `title:` frontmatter** (e.g. `title: Version Control Literacy: Git Day Zero`), which is invalid YAML (a nested-mapping parse error) and broke `velite build` for the whole content tree, not just those files. Fixed by quoting all 8 titles.
3. **Every one of the 54 lesson files (all tracks, all tiers) was missing the `slug` frontmatter field** that `velite.config.ts`'s `s.slug('lessons')` schema requires — it validates a supplied value, it does not derive one from the filename. `velite build` has therefore never actually succeeded, ever, in this project's history. Fixed by adding `slug: <filename-stem>` to every `.mdx` file's frontmatter (matches the filename-based slugs `content.ts`, the lesson route, and the quiz resolver already assumed).
4. **`prisma/seed.ts`'s `@ts-expect-error` above the `.velite/lessons.json` import was itself a type error** once that file actually exists at type-check time (which it always does — `velite build` runs before `next build` in both `npm run build` and `docker-entrypoint.sh`): TypeScript rejects an unused suppression directive just as hard as the error it was meant to suppress. Fixed by removing it — `resolveJsonModule` in `tsconfig.json` already resolves the import correctly on its own.
5. **`src/lib/quizzes.ts`'s `resolveQuizQuestionItem` destructured `RegExpMatchArray` groups directly**, which under `noUncheckedIndexedAccess` (already on in `tsconfig.json`) type as `string | undefined`, not `string` — a real type error once anyone actually ran `tsc`. Fixed with an explicit guard.
6. **`src/app/page.tsx` (dashboard) and `src/app/review/page.tsx` both make live Prisma calls but neither declared `export const dynamic = 'force-dynamic'`**, so Next.js attempted to statically prerender both at build time by default — and since `docker-entrypoint.sh` only runs `prisma db push` at container *start*, `DATABASE_URL`/the SQLite DB do not exist yet at image *build* time (`RUN npm run build` runs in the Dockerfile's `build` stage, entirely before the `runtime` stage's entrypoint). The build failed outright. This means `docker compose up --build` — the entire point of 0.7.0's multi-device delivery work — has never actually succeeded either. Fixed by adding the explicit directive to both pages (`review/page.tsx`'s own comment already documented this as the intent; the directive enforcing it was simply never added).
7. **This entry's own new quiz files used the wrong schema** (`question`/`options`/`explanation` with bare `q1`-style ids) instead of the established `prompt`/`choices` fields and fully-qualified `trackId/tier-N/slug/qN` ids every other quiz file in the repo uses — `QuizRunner.tsx`'s `choices.map(...)` crashed at static-generation time for all 6 new lesson pages, and the wrong id format would have silently broken spaced-repetition resolution for any missed question. Caught by the same build run, not by inspection; fixed by rewriting all 6 new `.quiz.json` files to the canonical shape.

**Status:** Language Mastery Tier 1 complete (45h, 6 lessons). `npm run build` now passes cleanly end to end (0 errors, 71/71 static pages generated) — this is the new bar every future tier's content must clear before being considered done, not just assembled.

## [0.12.0] — 2026-09-28 — Language Mastery Tier 2: complete, build passed clean on the first try

**Context:** Continuing the tier-by-tier pattern, now with 0.11.0's build-validation bar and hardened assembly tooling in place from the start. The syllabus (`docs/curriculum/languages.md`) already carried explicit de-duplication annotations for this tier from the original design pass — OOP concepts owned by CS Foundations Tier 2, SQL query/schema and TDD philosophy owned by Software Engineering — so no separate syllabus-fix commit was needed this time, unlike Tier 1.

**Added**
- `content/languages/tier-2/*.mdx` (6 files) + matching quizzes: Intermediate Python (OOP syntax & stdlib — dunders, decorators, context managers, itertools/collections/dataclasses), TypeScript Fundamentals, Introduction to C: Memory & Pointers (the track's first real systems-language module), Calling SQL From Your Language (driver/ORM layer only), Test-Runner Mechanics (pytest/Jest syntax only), Package & Build Tooling Literacy.
- `assemble_tier_v2.py` (session scratchpad tooling) — folds 0.11.0's fixes directly into the assembly step instead of relying on a later cleanup pass: quotes every YAML title automatically, always writes the `slug` frontmatter field, and always writes quiz questions in the canonical `{id, type, prompt, choices, correctIndex}` shape with a correctly numbered, fully-qualified `id` (`trackId/tier-N/slug/qN`) regardless of what field names a workflow's structured output happens to use. Retains the Tier-4-era shrink-ratio safety check.

**Result:** `npm run build` passed with zero errors on the first attempt — no bugs caught this round, confirming 0.11.0's fixes actually closed the gaps rather than just papering over that one run.

**Status:** Language Mastery Tier 2 complete (41h, 6 lessons). Language Mastery is now 3/6 tiers content-complete (Tiers 0-2, 109h); Tiers 3-5 remain.

## [0.13.0] — 2026-09-28 — Language Mastery Tier 3: complete (Practitioner level)

**Context:** Continuing the tier-by-tier pattern. This tier's workflow output reintroduced the HTML-entity-escaping issue seen once before this session (agents writing `&amp;`/`&lt;`/`&gt;` into code blocks as if targeting HTML rather than raw Markdown) — caught before assembly this time instead of after, and fixed once in the tooling rather than in the content.

**Added**
- `content/languages/tier-3/*.mdx` (6 files) + matching quizzes: C++ Fundamentals atop C Knowledge (RAII, STL containers, smart pointers, CMake — framed explicitly as "C plus tools that fix the bug classes Tier 2 made you fight by hand"), Java or C# for OOP at Scale, Go Fundamentals (structs/interfaces, a first taste of goroutines/channels — full concurrency stays Tier 4's job), Advanced SQL & Data Modeling (indexes, query plans, transactions/isolation, normalization — beyond Tier 2's driver-only level), Reading Real Codebases, Collaborative Git & Code Review Practices (branching strategy and real PR review, beyond Tier 0's solo git basics).
- `assemble_tier_v2.py` now runs `html.unescape()` on every lesson body and every quiz prompt/choice before writing, instead of relying on a post-hoc grep-and-fix pass — closes the entity-escaping bug class at the tooling level rather than per-tier.

**Status:** Language Mastery Tier 3 complete (66h, 6 lessons). Language Mastery is now 4/6 tiers content-complete (Tiers 0-3, 175h); Tiers 4-5 remain. `npm run build` passed clean (0 errors).

## [0.14.0] — 2026-09-28 — Language Mastery Tier 4: complete (Advanced/Specialist level)

**Context:** Continuing the tier-by-tier pattern. This tier's prompt added an explicit "do not HTML-escape" instruction to try to stop the entity-escaping issue at the source rather than the tooling; it did not fully work (a few agents still emitted `&amp;`/`&lt;`), which confirms `assemble_tier_v2.py`'s write-time `html.unescape()` fix from the previous commit is the right place for that guard, not agent-prompt wording alone.

**Added**
- `content/languages/tier-4/*.mdx` (6 files) + matching quizzes: Rust Ownership, Borrowing & Systems Safety (a genuinely new memory model, contrasted directly against Tier 2's manual malloc/free and Tier 3's RAII/smart pointers), Advanced C++: Templates, Move Semantics & Concurrency (going deep where Tier 3 stayed intro-level), Concurrency & Performance in Go (the real deep dive Tier 3's goroutines/channels module deliberately deferred), Advanced Shell & Systems Scripting (production-hardening Tier 1's basic Bash), Performance Engineering Across Languages (a cross-cutting capstone-flavored module spanning the whole track's languages), Contributing to Open Source at Scale (going beyond Tier 3's first-PR module into a real, actively-maintained project).

**Status:** Language Mastery Tier 4 complete (70h, 6 lessons). Language Mastery is now 5/6 tiers content-complete (Tiers 0-4, 245h); only Tier 5 (Expert/Innovator) remains. `npm run build` passed clean (0 errors).

## [0.15.0] — 2026-09-28 — Language Mastery Tier 5: complete — track is now fully content-complete

**Context:** Final tier of Language Mastery. Tier 5 is a deliberate capstone/synthesis tier: every module explicitly draws on and cross-references the nine languages and five prior tiers already written in this track, rather than introducing an isolated new topic.

**Added**
- `content/languages/tier-5/*.mdx` (6 files) + matching quizzes: Meta-Skill: How to Learn Any New Language Fast (a six-axis transfer checklist — paradigm, memory model, concurrency model, type system, tooling, idioms — grounded in concrete side-by-side code from Python/C/Rust/Go/TypeScript already written across this track), Programming Language Design & Implementation (a real tree-walking interpreter: lexer, parser, AST evaluation), Comparative Type Systems & Paradigms (static/dynamic and nominal/structural contrasted via track languages, plus a genuinely new hands-on functional-paradigm introduction), Teaching & Mentoring as Mastery, Upstream Contribution to a Language/Runtime (a level up from Tier 4's general open-source module — contributing to a language's own implementation), Research Literacy for PL & AI-Adjacent Topics (including the tokenization/AST connection back to how code-LLMs represent programs).

**Status:** Language Mastery Tier 5 complete (71h, 6 lessons). **Language Mastery is now the second fully content-complete track in The Manual** — all 6 tiers, 316 hours, 36 lessons — joining CS Foundations. `npm run build` passed clean end to end. 7 tracks remain at syllabus-only depth: Software Engineering, Hardware Systems, AI/ML, Platforms, DevOps, Cybersecurity & Ethical Hacking, Capstones.

## [0.16.0] — 2026-09-28 — Software Engineering Tier 0: the third bedrock track begins, plus a real cross-track slug collision

**Context:** Starting the third "bedrock trio" track (MASTERFILE §4.6) alongside the now-complete CS Foundations and Language Mastery. This tier is deliberately light — general terminal/git literacy is owned by CS Foundations Tier 0 — so it covers only the SE-specific layer every later tier assumes.

**Added**
- `content/software-engineering/tier-0/*.mdx` (4 files) + matching quizzes: What Software Engineering Is (vs. "just coding") — including a real walkthrough of orienting yourself in an unfamiliar codebase using the actual `psf/requests` repo, not an abstract description — Dev Environment Setup, Git & GitHub Absolute Basics, Reading Docs & Getting Unstuck (including AI-assisted).

**Caught and fixed before shipping (two bugs, one in this tier's own assembly, one a latent bug from the previous commit):**
1. **`assemble_tier_v2.py` wrapped every title in double quotes unconditionally**, and this tier's own "What Software Engineering Is (vs. \"just coding\")" title contains embedded double quotes, producing invalid YAML (`title: "...(vs. "just coding")"`) that broke `velite build` for the whole content tree. Fixed by backslash-escaping embedded quotes/backslashes before wrapping — the standard YAML double-quoted-scalar escape.
2. **A genuine cross-track slug collision**: this tier's "Dev Environment Setup" and CS Foundations Tier 0's existing "Dev Environment Setup" both slugified to `dev-environment-setup`. Checking for it surfaced a second, pre-existing collision from the *previous* commit (0.13.0): `languages/tier-3/reading-real-codebases.mdx` and `cs-foundations/tier-3/reading-real-codebases.mdx` both used `reading-real-codebases` — and `npm run build` had passed clean on that commit despite it, because `velite.config.ts`'s `s.slug('lessons')` duplicate check has an async check-then-set race (two files transforming concurrently can both see "not yet taken" before either registers its value), so it cannot be trusted to always catch this. Fixed both collisions by renaming the newer file in each pair (`se-dev-environment-setup`, `reading-real-codebases-across-languages`) and updating their frontmatter `slug` and quiz `id` prefixes to match. Added `check_slug_uniqueness.py` (session scratchpad tooling) as a standalone repo-wide check — independent of velite's own unreliable one — to run after every future tier's assembly, before trusting a clean build.

**Status:** Software Engineering Tier 0 started (11h, 4 lessons). `npm run build` passed clean (0 errors, 82 unique lesson slugs repo-wide, independently verified).

## [0.17.0] — 2026-09-28 — Software Engineering Tier 1: complete, including the curriculum's two canonical modules

**Context:** Continuing the tier-by-tier pattern. This tier carries the two modules every other track's syllabus explicitly defers to (MASTERFILE §4.5): the canonical testing/TDD-philosophy module and the canonical SQL module. No shortcuts here — both were written at full depth rather than the lighter treatment other tracks give their own scoped-down versions.

**Added**
- `content/software-engineering/tier-1/*.mdx` (6 files) + matching quizzes: Git Deep Dive: Branching, Merging & Collaboration (merge vs. rebase explained by what each literally does to the commit graph, a real hand-resolved merge conflict), Intro to Automated Testing (the canonical testing/TDD-philosophy module — Language Mastery's own testing content is runner-syntax-only and points here), Functions/Modules & Clean Code Basics, Relational Databases & SQL Fundamentals (the canonical SQL module — Language Mastery Tier 2's SQL content is driver/ORM-only and points here), Building & Consuming a Basic REST API (HTTP scoped to API-building; protocol theory stays Hardware & Computer Systems' job), Intro to NoSQL.

**Result:** `npm run build` passed clean on the first attempt — no new bugs, and the repo-wide slug check (added last commit specifically because velite's own check missed a real collision) confirmed 88 unique slugs.

**Status:** Software Engineering Tier 1 complete (37h, 6 lessons). Software Engineering is now 2/6 tiers content-complete (Tiers 0-1, 48h); Tiers 2-5 remain.

## [0.18.0] — 2026-09-28 — Software Engineering Tier 2: complete (Builder level)

**Context:** Continuing the tier-by-tier pattern. This tier shifts the track from "follow the mechanics" (Tier 1) to "make design decisions independently" — TDD as a practiced habit rather than an introduced concept, SOLID/GoF applied to real refactors, and a full design-and-build project (schema through auth) rather than single-endpoint exercises.

**Added**
- `content/software-engineering/tier-2/*.mdx` (6 files) + matching quizzes: Test-Driven Development in Practice (five real Red-Green-Refactor cycles building a `ShoppingCart`, plus a concrete demonstration of 100%-coverage-but-worthless tests), SOLID Principles & OO Design (all five principles with before/after refactors), Intro to Design Patterns — GoF Essentials (Factory/Strategy/Observer/Decorator with real motivating problems, Singleton framed as a pattern to be wary of), Database Design & Normalization Project (real requirements to ER diagram to migrations), Multi-Resource REST API with Persistence (real bcrypt hashing, JWT auth end to end), Integration & API Testing.

**Result:** `npm run build` passed clean on the first attempt. 94 unique slugs verified repo-wide.

**Status:** Software Engineering Tier 2 complete (48h, 6 lessons). Software Engineering is now 3/6 tiers content-complete (Tiers 0-2, 96h); Tiers 3-5 remain.

## [0.19.0] — 2026-09-28 — Software Engineering Tier 3: complete (Practitioner level)

**Context:** Continuing the tier-by-tier pattern. This tier moves to real-system scale — multi-file, multi-service thinking — and includes a deliberately light "just enough CI to work on a team" module that stays out of DevOps Tier 2's canonical CI/CD territory on purpose.

**Added**
- `content/software-engineering/tier-3/*.mdx` (7 files) + matching quizzes: Clean Architecture & Hexagonal Design (a full worked example — a library checkout system with domain/application/infrastructure layers, swapping a CLI adapter for a REST adapter with zero core changes), End-to-End & Contract Testing, API Design Deep Dive (Richardson Maturity Model, pagination/idempotency/rate limiting, a real OpenAPI spec, REST vs. GraphQL), Polyglot Persistence, Reading & Contributing to Open Source, Code Review as a Practiced Discipline, What CI Is (Just Enough to Work on a Team) — intentionally scoped light, deferring pipeline design to DevOps Tier 2.

**Result:** `npm run build` passed clean on the first attempt. 101 unique slugs verified repo-wide.

**Status:** Software Engineering Tier 3 complete (51h, 7 lessons). Software Engineering is now 4/6 tiers content-complete (Tiers 0-3, 147h); Tiers 4-5 remain.

## [0.20.0] — 2026-09-28 — Software Engineering Tier 4: complete (Advanced/Specialist level)

**Context:** Continuing the tier-by-tier pattern. This tier moves to architecture-level thinking, and includes a security module deliberately scoped to a working developer's defensive knowledge — deep offensive/defensive security stays owned by the Cybersecurity & Ethical Hacking track.

**Added**
- `content/software-engineering/tier-4/*.mdx` (6 files) + matching quizzes: System Design Fundamentals at Scale (load balancing, cache invalidation, CAP theorem via a concrete partition scenario, message queues), Distributed Systems Foundations (consensus intuition, sharding/replication, failure modes tied back to Tier 3's idempotency-key pattern), Database Internals & Performance (reading a real query plan, isolation levels via concrete bugs each level prevents, N+1 query fixes), Security-Aware Software Engineering (OWASP Top 10 with vulnerable-then-fixed code, OAuth2/OIDC flow concretely walked through — explicitly scoped away from Cybersecurity's offensive depth), Architecture Decision Records & Trade-off Analysis, Leading Code Review & Mentoring Practice.

**Result:** `npm run build` passed clean on the first attempt. 107 unique slugs verified repo-wide.

**Status:** Software Engineering Tier 4 complete (54h, 6 lessons). Software Engineering is now 5/6 tiers content-complete (Tiers 0-4, 201h); only Tier 5 (Expert/Innovator) remains.

## [0.21.0] — 2026-09-28 — Software Engineering Tier 5: complete — track is now fully content-complete

**Context:** Final tier of Software Engineering. Written with an explicit instruction to use real, named examples rather than generic placeholders — the result draws on real project histories (PostgreSQL's `MERGE` statement's multi-year path through the CommitFest process, Django's DEP governance process) rather than abstract descriptions of "how open source works."

**Added**
- `content/software-engineering/tier-5/*.mdx` (5 files) + matching quizzes: Contributing Upstream to Major Infrastructure Projects (real case studies: PostgreSQL's mailing-list/CommitFest process, Django's DEP process, and SQLite's deliberate no-external-contributions policy as a useful counter-example), Novel System/Framework Design, Reading & Reproducing Systems Papers, Teaching & Curriculum Design, Architecture at Organization Scale.

**Status:** Software Engineering Tier 5 complete (68h, 5 lessons). **Software Engineering is now the third fully content-complete track in The Manual** — all 6 tiers, 269 hours, 34 lessons — joining CS Foundations and Language Mastery. All three "bedrock trio" tracks (MASTERFILE §4.6) are now complete. `npm run build` passed clean, 112 unique slugs verified. 6 tracks remain at syllabus-only depth: Hardware Systems, AI/ML, Platforms, DevOps, Cybersecurity & Ethical Hacking, Capstones.

## [0.22.0] — 2026-09-28 — AI, ML & Prompt Engineering Tier 0: the fourth track begins

**Context:** With all three bedrock-trio tracks complete, moving to Phase 2 of MASTERFILE §4.6's recommended path: AI/ML, which depends on CS Foundations' math spine (already complete). Tier 0 is deliberately light on math/ML theory proper — this track's own Tier 1 applies CS Foundations Tiers 1 & 3's math spine to ML; Tier 0 just builds raw AI literacy so nothing later feels like unexplained magic.

**Added**
- `content/ai-ml-prompting/tier-0/*.mdx` (5 files) + matching quizzes: What Is AI, Really? (symbolic vs. statistical AI, both AI winters explained with their actual causes — the knowledge-acquisition bottleneck, brittle rule sets, the ALPAC/Lighthill reports — and a concrete explanation of why the transformer architecture's parallelizable self-attention was the actual technical pivot, not just "deep learning got popular"), Dev Environment for AI/Python Work, Python Crash Course for Data & AI, Prompting 101 — Literacy Before Craft, Math Literacy Refresher (notation/algebra/what-a-vector-is, explicitly scoped away from this track's own Tier 1, which does the real ML-math application work).

**Result:** `npm run build` passed clean on the first attempt. 117 unique slugs verified repo-wide.

**Status:** AI/ML Tier 0 complete (29h, 5 lessons) — the fourth track in The Manual to get real lesson content. Tiers 1-5 remain.

## [0.23.0] — 2026-09-28 — AI/ML Tier 1: complete (applying CS Foundations' math spine to ML)

**Context:** Continuing the tier-by-tier pattern. This tier is the payoff of CS Foundations' math work — every module ties a math concept already proven in that track directly to real numpy code, rather than re-deriving the math from scratch.

**Added**
- `content/ai-ml-prompting/tier-1/*.mdx` (6 files) + matching quizzes: Linear Algebra Applied to ML (feature vectors, a weight matrix shown concretely as "one dot product per output neuron," PCA re-derived as sorted eigendecomposition of a covariance matrix with real numpy output), Probability & Information Theory Applied to ML, Gradient Descent Mechanics, Python for Data, Prompt Engineering Craft I (zero-shot/few-shot/chain-of-thought/structured-output, building on Tier 0's prompting literacy), ML Vocabulary & Mental Models.

**Result:** `npm run build` passed clean on the first attempt. 123 unique slugs verified repo-wide.

**Status:** AI/ML Tier 1 complete (42h, 6 lessons). AI/ML is now 2/6 tiers content-complete (Tiers 0-1, 71h); Tiers 2-5 remain.

## [0.24.0] — 2026-09-28 — AI/ML Tier 2: complete (Builder level, real LLM API code)

**Context:** Continuing the tier-by-tier pattern. No more guided-notebook hand-holding — this tier trains real scikit-learn models on real datasets (Wisconsin breast cancer, diabetes) with real fitted output shown, and moves from chatting with an LLM to writing actual software against its API.

**Added**
- `content/ai-ml-prompting/tier-2/*.mdx` (6 files) + matching quizzes: Classical ML with scikit-learn (linear/logistic regression explicitly tied back to Tier 1's "weight matrix is a batch of dot products," decision trees vs. random forests with a real overfitting demonstration, real precision/recall/F1 from a real fitted model), Feature Engineering & Data Prep (a real data-leakage demonstration — scaling before vs. after the train/test split, with the resulting inflated metric shown), Unsupervised Learning (PCA in practice now, building on Tier 1's PCA theory), Intro to Neural Networks (the perceptron built directly on Tier 1's weight-matrix framing, backprop intuition only — full derivation deferred to Tier 3, a real PyTorch training loop), Building with LLM APIs (real Anthropic API calls, streaming, multi-turn state, tool calling, rate-limit handling), Prompt Engineering Craft II (prompt chaining, self-consistency, a real prompt-evaluation harness).

**Result:** `npm run build` passed clean on the first attempt. 129 unique slugs verified repo-wide.

**Status:** AI/ML Tier 2 complete (68h, 6 lessons). AI/ML is now 3/6 tiers content-complete (Tiers 0-2, 139h); Tiers 3-5 remain.

## [0.25.0] — 2026-09-28 — AI/ML Tier 3: complete (Practitioner level — full backprop, transformers, RAG/agents)

**Context:** Continuing the tier-by-tier pattern. This is the deep-mechanics tier: the full backpropagation derivation Tier 2 deliberately deferred, the transformer architecture built up from scaled dot-product attention to a real working mini-transformer, and this track's first genuinely multi-component project (a full RAG pipeline plus a ReAct-style agent loop).

**Added**
- `content/ai-ml-prompting/tier-3/*.mdx` (6 files) + matching quizzes: Deep Learning Foundations (a complete hand-worked backprop derivation on a real 2-layer network, cross-checked numerically against PyTorch autograd to four decimal places), Sequence Models & NLP Fundamentals (real BPE tokenization, embedding arithmetic, why RNNs/LSTMs were replaced by attention), The Transformer Architecture (scaled dot-product attention derived and implemented, positional encoding, encoder/decoder/decoder-only contrasted, a guided reading of "Attention Is All You Need," a real working mini-transformer in PyTorch), LLM Fundamentals (pretraining/fine-tuning/RLHF, scaling laws, reading a real model card), Retrieval-Augmented Generation (RAG) & Agents (a full real RAG pipeline, ReAct tool-use, multi-step tool orchestration), Reading Real Code (an annotated nanoGPT-style walkthrough).

**Result:** `npm run build` passed clean on the first attempt. 135 unique slugs verified repo-wide. (The session's scratchpad tooling script was evicted mid-round by container storage pressure from this tier's unusually large subagent scratch files — recreated from the established pattern before assembly; no content was lost.)

**Status:** AI/ML Tier 3 complete (78h, 6 lessons). AI/ML is now 4/6 tiers content-complete (Tiers 0-3, 217h); Tiers 4-5 remain.

## [0.26.0] — 2026-09-28 — AI/ML Tier 4: complete (Advanced/Specialist level, production AI engineering)

**Context:** Continuing the tier-by-tier pattern. This tier specializes toward production-grade AI engineering. The red-teaming module got a manual safety read before assembly (not just the automated pipeline): it explicitly frames every attack category as defensive education, pairs each with its mitigation in the same breath, uses only generic non-functional example strings, and states its own framing rule up front — consistent with the safety-review pattern established for the Cybersecurity track earlier in this project.

**Added**
- `content/ai-ml-prompting/tier-4/*.mdx` (6 files) + matching quizzes: Fine-Tuning & Parameter-Efficient Methods (real parameter-count math showing LoRA trains ~0.5% of an 8B model's weights, and why QLoRA drops full-fine-tuning's ~128GB memory footprint to ~4.6GB), Model Evaluation, Red-Teaming & Safety (LLM-as-judge harnesses, claim-level hallucination scoring, three red-team attack categories each paired with its defense and a before/after pass-rate harness, counterfactual bias testing with a paired significance test, NIST AI RMF and Constitutional AI made concrete), Inference Optimization & Serving, Lightweight MLOps, Architecture for AI-Powered Systems, Advanced Prompt Engineering & Agentic Systems.

**Result:** `npm run build` passed clean on the first attempt. 141 unique slugs verified repo-wide.

**Status:** AI/ML Tier 4 complete (78h, 6 lessons). AI/ML is now 5/6 tiers content-complete (Tiers 0-4, 295h); only Tier 5 (Expert/Innovator) remains.

## [0.27.0] — 2026-09-28 — AI/ML Tier 5: complete — track is now fully content-complete

**Context:** Final tier of AI/ML & Prompt Engineering. Research-adjacent and invent-rather-than-apply per the syllabus's Tier 5 policy. Written with explicit instructions for accuracy and honesty about current interpretability/alignment research — no overclaiming, open questions acknowledged.

**Added**
- `content/ai-ml-prompting/tier-5/*.mdx` (6 files) + matching quizzes: Research Literacy (a real reproduction walkthrough of Kojima et al. 2022's zero-shot chain-of-thought result, honest about why reproduced numbers won't match a paper's exact digits — deprecated models, different seeds — and why that's fine as long as you say so), Mechanistic Interpretability & Alignment Research, Novel System Design, Contributing Upstream (Hugging Face transformers, vLLM, real RAG/agent frameworks), Teaching & Mentoring, Frontier Tracking & Independent Research Agenda.

**Status:** AI/ML Tier 5 complete (86h, 6 lessons). **AI/ML & Prompt Engineering is now the fourth fully content-complete track in The Manual** — all 6 tiers, 381 hours, 35 lessons — joining CS Foundations, Language Mastery, and Software Engineering. `npm run build` passed clean, 147 unique slugs verified. 5 tracks remain at syllabus-only depth: Hardware Systems, Platforms, DevOps, Cybersecurity & Ethical Hacking, Capstones.

## [v0.27.0] — 2026-09-29 — First tagged release: Tab S9 FE / Z Fold 5 emulated device audit, touch-target fixes

**Context:** First formal versioned release of the app, tagged to match `app/package.json` (previously stale at the scaffold's `0.1.0`) to this file's own canonical version number rather than introducing a second numbering scheme. Prompted by a request to test the app against the Galaxy Tab S9 FE and Galaxy Z Fold 5. This session runs in an isolated cloud container with no USB/network path to physical hardware (confirmed: no `adb`, no `/dev/bus/usb`), so real on-device testing could not be performed directly — instead, the production build was run against Playwright/Chromium at both devices' real viewport dimensions (computed from official physical specs: Tab S9 FE 1440×2304px @ 249ppi; Z Fold 5 cover 904×2316px @ 401ppi, main 2176×1812px @ 373ppi), across 5 device/orientation profiles × 4 key pages (dashboard, track listing, a lesson+quiz page, the review queue) = 20 page loads.

**Caught and fixed before tagging:** every nav back-link, the dashboard's track-name links, and every lesson-list row rendered as a plain inline text link with zero vertical padding — a ~16–19px-tall tap target, well under the ~40–44px usually recommended for touchscreens. Fixed: lesson-list rows are now a full tappable row (`block py-2` plus a hover background) instead of just the title text; the three back-links get `inline-block py-2`; `SkillTree`'s track-name links get `inline-block py-1`; `QuizRunner`'s radio-option labels get `py-2` instead of `py-1`.

**Verified clean after the fix:** zero navigation failures and zero page-level horizontal overflow across all 20 page loads (`document.documentElement.scrollWidth === clientWidth` in every case, including the Z Fold's 344px-wide folded cover screen). Two "element overflows viewport" heuristic flags on the narrowest profiles turned out to be legitimate contained scroll, not bugs — verified directly: the dashboard's skill-tree table (wrapped in `overflow-x-auto`) and Tailwind Typography's code-block `<pre>` (which ships `overflow-x-auto` by default) both scroll internally while the page itself stays locked to the viewport width.

**Known UX rough edge, not fixed here:** the 9-track × 6-tier skill-tree grid is genuinely cramped on the Z Fold's narrow profiles (344–690px) — usable via horizontal swipe inside its scroll container, but most of the tier columns are off-screen without scrolling. A narrow-screen-specific layout (e.g., a per-track card list with tier badges) would be a real improvement; left as a follow-up rather than done under this request's scope.

**What this does and doesn't confirm:** this validates real layout/overflow/touch-target behavior under an accurate emulation of both devices' screens, using the actual production build and real content. It does **not** confirm PWA install behavior, offline service-worker caching, or touch/gesture feel on the real hardware — those need the physical devices themselves, which requires a session running on a computer that can actually reach them (e.g., Claude Code Remote Control from the user's own PC), not this cloud sandbox.

**Status:** Tagged `v0.27.0` — the first release. `app/package.json` version synced to `0.27.0`. `npm run build` passed clean.

## [0.28.0] — 2026-09-29 — Hardware & Computer Systems Tier 0: the fifth track begins

**Context:** Continuing the tier-by-tier pattern with the fifth track. Tier 0 is deliberately light on two things by design — assembly (Tier 1's job) and networking (Tier 3's job) — and this tier's electricity module carries genuine safety weight for an unsupervised self-taught learner, so it was written with explicit, non-negotiable low-voltage-DC-only boundaries rather than generic caution.

**Added**
- `content/hardware-systems/tier-0/*.mdx` (4 files) + matching quizzes: Number Systems & Boolean Basics (real worked base-conversion and two's-complement examples, including verifying -42's encoding by adding it to +42 and watching the carry bit discard to zero), What's Actually Inside a Computer, Electricity Fundamentals & Lab Safety (explicit, concrete boundaries: never work on mains/AC wiring, never open a PSU, never open a CRT — with the actual physical reasons why each is dangerous, not generic warnings), Setting Up Your Toolkit.

**Result:** `npm run build` passed clean on the first attempt. 151 unique slugs verified repo-wide.

**Status:** Hardware & Computer Systems Tier 0 started (22h, 4 lessons) — the fifth track in The Manual to get real lesson content. Tiers 1-5 remain.

## [0.29.0] — 2026-09-29 — Hardware & Computer Systems Tier 1: complete (NAND2Tetris-style, real assembly)

**Context:** Continuing the tier-by-tier pattern. This tier is genuinely hands-on-hardware-building material — content is written to match what a learner should be able to actually construct in Logisim Evolution and single-step in gdb, not just read about.

**Added**
- `content/hardware-systems/tier-1/*.mdx` (5 files) + matching quizzes: Boolean Algebra & Combinational Logic (De Morgan's laws proven by exhaustive truth-table check, every gate derived from NAND alone, a real Karnaugh map worked example with verified minterm coverage, half/full adders and multiplexers built from gates — the NAND2Tetris Projects 1-2 material), Sequential Logic & the Fetch-Decode-Execute Cycle (NAND2Tetris Project 3 and an intro to Project 5), Computer Architecture Fundamentals I, Intro to Assembly Language (real x86-64 snippets, a real Compiler Explorer walkthrough, a real gdb single-stepping session), Number Representation Deep Dive (IEEE-754 hand-encoding, signed/unsigned overflow, endianness).

**Result:** `npm run build` passed clean on the first attempt. 156 unique slugs verified repo-wide.

**Status:** Hardware & Computer Systems Tier 1 complete (76h, 5 lessons). Hardware & Computer Systems is now 2/6 tiers content-complete (Tiers 0-1, 98h); Tiers 2-5 remain.

## [0.30.0] — 2026-09-29 — Hardware & Computer Systems Tier 2: complete (Builder level, a finished computer)

**Context:** Continuing the tier-by-tier pattern. This tier's checkpoint is a finished simple computer, and the content matches that ambition — a full cycle-by-cycle CPU trace and hand-assembled machine code, not diagrams-only description.

**Added**
- `content/hardware-systems/tier-2/*.mdx` (5 files) + matching quizzes: Finishing the Hack Computer (NAND2Tetris Project 5's CPU wired from Tier 1's ALU/registers with a full worked instruction trace — fetch through write-back for `D=D+M` with real register values — and Project 6's two-pass assembler with real hand-assembled Hack machine code), Microcontrollers & Basic Electronics I, Memory Hierarchy & Cache Behavior Empirically, How a Computer Boots (a real NASM boot sector with the 0xAA55 signature explained, run under QEMU), Buses & I/O Fundamentals.

**Result:** `npm run build` passed clean on the first attempt. 161 unique slugs verified repo-wide.

**Status:** Hardware & Computer Systems Tier 2 complete (65h, 5 lessons). Hardware & Computer Systems is now 3/6 tiers content-complete (Tiers 0-2, 163h); Tiers 3-5 remain.

## [0.31.0] — 2026-10-03 — Hardware & Computer Systems Tier 3: 5/6 modules (one module pending, not a content bug)

**Context:** The Tier 3 generation workflow returned 5 of 6 modules successfully; the 6th (Assembly & C in Systems Context) failed mid-run with "You've hit your session limit · resets 12am (UTC)" — an external usage-limit constraint on the generating agent, not a scripting or content defect. Rather than hold all 5 good modules hostage to that one retry, they're committed now as a deliberate partial-tier checkpoint; the 6th module is being regenerated from the exact original prompt (recovered from the failed run's own transcript) in the background and will land as its own follow-up commit to close out the tier.

**Added**
- `content/hardware-systems/tier-3/*.mdx` (5 of 6 files) + matching quizzes: Operating Systems: Processes, Threads & Scheduling (task_struct/mm_struct-level process-vs-thread mechanics, a worked round-robin Gantt trace with exact waiting times, why CFS is a structurally different idea than round robin, a real race-condition-then-fix in pthreads, annotated xv6 `scheduler()` source), Operating Systems: Memory Management & Filesystems, Build Your Own OS Kernel (xv6), Networking Fundamentals: TCP/IP, DNS, HTTP (the canonical deep networking module for the whole curriculum per MASTERFILE.md §4.5), Real-Time & Networked Embedded Systems.

**Result:** `npm run build` passed clean. 166 unique slugs verified repo-wide.

**Status:** Hardware & Computer Systems Tier 3 at 5/6 modules (103h of 115h). Assembly & C in Systems Context pending as an immediate follow-up commit — not a new task, the same tier.

## [0.32.0] — 2026-10-03 — Hardware & Computer Systems Tier 3: complete (Assembly & C module lands)

**Context:** Closing out Tier 3. The session limit that blocked Assembly & C in Systems Context in the previous entry reset before 12am UTC as expected; the module was regenerated from the exact original prompt (recovered verbatim from the failed run's own agent transcript, not rewritten from scratch) to keep it consistent with its 5 siblings, then assembled, slug-checked, and build-validated with the rest of the tier.

**Added**
- `content/hardware-systems/tier-3/assembly-and-c-in-systems-context.mdx` + quiz: real annotated x86-64 `__switch_to_asm` from the Linux kernel tying back to this tier's own scheduling module, the System V AMD64 ABI calling-convention table with two fully worked examples (a 7-argument call spilling onto the stack, and why a callee-saved register needs an explicit push/pop around a call), and a single compiled `hello.c` walked through `objdump`, `gdb`, `strace`, and `ltrace` side by side, each tool shown catching a different boundary and missing the others.

**Result:** `npm run build` passed clean — 184 pages, 167 unique slugs verified repo-wide.

**Status:** Hardware & Computer Systems Tier 3 complete (115h, 6 lessons). Hardware & Computer Systems is now 4/6 tiers content-complete (Tiers 0-3, 278h); Tiers 4-5 remain.

## [0.33.0] — 2026-10-03 — Hardware & Computer Systems Tier 4: complete (microarchitecture to open-source contribution)

**Context:** Continuing the tier-by-tier pattern. This is the specialization tier — pipelining/branch prediction traced by hand, MESI coherence, real profiling tools, bare-metal Cortex-M with no vendor HAL, and the open-source contribution workflow itself as taught content, not just a checkpoint instruction.

**Added**
- `content/hardware-systems/tier-4/*.mdx` (6 files) + matching quizzes: CPU Microarchitecture: Pipelining to Out-of-Order Execution (a full pipeline-hazard trace including the load-use stall, a hand-traced 2-bit saturating-counter branch predictor scoring 3/12 mispredictions against a 1-bit predictor's 5/12 on the same branch history, and Spectre/Meltdown grounded in Tier 2's own cache material), Cache Coherence & Memory Consistency (MESI state transitions, a real false-sharing example with its fix), Performance Engineering (perf/flame graphs/SIMD — slugged `systems-performance-engineering` to stay distinct from CS Foundations Tier 4's own, differently-scoped Performance Engineering module), Bare-Metal Embedded Systems (register-level Cortex-M GPIO, a real linker script and startup reset handler), Contributing to a Real Open-Source Systems Project (the mailing-list patch workflow vs. a GitHub PR workflow, concretely contrasted), Advanced Networking: Beyond the Basics (TCP congestion control, a TLS 1.3 handshake walkthrough building on Tier 3's canonical networking module).

**Caught and fixed:** the generated `performance-engineering` slug collided with CS Foundations Tier 4's existing module of the same slug — Velite's own collection-wide uniqueness check missed it again (the same known async-race gap noted in earlier entries), but this session's independent repo-wide slug scan caught it before the commit. Renamed to `systems-performance-engineering`, re-validated, no other changes needed.

**Result:** `npm run build` passed clean — 189 pages, 173 unique slugs verified repo-wide.

**Status:** Hardware & Computer Systems Tier 4 complete (118h, 6 lessons). Hardware & Computer Systems is now 5/6 tiers content-complete (Tiers 0-4, 396h); only Tier 5 (Expert/Innovator) remains to finish the track.
