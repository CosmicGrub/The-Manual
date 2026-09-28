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
