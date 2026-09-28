# Platform & Cross-Platform Development

_Part of [The Manual](../../MASTERFILE.md) — track `platforms`. Tier numbering matches MASTERFILE.md §1._

This track takes a learner from "what is a terminal" to shipping and architecting real, production-grade software across every major surface: the web (frontend, backend, full-stack), native mobile (iOS/Swift, Android/Kotlin), cross-platform mobile (React Native, Flutter), desktop (Electron, .NET MAUI, Qt), game dev basics, and cloud-native deployment. The spine of the track is deliberate: HTML/CSS/JS is used as the universal low-friction on-ramp in Tier 1 because it transfers into every later surface (Electron is literally the web in a native shell; React Native/Flutter share React/Dart-style component models; even native Swift/Kotlin UI declarative frameworks — SwiftUI, Jetpack Compose — rhyme with React's component+state model). By Tier 3 the learner has shipped the *same product idea* to at least three surfaces (web, one native mobile OS, one cross-platform framework, one desktop shell), which is the only way "cross-platform tradeoffs" stops being trivia and becomes felt experience. Tier 0 is explicitly light here (see its goal note) because general computing literacy is owned by the Foundations/CS track; this track's Tier 0 only orients the learner to the platform landscape itself. From Tier 4 onward the learner moves into architecture, performance, and cloud-native production patterns, and Tier 5 asks them to stop consuming frameworks and start contributing to or inventing them.

**How this feeds AI/prompting literacy:** Every tier after Tier 0 includes at least one "prompting drill" (per the shared pedagogy toolkit) specifically because platform/app development is where most self-taught learners actually use AI day-to-day — so this track doubles as sustained, graded practice at prompting well. Early tiers (1-2) train the learner to ask an AI for a specific, verifiable output (a CSS layout, a debugging fix) and then evaluate the AI's answer against ground truth they can check themselves — this is the core skill of not over-trusting LLM output. Tier 3 escalates to platform-specific prompting (porting SwiftUI logic to Jetpack Compose and grading the AI's fluency in each platform's real idioms), which builds the mental model needed to write good system prompts and few-shot examples for coding agents later. Tier 4's "propose a scaling change, then red-team it" drill and Tier 5's "AI as pair-architect, but you benchmark all options yourself" drill directly train the highest-value AI-collaboration skill: using an LLM to generate options fast while keeping human judgment as the actual decision-maker. The track also has a natural bridge into on-device AI (Tier 4/5 modules on WebAssembly, Core ML/ML Kit-style on-device inference, and integrating LLM APIs into mobile/desktop apps), so the learner ends up understanding both how to prompt AI tools while coding AND how to ship apps that call or embed AI models — the two practical faces of "understanding AI" for a builder.

**How this transfers across platforms (PC/mobile/web/embedded):** This track *is* the cross-platform goal made concrete, not just connected to it. By the Tier 2 checkpoint the learner has built one feature set as a web app, a minimal cross-platform mobile app, and an Electron desktop wrapper. By the Tier 3 checkpoint they've shipped a real app to an actual mobile app store's testing track (TestFlight/Play Console) alongside a cross-platform sibling with a cloud-deployed backend, plus landed a PR in someone else's mobile/web codebase — so "PC, mobile, web, and other platforms" stops being an abstract phrase and becomes four repos they personally maintain. Tier 4 makes the tradeoffs explicit and architectural (when to go fully native vs. cross-platform vs. web-wrapped, per feature, per team, per performance budget) via real profiling data rather than opinion. Tier 5 pushes past using cross-platform frameworks into building/patching them, which is the deepest possible understanding of "why platforms differ and what a good abstraction over them looks like." The game-dev and cloud-native modules threaded through every tier exist because they are the two areas where "platform" differences are most visible and most consequential (a game must hit 60fps on wildly different GPUs; a cloud-native backend must serve identical data to all four client surfaces reliably) — reinforcing the same lesson from a different angle each time.

---

## Tier 0: Orientation & Literacy

**Goal:** LIGHT TIER for this track, deliberately: general computer literacy (what is a variable, what is a file, what is RAM) is owned by the Foundations/CS-Systems track, so this tier does not re-teach it. Its only job is to orient the learner to the *platform landscape* specifically — terminal fluency, git, and a working mental model of what a browser/OS/mobile-OS/cloud-server each are and how they differ — so Tier 1 onward makes sense without conceptual confusion about 'which computer is doing the work.'

**Modules** (~22h):

- **Command Line & Dev Environment Setup** — ~6h: terminal navigation (cd, ls, mkdir, pwd, mv, rm), installing VS Code and useful extensions, installing Node.js/npm and a package manager (Homebrew/apt/winget), PATH and environment variables, installing platform SDKs later needs (preview only, not hands-on yet)
- **Version Control Basics with Git & GitHub** — ~8h: git init/add/commit/push/pull, branches and basic merging, creating a GitHub account and repo, cloning and forking, .gitignore, resolving a simple merge conflict
- **The Platform Landscape** — ~4h: browser runtime vs operating system vs mobile OS vs cloud server, client vs server, compiled vs interpreted vs JIT execution (conceptual, no coding), what 'cross-platform' actually trades off, app stores vs web distribution vs package managers
- **Your First Program on Every Surface (Guided Tour, No Building)** — ~4h: viewing a hello-world webpage in a browser + inspecting it with DevTools, running a hello-world script in a terminal, watching a mobile app run in an emulator, watching a desktop app window launch, spotting the family resemblance between all four

**Quizzes / assessment:**

- *Micro-quiz (terminal command recall)* — 5-10 auto-graded questions matching a terminal command to its effect (e.g. 'which command lists hidden files?'), spaced-repetition eligible.
- *Spaced-repetition flashcard deck* — Git vocabulary deck: commit, branch, merge, remote, HEAD, staging area, fork vs clone — scheduled via SM-2 for long-term retention.

**Checkpoint project:** Set up a fully working dev environment (editor, git, terminal, GitHub account) and publish a bare-bones 'hello world' static webpage to GitHub Pages, capturing the whole setup process in a short screen-recorded walkthrough narrated as if teaching a total beginner.

**Creative teaching methods:**

- Feynman teach-back: record a 3-minute explanation of 'what happens when you type a URL and press enter' for a non-technical friend
- Prompting drill: ask an AI assistant to diagnose and fix a broken PATH or git config using only its guidance, then explain in your own words why the fix worked

**Curated resources:**

- [freeCodeCamp — Command Line for Beginners](https://www.freecodecamp.org/news/command-line-for-beginners/) — Free, hands-on terminal basics.
- [CS50x (Harvard) — Week 0 and Git/CLI content](https://cs50.harvard.edu/x/) — Free; sets the platform-landscape mental model this tier needs.
- [GitHub Docs — Git and GitHub learning resources](https://docs.github.com/en/get-started) — Official, free.
- [Khan Academy — Computers and the Internet](https://www.khanacademy.org/computing/computers-and-internet) — Free unit covering how the web/client-server model works conceptually.

---

## Tier 1: Foundations

**Goal:** Build genuine, tightly-scaffolded fluency in HTML/CSS/JavaScript plus a second general-purpose language (Python), because the web stack is the lowest-friction on-ramp that transfers directly into every later surface in this track (Electron wraps it, React Native/Flutter's component model rhymes with it, and reading it prepares the learner to later read Swift/Kotlin).

**Modules** (~76h):

- **HTML & CSS Fundamentals** — ~20h: semantic HTML, the box model, Flexbox and Grid layout, responsive design (media queries, mobile-first), basic accessibility (alt text, semantic landmarks, contrast)
- **JavaScript Fundamentals** — ~30h: variables, types, operators, functions and scope, control flow, arrays and objects, DOM selection and manipulation, event handling, intro to async (callbacks, promises)
- **Programming Fundamentals in a Second Language (Python)** — ~20h: syntax and data types, lists/dicts/tuples, functions and modules, comparing Python's and JavaScript's approaches to the same problem side by side to build a transferable mental model of 'what a language is'
- **How Native, Mobile, and Desktop Differ From Web (Conceptual + Code Reading)** — ~6h: compiled native apps (Swift/Kotlin) vs interpreted web vs cross-platform bridges (React Native/Flutter) vs Electron (web tech, native shell), reading (not yet writing) a minimal starter file from each stack side by side

**Quizzes / assessment:**

- *Micro-quiz sets (per module)* — 8-10 auto-graded, spaced-repetition-eligible questions each on CSS selectors/specificity, JS control flow, and Python-vs-JS syntax differences.
- *Bug hunt / code-review kata* — Given 10 lines of intentionally broken HTML/CSS (unclosed tags, wrong flex properties) and 10 lines of broken JS (off-by-one, undefined variable, wrong equality operator), find and fix every bug.

**Checkpoint project:** Build and deploy a multi-page personal portfolio site (3+ pages, responsive via Flexbox/Grid, at least one real interactive JS feature such as a dynamic project filter or validated contact form) deployed live via GitHub Pages or Netlify.

**Creative teaching methods:**

- Feynman teach-back: explain the CSS box model and Flexbox to a rubber duck / on video as if teaching a 10-year-old
- Prompting drill: ask an AI to generate a CSS layout, then find and manually fix what's wrong with its Flexbox output — trains both CSS and critical evaluation of AI code
- Spaced-repetition flashcards for JS array/object methods (map, filter, reduce, find, etc.)

**Curated resources:**

- [The Odin Project — Foundations course](https://www.theodinproject.com/paths/foundations) — Free, project-driven HTML/CSS/JS path.
- [freeCodeCamp — Responsive Web Design & JavaScript Algorithms and Data Structures certifications](https://www.freecodecamp.org/learn) — Free, auto-graded exercises matching this tier exactly.
- [MDN Web Docs — JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide) — Official, canonical reference.
- [CS50x (Harvard) — Python and web-adjacent weeks](https://cs50.harvard.edu/x/) — Free; strong second-language grounding.
- [Exercism — Python Track](https://exercism.org/tracks/python) — Free, mentored practice exercises with real feedback.

---

## Tier 2: Builder

**Goal:** Ship independent small projects on at least three different surfaces — a real interactive web app with an API, a first mobile app, and a first desktop app — without a tutorial holding your hand at every step.

**Modules** (~97h):

- **Front-End Framework Basics (React)** — ~25h: components and props, state with useState, side effects with useEffect, fetching data from an API, basic client-side routing
- **Backend Basics & REST APIs (Node/Express or Python/Flask)** — ~25h: routes and HTTP methods, JSON request/response, connecting to SQLite, building a full CRUD API, basic input validation
- **First Cross-Platform Mobile App (React Native via Expo, or Flutter)** — ~20h: project setup and dev workflow, core components/widgets, navigation, local component state, running on a simulator and a real device
- **First Desktop App with Electron** — ~12h: wrapping a web app in a native shell, native menus and windows, basic file system access, packaging a distributable installer
- **Intro Game Dev with a 2D Framework (Phaser/JS Canvas or Pygame)** — ~15h: the game loop, sprites and animation, collision detection, keyboard/touch input handling, score and win/loss state

**Quizzes / assessment:**

- *Micro-quiz (state prediction)* — Given a small React component and a sequence of events, predict what re-renders and why — trains real mental-model correctness, not memorization.
- *Bug hunt / code-review kata* — A broken Express API with a wrong HTTP status code, an unhandled promise rejection, and a SQL-injection-shaped bug — diagnose and fix all three.
- *Prompting drill* — Prompt an AI to help debug a React Native 'crashes only on Android' style platform-specific bug, then write up which parts of its answer were correct vs. wrong once you've verified on a real device.

**Checkpoint project:** Build a small full-stack CRUD app (e.g. a habit tracker or recipe box) with a React frontend and an Express/Flask REST API, then port its core feature set to a minimal cross-platform mobile app AND wrap the web version in an Electron desktop shell — the same idea, on three surfaces.

**Creative teaching methods:**

- Build-then-break challenge: after finishing the CRUD app, spend a dedicated session trying to break it (bad input, rapid clicking, offline mode) and log every bug found
- Portfolio artifact requirement: all three surface builds get pushed to GitHub with README + screenshots as the first real portfolio pieces

**Curated resources:**

- [React — Official 'Learn React' docs](https://react.dev/learn) — Official, free, the canonical modern React reference.
- [The Odin Project — NodeJS / Full Stack path](https://www.theodinproject.com/paths/full-stack-javascript) — Free, project-based backend fundamentals.
- [Expo — 'Get started' docs](https://docs.expo.dev/get-started/introduction/) — Official; fastest path to a real React Native app on a device.
- [Flutter — 'Get started' codelabs](https://docs.flutter.dev/get-started/codelab) — Official alternative to React Native for this module.
- [Electron — Official Tutorial](https://www.electronjs.org/docs/latest/tutorial/tutorial-prerequisites) — Official, free, end-to-end desktop app tutorial.
- [freeCodeCamp — Back End Development and APIs certification](https://www.freecodecamp.org/learn/back-end-development-and-apis/) — Free, auto-graded backend practice.

---

## Tier 3: Practitioner

**Goal:** Work in real multi-file, multi-component codebases; go genuinely native on at least one mobile OS; feel cross-platform tradeoffs from direct experience rather than theory; read and modify other people's code; get a real app into an app store's testing track and a real backend into the cloud.

**Modules** (~170h):

- **Native iOS with Swift & SwiftUI** — ~40h: Swift language essentials (optionals, structs, enums, protocols), SwiftUI views and state (@State/@Binding/@ObservedObject), navigation and lists, basic UIKit interop, TestFlight submission process
- **Native Android with Kotlin & Jetpack Compose** — ~40h: Kotlin essentials (null safety, data classes, corocoutines intro), Jetpack Compose UI, ViewModel and state hoisting, Activity/lifecycle basics, Android permissions model, Play Console internal testing track
- **Cross-Platform Deep Dive: React Native vs. Flutter Architecture** — ~35h: how each framework actually renders to native views (bridge/JSI vs. Skia/Impeller), navigation libraries, platform-specific escape hatches (native modules), state management (Redux/Zustand or Riverpod/BLoC), building one real feature-complete app in whichever framework was NOT chosen in Tier 2
- **Desktop Beyond Electron: .NET MAUI or Qt** — ~25h: choosing a native-ish desktop toolkit, the MVVM pattern, packaging and distribution for Windows/macOS/Linux
- **Reading & Contributing to Real Codebases** — ~15h: cloning a real mid-size open-source React Native or Flutter app, tracing a feature end-to-end through the codebase, finding and fixing a 'good first issue', opening and iterating on a pull request
- **Cloud Basics for App Backends** — ~15h: containers and Docker fundamentals, deploying a backend to a free-tier host (Render/Fly.io/Railway), environment variables and secrets, basic CI with GitHub Actions

**Quizzes / assessment:**

- *Micro-quiz (comparative)* — SwiftUI vs. Jetpack Compose state-management comparison quiz — matches concept (e.g. @State) to its equivalent (remember { mutableStateOf(...) }).
- *Explain it back* — Explain, on video or to a peer, why React Native's bridge/JSI layer matters for performance compared to a fully native view — must use a concrete example, not just definitions.
- *Prompting drill* — Prompt an AI to port a SwiftUI screen's logic to Jetpack Compose (or vice versa), then grade its output against real platform idioms you've now learned firsthand.

**Checkpoint project:** Ship one real app to two platforms for real users: publish a native iOS or Android app to TestFlight/Play Console internal testing, AND ship its cross-platform sibling (React Native or Flutter) with a backend deployed to the cloud (Docker container, CI pipeline, real database) — plus land one merged PR on an existing open-source mobile or web project.

**Creative teaching methods:**

- Code-review kata: review a peer's (or provided) multi-file PR for platform-specific bugs — iOS safe-area issues, Android back-button handling — and leave real, specific review comments
- Build-then-break across platforms: try to crash the same feature on iOS, Android, and web, then compare and document the different failure modes

**Curated resources:**

- [Apple Developer — SwiftUI Tutorials + Swift.org language guide](https://developer.apple.com/tutorials/swiftui) — Official, free.
- [Android Developers — Jetpack Compose Pathway](https://developer.android.com/courses/pathways/compose) — Official, free, structured learning path.
- [CS50's Mobile App Development with React Native (Harvard)](https://cs50.harvard.edu/mobile/) — Free; the specific real course for this module.
- [Flutter — Official Codelabs](https://docs.flutter.dev/codelabs) — Official, free, hands-on.
- [Microsoft Learn — .NET MAUI learning path](https://learn.microsoft.com/en-us/training/paths/build-apps-with-dotnet-maui/) — Official, free.
- [Docker — 'Get Started' official docs](https://docs.docker.com/get-started/) — Official, free.

---

## Tier 4: Advanced / Specialist

**Goal:** Think like an architect, not just a builder: profile and fix real performance problems with data, reason about cross-platform architecture tradeoffs at scale, adopt production cloud-native patterns, and specialize deeply enough in at least one platform to debug it at the systems level.

**Modules** (~140h):

- **Performance Engineering Across Platforms** — ~20h: Chrome DevTools Performance tab, Xcode Instruments, Android Studio Profiler, memory leaks and retain cycles, render/frame-rate bottlenecks, bundle size optimization and code splitting
- **Architecture Patterns at Scale** — ~20h: MVVM / MVI / Clean Architecture, modular monorepos (Nx/Turborepo), micro-frontends, dependency injection, deciding native vs. cross-platform per feature based on real constraints
- **Cloud-Native Patterns** — ~30h: containers and Kubernetes basics, serverless functions (AWS Lambda / Cloudflare Workers), end-to-end CI/CD pipelines, observability (logs, metrics, tracing), horizontal scaling and feature flags
- **Advanced Game Development** — ~30h: a real engine (Unity/C# or Godot/GDScript), scene graphs, physics engines, shaders 101, multi-platform build pipelines from one engine
- **Deep Platform Specialization (choose one path)** — ~25h: iOS: Swift concurrency (async/await, actors), Metal basics, OR Android: Kotlin coroutines/Flow, custom Compose rendering, OR Web: WebAssembly, Web Workers, Service Workers/PWA offline patterns
- **Contributing to Larger Systems** — ~15h: navigating a large monorepo, understanding build systems (Bazel/Gradle/Xcode build settings), writing integration/E2E tests that matter (Playwright/Detox), landing a substantial upstream contribution

**Quizzes / assessment:**

- *Micro-quiz (diagnose the bottleneck)* — Given a real profiler screenshot or flame graph, identify the likely root cause from a set of plausible options.
- *Bug hunt with real tooling* — A production-realistic multi-file app with a planted memory leak, race condition, or N+1 query — must be found using actual profiling/monitoring tools, not just code reading.
- *CTF-style performance challenge* — A 'performance CTF' scoring points for shaving milliseconds off a deliberately slow app using real profiling data and before/after benchmarks.

**Checkpoint project:** Take a Tier 3 app to production-grade: add CI/CD with automated tests and staged deploys, containerize the backend and deploy to Kubernetes or a serverless platform with real observability (logs/metrics/alerts), profile and fix at least 3 real performance issues with documented before/after measurements, and write an Architecture Decision Record (ADR) justifying every platform/framework choice made.

**Creative teaching methods:**

- Build-then-break at scale: load-test the deployed backend (k6 or Locust) until it breaks, fix the bottleneck, and re-test to confirm
- Writing and defending an ADR is itself a structured 'explain it back' exercise — present it to a peer or mentor and withstand pushback
- Prompting drill: use an AI to propose a scaling/architecture change, then red-team its proposal against real constraints (cost, team size, latency budget) before accepting or rejecting it

**Curated resources:**

- [MIT OCW 6.033 — Computer System Engineering](https://ocw.mit.edu/courses/6-033-computer-system-engineering-spring-2018/) — Free; architecture-level systems thinking.
- [MIT OCW / 6.5840 (formerly 6.824) — Distributed Systems](https://pdos.csail.mit.edu/6.824/) — Free lecture notes and papers; MIT's own distributed-systems course materials, directly relevant to cloud-native scaling patterns.
- [Kubernetes — 'Learn Kubernetes Basics' official tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/) — Official, free, interactive.
- [Unity Learn — 'Junior Programmer' pathway (or Godot official 'Getting Started' docs)](https://learn.unity.com/pathway/junior-programmer) — Official, free; pick Unity or Godot (docs.godotengine.org) based on preference.
- [web.dev — Core Web Vitals & performance guides (Google)](https://web.dev/explore/fast) — Official vendor docs on real-world web performance.

---

## Tier 5: Expert / Innovator

**Goal:** Move from applying frameworks to inventing and improving them: contribute meaningfully upstream to a major cross-platform framework, design and prototype a genuinely novel system, and be able to teach the entire stack to someone else and confirm they actually learned it.

**Modules** (~130h):

- **Building Developer Tools & Frameworks** — ~30h: how React Native's bridge/JSI and Flutter's Skia/Impeller rendering pipelines actually work under the hood, designing and building a small custom renderer or CLI dev tool of your own
- **WebAssembly & Novel Runtimes** — ~20h: compiling a language to Wasm, running native-speed code in the browser, Wasm outside the browser via WASI and its role in cross-platform futures
- **Upstream Open Source Contribution** — ~30h: choosing a real cross-platform framework (React Native, Flutter, Electron, Tauri, .NET MAUI), understanding its RFC/contribution process, landing a meaningful, non-trivial merged PR
- **Systems-Level Platform Understanding** — ~15h: reading OS-level documentation to understand what an OS actually provides that a cross-platform runtime's bridge has to work around, comparing this to iOS/Android app sandboxing models
- **Research & Emergent Patterns** — ~20h: reading current papers/industry writing on cross-platform UI toolkits, edge computing, and on-device AI integration in apps, writing a short position paper or building a proof-of-concept for a pattern that doesn't fully exist yet
- **Teaching & Mentorship** — ~15h: designing and running a workshop, mentoring a Tier 2/3 learner through a real checkpoint project, writing public technical explainers

**Quizzes / assessment:**

- *No traditional micro-quizzes at this tier (explicitly noted)* — Recognition-style quizzes stop being a meaningful signal at expert level; they are replaced by peer/maintainer review and RFC-style critique as the primary check on understanding.
- *Explain it back, at expert level* — Teach a Tier 2 learner a real concept live, then have them teach it back to you unprompted — the only reliable confirmation of transfer at this level.

**Checkpoint project:** Land a non-trivial merged pull request in a major open-source cross-platform framework (React Native, Flutter, Electron, or Tauri) that changes real behavior — not documentation or typo fixes — AND design and build a working proof-of-concept for a cross-platform pattern you believe is currently missing (e.g. a novel state-sync layer between the web/mobile/desktop builds of the same app), written up as a short technical README with real benchmarks.

**Creative teaching methods:**

- Mentorship-as-method: teaching a less advanced learner through a real project is the primary learning technique at this tier (Feynman at scale, with a real stake in the other person's success)
- RFC/code-review kata at the OSS level: write a design doc/RFC for a framework feature and submit it for critique through the framework's actual real-world RFC or discussion process
- Prompting drill (advanced): use an AI as a pair-architect to explore three different implementations of the same cross-platform sync layer, then personally benchmark all three rather than trusting the AI's claims about which is fastest

**Curated resources:**

- [React Native — Official Contributing Guide](https://reactnative.dev/contributing/overview) — Official, free.
- [Flutter — Official Contributing Guide](https://github.com/flutter/flutter/blob/master/CONTRIBUTING.md) — Official vendor/project docs.
- [OSDev Wiki](https://wiki.osdev.org/) — Free reference for systems-level context on what a runtime's bridge has to work around.
- [arXiv.org — cs.SE and cs.HC sections](https://arxiv.org/list/cs.SE/recent) — Free; current research on cross-platform UI toolkits and edge computing.
- [MIT OCW 6.172 — Performance Engineering of Software Systems](https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/) — Free; the deepest available free course on the performance mindset this tier requires.
- [WebAssembly.org official documentation](https://webassembly.org/getting-started/developers-guide/) — Official, free.

---
