# Capstones, Specializations & Career Launch

_Part of [The Manual](../../MASTERFILE.md) — track `capstones-career`. Tier numbering matches MASTERFILE.md §1._

This is the synthesis track — it teaches no language and no single domain, it teaches how to turn everything learned in the other seven tracks into real, shipped, defensible work. At every tier the learner ships a cross-track capstone that pulls together whatever fundamentals, languages, and systems knowledge they've accumulated so far. Starting at Tier 1 they sample all six specialization branches (security/red-blue team, data engineering, robotics/IoT, game dev, ML research, systems/compilers), then progressively commit to one for deep, portfolio-defining work. Running in parallel and just as load-bearing: a real open-source contribution history (from first typo-fix PR to upstream maintainership) and genuine DS&A + system-design interview fluency — the two things that most reliably separate a self-taught engineer who can talk about code from one who gets hired, funded, or taken seriously. It converges at Tier 5 in a self-designed "magnum opus" capstone at the intersection of two specializations, published and defended publicly, plus a teach-others-to-learn capstone that closes the entire curriculum's loop by turning the learner into a teacher of it.

**How this feeds AI/prompting literacy:** Prompting is a graded, escalating skill in this track, not a shortcut around it. Tier 1's drill is "get unstuck": paste a real stack trace from your own capstone into an AI, get help, then write in your own words why the fix works — graded on whether the explanation shows genuine understanding versus parroted AI text. Tier 2 escalates to AI pair-programming with a hard rule: you must rewrite/reject at least 20% of what it suggests and document why, so you never ship code you can't defend. Tier 3 flips the direction — you hand an AI an unfamiliar 500+ line file from a real open-source project and have it explain the architecture, then you verify that explanation against the actual tests and behavior and flag what it got wrong. Tier 4 turns the AI into an adversary: you feed it your system design and instruct it to attack it for scalability and failure-mode gaps, then log which critiques were real versus noise, which is a direct rehearsal for both technical interviews and real design reviews. Tier 5 closes the loop: the AI can be a co-author or co-reviewer on your published capstone write-up, but you must be able to defend every claim it helped phrase to a human reviewer. The through-line — direct the model, verify its output against ground truth, never accept fluent-sounding text as correct — is exactly the discipline "understanding and prompting AI well" means in practice, and this track is the only place in the curriculum where that discipline is exercised on real, shipped, high-stakes work instead of toy prompts.

**How this transfers across platforms (PC/mobile/web/embedded):** Capstones are deliberately sequenced to force platform range rather than let the learner settle into one comfortable target. Tier 0-1 capstones are terminal/CLI tools, which already means "runs the same on Windows/macOS/Linux" is a real constraint the learner has to reason about. Tier 2-3 capstones move to deployed web apps with APIs and persistence — a different deployment and packaging model again. From Tier 1's specialization taster onward, the six branches are chosen specifically because each one lives on a different platform substrate: robotics/IoT runs on real or simulated embedded hardware with none of a PC's memory or OS guarantees; game dev targets engines (Godot/Unity-class) that export the same project to PC, mobile, and console; security work spans web, network, and OS layers simultaneously; systems/compilers work runs close to the metal with no runtime safety net; data engineering has to move data reliably between heterogeneous systems. By the Tier 4 specialization capstone and Tier 5 magnum opus, a learner following this track has personally shipped to at least three genuinely different platform targets and can speak concretely — from direct experience, not analogy — to what does and doesn't change about building for PC versus mobile versus embedded versus web, which is exactly the cross-platform fluency the whole curriculum is aiming at.

---

## Tier 0: Orientation & Literacy

**Goal:** LIGHT TIER, by design: at Tier 0 the learner has no domain fundamentals yet from any other track, so no real capstone is possible or honest to assign. Instead this tier builds the meta-infrastructure everything later depends on — version-control literacy, a public presence, a habit of documenting one's own learning, and a first honest look at the six specialization branches and what a tech career/portfolio even looks like — so that Tier 1's first capstone has somewhere real to land.

**Modules** (~11h):

