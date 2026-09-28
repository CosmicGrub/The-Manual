# Programming Language Mastery

_Part of [The Manual](../../MASTERFILE.md) — track `languages`. Tier numbering matches MASTERFILE.md §1._

Track: Programming Language Mastery. A deliberate polyglot path from absolute-beginner terminal literacy to research-adjacent programming-language design, built around nine languages chosen for maximum real-world and cross-platform leverage: Python, JavaScript/TypeScript, C, C++, Rust, Java or C#, Go, SQL, and Bash/shell — plus an explicit meta-skill module on transferring concepts to pick up any future language quickly. Tier 0 sets up a reproducible multi-language dev environment and git literacy (intentionally light on general computer-literacy, which a separate Computer Science Foundations track owns). Tier 1 builds core Python fluency with parallel JS exposure. Tier 2 adds TypeScript, a real systems language (C) with pointers and manual memory, and SQL, while establishing testing discipline. Tier 3 goes practitioner-level with C++, Java/C# or Go, advanced SQL, and reading/contributing to real codebases via collaborative git workflows. Tier 4 goes deep into Rust's ownership model, advanced C++ (templates, move semantics, concurrency), Go concurrency/performance, production-grade shell scripting, and cross-language performance engineering, capped by a real open-source contribution. Tier 5 is expert/innovator level: formalizing the "learn any language fast" meta-skill, building a toy interpreter/compiler (demystifying how LLMs tokenize and model code), surveying comparative type systems and paradigms, teaching/mentoring others, and landing an upstream contribution to a language or runtime. Every tier ties explicitly back to reading and directing AI-generated code critically, and to building for PC, mobile, web, and embedded targets.

