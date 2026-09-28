# Computer Science & Programming Foundations

_Part of [The Manual](../../MASTERFILE.md) — track `cs-foundations`. Tier numbering matches MASTERFILE.md §1._

This is the bedrock track of The Manual: computational thinking, discrete math, algorithms & data structures, complexity/Big-O, and the algebra/stats/logic primer every other track (web, mobile, systems, hardware, security, AI/ML) quietly depends on. Unlike some tracks in this curriculum, no tier here is "light" — this track is designed to run at full depth from Tier 0 through Tier 5, because it IS the rigor the other seven tracks borrow. The one deliberate scoping choice: Tier 4's "Advanced Algorithms Specialization" module offers three alternate deep-dive paths (competitive-programming algorithms, compilers/PL theory, or theory-of-computation) rather than forcing all three — full compiler construction and deep systems/OS work are intentionally left to their own dedicated tracks elsewhere in The Manual, so this track goes deep on algorithmic and mathematical reasoning rather than becoming a systems track in disguise. A single teaching language (Python) carries Tiers 0-2 for maximum focus; Tier 3 deliberately introduces a second, statically-typed language purely for conceptual contrast, not as a switch of primary language.

**Canonical ownership (see MASTERFILE.md §4.5):** this track is the sole canonical owner of general Tier-0 computer/terminal/git literacy, the full math spine (linear algebra, probability/stats, calculus, discrete math — including the information-theory and convex-optimization/numerical-stability extensions below), and OOP *concepts*. Every other track's Tier 0 assumes this track's Tier 0 is done, and AI/ML's Tier 1 applies this track's math rather than re-deriving it.