- **Open-Source Etiquette & Licensing** — ~2h: assumes CS Foundations Tier 0's git basics — adds what this track specifically needs: pull requests and issues as conversations (not just code), writing a README that sells a project to a stranger, choosing an open-source license
- **Building Your "Learning OS"** — ~3h: a personal knowledge base (plain markdown + git, or a tool like Obsidian), a dev journal habit: what you tried, what broke, what you learned, tagging/linking notes so they compound over tiers, why writing things down beats re-learning them twice
- **The Specialization Map** — ~3h: overview of the six branches: security/red-blue team, data engineering, robotics/IoT, game dev, ML research, systems/compilers, reading a 'day in the life' account or talk for each branch, what kind of thinker each branch tends to reward, building a first-pass ranked list of interest (to be revisited, not locked in)
- **Career Literacy 101** — ~3h: what a tech portfolio is and isn't, reading real job postings to reverse-engineer required skills, resume and LinkedIn basics (structure, not polish yet), the difference between a tutorial-follower and a portfolio project

**Quizzes / assessment:**

- *Micro-quiz (spaced-repetition eligible)* — 5-10 auto-graded questions on git/GitHub vocabulary: repo, commit, branch, merge, pull request, issue, fork, clone, README, license.
- *Explain it back (Feynman teach-back)* — Write a plain-language explanation of what a repository, a commit, and a pull request are, aimed at a non-technical friend; self-graded against a model answer for accuracy and jargon-free clarity.
- *Spaced-repetition flashcard deck* — 10-15 card deck covering git/GitHub terms and the names + one-line descriptions of the six specialization branches, scheduled via SM-2 for ongoing review through Tier 1.

**Checkpoint project:** Publish a public 'Base Camp' GitHub repo containing: a README stating your learning goals and current specialization-interest ranking, a markdown learning-journal template with a real first entry, an OSS license, and (even minimally) a working badge or CI check — this repo becomes the home base every later capstone links back to.

**Creative teaching methods:**

- Portfolio artifact requirement — the Base Camp repo itself is the first graded artifact of the whole curriculum.
- Prompting drill — use an AI assistant to help draft your first README, but you must find and correct at least one generic or wrong thing it produced, and note what you changed and why.
- Explain-it-back teach-back on core git concepts (see quiz above), doubling as your first writing-for-an-audience exercise.

**Curated resources:**

