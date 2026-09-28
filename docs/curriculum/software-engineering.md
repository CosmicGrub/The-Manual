# Software Engineering & Architecture

_Part of [The Manual](../../MASTERFILE.md) — track `software-engineering`. Tier numbering matches MASTERFILE.md §1._

This track is where "I can write code" turns into "I can build and maintain systems other people (or future-you) can trust." It covers version control as a real collaboration discipline, testing (unit/integration/e2e/TDD) as a design tool rather than an afterthought, SOLID and clean/hexagonal architecture, relational and NoSQL data modeling, API design, code review as a practiced craft, and system design fundamentals up through distributed-systems thinking. Tier 0 is intentionally LIGHT here — general terminal/file/variable literacy is owned by the CS & Programming Foundations track; this track's Tier 0 only adds the SE-specific literacy (git, dev environments, docs, and asking for help) that the rest of the tiers assume. Tier 5's assessment also shifts shape deliberately: instead of more quizzes, it moves to portfolio/peer/upstream-maintainer review, because "expert" in this domain is demonstrated by what you ship and who you teach, not what you can answer on a test. Throughout, this track is the connective tissue for the other seven: it is what turns raw language syntax (Language Mastery track) and algorithms (CS Foundations track) into maintainable systems, and what makes the AI/ML track's "have the AI write the code" workflows safe rather than reckless.

**How this feeds AI/prompting literacy:** Software engineering discipline and good AI prompting are the same muscle pointed at different targets. Writing a precise spec/acceptance-criteria before coding (Tiers 1-3) is structurally identical to writing a good prompt with explicit constraints, inputs, and success criteria — a learner who can write a clear Gherkin-style "given/when/then" for a feature can write a clear prompt for an LLM to implement it. TDD gives you an oracle: instead of trusting AI-generated code, you make the AI's output pass tests you (or it, under your review) wrote first — this track's "get an AI to write tests, then interrogate whether those tests actually catch bugs" drill (Tier 1) and "Socratic devil's-advocate architecture reviewer" drill (Tier 4) are explicit rehearsals for working with an LLM as a fallible collaborator rather than an oracle. Code-review skill (Tiers 3-4) transfers directly onto reviewing AI-generated diffs and PRs, and is the single highest-leverage skill for using AI coding tools safely, since LLMs reliably reproduce classic anti-patterns (God objects, missing input validation, N+1 queries, and — critically — the exact OWASP Top 10 classes covered in Tier 4, especially injection and broken auth). Knowing SOLID/design-pattern vocabulary lets you give an AI assistant precise architectural instructions ("apply the Strategy pattern here, inject the dependency, don't introduce a Singleton") instead of vague requests, and lets you recognize when it silently defaults to a bad one. Finally, the system-design tier (Tier 4-5) gives you the vocabulary (consistency models, sharding, caching, ADRs) to prompt an AI for infrastructure/scaling trade-off analysis and to evaluate whether its answer is actually sound versus plausible-sounding — this is the core meta-skill for using AI as a thinking partner instead of an answer vending machine.

**How this transfers across platforms (PC/mobile/web/embedded):** Almost everything in this track is deliberately platform-agnostic by design, which is the point: git, testing discipline, SOLID, design patterns, API design, and data modeling underlie an app whether it ships as a web backend, a native iOS/Android app's sync layer, a Windows/macOS/Linux desktop app's local store, or an embedded/edge device's persistence layer. The API-design and polyglot-persistence modules (Tier 3) are literally the connective tissue that lets ONE backend serve web, mobile, and desktop clients simultaneously — this is exactly what the Platform & Cross-Platform Dev track builds against. The Clean/Hexagonal Architecture module (Tier 3) teaches separating core business logic from delivery mechanism (ports & adapters), which is precisely what lets the same domain logic run behind a REST API today, a GraphQL API tomorrow, a CLI, or a mobile SDK, without rewriting the core — a direct prerequisite for writing code once and shipping it to PC, mobile, and web. The CI/automated-quality-gates module (Tier 3) is the on-ramp to the DevOps & Tooling track's per-platform build/test/release pipelines. And the system-design/caching/scaling knowledge in Tier 4 applies identically to a website's backend, a mobile app's sync/offline-first service, and a game server — the physics of "many clients, one source of truth" don't change with the client platform.