**How this feeds AI/prompting literacy:** This track is the difference between "prompting by vibes" and prompting like an engineer. Big-O reasoning explains WHY LLM context windows are expensive and quadratic-in-length attention exists (so you learn to write short, structured prompts and use retrieval/chunking instead of dumping walls of text). Discrete logic and proof-writing (Tier 1-2) train you to treat a prompt as a formal spec with preconditions/postconditions — the same discipline you use to debug code is what you use to debug a bad AI answer (reproduce it, isolate the variable, don't just re-roll). Complexity theory (Tier 3-4: P vs NP, NP-hardness, approximation) teaches you what is fundamentally, provably hard — so you stop expecting an LLM to reliably "just solve" NP-hard scheduling/optimization/routing problems exactly, and instead prompt it correctly for a heuristic, a decomposition, or a verifiable partial solution. DP and graph-search algorithms are literally the mechanics under decoding strategies (beam search, greedy sampling), so understanding them demystifies what "the model is doing" when it generates text. Every tier's "prompting drills" creative method (get an AI to help solve X, then verify its reasoning against ground truth) is deliberately embedded here first, because this track supplies the ground truth to check the AI against.

**How this transfers across platforms (PC/mobile/web/embedded):** A hash table is a hash table whether it's a Python dict on a server, a Swift Dictionary in an iOS app, a JS Map in a browser, or a C struct on a microcontroller — the reasoning taught here (Big-O, data structure choice, recursion/stack depth, memory layout) transfers unchanged across PC, mobile, web, and embedded targets, which is exactly why it's the FIRST track rather than being folded into any one platform track. Tier 3's deliberate second language (a statically-typed one) is chosen specifically so the learner has already felt a type system and a compiler before hitting Swift/Kotlin/Java in the mobile track or C/Rust in the systems/hardware track. Tier 4's performance-engineering module (cache-aware algorithms, profiling, benchmarking discipline) maps directly onto why the same "correct" algorithm can be fine on a desktop and yet drain a phone's battery, blow a serverless function's timeout, or overrun a microcontroller's RAM — the complexity math doesn't change, only the constraints do. Recursion and stack-depth understanding here is exactly why mobile apps crash with "stack overflow" on deep recursion, and graph/BFS-DFS fluency here is the same algorithm used for routing on a website, pathfinding in a mobile game, and dependency resolution in a build system. This track deliberately produces platform-agnostic reasoning so every later, platform-specific track can move fast without re-teaching fundamentals.

---

## Tier 0: Orientation & Literacy

**Goal:** Take an absolute beginner from 'what even is a computer' to a working, real development environment: comfortable with a terminal, a filesystem, plain-text files, version control basics, and the mental vocabulary (variable, algorithm, binary) needed before any syntax is introduced.

**Modules** (~27h):

- **What Even Is a Computer?** — ~4h: binary representation of data, CPU/RAM/storage roles, fetch-execute intuition (no ISA depth yet), files vs. folders, plain text vs. binary files
- **The Command Line & Filesystem** — ~6h: navigating a shell: cd, ls, pwd, mkdir, mv, cp, rm, absolute vs relative paths, environment variables, piping and redirection basics, file permissions basics
- **Setting Up a Real Dev Environment** — ~5h: installing Python 3 and a package manager, VS Code + essential extensions, installing and configuring Git identity, virtual environments (venv), first Hello World program
- **Version Control Literacy: Git Day Zero** — ~5h: what version control solves, init/add/commit/log, local vs remote repos, GitHub account + first repo, cloning and .gitignore basics
- **Algorithmic Thinking Without Code** — ~4h: everyday algorithms as precise step sequences, ambiguity vs precision in instructions, decomposition and pattern recognition, abstraction, debugging a flawed set of instructions
- **What Is a Variable, Really?** — ~3h: boxes-and-labels mental model, data type intuition (number/text/boolean), why types matter before syntax, bridge into Tier 1

**Quizzes / assessment:**

- *Micro-quiz (5-10 Q, spaced-repetition eligible)* — Auto-gradable multiple-choice set on terminal commands, absolute vs relative paths, binary/decimal conversion, and core git vocabulary (repository, commit, remote, clone).
- *Spaced-repetition flashcard deck* — Terminology deck (CPU, RAM, compiler vs interpreter, repository, commit, variable, binary digit) reviewed on a Leitner/SM-2 schedule for at least two weeks.

**Checkpoint project:** Environment & Workflow Proof-of-Life: install and configure terminal + Python 3 + VS Code + Git; write a short Python script that reads and writes a plain-text file (e.g., a simple daily-log generator); push it to a new public GitHub repo with a clear README (what/why/how) and at least 3 meaningful, well-messaged commits. Rubric checks environment actually works, git history is legible and incremental (not one giant commit), and the README explains the artifact to a stranger.

**Creative teaching methods:**

- Feynman teach-back: record a 2-minute explanation of 'what happens when you double-click an app icon,' aimed at a non-technical friend, then self-critique against a checklist of concepts it should have used.
- Prompting drill: ask an AI assistant to walk you through installing your dev environment and diagnosing one deliberately-broken PATH or environment-variable issue; grade yourself on whether you understood WHY the fix worked, not just whether you copy-pasted it correctly.
- Terminal scavenger hunt: given a messy folder tree, use only CLI commands to locate a hidden file, then deliberately delete the wrong file and use git to recover it — turning a mistake into a lesson about safety nets.

**Curated resources:**

- [CS50x — Introduction to Computer Science (Harvard)](https://cs50.harvard.edu/x/) — Just Week 0's computational-thinking material and the environment setup guide; don't attempt the full course yet.
- [The Odin Project — Foundations course](https://www.theodinproject.com/) — Use the 'Installations' and 'Command Line Basics' lessons specifically.
- [Khan Academy — Computers and the Internet unit](https://www.khanacademy.org/computing) — Conceptual literacy on binary, hardware, and how the internet works, no code required.
- [Pro Git (free official book)](https://git-scm.com/book/en/v2) — Chapters 1-2 only: 'Getting Started' and 'Git Basics'.
- [Exercism — Getting Started onboarding](https://exercism.org/) — Use the CLI setup and first-exercise walkthrough for whichever language track you pick.

---

## Tier 1: Foundations

**Goal:** Build real, tightly-scaffolded fluency in one teaching language (Python) — variables, control flow, functions, core data structures, basic I/O and error handling — while starting the parallel math track (algebra refresher, intro probability/statistics) and discrete math (logic, sets) that Big-O and later proofs will depend on.

**Modules** (~68h):

- **Python Core Syntax** — ~10h: variables and types, arithmetic and string operations, input/output, conditionals (if/elif/else), operators and truthiness
- **Loops & Iteration** — ~8h: for vs while loops, iterating over sequences, break/continue, common off-by-one bugs
- **Functions & Scope** — ~8h: parameters and return values, default arguments, local vs global scope, intro to recursion (factorial, Fibonacci)
- **Core Data Structures I** — ~8h: lists and tuples, dictionaries and sets, indexing and slicing, mutability vs immutability
- **Working with Text & Files** — ~6h: string methods and formatting, reading/writing files, try/except basic error handling
- **Math Primer: Algebra & Functions Refresher** — ~8h: linear equations, exponents and logarithms, function notation, graphing intuition (foundation for later Big-O graphs)
- **Discrete Math I: Logic & Sets** — ~10h: propositional logic and truth tables, direct proof and contrapositive intuition, set operations, functions and relations basics
- **Intro to Probability & Statistics** — ~10h: mean, median, variance, basic probability rules, why this matters for algorithm analysis and later ML, plus an information-theory primer (bits as a measure of uncertainty, entropy, cross-entropy — the same "bits" from Tier 0's number systems now measuring information instead of storage, and the direct prerequisite for AI/ML's loss-function material)

**Quizzes / assessment:**

- *Micro-quiz per module (5-10 Q, spaced-repetition eligible)* — Short auto-graded checks on syntax, truth tables, and set-operation notation, re-surfaced on a spaced schedule.
- *Bug-hunt / code-review kata* — Five short, intentionally broken Python snippets to diagnose and fix: an off-by-one loop, the mutable-default-argument trap, a silent type-coercion bug, an indentation/scope bug, and an infinite loop.

**Checkpoint project:** Build a command-line 'personal toolkit' app (e.g., an expense tracker or grade calculator) that reads/writes a text or CSV file, validates user input, uses functions plus list/dict structures, and includes basic error handling — accompanied by a short written proof (using the logic module) of one simple invariant about the program, e.g. 'total always equals the sum of entries.' Rubric-graded on correctness, code organization, and rigor of the accompanying proof.

**Creative teaching methods:**

- Feynman teach-back: explain recursion and the call stack out loud (recorded) using the factorial example, as if to someone who has never coded.
- Prompting drill: hand an AI a deliberately vague bug report, practice turning it into a precise, reproducible description before asking for help, then independently verify the AI's explanation against the program's actual behavior.
- Spaced-repetition flashcards for terminology and gotchas: mutable vs immutable, pass-by-reference vs pass-by-value, list vs tuple, set operation symbols (union/intersection/difference).

**Curated resources:**

- [MIT OCW 6.0001 — Introduction to Computer Science and Programming in Python](https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/) — Core language content; also offered under MIT's newer number 6.100A.
- [OpenStax — Elementary Algebra 2e / Intermediate Algebra 2e](https://openstax.org/subjects/math) — Use the chapters on functions, exponents, and graphing for the algebra refresher.
- [OpenStax — Introductory Statistics 2e](https://openstax.org/details/books/introductory-statistics-2e) — Chapters 1-3 for descriptive statistics and basic probability.
- [Discrete Mathematics: An Open Introduction (Oscar Levin, free textbook)](https://discrete.openmathbooks.org/) — Chapters 1-3: logic, sets, and proof techniques; pairs well with MIT 6.042J lecture notes.
- [CS50x (Harvard)](https://cs50.harvard.edu/x/) — Weeks 1-3 for reinforcement of control flow and functions from a second angle.
- [Exercism — Python Track](https://exercism.org/tracks/python) — Mentored deliberate-practice exercises for everything in this tier.

---

## Tier 2: Builder

**Goal:** Move from guided exercises to independent small projects: formal Big-O analysis, classic data structures and sorting algorithms built from scratch, graph fundamentals, object-oriented thinking, and a testing/debugging discipline — enough discrete math (induction, recursion, combinatorics) to justify why these algorithms behave the way they do.

**Modules** (~79h):

- **Big-O & Complexity Analysis** — ~10h: asymptotic notation: O, Ω, Θ, analyzing loops and recursive time complexity, space complexity, best/average/worst case
- **Core Data Structures II** — ~12h: stacks and queues, linked lists, building a hash table from scratch, intro to trees
- **Sorting & Searching** — ~10h: binary search, bubble/insertion/merge/quicksort implemented from scratch, empirical benchmarking vs predicted Big-O
- **Discrete Math II: Induction, Recursion & Combinatorics** — ~10h: proof by induction, recurrence relations linked to recursive algorithms, permutations and combinations
- **Graph Theory Fundamentals** — ~8h: adjacency list vs matrix representations, breadth-first and depth-first search, connectivity and shortest unweighted path
- **Object-Oriented Thinking** — ~8h: classes and objects, encapsulation, basic inheritance vs composition, when OOP helps vs. adds needless ceremony (this is the canonical conceptual treatment of OOP in The Manual — Language Mastery and Software Engineering both build on these concepts rather than re-teaching them)
- **Testing & Debugging Discipline** — ~6h: unit testing with pytest, writing tests alongside code, using a real debugger (breakpoints, stepping), reading stack traces
- **Small Independent Projects** — ~15h: Advent-of-Code-style daily problem solving, a maze solver using BFS/DFS, a simple hash-table-backed cache

**Quizzes / assessment:**

- *Micro-quiz: complexity classification* — Given a short code snippet, identify its time and space complexity and justify the answer in one sentence.
- *CTF-style algorithm war-game* — Timed problem sets (Advent of Code or Exercism algorithm exercises) auto-graded on both correctness AND meeting a target time/space complexity, not just passing test cases.

**Checkpoint project:** Implement a from-scratch 'algorithms toolkit' library (no built-in shortcuts) containing a hash table, a binary search tree, BFS/DFS graph traversal, and at least two sorting algorithms — each with unit tests, docstrings, and a written Big-O justification for every function — published as a clean, documented public GitHub repo (this tier's portfolio artifact). Gate: must pass a self-review checklist plus one AI-assisted or peer code review before advancing.

**Creative teaching methods:**

- Build-then-break: after finishing the hash table, deliberately try to break it (collision storms, resizing edge cases, duplicate keys) and document exactly what broke, why, and the fix.
- Portfolio artifact requirement: every mini-project lands in a public 'coding-log' repo with a README explaining the algorithm used and its Big-O — building the externalize-your-understanding habit early.
- Feynman teach-back: explain, on video, why quicksort's worst case is O(n²) despite its excellent average case.

**Curated resources:**

- [MIT OCW 6.006 — Introduction to Algorithms (Fall 2011)](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/) — First third of the course: asymptotics, hashing, binary search trees, sorting.
- [MIT OCW 6.042J — Mathematics for Computer Science (Spring 2015)](https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/) — Induction, recursion, and counting units.
- [Khan Academy — Algorithms (with Dartmouth's Thomas Cormen & Devin Balkcom)](https://www.khanacademy.org/computing/computer-science/algorithms) — Big-O, sorting, and graph-search units built specifically for self-learners.
- [Advent of Code](https://adventofcode.com/) — Any past year's puzzles work well as daily deliberate practice.
- [freeCodeCamp — JavaScript Algorithms and Data Structures Certification](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/) — Useful cross-language reinforcement of the same data-structure implementations.
- [Exercism](https://exercism.org/) — Algorithm-focused exercises with real mentor feedback.

---

## Tier 3: Practitioner

**Goal:** Handle intermediate real-world patterns: divide-and-conquer, dynamic programming, greedy algorithms, and an intro to complexity classes (P vs NP); organize genuine multi-file projects; read other people's codebases; and pick up a second, statically-typed language purely for contrast — plus enough linear algebra/calculus to be ML-ready later.

**Modules** (~84h):

- **Divide & Conquer + Recursion Mastery** — ~10h: master theorem intuition, merge sort and quickselect, recursive tree problems
- **Dynamic Programming** — ~12h: memoization vs tabulation, classic problems: knapsack, longest common subsequence, edit distance, recognizing DP-shaped problems
- **Greedy Algorithms & Graph Algorithms II** — ~10h: Dijkstra's algorithm, minimum spanning tree (Kruskal/Prim), greedy proof sketches (exchange argument), when greedy provably fails
- **Complexity Classes: P, NP, and Why It Matters** — ~8h: decision problems, informal reductions, NP-completeness intuition, why this bounds what algorithms — and AI — can solve efficiently
- **Multi-File Project Architecture** — ~10h: organizing modules and packages, separation of concerns, dependency management (venv/poetry), design patterns where they actually help (strategy, factory)
- **Reading Real Codebases** — ~8h: navigating a mid-size open-source repo, grep/ctags/IDE code navigation, tracing execution paths, reading commit history and PRs to recover design intent
- **Second Language for Contrast** — ~12h: a statically-typed language (Go, Java, or Rust) far enough to compare type systems, compiled vs interpreted execution, paradigm contrast with Python
- **Math Primer II: Linear Algebra & Calculus Basics for ML-Readiness** — ~14h: vectors and matrices, dot product and matrix multiplication, derivative intuition as rate of change, plus convex optimization intuition (why gradient descent provably converges for convex functions, local vs. global minima) and numerical stability basics (floating-point error accumulation, why a mathematically-equivalent formula can be numerically unstable) — this is the complete math foundation AI/ML's Tier 1 builds on directly, not a preview of it

**Quizzes / assessment:**

- *Timed pattern-recognition micro-quiz* — Given a new problem statement, classify it as DP, greedy, divide-and-conquer, or graph-search before solving — trains recognition, not just execution.
- *Bug-hunt kata: subtly wrong DP/greedy code* — Diagnose deliberately subtle bugs such as an off-by-one in a DP table or an incorrect greedy selection criterion that passes some test cases but fails on edge cases.

**Checkpoint project:** Contribute a real, reviewed pull request to a small or medium open-source project (or, if none merges in time, a fully-tested 'shadow PR' against a genuine open issue in a real repo), AND package a solver (e.g., a shortest-path route planner or a scheduling/knapsack optimizer) as a properly structured multi-file Python project with a CLI, tests, and a written explanation of the algorithmic choices and complexity trade-offs made. Rubric-graded on architecture quality, correctness, and clarity of trade-off reasoning.

**Creative teaching methods:**

- Prompting drill: use an AI as a Socratic debugging partner on a gnarly multi-file import/dependency error — the rule is the AI must help you find the root cause, not just rewrite the project.
- Bug-hunt / code-review kata using real or curated 'exemplar mistake' DP and greedy implementations.
- Feynman teach-back: teach Dijkstra's algorithm or a chosen DP problem in a 5-minute recording aimed at a true beginner.

**Curated resources:**

- [MIT OCW 6.006 — Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/) — Back half of the course: dynamic programming, greedy, and graph algorithm units.
- [MIT OCW 6.045J / 18.400J — Automata, Computability, and Complexity](https://ocw.mit.edu/courses/6-045j-automata-computability-and-complexity-spring-2011/) — Undergraduate-level first pass at P vs NP and complexity classes.
- [Algorithms, Part I and Part II (Robert Sedgewick & Kevin Wayne, Princeton University)](https://www.coursera.org/learn/algorithms-part1) — Free to audit on Coursera; excellent visualizations for DP and graph algorithms.
- [MIT OCW 18.06 — Linear Algebra (Gilbert Strang)](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) — First ~10 lectures for vector/matrix operations needed downstream for ML.
- [Exercism — Go, Rust, or Java Track](https://exercism.org/) — Pick whichever second language you choose; mentored exercises make the type-system contrast concrete.
- [Structure and Interpretation of Computer Programs (free MIT Press edition)](https://mitpress.mit.edu/9780262510875/structure-and-interpretation-of-computer-programs/) — Optional: a taste of the functional paradigm via Scheme, for further contrast.

---

## Tier 4: Advanced / Specialist

**Goal:** Think at the architecture and performance level: profile and optimize real code, master advanced data structures, choose a specialization path (competitive-programming algorithms, compiler/PL basics, or theory of computation), understand concurrency, and make a substantive open-source contribution — including hands-on NP-hardness reductions that explain why ML relies on heuristics rather than exact solvers.

**Modules** (~85h):

- **Performance Engineering** — ~10h: profiling code, cache-aware algorithm design, memory layout effects on speed, benchmarking methodology, knowing when NOT to optimize
- **Advanced Data Structures** — ~12h: balanced trees (AVL/Red-Black, conceptually), heaps and priority queues, tries, union-find, Bloom filters and skip lists
- **Advanced Algorithms Specialization (choose one path)** — ~20h: Path A: competitive-programming algorithms (segment trees, advanced graph algorithms, KMP string matching), Path B: compilers/PL basics (lexing, parsing, a toy interpreter), Path C: theory of computation deep-dive (Turing machines, reductions, undecidability)
- **Concurrency & Parallelism Fundamentals** — ~10h: threads vs processes, race conditions and locks, why parallel algorithm complexity analysis differs — relevant to both multicore CPUs and GPU/AI workloads
- **System Design Thinking at the Algorithm Level** — ~8h: how data-structure choice ripples into architecture, reading and critiquing real system design docs
- **Formal Complexity & Approximation** — ~10h: hands-on NP-hardness proofs by reduction, approximation algorithms, why some AI/optimization problems are inherently intractable and need heuristics
- **Open Source Contribution at Scale** — ~15h: finding a substantive (non-typo) issue in a real project, writing a bug fix with a regression test, navigating a real project's review process end-to-end

**Quizzes / assessment:**

- *CTF-style algorithmic war-game* — Timed competitive-programming-judge problems (Codeforces Div 2/3 tier, or Advent of Code 'hard' days) used as graded challenges under time pressure.
- *Bug-hunt kata on real historical bugs* — Find a closed, well-documented bug in a real open-source issue tracker, attempt to reproduce and diagnose it blind, then compare your diagnosis to the actual merged fix.

**Checkpoint project:** A substantive, merged (or seriously reviewer-approved) open-source contribution involving nontrivial algorithmic reasoning, paired with a performance-engineering case study: take a working-but-slow program, profile it, and produce a written report with before/after Big-O AND measured wall-clock benchmarks showing a real speedup, with all existing tests still passing. Rubric-graded on rigor of measurement and correctness preservation.

**Creative teaching methods:**

- Build-then-break: build a thread-safe/concurrent data structure (e.g., a bounded queue), then write a stress test specifically designed to surface race conditions, and document the fix.
- Prompting drill: ask an AI to help design (not just code) a system, then critically evaluate its proposed architecture's algorithmic soundness and push back on any unjustified complexity claims.
- CTF-style war-game challenges as an ongoing weekly habit, not a one-off.

**Curated resources:**

- [MIT OCW 6.172 — Performance Engineering of Software Systems](https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/) — Core resource for the performance-engineering module.
- [MIT OCW 6.046J — Design and Analysis of Algorithms](https://ocw.mit.edu/courses/6-046j-design-and-analysis-of-algorithms-spring-2015/) — Advanced algorithms, NP-hardness, and approximation algorithms.
- [Algorithms Specialization (Tim Roughgarden, Stanford University)](https://www.coursera.org/specializations/algorithms) — Four courses, free to audit on Coursera: Divide & Conquer, Graph Search, Greedy/DP, NP-Completeness.
- [NAND2Tetris — Build a Modern Computer from First Principles](https://www.nand2tetris.org/) — Bridges advanced software thinking down to the hardware track; useful for Path B/C learners.
- [Codeforces](https://codeforces.com/) — Primary venue for the CTF-style algorithmic war-games.

---

## Tier 5: Expert / Innovator

**Goal:** Operate research-adjacently: read and critique real papers, run a genuinely original small experiment, contribute upstream to core CS infrastructure, and teach/mentor others as the ultimate proof of mastery — capped by a capstone module connecting algorithmic complexity directly to why modern AI systems need better algorithms, not just bigger GPUs.

**Modules** (~69h):

- **Reading & Critiquing Research Papers** — ~10h: abstract-first reading strategy, reproducing a paper's core algorithm from pseudocode, using Semantic Scholar and arXiv to trace citation lineage
- **Original Problem-Solving & Research Methodology** — ~15h: picking an under-explored problem or efficiency improvement, forming a falsifiable hypothesis, rigorous benchmarking methodology and statistical significance of performance claims
- **Contributing Upstream to Core Infrastructure** — ~20h: contributing to a language runtime, standard library, or widely-used algorithms/ML-infra project, participating in design discussion, not just submitting code
- **Teaching & Mentoring as Mastery Proof** — ~12h: designing a lesson or workshop for a real beginner audience, writing a technical tutorial or blog post, mentoring on Exercism and iterating on learner feedback
- **The Frontier: Algorithms Underneath Modern AI** — ~12h: complexity of attention mechanisms, I/O-aware algorithms (e.g., FlashAttention) and why efficient algorithms research speeds up LLMs directly, reading 1-2 real efficient-ML-systems papers from arXiv

**Quizzes / assessment:**

- *Peer/mentor-graded 'explain it back' session* — Teach a real novice a nontrivial concept from this track live or on video; their comprehension and follow-up questions are the assessment, not a multiple-choice test.
- *Research-methodology self/peer review checklist* — A structured checklist verifying you stated a falsifiable hypothesis, controlled variables, and reported both positive and negative results honestly — CTF-style drills are intentionally retired here in favor of open-ended research rubrics.

**Checkpoint project:** A capstone portfolio with three parts: (1) one upstream-merged or seriously-reviewed contribution to a significant open-source CS infrastructure project; (2) one original teaching artifact (blog post, workshop, or documented mentoring track record) explaining a nontrivial algorithms/complexity concept to a true novice; and (3) a short (2-4 page) written research note that engages with a real arXiv/Semantic Scholar paper on algorithmic efficiency in ML systems and proposes a small original experiment or extension. Rubric-graded on originality, correctness, and communication clarity.

**Creative teaching methods:**

- Explain-it-back at scale: run an actual live or recorded teaching session for a real Tier 0/1 learner and collect their feedback as evidence of mastery.
- Portfolio artifact requirement, formalized as a public 'research notebook' repo tracking hypotheses, experiments, and results over time — mirroring how real research groups actually work.

**Curated resources:**

- [arXiv.org — cs.DS and cs.CC categories](https://arxiv.org/list/cs.DS/recent) — Data Structures & Algorithms and Computational Complexity listings for current research browsing.
- [Semantic Scholar](https://www.semanticscholar.org/) — For citation-graph tracing and literature review practice.
- [MIT OCW 18.404J / 6.840J — Theory of Computation](https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/) — Graduate-level computability/complexity grounding for the research-methodology module.
- [FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness (Dao et al.)](https://arxiv.org/abs/2205.14135) — The concrete, accessible worked example for 'algorithms research directly speeds up LLMs.'
- [Class Central](https://www.classcentral.com/) — Use to discover current free, research-adjacent MOOCs or seminars as they rotate through each term.
- [CPython Developer's Guide / NumPy Contributor Guide (official docs)](https://devguide.python.org/) — Official onboarding material for the upstream-contribution module.

---