- [GitHub Docs — "Hello World" quickstart](https://docs.github.com/en/get-started/quickstart/hello-world) — Official, hands-on first repo/branch/PR walkthrough.
- [GitHub Skills — "Introduction to GitHub" interactive course](https://skills.github.com/) — Official, browser-based, learn-by-doing GitHub course.
- [The Odin Project — Foundations course, Git Basics lessons](https://www.theodinproject.com/paths/foundations/courses/foundations) — Free, project-oriented; also models good README/project-narrative habits used later.
- [freeCodeCamp — "Git and GitHub for Beginners" article/tutorial](https://www.freecodecamp.org/news/git-and-github-for-beginners/) — Free, concise reference for the core workflow.
- [Class Central — curated free Git & GitHub course listings](https://www.classcentral.com/subject/git) — Use to find an alternate free course if a format above doesn't click.

---

## Tier 1: Foundations

**Goal:** Ship the first real cross-track capstone — small, but genuinely built rather than tutorial-copied — while laying two foundations that every later tier depends on: basic DS&A intuition (needed for both real code and future interviews) and a hands-on taste of all six specialization branches, so the Tier 2 'pick a lean' decision is based on doing, not guessing.

**Modules** (~23h):

- **Cross-Track Capstone #1** — ~6h: scoping a project small enough to finish in a week, combining CS-Foundations-Tier-1 concepts with a first language's Tier-1 syntax, basic testing of your own code, shipping something that runs end to end, however small
- **DS&A Foundations Primer** — ~6h: arrays and strings, hash maps and why they're fast, Big-O intuition (not proofs yet), reading a function and estimating its complexity
- **Specialization Taster Sampler** — ~8h: security: run a basic Nmap-style scan against a lab target and write up findings, data engineering: wrangle a messy CSV into a clean table, robotics/IoT: blink an LED or move a servo in a simulator (e.g., Wokwi), game dev: build a one-screen script in a real engine (Godot/Pygame-class), ML research: run a small pretrained model and inspect its output, systems/compilers: build a toy calculator/bytecode interpreter for a tiny grammar
- **Writing Project Narratives** — ~3h: the problem/solution/architecture/demo README structure, writing for a stranger who has 30 seconds, screenshots/GIFs as proof of a working project, the difference between documentation and marketing

**Quizzes / assessment:**

- *Micro-quiz* — 5-10 questions classifying short code snippets by time complexity (O(1)/O(n)/O(n^2)/O(log n)).
- *Bug hunt / code-review kata* — Given a small, intentionally broken CLI tool (an off-by-one error and one unhandled-input crash), find and fix both, then write a one-paragraph root-cause note.
- *Prompting drill* — Paste a real stack trace from your own Capstone #1 project into an AI assistant, get help debugging it, then explain in your own words — not the AI's — why the fix works; graded on evidence of real understanding versus copy-pasted phrasing.

**Checkpoint project:** Ship one small, polished project (e.g., a CLI habit tracker or similar) with working code, at least a handful of tests, a proper problem/solution/architecture/demo README, a license, and a way for a stranger to actually run it — plus a one-page 'Specialization Interest Log' ranking the six branches after having tried each.

**Creative teaching methods:**

- Build-then-break challenge — after finishing the CLI tool, have a peer (or an AI given adversarial instructions) try to break it with edge-case input; fix what breaks.
- Spaced-repetition flashcards continuing from Tier 0, now adding Big-O terms (linear, logarithmic, quadratic, amortized).
- Portfolio artifact requirement — Capstone #1 becomes the second real artifact in the Base Camp repo.

**Curated resources:**

- [MIT OCW 6.006 — Introduction to Algorithms (Fall 2011)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/) — Early lectures give real intuition for Big-O before the deeper Tier-3 dive.
- [Khan Academy — Algorithms unit, "Asymptotic notation"](https://www.khanacademy.org/computing/computer-science/algorithms) — Free, visual, built with Dartmouth CS faculty; pairs well with the OCW lectures.
- [freeCodeCamp — JavaScript Algorithms and Data Structures Certification](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/) — Free certification track; early modules cover Big-O and basic structures hands-on.
- [Exercism](https://exercism.org) — Free, mentored practice problems in any language — use for the taster-sampler mini-exercises.
- [Advent of Code](https://adventofcode.com) — Free daily puzzles; a couple of early-calendar days are perfect small capstone-adjacent practice.

---

## Tier 2: Builder

**Goal:** Move from guided exercises to independent building: ship a second capstone that leans toward a tentative specialization, start structured DS&A practice with real problem sets, and cross the single most important threshold in this whole track — landing your first real, merged open-source pull request.

**Modules** (~34h):

- **Cross-Track Capstone #2** — ~10h: combining 2-3 tracks' Tier-2 material — typically **CS Foundations + Language Mastery + Software Engineering** Tier 2 (the "bedrock trio"), since those are the tracks most learners have reached by now — into one independent project, picking a project that visibly connects to a specialization interest, no hand-holding: you scope, build, and debug it yourself
- **DS&A Practice Sprint 1** — ~10h: sorting and searching algorithms and their tradeoffs, recursion, stacks, queues, and linked lists, ~30 solved problems, tracked, with post-mortems on the ones you got wrong
- **Open Source 101** — ~6h: anatomy of a real repo: CONTRIBUTING.md, CODE_OF_CONDUCT, issue templates, how to find a genuinely good first issue, the fork -> branch -> PR -> review -> merge loop end to end, handling review feedback without taking it personally
- **Specialization Deep-Dive Intro** — ~8h: pick one of the six branches based on your Tier-1 taster results, foundational reading/docs for that branch, one guided mini-project inside it, slightly beyond a tutorial

**Quizzes / assessment:**

- *Micro-quiz* — 5-10 questions completing a table of sorting algorithms by time complexity and stability (bubble, insertion, merge, quick).
- *Code-review kata* — Review an intentionally bad open-source-style PR diff (poor naming, no tests, an obvious edge-case bug) and leave structured, specific review comments as if you were the maintainer.
- *Specialization-flavored challenge* — A domain-matched mini-challenge in your chosen branch: a beginner CTF flag for security, a small Titanic-style notebook for ML, an Advent of Code day for systems, an ETL-on-a-toy-dataset task for data engineering, etc.

**Checkpoint project:** Get your first real pull request merged into a genuine open-source project (a real code contribution, not just a typo fix, is the goal — though a doc fix is an acceptable floor), and ship a Tier-2 capstone in your chosen specialization lean with a demo GIF or short video in its README.

**Creative teaching methods:**

- Prompting drill — pair-program a feature with an AI assistant, but you must rewrite or reject at least 20% of what it produced and document why in your commit messages.
- Build-then-break with a real peer or study partner over a few days, not yourself alone.
- Portfolio artifact requirement — Capstone #2 plus your merged PR link both go into the Base Camp repo's project index.

**Curated resources:**

- [Open Source Guide — "How to Contribute to Open Source" (by GitHub)](https://opensource.guide/how-to-contribute/) — The canonical free walkthrough of the whole contribution loop.
- [freeCodeCamp — "How to Contribute to Open Source Projects: A Beginner's Guide"](https://www.freecodecamp.org/news/how-to-contribute-to-open-source-projects-beginners-guide/) — Practical, example-driven companion to the guide above.
- [Good First Issue](https://goodfirstissue.dev) — Aggregates beginner-friendly open issues across real projects by language/topic.
- [MIT OCW 6.006 — Introduction to Algorithms (Fall 2011)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/) — Continue into the sorting/searching lecture block for Sprint 1.
- [Exercism](https://exercism.org) — Continue structured practice; mentors' feedback doubles as a code-review preview.

---

## Tier 3: Practitioner

**Goal:** Graduate to real-world scale: a multi-component capstone that pulls from three or more tracks, sustained (not one-off) open-source contribution to a single real project, the DS&A pattern vocabulary and system-design fundamentals that interviews actually test, and a live portfolio site that makes all of this visible to someone else.

**Modules** (~76h):

- **Cross-Track Capstone #3** — ~20h: a multi-component project: API + frontend + persistence, or a game with a save system, or a small data pipeline, pulling from 3+ tracks at Tier-3 depth — commonly **CS Foundations + Language Mastery + Software Engineering + Platforms** Tier 3 for an API+frontend+persistence app, or swap in **AI/ML** Tier 3 for an AI-feature-centric capstone — deploying it somewhere real, not just running it locally
- **DS&A Pattern Mastery** — ~20h: trees and graphs (traversals, BFS/DFS), heaps and priority queues, intro dynamic programming, the common interview 'patterns' (two pointers, sliding window, binary search on answer)
- **Sustained Open-Source Contribution** — ~15h: picking one real project to stay with, not a different one each time, reading a large unfamiliar codebase without panicking, landing 3+ merged PRs across the tier, responding to maintainer pushback constructively
- **Specialization Selection + Applied Project** — ~15h: confirming (or changing) your primary specialization branch based on real evidence from Tiers 1-2, an applied, intermediate-difficulty project inside it, connecting the specialization work back into Capstone #3 where possible
- **Build Your Portfolio Site** — ~6h: deploying a real personal site (not just a GitHub profile README), structuring it around 2-3 projects with real narratives, using a platform/deployment method learned in the Platforms track

**Quizzes / assessment:**

- *Micro-quiz (spaced-repetition eligible)* — 5-10 questions on graph and tree properties: traversal order results, balance, connectivity, and cycle detection.
- *Code-review kata* — Pick a real, currently-open PR on your target open-source project, review it independently before reading the maintainers' comments, then compare your review to theirs.
- *Prompting drill* — Hand an AI assistant an unfamiliar 500+ line file from your target open-source project and have it explain the architecture; verify its explanation against the actual tests and runtime behavior and flag anything it got wrong.
- *Feynman teach-back* — Record a 5-minutes-or-less video walkthrough of Capstone #3's architecture, aimed at someone who has never seen the project.

**Checkpoint project:** Ship Capstone #3 publicly deployed with an architecture diagram, hit 3+ merged PRs on one real open-source project this tier, and have a live personal portfolio site linking all of it together.

**Creative teaching methods:**

- Build-then-break at deployment scale — after Capstone #3 is live, run a structured 'break it' pass (bad inputs, basic load, adversarial use) and document every fix.
- Code-review katas built from real historical bugs pulled off your target open-source project's own issue tracker, not synthetic examples.
- Feynman teach-back recorded video (see quiz above) — doubles as a portfolio artifact and interview-communication rehearsal.

**Curated resources:**

- [MIT OCW 6.006 — Introduction to Algorithms (Fall 2011)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/) — Full course now, especially the trees/graphs/DP lecture block.
- [freeCodeCamp — JavaScript Algorithms and Data Structures Certification](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/) — Later modules cover trees, graphs, and DP with graded projects.
- [CS50x (Harvard, cs50.harvard.edu) — Data Structures week](https://cs50.harvard.edu/x/) — Free; strong, concrete treatment of linked lists, trees, and hash tables.
- [Open Source Guide — "Finding a Project to Contribute To"](https://opensource.guide/how-to-contribute/#finding-a-project-to-contribute-to) — Guidance specifically on staying with and going deeper on one project.
- [Class Central — free "system design" course search](https://www.classcentral.com/search?q=system+design) — Use to find a free intro system-design course matching your learning style.

---

## Tier 4: Advanced / Specialist

**Goal:** Go deep on one specialization branch with a portfolio-centerpiece capstone, take on real ownership inside an open-source project rather than drive-by PRs, and complete a genuine interview-prep intensive — heavy DS&A plus system-design fundamentals plus mock interviews — because this is the tier where 'can build things' has to become 'can prove it to a stranger under time pressure.'

**Modules** (~113h):

- **Specialization Deep Dive (choose one)** — ~30h: security/red-blue: draws directly on Cybersecurity & Ethical Hacking Tiers 2-4 (see MASTERFILE.md §4.5) rather than teaching pentesting from scratch here — pick a real checkpoint from that track's Tier 3 or 4 (e.g. the Active Directory pentest-and-detect report, or a chosen Red/Blue/AppSec path project) as this capstone's centerpiece, data engineering: a real batch+streaming ETL pipeline, data modeling, orchestration basics, robotics/IoT: a real or simulated sensor/actuator project, control loops, embedded resource constraints, game dev: ship a complete small game in a real engine, game-loop architecture, basic physics/AI, ML research: implement a paper's core model from scratch (no high-level shortcuts), understand training dynamics, systems/compilers: write a toy compiler/interpreter for a non-trivial language subset, or work through an OS-fundamentals progression
- **Advanced Capstone (Tier 4)** — ~30h: one substantial, portfolio-centerpiece project in the chosen specialization, performance considerations, not just correctness, architecture-level decisions and documented tradeoffs
- **Interview Prep Intensive** — ~30h: 150+ DS&A problems across all major patterns, tracked with spaced review of misses, system design fundamentals: scalability, database choices, caching, load balancing, structured mock interviews with rubric grading
- **Open-Source Leadership Track** — ~15h: take ownership of one real feature or module end to end, review a newer contributor's PR on the same project, build a track record as a recognized regular, not a one-off contributor
- **Portfolio Case Studies** — ~8h: rewrite your best 3 projects as problem/constraints/decisions/metrics/lessons-learned case studies, writing for a hiring manager or reviewer, not a peer developer, quantifying impact wherever honestly possible

**Quizzes / assessment:**

- *Micro-quiz* — 5-10 questions on system-design tradeoff vocabulary: CAP theorem, consistency models, cache invalidation strategies, load-balancing approaches.
- *CTF-style / war-game or domain-equivalent challenge* — An outside, real challenge matched to your specialization: an actual beginner-to-intermediate CTF event or room for security, a Kaggle competition entry for ML, an embedded control challenge for robotics/IoT, a throughput/perf-golf problem for systems.
- *Mock technical interview* — A timed 45-minute session (2 DS&A problems + 1 system-design prompt) graded by a peer, mentor, or a written rubric you follow rigorously against your own recording.
- *Prompting drill* — Feed your system design to an AI assistant and instruct it to actively attack the design for scalability and failure-mode gaps; log which of its critiques were valid versus noise.

**Checkpoint project:** Ship the Tier-4 specialization capstone publicly, and pass a full mock interview loop (2 DS&A rounds + 1 system-design round + 1 behavioral round) with results scored against a written rubric and logged in your learning journal.

**Creative teaching methods:**

- War-game/CTF-style or domain-equivalent challenge matched to your specialization branch (see quiz above).
- Prompting drill as adversarial design reviewer — the AI red-teams your architecture before a human does.
- Build-then-break at scale — load-test or adversarially test the Tier-4 capstone itself and document every failure mode found and fixed.

**Curated resources:**

- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — Official, free — the security-branch reference standard.
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) — Official free deliberately-vulnerable app for the break-then-patch exercise.
- [MIT OCW 6.033 — Computer System Engineering (Spring 2018)](https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/) — Real architecture-level systems thinking; strong for the systems/compilers and data-engineering branches.
- [NAND2Tetris — "Build a Modern Computer from First Principles"](https://www.nand2tetris.org) — Free; the canonical from-scratch systems/compilers progression (also useful alongside the Hardware track).
- [Andrej Karpathy — "Let's build GPT: from scratch" + the nanoGPT repo](https://github.com/karpathy/nanoGPT) — Free video + code; the standard from-scratch reference for the ML-research branch's paper-implementation module.
- [Godot Docs — "Your First 2D Game"](https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html) — Official engine docs; a complete, real, shippable game walkthrough for the game-dev branch.

---

## Tier 5: Expert / Innovator

**Goal:** Converge everything into a self-designed, novel 'magnum opus' capstone at the intersection of two specializations; take on real upstream responsibility in open source; publish and defend the work publicly; and complete the track's signature move — a teach-others-to-learn capstone that turns the learner into a teacher, closing the loop on the entire curriculum.

**Modules** (~95h):

- **The Magnum Opus Capstone** — ~40h: an original project of your own design, not a tutorial clone, deliberately positioned at the intersection of 2+ specializations (e.g., ML + security = adversarial ML, or robotics + systems = real-time embedded control), genuine novelty in angle or approach, even at small scale, rigorous benchmarking/evaluation of your own claims
- **Upstream Maintainership** — ~20h: become a maintainer or trusted core contributor on a real open-source project, triaging issues and reviewing others' PRs, participating in real architectural decisions, not just implementation
- **Publish & Present** — ~10h: write a technical blog post or paper-style writeup of the Magnum Opus, optionally position it as an arXiv preprint if research-flavored, or a dev-audience post otherwise, give a talk or recorded presentation and take real questions
- **Teach-Others-to-Learn Capstone** — ~15h: design a mini-curriculum (3-5 lessons) teaching one specific skill to a real learner, borrow this curriculum's own tier/pedagogy-toolkit structure deliberately, run it with a real person (friend, junior dev, or online cohort), collect feedback and iterate on the lessons based on what actually worked
- **Career Launch Sprint** — ~10h: refine resume, LinkedIn, and portfolio site v2 around the Magnum Opus and case studies, a mock onsite loop with a real practitioner if at all possible, apply for and land at least one real interview loop, freelance client, or open-source fellowship/grant

**Quizzes / assessment:**

- *Explain it back, two registers* — Teach your Magnum Opus's hardest concept once to a total beginner and once to an expert reviewer; collect written feedback from both on clarity and accuracy, and reconcile the differences.
- *Peer/mentee-graded rubric* — The real learner from your Teach-Others-to-Learn capstone completes a short assessment you wrote for them; their actual results — not just their satisfaction — count as your grade on this module.
- *Research-competition or war-game entry* — Submit to a real external, outside-validated challenge aligned with your Magnum Opus: a live CTF, a Kaggle competition, or an OSS bug bounty.

**Checkpoint project:** The Magnum Opus shipped, benchmarked, and published/presented publicly; at least one architecturally significant upstream-merged open-source contribution; and a completed Teach-Others-to-Learn cycle with documented, honest learner feedback. This is the final gate of the entire 9-track curriculum.

**Creative teaching methods:**

- The Teach-Others-to-Learn capstone itself as the ultimate Feynman/explain-it-back exercise — you don't just claim mastery, you have to produce it in someone else.
- Build-then-break at research level — peers or an AI red-team your Magnum Opus's specific claims and benchmark numbers before you publish.
- Prompting drill as co-author/co-reviewer — an AI may help phrase or tighten your publication, but you must be able to defend every claim it touched to a human reviewer, unaided.

**Curated resources:**

- [arXiv.org](https://arxiv.org) — Literature search to position your Magnum Opus against related work, and an optional preprint venue.
- [Semantic Scholar](https://www.semanticscholar.org) — Free academic search with citation graphs; faster than arXiv alone for finding related work.
- [Open Source Guide — "Leadership and Governance"](https://opensource.guide/leadership-and-governance/) — Official, free guide on what real project stewardship/maintainership involves.
- [MIT OCW 6.172 — Performance Engineering of Software Systems (Fall 2018)](https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/) — Graduate-level rigor for benchmarking and justifying performance claims in your writeup.
- [freeCodeCamp News — technical writing articles](https://www.freecodecamp.org/news/tag/technical-writing/) — Free, practical guidance for the Publish & Present module.
- [Class Central — free graduate-level course search](https://www.classcentral.com) — Find one advanced free course matching your Magnum Opus's specific field for deeper grounding.

---