---

## Tier 0: Orientation & Literacy

**Goal:** NOTE: this tier is deliberately LIGHT for this track. General terminal use, filesystem literacy, and "what is a variable/program" belong to the CS & Programming Foundations track's Tier 0 and are assumed complete before starting here. This tier's job is narrower: give the learner the specific literacy that every later module in THIS track leans on — what version control is and why it exists, how to set up a real dev environment, and how to read documentation and ask for help (including from an AI) effectively. By the end, the learner can set up a project, track its history in git, and push it to GitHub without hand-holding.

**Modules** (~11h):

- **What Software Engineering Is (vs. "just coding")** — ~2h: Programming vs. software engineering, The software development lifecycle (SDLC) at a glance, Why process, documentation, and teammates-you-haven't-met matter, First guided walk-through of an unfamiliar small codebase
- **Dev Environment Setup** — ~3h: Installing and configuring VS Code (or an equivalent editor) plus core extensions, Installing a language runtime and verifying it on PATH, Running and debugging a "Hello World" with breakpoints, Understanding what a REPL, compiler, and interpreter each do
- **Git & GitHub Absolute Basics** — ~4h: Why version control exists (the "track changes" problem at scale), init / add / commit / status / log, Creating a GitHub account and remote repo; clone / push / pull, Writing a README and a sane .gitignore
- **Reading Docs & Getting Unstuck (including AI-assisted)** — ~2h: Reading official language/framework docs vs. random blog posts, Using --help / man pages, Writing a good bug report / Stack Overflow question (minimal repro, exact error text), Writing your first well-formed debugging prompt to an AI assistant

**Quizzes / assessment:**

- *Micro-quiz (5-10 Q, auto-gradable, spaced-repetition eligible)* — Git vocabulary and command recall: repo, commit, branch, remote, clone vs. fork, staged vs. unstaged, push vs. pull.
- *Spaced-repetition flashcard deck* — Core dev-environment and SE vocabulary: compiler vs. interpreter, IDE vs. text editor, runtime vs. SDK, repo vs. working directory.

**Checkpoint project:** Set up your dev rig and publish your first repo: install your editor, git, and one language runtime from scratch; write a small script (10-30 lines) that does something real (e.g., a text file word counter); commit it in at least 5 meaningful, well-messaged increments; push it to a public GitHub repo with a README explaining what it does and how to run it.

**Creative teaching methods:**

- Explain it back / Feynman teach-back: write or record a 2-minute plain-English explanation of what a repo, commit, and branch are, as if teaching a non-technical friend — no jargon allowed.
- Prompting drill: deliberately break your PATH or a config file, then get an AI assistant to help you fix it using only a well-written prompt that includes the exact error text and what you've already tried; grade yourself on whether your first prompt was good enough to get a correct fix without back-and-forth.

**Curated resources:**