**How this feeds AI/prompting literacy:** This track is the substrate for AI literacy: you cannot judge, correct, or usefully direct an LLM's code output in a language you don't yourself read fluently. Concretely — (1) Tier 1-2 syntax fluency across Python/JS/TS/C lets you spot hallucinated APIs, wrong stdlib calls, and subtly-wrong types the moment an AI produces them, instead of trusting plausible-looking code; (2) Tier 2-3 testing/typing discipline (pytest, TypeScript's compiler, static analysis) gives you an automated feedback loop to validate AI-generated code rather than eyeballing it — "let the compiler/tests judge the AI's suggestion" is a core prompting-verification skill taught explicitly in Tier 3 and Tier 4 bug-hunt exercises; (3) knowing multiple paradigms (OOP in Java/C#, ownership in Rust, functional idioms surveyed in Tier 5) gives you the vocabulary to specify precisely what you want in a prompt ("give me an idiomatic Rust solution using iterators and no unwrap," not "make it good"), which is the single biggest lever on LLM code-generation quality; (4) Tier 5's language-implementation module (writing a lexer/parser/interpreter per Crafting Interpreters) demystifies how source code becomes tokens and an AST — the same conceptual move underlying how code-focused LLMs tokenize and model programs, which explains phenomena like why models struggle with deeply nested brackets, off-by-one indices, or unusual tokenization of rare identifiers, and informs better prompt structuring (structured/JSON output, function-calling schemas, chain-of-thought for algorithmic tasks); (5) every "prompting drill" embedded per tier trains the meta-skill of using AI as a pair-programmer while remaining the final verifier — never accepting code you can't explain back.

**How this transfers across platforms (PC/mobile/web/embedded):** The nine-language spread is chosen so every major platform target is reachable by the end of the track. Python is the universal glue/scripting/data-and-AI-tooling layer on Linux, macOS, and Windows alike (and the language most AI/ML tooling is built in). JavaScript/TypeScript covers the web on every platform and, via React Native/Ionic and Electron, compiles the same skillset into iOS, Android, and cross-platform desktop apps. C is the lingua franca of every OS's syscall layer and of embedded/microcontroller targets. C++ powers game engines (Unreal), performance-critical mobile SDKs, and desktop applications across Windows/macOS/Linux. Rust increasingly underlies safe systems code, is compiled to WebAssembly for the browser, and (via UniFFI/bindings) is used for shared cross-platform mobile business logic on iOS and Android. Java/Kotlin is the native language of Android and the JVM's "write once, run anywhere" backend world; C# is the native language of Windows/.NET and, via Unity/MAUI, targets desktop, mobile, and console simultaneously. Go compiles to a single static binary per OS/architecture, making it a favorite for cross-platform CLIs and backend services. SQL is the persistence layer underneath virtually every app on every platform. Bash (and its Windows/PowerShell counterpart, introduced by contrast) is how you automate builds and deployments across Linux, macOS, and Windows CI systems. Finally, the Tier 5 meta-skill module (a deliberate "transfer checklist" for picking up a new language's paradigm/memory model/concurrency model/tooling) is what lets the learner later pick up Swift, Kotlin, or Dart/Flutter quickly for native iOS or cross-platform mobile work without restarting from zero — the whole track is designed to make the 10th, 11th, and 12th language cheap.

---

## Tier 0: Orientation & Literacy

**Goal:** Get comfortable with the terminal, git, and the 'what is code, really' mental model, and stand up a working multi-language development environment. This tier is intentionally LIGHT on general computer/digital literacy (files, folders, what a CPU/OS does) — that groundwork is assumed to live in a separate Computer Science & Systems Foundations track. Here the focus narrows specifically to what a polyglot programmer needs before touching real syntax: a working shell, a working editor/debugger, working toolchains for multiple languages, and working version control.

**Modules** (~27h):

- **The Command Line & Filesystem Mental Model** — ~6h: shell prompt & navigation (cd/ls/pwd), absolute vs relative paths, file permissions & the PATH variable, stdin/stdout/stderr and pipes/redirection, reading man pages / --help
- **Editor & Debugger Setup** — ~4h: installing VS Code + language extensions, integrated terminal, attaching a debugger and setting breakpoints, workspace settings & extensions per language
- **What Code Actually Is: Interpreters vs Compilers vs VMs** — ~4h: source code to machine code pipeline, interpreted (Python/JS) vs compiled (C/C++/Rust/Go) vs bytecode-VM (Java/C#), why 'hello world' behaves differently per language family
- **Version Control Literacy with Git & GitHub** — ~6h: init/add/commit/push/pull, branches & .gitignore, resolving a merge conflict by hand, writing a real README
- **Installing & Managing Toolchains** — ~4h: pyenv/python.org, nvm/node, rustup, apt/Homebrew/winget package managers, verifying installs & troubleshooting PATH issues across Windows/macOS/Linux
- **Hello, World Across Five Languages (Rosetta Stone Lab)** — ~3h: writing & running hello world in Python, Node/JS, C, Java, Bash, spotting syntax-family resemblances, first contact with compiling (gcc) vs running (python/node) vs a build tool (javac+java)

**Quizzes / assessment:**

- *Micro-quiz (spaced-repetition eligible)* — 5-10 question drill matching shell commands/flags to their effect (e.g., what does `ls -la | grep .py` actually return).
- *Spaced-repetition flashcard deck* — Terminology deck: interpreter vs compiler vs VM, repo vs commit vs branch vs remote, stdin vs stdout vs stderr.

**Checkpoint project:** Dev Environment Cockpit: set up a reproducible multi-language workstation — VS Code with working debug configs for Python, Node, and C; a git repo with a real README, a sensible .gitignore, at least 3 commits and one merged branch; and a shell script (`verify_env.sh`) that checks Python/Node/gcc/git are installed and prints their versions. Rubric-graded on reproducibility, git hygiene, and a passing verification script.

**Creative teaching methods:**

- Build-then-break: deliberately corrupt your own git repo (detached HEAD, a real merge conflict) or break your PATH, then diagnose and fix it, writing down exactly what you did.
- Prompting drill: paste a cryptic real terminal/git error to an AI, but you must reproduce and verify the fix actually works before accepting it — don't trust a plausible-sounding answer.
- Explain-it-back: write a one-page 'explain to a non-coder friend' note on what compiling vs interpreting means, using only the hello-world lab as evidence.

**Curated resources:**

- [CS50x — Week 0 (command line, environments) and Week's git material](https://cs50.harvard.edu/x/) — Harvard's free intro CS course; strong environment/terminal onboarding.
- [The Odin Project — Foundations: Installations & Command Line Basics](https://www.theodinproject.com/) — Free, project-based, installs Node/Git/VS Code from scratch.
- [MIT's Missing Semester of Your CS Education](https://missing.csail.mit.edu/) — MIT CSAIL course on shell, git, debugging tools most curricula skip.
- [Pro Git (free book)](https://git-scm.com/book/en/v2) — Official, canonical, free git reference — read chapters 1-3.
- [freeCodeCamp — Git and GitHub for Beginners](https://www.freecodecamp.org/news/git-and-github-for-beginners/) — Free walkthrough of commit/branch/merge basics.

---

## Tier 1: Foundations

**Goal:** Build genuine syntax-and-semantics fluency in one home language (Python) under heavy scaffolding, while cross-exposing to JavaScript so pattern-recognition across languages starts on day one, plus enough Bash to automate small tasks.

**Modules** (~45h):

- **Python Syntax & Core Semantics** — ~10h: variables & dynamic typing, control flow (if/for/while), functions & scope (local/global/closures), truthy/falsy & common gotchas
- **Data Structures in Practice** — ~8h: lists/tuples/dicts/sets, slicing & string methods, list/dict comprehensions, mutability vs immutability
- **Functions, Modules & Basic OOP** — ~8h: functions as first-class objects, writing your first classes (`__init__`, methods), modules, imports, and virtual environments (venv)
- **Error Handling & Debugging Fundamentals** — ~6h: try/except/finally, reading a traceback top-to-bottom, using `pdb` / VS Code debugger to step through code
- **JavaScript Foundations in Parallel** — ~8h: var/let/const & hoisting, functions, arrow functions, arrays/objects, running JS outside the browser with Node, explicit compare/contrast notes vs the Python you just learned
- **Bash Scripting Basics** — ~5h: variables, conditionals, loops in a .sh file, positional arguments ($1, $@), piping commands together into a first automation script

**Quizzes / assessment:**

- *Micro-quiz (fill-in-the-blank code)* — 5-10 short snippets missing a line (e.g., a for-loop or a dict comprehension) that the learner must complete correctly.
- *Spaced-repetition flashcard deck* — Python/JS gotcha deck: mutable default arguments, `==` vs `is`, `var` vs `let` scoping, truthy edge cases (`0`, `''`, `[]`, `NaN`).

**Checkpoint project:** Command-Line Personal Toolkit: build three small Python CLI tools — a persistent to-do list (reads/writes a file), a unit converter, and a self-quizzing terminal app that tests the user on material from this tier — each using at least one custom class, functions with clear responsibilities, and graceful error handling for bad input.

**Creative teaching methods:**

- Bug hunt / code-review kata: given 5 short Python/JS snippets each with one intentional bug (off-by-one, mutable default arg, type coercion), find and fix each, and explain why it was wrong.
- Feynman teach-back: record a 3-minute explanation of 'what is a variable' and 'what is scope' aimed at a total beginner, using only your own words and one code example.

**Curated resources:**

- [CS50P — CS50's Introduction to Programming with Python](https://cs50.harvard.edu/python/) — Harvard's free, rigorous, project-graded intro Python course.
- [OpenStax — Introduction to Python Programming](https://openstax.org/details/books/introduction-python-programming) — Free peer-reviewed OpenStax textbook covering the same core syntax/semantics.
- [Automate the Boring Stuff with Python (free online edition)](https://automatetheboringstuff.com/) — Official free book; excellent for practical scripting habits.
- [freeCodeCamp — JavaScript Algorithms and Data Structures Certification](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/) — Free, exercise-heavy parallel JS track.
- [Exercism — Python Track](https://exercism.org/tracks/python) — Free mentored practice exercises with automated + human feedback.

---

## Tier 2: Builder

**Goal:** Work independently on small projects without hand-holding. Deepen Python into real OOP and stdlib fluency, add static typing via TypeScript, take the first real step into a systems language (C) with pointers and manual memory, and pick up SQL and testing discipline.

**Modules** (~51h):

- **Intermediate Python: OOP & Standard Library** — ~10h: inheritance & dunder methods, decorators & context managers, itertools/collections/dataclasses
- **TypeScript Fundamentals** — ~8h: adding static types atop JS, interfaces & basic generics, tsconfig and compiling TS to JS
- **Introduction to C: Memory & Pointers** — ~14h: the stack/heap memory model, pointers, arrays, and structs, manual memory management (malloc/free), compiling with gcc/clang and a basic Makefile
- **SQL Foundations** — ~8h: SELECT/WHERE/JOIN/GROUP BY, basic schema design & primary/foreign keys, using SQLite and Postgres locally
- **Testing & Debugging Practices** — ~6h: unit tests with pytest and Jest, writing good assertions, basic TDD: red-green-refactor
- **Package & Build Tooling Literacy** — ~5h: pip + venv + requirements.txt, npm + package.json + semantic versioning, Makefiles as a build-automation concept that recurs in C/C++/Go

**Quizzes / assessment:**

- *Code-review kata* — Given a 30-line C program with a real pointer bug (dangling pointer or off-by-one buffer write), find the bug via reading and a debugger, not guessing.
- *Prompting drill* — Ask an AI to help debug a segfault in your C code, but you must compile and run the suggested fix yourself and confirm it actually resolves the crash before accepting it.

**Checkpoint project:** Multi-Language Toolbox: implement the same small application — a Markdown-to-HTML converter or a simple key-value store — in Python, TypeScript, and C, each with its own test suite, plus a short written reflection comparing the idioms, pain points, and safety trade-offs across the three languages.

**Creative teaching methods:**

- Build-then-break challenge: build a small library/CLI tool, then deliberately try to break it with edge-case inputs (empty string, huge integers, unicode, malformed file) and patch each failure.
- Portfolio artifact requirement: publish two of this tier's projects to GitHub with a real README and a passing test suite, as the first two entries in a running portfolio.

**Curated resources:**

- [CS50x — C unit (Weeks 1-5)](https://cs50.harvard.edu/x/) — The strongest free, rigorous on-ramp into C, pointers, and memory.
- [CS50's Introduction to Databases with SQL](https://cs50.harvard.edu/sql/) — Free Harvard course covering SQL from SELECT to schema design.
- [Khan Academy — SQL: Intro to relational databases](https://www.khanacademy.org/computing/computer-programming/sql) — Free, interactive, good supplement for query practice.
- [Exercism — C Track and TypeScript Track](https://exercism.org/tracks/c) — Free mentored exercises; do both the C and TypeScript tracks.
- [The Odin Project — Testing lessons (Foundations/JavaScript path)](https://www.theodinproject.com/) — Free, practical intro to Jest-style unit testing.

---

## Tier 3: Practitioner

**Goal:** Move into real-world, multi-file, intermediate-scale work: pick up C++, a mainstream enterprise OOP language (Java or C#), and Go; deepen SQL toward real data modeling; and practice reading other people's code and collaborating through git the way real teams do.

**Modules** (~66h):

- **C++ Fundamentals atop C Knowledge** — ~16h: classes & RAII, STL containers (vector, map, string), references vs pointers, intro smart pointers, multi-file builds with CMake
- **Java or C# for OOP at Scale** — ~16h: interfaces & generics, exceptions & the collections framework, build tooling (Maven/Gradle or the .NET CLI), one real desktop-or-backend project
- **Go Fundamentals** — ~12h: structs & interfaces (implicit satisfaction), goroutines/channels, first contact, Go modules, building a small CLI or HTTP server
- **Advanced SQL & Data Modeling** — ~8h: indexes & query plans, transactions & isolation basics, normalization, intro to an ORM
- **Reading Real Codebases** — ~8h: tracing execution through an unfamiliar open-source repo, using a profiler/debugger to understand code you didn't write, making your first small real-world PR
- **Collaborative Git & Code Review Practices** — ~6h: branching strategies (trunk-based vs feature branches), opening and reviewing pull requests, resolving a real multi-person conflict, writing commit messages and review comments that help future readers

**Quizzes / assessment:**

- *'Explain it back' teach-back* — Record yourself explaining why Java/C# interfaces and Go's implicit interfaces solve the same problem differently — no notes, must hold up to follow-up questions.
- *Micro-quiz contrasting memory models* — 5-10 questions contrasting stack/heap/manual free in C++ against garbage collection in Java/C#/Go — predict what a given snippet does in each.

**Checkpoint project:** Cross-Language Service: build a small networked system — a Go (or Java/C#) backend API backed by a real SQL database, plus a C++ CLI client that talks to it over HTTP/sockets — all developed with a proper multi-branch git history including at least one simulated pull-request review cycle using a self-review checklist.

**Creative teaching methods:**

- Bug hunt / code-review kata: debug a multi-file C++ project with a real memory leak (found via valgrind or AddressSanitizer output), not a synthetic toy example.
- Prompting drill: have an AI refactor a messy multi-file Go codebase toward idiomatic style, then verify every suggested diff actually compiles and passes the existing tests before merging any of it.
- Build-then-break with a peer (or self-red-team): stand up a small Go HTTP server and fuzz/hammer its endpoints with malformed requests until something breaks, then fix it.

**Curated resources:**

- [MOOC.fi — Java Programming I & II (University of Helsinki)](https://java-programming.mooc.fi/) — Free, official university MOOC; excellent OOP-at-scale course.
- [LearnCpp.com](https://www.learncpp.com/) — Free, comprehensive, widely-used C++ course from basics through classes/STL.
- [A Tour of Go + Learn Go with Tests](https://go.dev/tour/) — Official interactive Go tour, paired with the free 'Learn Go with Tests' book for idiomatic practice.
- [CS50's Introduction to Databases with SQL (advanced units)](https://cs50.harvard.edu/sql/) — Revisit for indexing, transactions, and schema-design units.
- [Exercism — Go Track and C++ Track](https://exercism.org/tracks/go) — Free mentored practice exercises for both languages.

---

## Tier 4: Advanced / Specialist

**Goal:** Go deep: Rust's ownership/borrowing model for memory-safe systems programming, advanced C++ (templates, move semantics, concurrency), Go concurrency and performance work, production-grade shell scripting, and cross-language performance engineering — capped by a real open-source contribution.

**Modules** (~70h):

- **Rust Ownership, Borrowing & Systems Safety** — ~18h: ownership, borrowing, lifetimes, traits & the Result/Option error-handling model, Cargo & the crates ecosystem, building a CLI or small systems tool
- **Advanced C++: Templates, Move Semantics & Concurrency** — ~14h: templates & generic programming, move semantics & rule-of-five, std::thread/mutex basics, profiling with perf/gprof
- **Concurrency & Performance in Go** — ~10h: goroutines/channels deep dive, sync primitives & the race detector, pprof-based profiling, building a concurrent service
- **Advanced Shell & Systems Scripting** — ~8h: POSIX-portable Bash, process management & signal handling, integrating scripts with cron/systemd, writing scripts safe enough for production
- **Performance Engineering Across Languages** — ~10h: benchmarking methodology, Big-O in practice vs in theory, profilers per language (cProfile, Chrome DevTools, perf), memory profiling & allocation patterns
- **Contributing to Open Source at Scale** — ~10h: reading CONTRIBUTING.md and a project's CI pipeline, code-review etiquette on a real project, landing an actual merged PR

**Quizzes / assessment:**

- *CTF-style / war-game challenge* — Given a set of C++/Rust snippets, find which ones have a real memory-safety bug (use-after-free, data race, buffer overrun) and which are safe — score like a capture-the-flag.
- *Prompting drill (expert level)* — Ask an AI to help design a concurrent system (e.g., a worker pool); you must identify and correct any race-prone pattern it proposes before implementing it.

**Checkpoint project:** Performance-Critical Systems Component: build a component in Rust (e.g., a concurrent job queue, a small parser, or a key-value store) that measurably outperforms a naive Python/JS equivalent, complete with criterion.rs benchmarks, a cargo-fuzz harness, and a written performance report explaining exactly where the time goes.

**Creative teaching methods:**

- Build-then-break: build a concurrent Rust or Go service, then write a stress test / fuzz harness (cargo fuzz, or Go's race detector under load) specifically to break it.
- Portfolio artifact requirement: a real merged pull request to an open-source project, cited in your portfolio with a link and a short write-up of what you contributed and why it was needed.

**Curated resources:**

- [The Rust Programming Language (official free book)](https://doc.rust-lang.org/book/) — The canonical, official, free introduction to ownership and the Rust ecosystem.
- [Rustlings (official exercises)](https://github.com/rust-lang/rustlings) — Free hands-on exercises that pair with the Rust book.
- [MIT OCW 6.172 — Performance Engineering of Software Systems](https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/) — Full free MIT course on real-world performance engineering.
- [Advent of Code](https://adventofcode.com/) — Free yearly puzzle set, excellent for benchmarking the same solution across languages.
- [Learn Go with Tests — concurrency chapters](https://quii.gitbook.io/learn-go-with-tests) — Free, test-driven treatment of goroutines/channels/sync.

---

## Tier 5: Expert / Innovator

**Goal:** Move from applying languages to understanding and inventing them: formalize the meta-skill of picking up any new language fast, implement a real (if small) interpreter to demystify how source code becomes execution, survey comparative type systems and paradigms, teach/mentor others, and land an upstream contribution to a language or runtime.

**Modules** (~71h):

- **Meta-Skill: How to Learn Any New Language Fast** — ~8h: a transfer checklist: paradigm, memory model, concurrency model, type system, tooling/package manager, idioms, mapping a brand-new language against languages you already know, producing your own reusable 'language onboarding' template
- **Programming Language Design & Implementation** — ~20h: lexing & tokenizing, parsing into an AST, tree-walking interpretation, then a simple bytecode VM, building 'Lox' (or your own small language)
- **Comparative Type Systems & Paradigms** — ~12h: static vs dynamic, nominal vs structural typing, functional vs OOP vs procedural paradigms, a hands-on survey of an ML-family or Racket-style functional language
- **Teaching & Mentoring as Mastery** — ~8h: the Feynman technique applied to a language concept, writing a tutorial or giving a short talk, live-reviewing a beginner's code constructively
- **Upstream Contribution to a Language/Runtime** — ~15h: reading a compiler/runtime's contribution guide (CPython, a Rust crate, Go's stdlib proposal process), navigating a large unfamiliar codebase's CI and review norms, landing a real, reviewed change
- **Research Literacy for PL & AI-Adjacent Topics** — ~8h: reading a programming-languages research paper, how formal language/type theory relates to how LLM code models tokenize and represent programs, tracking arXiv cs.PL

**Quizzes / assessment:**

- *'Explain it back' teach-back (recorded)* — Record a short teaching video explaining a language's type system (e.g., Rust's ownership or Haskell's type classes) to a Tier-2-level learner, then answer their follow-up questions live.
- *Research-paper micro-quiz* — After reading one arXiv cs.PL paper, summarize its core contribution in 3 sentences and name one thing you'd challenge or test further.

**Checkpoint project:** Build a Small Language: design and implement a toy interpreted language (following Crafting Interpreters' Lox, or your own design) with a lexer, parser, and tree-walking or bytecode interpreter, including at least one novel feature not in the book, a test suite, and a README explaining your design trade-offs. Pair it with a companion 'how to learn any new language' guide, and submit one real upstream contribution (an issue, doc fix, or PR) to an open-source language or tooling project.

**Creative teaching methods:**

- Portfolio artifact requirement: publish your toy interpreter/language on GitHub with a blog-style write-up of its design decisions and trade-offs.
- Mentoring exercise: do a recorded, constructive live code review of a Tier-1 or Tier-2 learner's real project, treated as a graded checkpoint, not a side activity.
- Prompting drill (design-level): use an AI to help propose a new feature or DSL, then critically evaluate and document every place the AI's design was wrong, unsafe, or non-idiomatic before accepting any of it.

**Curated resources:**

- [Crafting Interpreters (free official online book)](https://craftinginterpreters.com/) — The definitive free, hands-on guide to building lexer/parser/interpreter/VM.
- [MIT OCW 6.001 — Structure and Interpretation of Computer Programs](https://ocw.mit.edu/courses/6-001-structure-and-interpretation-of-computer-programs-spring-2005/) — Full free MIT course; the classic treatment of language and abstraction design.
- [Programming Languages, Part A (Dan Grossman, University of Washington, Coursera)](https://www.coursera.org/learn/programming-languages) — Free-to-audit course built specifically to teach the meta-skill of comparative language paradigms.
- [CPython Developer's Guide (official)](https://devguide.python.org/) — Official guide for making a real upstream contribution to a widely-used interpreter.
- [arXiv cs.PL (Programming Languages) listing](https://arxiv.org/list/cs.PL/recent) — Free, current programming-languages research for the research-literacy module.

---