- [Pro Git (Chacon & Straub) — Ch. 1-2](https://git-scm.com/book/en/v2) — Free official git book; covers version control fundamentals and basic git usage.
- [Learn Git Branching](https://learngitbranching.js.org/) — Free interactive, visual git sandbox — best way to build intuition for commits/branches before memorizing commands.
- [GitHub Docs — "Hello World" quickstart](https://docs.github.com/en/get-started/quickstart/hello-world) — Official GitHub walkthrough of creating a repo, branch, and first pull request.
- [VS Code official docs — Getting Started](https://code.visualstudio.com/docs) — Official editor setup and debugging basics.
- [CS50x, Week 0](https://cs50.harvard.edu/x/) — Harvard's free intro course; Week 0 doubles as strong general dev-environment and problem-solving orientation.

---

## Tier 1: Foundations

**Goal:** Build the core, tightly-scaffolded vocabulary and mechanics of software engineering: real git collaboration workflows, the basics of automated testing, clean small-scale code, relational databases and SQL, and building/consuming a REST API. Every module here has heavy guardrails — the point is repetition of correct mechanics, not independent judgment yet.

**Modules** (~37h):

- **Git Deep Dive: Branching, Merging & Collaboration** — ~6h: Feature branches; merge vs. rebase, Resolving merge conflicts by hand, Pull requests and review etiquette, Issues, labels, and linking commits to issues
- **Intro to Automated Testing** — ~6h: (canonical testing/TDD-philosophy module for The Manual — Language Mastery's testing content is runner-syntax only and points here for philosophy) What a unit test is and why manual testing doesn't scale, Arrange-Act-Assert pattern, Using a real test runner (pytest, Jest, or JUnit), First look at test doubles: stub vs. mock
- **Functions, Modules & Clean Code Basics** — ~5h: Single Responsibility at the function level, Naming, DRY, avoiding magic numbers, Intro to code smells (long functions, deep nesting, duplicated logic)
- **Relational Databases & SQL Fundamentals** — ~8h: (canonical SQL module for The Manual — see MASTERFILE.md §4.5; Language Mastery's Tier 2 only covers calling SQL from a driver/ORM and points here for query/schema depth) Tables, rows, primary/foreign keys, SELECT / WHERE / JOIN / GROUP BY / ORDER BY, Normalization basics (1NF-3NF), Using a real client (psql/DBeaver) against a local Postgres or SQLite DB
- **Building & Consuming a Basic REST API** — ~8h: (this module's HTTP coverage is for API-building purposes only; for the TCP/IP/DNS protocol theory underneath, see Hardware & Computer Systems Tier 3, the canonical deep networking module) HTTP verbs, status codes, headers, JSON, Calling a public API from code, Building a minimal CRUD API (Flask or Express), Basic request validation and error responses
- **Intro to NoSQL** — ~4h: Document stores vs. relational tables, When to reach for NoSQL vs. SQL, Basic CRUD in MongoDB, Schema-on-read vs. schema-on-write

**Quizzes / assessment:**

- *Micro-quizzes (5-10 Q, auto-gradable, spaced-repetition eligible)* — Per module: SQL clause ordering and JOIN semantics, HTTP status code meanings, git command recall.
- *Bug hunt / code-review kata* — Given a small snippet with a planted bug (off-by-one loop, unescaped SQL string concatenation, wrong HTTP status code), find and fix it, then explain in one sentence why it was wrong.
- *Spaced-repetition flashcard deck* — SQL syntax patterns, HTTP status code families (2xx/3xx/4xx/5xx), and core git commands.

**Checkpoint project:** Build a small full-CRUD "Task Tracker" API backed by a relational database: git history shows at least one feature-branch workflow with a self-reviewed pull request (using a written self-review checklist even solo); a test suite covers the core business logic with meaningful assertions (not just "it doesn't crash"); a README documents every endpoint, its inputs, and its status codes.

**Creative teaching methods:**

- Bug hunt / code-review kata using an intentionally broken snippet (e.g., a SQL-injection-shaped string concatenation) planted by the instructor/self.
- Prompting drill: ask an AI to generate unit tests for a function you wrote, then manually try to break the function in a way the AI's tests fail to catch — this ties testing literacy directly to critical evaluation of AI output.

**Curated resources:**

- [CS50's Introduction to Databases with SQL](https://cs50.harvard.edu/sql/) — Free, self-paced Harvard course; 7 weeks covering SQLite through Postgres/MySQL, joins, normalization, indexes.
- [Khan Academy — Intro to SQL: Querying and managing data](https://www.khanacademy.org/computing/computer-programming/sql) — Free, bite-sized interactive SQL unit, good as a first pass before CS50 SQL.
- [The Odin Project — Databases & Testing lessons](https://www.theodinproject.com/) — Free full-stack curriculum; project-based lessons on SQL and automated testing.
- [freeCodeCamp — Relational Database Certification](https://www.freecodecamp.org/learn/relational-database/) — Free, hands-on PostgreSQL certification track with real terminal exercises.
- [Pro Git — Ch. 3 (Branching) & Ch. 6 (GitHub Basics)](https://git-scm.com/book/en/v2) — Deeper branching/merging mechanics beyond Tier 0.
- [MongoDB University — M001: MongoDB Basics](https://learn.mongodb.com/courses/m001-mongob-basics) — Free official MongoDB course; ~8.5 hours, covers documents, CRUD, and Atlas.

---

## Tier 2: Builder

**Goal:** Move from following instructions to making design decisions independently on small, self-contained projects. This tier is where TDD becomes a real habit, SOLID and GoF patterns get applied (and deliberately misapplied and corrected), and the learner designs a normalized schema and a multi-resource API from a set of requirements rather than a tutorial script.

**Modules** (~48h):

- **Test-Driven Development in Practice** — ~8h: Red-Green-Refactor cycle, Writing the test before the implementation, Coverage tools and what coverage % does and doesn't tell you, Testing edge cases and boundary conditions deliberately
- **SOLID Principles & OO Design** — ~8h: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion, Before/after refactors for each principle, Recognizing violations in real code
- **Intro to Design Patterns (GoF Essentials)** — ~8h: Factory, Strategy, Observer, Decorator, Singleton and why it's often an anti-pattern in practice, Choosing a pattern from a problem description vs. forcing one in
- **Database Design & Normalization Project** — ~8h: Turning requirements into an ER diagram, Normalization trade-offs (when to denormalize), Indexes and why they matter, Writing and running schema migrations
- **Multi-Resource REST API with Persistence** — ~10h: CRUD across multiple related resources, Password hashing and a first look at JWT-based auth, Input validation and consistent error handling, Environment-based configuration (dev vs. prod secrets)
- **Integration & API Testing** — ~6h: Testing endpoints end-to-end with Postman/HTTPie or supertest, Seeding and tearing down a test database, Mocking an external service call

**Quizzes / assessment:**

- *Explain it back / Feynman teach-back* — For each SOLID principle: write or record a 2-minute explanation using a before/after code example from your own project, in your own words, no copy-pasted definitions.
- *Micro-quizzes (scenario-based, auto-gradable)* — "Which pattern fits this scenario?" style questions with realistic, non-toy prompts.
- *Bug hunt / code-review kata* — Given code with a God Object or Singleton-abuse anti-pattern, refactor it and justify each change in a short PR description.

**Checkpoint project:** Ship a solo full project (e.g., a Library/Inventory Management API) with 4+ related resources: core business logic built test-first (visible in git log as test-then-implementation commits); at least 2 deliberately chosen design patterns with a written one-paragraph justification each; a normalized relational schema with migrations; and a short design doc explaining at least one trade-off you made and why.

**Creative teaching methods:**

- Build-then-break: after finishing your API, spend a dedicated session trying to break it with malformed input, duplicate submissions, or a race condition, then write a regression test that would have caught it.
- Prompting drill: describe a real ambiguous design decision from your project to an AI and ask it to argue for two different patterns; interrogate its reasoning and push back before deciding, rather than accepting its first answer.

**Curated resources:**

- [Design Patterns (University of Alberta, Coursera — audit free)](https://www.coursera.org/learn/design-patterns) — Part of the Software Design and Architecture Specialization; survey of GoF patterns applied to a running project.
- [Refactoring.Guru — Design Patterns catalog](https://refactoring.guru/design-patterns) — Free reference covering all 23 GoF patterns with before/after code in multiple languages.
- [MIT OCW 6.005 Software Construction (Spring 2016)](https://ocw.mit.edu/courses/6-005-software-construction-spring-2016/) — Free MIT course on specs, invariants, testing, and decoupling — the theory behind this tier's practice.
- [The Odin Project — advanced Testing & Databases lessons](https://www.theodinproject.com/) — Free, project-based follow-on from Tier 1's introductory lessons.
- [freeCodeCamp — Back End Development and APIs Certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/) — Free Node/Express/MongoDB certification building a multi-resource API.
- [Exercism](https://exercism.org/) — Free, mentored practice exercises in any language — good for deliberate refactoring practice with human feedback.

---

## Tier 3: Practitioner

**Goal:** Work at the scale of real systems: multi-file, multi-service thinking, clean/hexagonal architecture, contract and end-to-end testing, deliberate API design (not just "it works"), polyglot persistence, and — critically — reading and contributing to code you did not write. Code review shifts from a checkpoint gimmick to a practiced discipline.

**Modules** (~51h):

- **Clean Architecture & Hexagonal Design** — ~10h: Separating domain / application / infrastructure layers, Dependency inversion in practice (ports & adapters), Why this makes the same core logic swappable behind a REST API, CLI, or mobile SDK
- **End-to-End & Contract Testing** — ~8h: Test pyramid: unit vs. integration vs. e2e trade-offs, Browser/API e2e basics (Playwright or Cypress-style), Contract testing between two services, Diagnosing and fixing flaky tests
- **API Design Deep Dive** — ~10h: Richardson Maturity Model for REST, Versioning, pagination, idempotency, rate limiting, Writing an OpenAPI/Swagger spec, GraphQL as an alternative: when it actually helps
- **Polyglot Persistence** — ~8h: Combining relational + document store + cache (Redis) in one system, Choosing the right store per data shape, Transactions vs. eventual consistency — a first taste
- **Reading & Contributing to Open Source** — ~8h: Navigating a large unfamiliar codebase (entry points, tests-as-docs), Finding and scoping a good-first-issue, Writing a real PR and responding to maintainer feedback
- **Code Review as a Practiced Discipline** — ~5h: What to look for beyond "does it work", Giving specific, actionable, kind feedback, Using a review checklist consistently
- **What CI Is (Just Enough to Work on a Team)** — ~2h: (deliberately light — DevOps Tier 2 is the canonical deep CI/CD module in The Manual; this is only enough to understand what gates your PRs) GitHub Actions basics: running tests/linters on push, branch protection rules, reading a failed build's output

**Quizzes / assessment:**

- *Code-review kata (rubric-graded)* — Given a realistic multi-file diff with 5+ planted issues (correctness, security, and style mixed), leave written review comments; compare against a model rubric and score coverage.
- *Micro-quizzes (scenario/trade-off based)* — API design trade-offs: pagination strategy choice, when to version, REST vs. GraphQL for a given scenario.
- *Explain it back / Feynman teach-back* — Explain your own project's hexagonal architecture and layer boundaries to an imagined new teammate, using a diagram you draw yourself.

**Checkpoint project:** Either (a) get a real, seriously-attempted PR merged (or thoroughly reviewed) on an active open-source project in this domain, OR (b) refactor your Tier 2 project into a clean/hexagonal architecture with a documented layer-boundary diagram, add a CI pipeline that runs tests and lint on every push, add contract/e2e tests for its top 3 user flows, and publish an OpenAPI spec for its API.

**Creative teaching methods:**

- Bug hunt / code-review kata on a realistic multi-file PR with planted correctness, security, and style issues — produce written comments and compare to a model rubric.
- Build-then-break with a peer or an AI acting as an adversarial user: swap your project with a partner's (or an AI-generated equivalent) and try to break each other's API with malformed or adversarial input.
- Portfolio artifact requirement: publish the architecture diagram, OpenAPI spec, and a short "design decisions" doc on GitHub as a durable, linkable portfolio piece.

**Curated resources:**

- [Google Engineering Practices — "How to do a code review"](https://google.github.io/eng-practices/review/) — Official, free Reviewer's Guide and CL Author's Guide used internally at Google.
- [Martin Fowler — Refactoring & enterprise architecture articles](https://martinfowler.com/) — Free, canonical articles on refactoring, patterns of enterprise application architecture, and microservices.
- [Google Cloud API Design Guide](https://cloud.google.com/apis/design) — Official vendor guide on resource-oriented API design, versioning, and pagination.
- [MIT OCW 6.033 Computer System Engineering (Spring 2018)](https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/) — Free MIT course on modularity, client-server design, and system-level trade-offs via real case studies.
- [The Odin Project — NodeJS course (auth, deployment, testing sections)](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs) — Free, project-based coverage of auth, deployment, and testing in a realistic backend.
- [freeCodeCamp — Quality Assurance Certification](https://www.freecodecamp.org/learn/quality-assurance/) — Free certification covering Chai-based testing and CI-friendly test suites.

---

## Tier 4: Advanced / Specialist

**Goal:** Think at the architecture level: distributed systems fundamentals, database internals and performance, security-aware engineering, and writing the kind of decision documents (ADRs) that real engineering orgs run on. This tier also introduces mentoring and leading review as a skill, not just receiving it.

**Modules** (~54h):

- **System Design Fundamentals at Scale** — ~12h: Load balancing and horizontal scaling, Caching layers and cache invalidation strategies, CAP theorem and consistency models, Message queues and async processing
- **Distributed Systems Foundations** — ~12h: Consensus intuition (Paxos/Raft), Replication and partitioning/sharding, Failure modes: network partitions, split-brain, retries and idempotency
- **Database Internals & Performance** — ~10h: Reading a query plan (EXPLAIN/EXPLAIN ANALYZE), Indexing strategy and when an index hurts, Transaction isolation levels, Connection pooling and eliminating N+1 queries
- **Security-Aware Software Engineering** — ~8h: OWASP Top 10 in depth (injection, broken auth, broken access control, etc.), Basic threat modeling, OAuth2/OIDC for auth, Secrets management and dependency vulnerability scanning
- **Architecture Decision Records & Trade-off Analysis** — ~6h: Writing an ADR, Monolith vs. microservices vs. modular monolith trade-offs, Documenting non-functional requirements (latency, availability targets)
- **Leading Code Review & Mentoring Practice** — ~6h: Reviewing a junior engineer's PR constructively, Pairing effectively, Writing an RFC-style proposal for a team decision

**Quizzes / assessment:**

- *CTF-style war-game challenge* — A deliberately vulnerable mini API (self-built or a known vulnerable app) to exploit — SQL injection, broken auth, IDOR — then patch and write a one-paragraph root-cause note.
- *Checkpoint-gated design review (rubric-graded)* — A timed "whiteboard" system-design exercise (e.g., design a rate limiter) graded against a rubric covering requirements clarification, capacity estimation, and trade-off articulation.
- *Micro-quizzes (scenario-based)* — CAP theorem and consistency-model scenarios: given a use case, choose and justify strong vs. eventual consistency.

**Checkpoint project:** Design and partially implement a realistically scaled system (e.g., a URL shortener, rate limiter, or notification service): produce a full design doc (requirements, capacity estimate, architecture diagram, data model, trade-offs, at least one ADR); implement a working core slice with production-grade concerns (indexing, caching, auth, rate limiting, basic monitoring hooks); then lead a mock design review defending your choices against a skeptical reviewer (peer or AI).

**Creative teaching methods:**

- CTF-style war-game: exploit and then remediate a deliberately vulnerable mini API covering at least 3 OWASP Top 10 categories.
- Explain it back as a mentoring exercise: write the onboarding doc you wish you'd had, teaching a Tier 2 learner one advanced concept (e.g., transaction isolation levels) from scratch.
- Prompting drill: use an AI as a Socratic, adversarial system-design interviewer instructed explicitly to poke holes in your architecture rather than validate it — the drill is in prompting it to actually push back.

**Curated resources:**

- [MIT 6.5840 (formerly 6.824) Distributed Systems](https://pdos.csail.mit.edu/6.824/) — Free, fully open MIT graduate course: lectures, papers, and Raft-based labs; still actively updated.
- [MIT OCW 6.830 Database Systems (Fall 2010)](https://ocw.mit.edu/courses/6-830-database-systems-fall-2010/) — Free MIT course covering query optimization, transactions, concurrency control, and indexing, via SimpleDB labs.
- [MIT OCW 6.172 Performance Engineering of Software Systems (Fall 2018)](https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/) — Free MIT course on performance analysis, caching, and parallel programming — grounds the "why" behind indexing/pooling.
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) — Official, free, canonical web application security risk reference (2025 edition current).
- ["In Search of an Understandable Consensus Algorithm" (Raft paper), Ongaro & Ousterhout](https://raft.github.io/raft.pdf) — Author-hosted PDF of the Raft consensus paper; foundational and unusually readable for a systems paper.
- ["Dynamo: Amazon's Highly Available Key-value Store" (DeCandia et al., SOSP 2007)](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) — Official author-hosted PDF (Werner Vogels); foundational paper on eventual consistency and partitioning.

---

## Tier 5: Expert / Innovator

**Goal:** Shift from applying known techniques to inventing and teaching. This tier is research-adjacent and deliberately un-quiz-heavy: assessment moves to portfolio, peer review, and real-world outcomes (was your PR merged? did your workshop attendee actually learn?) because that is how expertise is actually verified at this level. The goal is a genuine contribution — to an OSS project, to a novel tool, or to someone else's understanding.

**Modules** (~68h):

- **Contributing Upstream to Major Infrastructure Projects** — ~15h: Choosing a project (a database, ORM, or web framework) that matters to you, Understanding its RFC/governance process, Landing a non-trivial PR, not just a typo fix
- **Novel System / Framework Design** — ~20h: Designing your own tool from scratch as an original artifact (e.g., a mini ORM, test framework, or API gateway), Justifying design choices against known alternatives, Publishing it with real documentation and versioning
- **Reading & Reproducing Systems Papers** — ~15h: Picking a paper and identifying its core, falsifiable claim, Building the smallest prototype that tests that claim, Documenting where your prototype's assumptions diverge from the paper's
- **Teaching & Curriculum Design** — ~10h: Designing a workshop or written lesson to teach a Tier 1-2 learner a concept you've mastered, Building in a feedback loop and iterating on it, Writing assessment that actually measures understanding
- **Architecture at Organization Scale** — ~8h: Build-vs-buy evaluation, Developer experience (DX) as its own discipline, Writing a technical strategy document

**Quizzes / assessment:**

- *Peer/maintainer-graded outcome review (not a traditional quiz — intentional at this tier)* — Was your OSS contribution merged? What did reviewer feedback say about its quality and whether it needed rework?
- *Public teach-back artifact* — A real blog post, talk, or workshop delivered to an actual learner, evaluated by their reported understanding before/after, not a private self-check.

**Checkpoint project:** Ship ONE of: (a) a merged, non-trivial PR to a well-known open-source project in this domain (a database, ORM, testing framework, or API framework), with a public write-up of the design discussion and any pushback you incorporated; or (b) an original open-source tool/library you design, test, document, and publish — with CI, semantic versioning, a real README, and at least one external user or reviewer who wasn't you. Either way, include a written retrospective comparing your design to at least one real paper or piece of prior art.

**Creative teaching methods:**

- Teach-the-teacher: run an actual live or written workshop for a real Tier 1/2 learner (even one person), gather structured feedback, and iterate on the material.
- Reproduce-a-paper challenge: build the smallest possible prototype demonstrating a systems paper's core claim, and write up exactly where your prototype's simplifying assumptions diverge from the paper's.
- Portfolio artifact requirement: a public engineering-blog-quality post or RFC documenting one real, consequential design decision from your own work.

**Curated resources:**

- [arXiv (cs.DC / cs.SE categories)](https://arxiv.org/list/cs.DC/recent) — Primary source for current distributed-systems and software-engineering research.
- [Semantic Scholar](https://www.semanticscholar.org/) — Free literature search and citation graph — use it to trace a paper's lineage and find what cites/refutes it.
- [Google Site Reliability Engineering (the SRE book)](https://sre.google/books/) — Free, official Google book on running software systems at organizational scale.
- [CPython Developer's Guide](https://devguide.python.org/) — Official contribution guide for CPython — a realistic, well-documented on-ramp to contributing upstream.
- [Django "Contributing to Django" guide](https://docs.djangoproject.com/en/stable/internals/contributing/) — Official, unusually beginner-friendly OSS contribution process documentation.
- [Class Central](https://www.classcentral.com/) — Free course aggregator — use it to find current free graduate-level systems/SE courses as offerings rotate year to year.

---
