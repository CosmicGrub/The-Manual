# Hardware & Computer Systems

_Part of [The Manual](../../MASTERFILE.md) — track `hardware-systems`. Tier numbering matches MASTERFILE.md §1._

This track takes a learner from "what is a bit, physically" to designing their own CPU on an FPGA and landing a real patch in an upstream kernel or RTOS. It runs bottom-up through digital logic/boolean algebra, computer architecture (CPU/memory/cache/buses), boot sequences, OS internals (processes/threads/memory/filesystems/scheduling), networking (TCP/IP/DNS/HTTP), embedded systems/electronics, and assembly language — the physical and systems layer every other track (languages, AI/ML, platforms) ultimately runs on. No tier is filler: even Tier 0 builds toward real gate-level circuits, and Tier 5 is explicitly scoped away from literal silicon fabrication (unrealistic without a fab) toward the genuinely reachable frontier for a self-learner in 2026 — FPGA-realized novel architectures, reproduced research results, and real upstream systems contributions.

**How this feeds AI/prompting literacy:** This track is the reason an AI's answers about "why is my model slow" or "why do I need a GPU" stop being magic words and become checkable claims. Understanding CPU/memory/cache/bus architecture (Tiers 1-4) is exactly what explains why LLM training and inference are GPU/TPU-bound (massively parallel matmul, HBM bandwidth as the real bottleneck, NVLink/interconnect topology) and why techniques like quantization (int8/int4) and KV-cache management exist at all — vLLM's "PagedAttention" is literally the OS virtual-memory paging concept from Tier 3 applied to attention caches, and once you've built paging yourself that paper reads as obvious instead of clever. The networking module (Tier 3) is the literal transport for every AI API call (HTTPS/REST, streaming via chunked transfer or SSE) and for standing up local inference servers (Ollama, llama.cpp, vLLM) that you must configure and debug over real sockets. The assembly/performance-engineering material (Tiers 1 and 4) builds the same mental muscles needed to read and trust (or distrust) CUDA/Triton kernel code, GGUF quantized formats, and memory-coalescing arguments instead of taking an AI's optimization claims on faith. The embedded module connects directly to on-device/edge AI (TinyML, TensorFlow Lite Micro on an ESP32), an increasingly real specialty. Most directly: every tier's "prompting drills" force the learner to feed an AI enough hardware/systems context (wiring diagrams, register dumps, perf traces, kernel panics) to get a *correct* systems-level answer, and — critically — to verify that answer against ground truth (a datasheet, a debugger, a benchmark) rather than trusting confident-sounding wrong output. That verification habit, built here, is the single most transferable AI-literacy skill this track produces.

**How this transfers across platforms (PC/mobile/web/embedded):** Every platform is this track's material wearing a different UI. PC development runs directly on the BIOS/UEFI boot, x86-64 (or ARM64) ISA, and Windows/Linux process-and-memory model covered in Tiers 0-4 — this is why desktop apps crash, leak, or stutter, and how to actually diagnose it instead of guessing. Mobile is the same architecture family (iOS and Android are both ARM64 today) with power/thermal constraints layered on top — big.LITTLE-style heterogeneous scheduling, background-process suspension, and battery-aware throttling are direct descendants of the scheduling and process-lifecycle material in Tier 3. Embedded/IoT *is* this track: the microcontroller, bare-metal, and RTOS modules (Tiers 2-4) are the platform, not an analogy for it — no Linux, no Windows, just your firmware and the silicon. Web and cloud both run on top of the exact TCP/IP-DNS-HTTP stack built by hand in Tier 3, and once you know that "a server" is just another OS process holding a listening socket, and that "a container" is Linux namespaces/cgroups (not a new invention), deploying and debugging backend and cloud infrastructure stops being folklore. The cumulative effect is that a learner who finishes this track can debug "works on my machine, not on the target platform" bugs, make informed architecture choices (ARM vs. x86 cloud instances, native module vs. managed runtime), and read any platform's official low-level docs (Apple's ARM64 ABI notes, Android's Linux kernel deltas, a microcontroller's datasheet) without translation.

---

## Tier 0: Orientation & Literacy

**Goal:** General terminal/OS literacy is assumed complete from CS Foundations Tier 0 and is not re-taught here. By the end of this tier the learner can convert fluently between binary/hex/decimal and explain two's complement, can name and describe the role of every major component inside a real computer, understands voltage/current/resistance well enough to work safely with low-voltage DC, and has a working truth-table-level grasp of AND/OR/NOT/XOR. This tier is deliberately light on two things and says so explicitly: assembly language (zero exposure — it requires Tier 1's boolean-logic foundation first) and networking (zero exposure — it requires Tier 3's OS foundation). Everything here is literacy and safety, not building.

**Modules** (~22h, plus general terminal/OS literacy assumed complete from CS Foundations Tier 0 — see MASTERFILE.md §4.5):

- **Number Systems & Boolean Basics** — ~8h: binary, octal, hexadecimal, and decimal, two's complement signed integers, ASCII and a first look at Unicode, truth tables for AND/OR/NOT/XOR, bits, nibbles, bytes, words
- **What's Actually Inside a Computer** — ~5h: CPU, RAM, storage, motherboard, GPU, PSU and their roles, von Neumann vs. Harvard architecture at a glance, safe PC disassembly and ESD precautions, reading a spec sheet without being fooled by marketing numbers
- **Electricity Fundamentals & Lab Safety** — ~6h: voltage, current, resistance, Ohm's law, breadboard layout basics, multimeter use (continuity, voltage, resistance), safe practice with low-voltage DC only, circuit simulation before touching real components
- **Setting Up Your Toolkit** — ~3h: installing Logisim Evolution, a hex/binary calculator habit, using an AI assistant to ask, not to skip, questions, basic git for a lab notebook

**Quizzes / assessment:**

- *Micro-quiz (SRS-eligible)* — Timed base-conversion drills: decimal↔binary↔hex↔two's-complement, 8-10 questions, auto-graded, missed items feed the spaced-repetition queue.
- *Spaced-repetition flashcards* — Terminology deck: CPU, RAM, cache, bus, register, ALU, clock, ESD — definition-recall cards on an SM-2 schedule.
- *Explain it back (Feynman teach-back)* — Record a 2-minute explanation of why a computer only understands 0s and 1s, aimed at a smart 10-year-old; self-graded against a 'did you use an analogy, did you avoid jargon' rubric.

**Checkpoint project:** Produce a personal 'machine dossier': a one-page labeled diagram of a real computer's major components with a one-sentence role for each, plus a hand-worked (then calculator-verified) binary and hex encoding of your own name (as ASCII bytes) and today's date.

**Creative teaching methods:**

- Spaced-repetition flashcard deck for terminology and number conversions (SM-2 scheduled)
- Feynman teach-back recorded explanation of bits/bytes/words for a non-technical audience
- Component scavenger hunt: label every part on a real or photographed motherboard/laptop teardown

**Curated resources:**

- [CS50's Understanding Technology](https://cs50.harvard.edu/technology/) — Harvard/CS50's free, absolute-beginner course on how computers, the internet, and software actually work.
- [Khan Academy — Computers and the Internet](https://www.khanacademy.org/computing/computers-and-internet) — Free unit covering bits, binary, and digital information at a gentle pace.
- [Khan Academy — Electrical Engineering](https://www.khanacademy.org/science/electrical-engineering) — Circuit elements, Ohm's law, and resistor circuits — the pre-req for the electricity module.
- [OpenStax — University Physics Volume 2](https://openstax.org/details/books/university-physics-volume-2) — Free textbook; Chapter 9 (Current and Resistance) and Chapter 10 (Direct-Current Circuits) give this module real rigor.
- [The Odin Project — Foundations: Command Line Basics](https://www.theodinproject.com/paths/foundations/courses/foundations) — Free, project-based terminal literacy lesson.
- [NAND2Tetris, Part I (preview only)](https://www.nand2tetris.org/) — Don't start the projects yet — just skim Project 1's Boolean Logic framing as a preview of Tier 1.

---

## Tier 1: Foundations

**Goal:** By the end of Tier 1 the learner can build combinational and sequential logic circuits from primitive gates upward (NAND2Tetris-style), fluently handle IEEE-754 floating point and signed overflow, write and single-step small x86-64 or ARM64 assembly programs, and give a structurally correct account of the fetch-decode-execute cycle and memory hierarchy. Heavy scaffolding throughout: every exercise has a guided path. Networking is still absent by design (Tier 3); this tier's assembly work is intentionally minimal-instruction-set (movement, arithmetic, jumps, a basic stack) rather than full ABI mastery, which is saved for Tier 3.

**Modules** (~76h):

- **Boolean Algebra & Combinational Logic** — ~20h: De Morgan's laws, Karnaugh maps, building half/full adders and multiplexers from gates, NAND2Tetris Projects 1-2
- **Sequential Logic & the Fetch-Decode-Execute Cycle** — ~20h: latches and flip-flops, registers and clocks, building a counter, NAND2Tetris Project 3 (memory) and intro to Project 5 (CPU)
- **Computer Architecture Fundamentals I** — ~10h: von Neumann architecture, ALU, control unit, register file, memory hierarchy overview (registers → cache → RAM → disk), what a bus actually is
- **Intro to Assembly Language** — ~18h: x86-64 or ARM64 registers, mov/add/sub/cmp/jmp, the stack and a basic call/return, reading compiler output live on Compiler Explorer, single-stepping with gdb
- **Number Representation Deep Dive** — ~8h: IEEE-754 floating point encode/decode, signed vs. unsigned overflow, endianness, bitwise operators in C

**Quizzes / assessment:**

- *Micro-quiz (SRS-eligible)* — Karnaugh-map simplification, two's-complement arithmetic, and IEEE-754 encode/decode drills, auto-graded.
- *Bug hunt / code-review kata* — Given a Logisim circuit that fails 3 of 8 rows of its target truth table, locate the miswired gate and fix it.
- *Explain it back* — Explain the fetch-decode-execute cycle in writing to an imagined non-technical friend; self-graded against a rubric checking for no hand-waving on 'decode'.
- *Prompting drill* — Ask an AI to explain a real addressing-mode instruction (e.g. lea rax, [rbx+rcx*4+8]), then verify its explanation term-by-term against your own addressing-mode notes and flag any part it got wrong.

**Checkpoint project:** In Logisim Evolution, design an 8-bit ALU (add, sub, AND, OR, NOT, zero flag) built entirely from primitive gates — no built-in ALU blocks. Write a short README explaining how each control-bit combination changes behavior. Pair it with a 15-20 line x86-64 or ARM64 assembly program (traced by hand or run in a simulator/gdb) that performs an equivalent computation.

**Creative teaching methods:**

- Bug hunt / code-review kata on intentionally broken Logisim circuits
- Prompting drill decoding real assembly addressing modes, manually cross-checked
- Flashcards for gate symbols, truth tables, and opcode mnemonics
- Build-then-break: build a working 4-bit adder, then diagnose a partner circuit with a deliberately injected carry bug

**Curated resources:**

- [NAND2Tetris, Part I — Projects 1-5](https://www.nand2tetris.org/) — The core spine of this tier: gates to a working CPU, entirely free.
- [MIT OCW 6.004 — Computation Structures](https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/) — MIT's canonical digital logic and computer architecture course, full lecture notes and labs.
- [Khan Academy — Computers and the Internet: Digital Information](https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:digital-information) — A lighter parallel track on binary and logic gates.
- [Compiler Explorer](https://godbolt.org/) — See what your C compiles to in real time — essential for the assembly module.
- [Paul Carter — PC Assembly Language (free book)](https://pacman128.github.io/pcasm/) — A complete, free, beginner-oriented x86 assembly text.
- [OSDev Wiki — x86 Assembly / CPU Registers x86](https://wiki.osdev.org/X86_Assembly) — Community-maintained, free, reference-grade instruction and register documentation.

---

## Tier 2: Builder

**Goal:** By the end of Tier 2 the learner independently ships small hardware-adjacent projects with no hand-holding: a finished simple computer (NAND2Tetris' Hack machine plus its own assembler), a real microcontroller project wired and coded from scratch, an empirically measured memory-hierarchy/cache experiment on their own machine, and a hand-written bootloader that boots in an emulator. Buses and I/O (I2C/SPI/UART, USB, PCIe) are introduced here for the first time, timed to support the embedded module; deep networking is still deferred to Tier 3.

**Modules** (~65h):

- **Finishing the Hack Computer** — ~15h: NAND2Tetris Project 5 (full CPU), NAND2Tetris Project 6 (assembler), building your own assembler for your own ISA
- **Microcontrollers & Basic Electronics I** — ~20h: Arduino Uno / ESP32 GPIO and PWM, reading a datasheet, breadboarding LEDs, buttons, and sensors, Ohm's law applied to real components, embedded C/C++ basics
- **Memory Hierarchy & Cache Behavior, Empirically** — ~10h: L1/L2/L3 cache structure, DRAM basics, writing a cache-miss-latency benchmark, why data locality matters for real performance
- **How a Computer Boots** — ~12h: BIOS/UEFI vs. bootloader, POST, bootstrapping into protected/long mode, writing a minimal x86 boot sector in NASM run under QEMU
- **Buses & I/O Fundamentals** — ~8h: USB, PCIe, SATA/NVMe at a conceptual level, I2C, SPI, and UART in practice, interrupts vs. polling

**Quizzes / assessment:**

- *Micro-quiz (SRS-eligible)* — I2C vs. SPI vs. UART comparison, boot-sequence ordering, and cache-terminology drills, auto-graded.
- *Bug hunt* — Debug an Arduino sketch with a wiring-plus-logic bug (e.g. a floating input or missing pull-up) using only the datasheet and a multimeter — no swapping parts blind.
- *CTF-style challenge* — 'Boot or bust': a provided QEMU disk image has a corrupted boot sector; diagnose and repair it until the machine boots.
- *Prompting drill* — Describe a flaky sensor-reading bug to an AI assistant, iteratively refining the prompt (code, wiring, symptoms) across attempts until it gives a correct root-cause diagnosis; log each prompt version and what changed.

**Checkpoint project:** Build a self-contained embedded project (e.g. an ESP32 temperature-and-display node, or an ultrasonic distance alarm) with your own schematic, breadboard build, and source in a public repo, AND a minimal x86 bootloader (NASM, run in QEMU) that prints your name and a boot-time-derived value before halting. Submit the repo link, a short demo video or GIF, and a write-up of one real bug and how you diagnosed it.

**Creative teaching methods:**

- CTF-style 'boot or bust' bootloader-repair challenge
- Build-then-break: wire a working GPIO/sensor circuit, then inject one hardware fault for a blind diagnosis later
- Portfolio artifact requirement: every project (Hack assembler, Arduino build, bootloader) lands in a public git repo with README and a demo photo/video

**Curated resources:**

- [Arduino official documentation](https://docs.arduino.cc/) — Official vendor docs and project guides, free.
- [OSDev Wiki — Bare Bones / Rolling Your Own Bootloader](https://wiki.osdev.org/Rolling_Your_Own_Bootloader) — The standard free reference for exactly this tier's boot checkpoint.
- [MIT OCW 6.004 — Computation Structures (I/O and memory lectures)](https://ocw.mit.edu/courses/6-004-computation-structures-spring-2017/) — Continuing reference for memory hierarchy and I/O material.
- [CS50x — Memory Lecture](https://cs50.harvard.edu/x/) — Harvard's free CS50x pointer/memory lecture, a useful refresher tying into hierarchy discussion.
- [freeCodeCamp — Arduino and ESP32 project courses](https://www.freecodecamp.org/news/tag/arduino/) — Free, project-based video courses supporting the microcontroller module.

---

## Tier 3: Practitioner

**Goal:** By the end of Tier 3 the learner works confidently in real, multi-file, intermediate-complexity systems: reading and modifying an actual teaching OS kernel, building a small networked embedded system, explaining Linux process/thread/memory/filesystem internals accurately, and reading/writing non-trivial assembly and C in a systems context. This is where networking (TCP/IP, DNS, HTTP) and full OS internals — deliberately deferred until now — finally arrive together, because neither makes sense without the boot and architecture foundation from Tiers 1-2.

**Modules** (~115h):

- **Operating Systems: Processes, Threads & Scheduling** — ~20h: process vs. thread, context switching, scheduling algorithms (round robin, CFS overview), mutexes and semaphores, reading real scheduler code
- **Operating Systems: Memory Management & Filesystems** — ~20h: virtual memory and paging, page tables and TLBs, malloc internals, inodes and journaling filesystems
- **Build Your Own OS Kernel (xv6)** — ~25h: reading MIT's xv6 source end to end, adding a syscall, running under QEMU with GDB attached
- **Networking Fundamentals: TCP/IP, DNS, HTTP** — ~20h: (this is the canonical deep networking module for The Manual — see MASTERFILE.md §4.5; Software Engineering and DevOps teach only their applied HTTP-for-APIs and networking-for-ops angles and point here for full protocol depth) OSI vs. TCP/IP model, IP addressing and subnetting, TCP handshake and basic congestion control, DNS resolution, HTTP request/response, raw socket programming, packet capture with Wireshark
- **Real-Time & Networked Embedded Systems** — ~18h: RTOS concepts (FreeRTOS tasks, priorities, ISRs), adding Wi-Fi/MQTT to an ESP32 project, I2C/SPI sensor fusion
- **Assembly & C in Systems Context** — ~12h: reading real context-switch assembly, calling conventions across ABI boundaries, objdump, gdb, strace, ltrace on real binaries

**Quizzes / assessment:**

- *Micro-quiz (SRS-eligible)* — Scheduling-algorithm trace-throughs, IP subnetting calculations, and page-table-walk problems, auto-graded.
- *Code-review kata* — Given a simplified real race-condition bug in pthreads C code, locate it through reasoning plus ThreadSanitizer, not guessing.
- *Explain it back* — Teach back, end to end, how a page fault is handled and separately how a DNS lookup resolves.
- *CTF-style challenge* — Network-forensics mini-CTF: given a .pcap file, answer specific questions about what happened on the wire, in the style of picoCTF networking categories.
- *Prompting drill* — Paste a kernel panic or segfault backtrace to an AI, iteratively prompt it toward localizing the bug in xv6, then verify its suggested fix in QEMU+GDB before accepting it.

**Checkpoint project:** Fork MIT's xv6 (riscv or x86) and implement one non-trivial kernel feature end to end — e.g. a syscall reporting per-process memory usage, or a basic priority scheduler replacing round-robin — with your own test program and a patch-style commit message plus a short design doc on tradeoffs. Separately, build a small networked embedded demo: an ESP32 running FreeRTOS that publishes sensor data over MQTT/Wi-Fi to a script you wrote using raw sockets, with an annotated Wireshark capture showing the TCP handshake and your application-layer messages.

**Creative teaching methods:**

- CTF-style packet-forensics challenge using a real captured .pcap file
- Code-review kata on given concurrency bugs (race conditions, deadlocks)
- Build-then-break: build a raw-TCP-socket chat client/server, then attempt to break it with malformed packets
- Portfolio artifact: an xv6 kernel change submitted as a diff/patch with a written design explanation, formatted as if it were a real upstream submission

**Curated resources:**

- [MIT OCW / 6.1810 — Operating System Engineering (xv6)](https://pdos.csail.mit.edu/6.1810/) — MIT's free OS course: the xv6 source, commentary book, and lab assignments this module is built on.
- [Operating Systems: Three Easy Pieces (OSTEP)](https://pages.cs.wisc.edu/~remzi/OSTEP/) — Free, complete, widely-used OS internals textbook by Remzi and Andrea Arpaci-Dusseau.
- [Stanford CS144 — Introduction to Computer Networking](https://cs144.github.io/) — Stanford's free, publicly posted networking course with a real TCP-implementation lab.
- [FreeRTOS official documentation](https://www.freertos.org/Documentation/RTOS_book.html) — Official, free documentation for the RTOS module.
- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) — Official documentation for the packet-capture work in this tier.

---

## Tier 4: Advanced / Specialist

**Goal:** By the end of Tier 4 the learner does genuine specialization: reasoning at the microarchitecture level (pipelining, branch prediction, out-of-order execution), understanding cache coherence and memory consistency well enough to find and fix real performance bugs, profiling and optimizing code with production tools, programming bare-metal embedded systems with no vendor SDK, and — critically — has submitted a real patch to an open-source kernel, RTOS, or toolchain project. This is the tier where 'contributing to a larger system' stops being aspirational and becomes a checkpoint requirement.

**Modules** (~118h):

- **CPU Microarchitecture: Pipelining to Out-of-Order Execution** — ~20h: pipeline hazards, branch prediction, superscalar and out-of-order execution, speculative execution and why Spectre/Meltdown exist
- **Cache Coherence & Memory Consistency** — ~15h: the MESI protocol, false sharing, memory ordering and fences, sequential vs. relaxed consistency models
- **Performance Engineering** — ~18h: perf/VTune profiling, flame graphs, SIMD basics (SSE/AVX or NEON intrinsics), sound benchmarking methodology
- **Bare-Metal Embedded Systems** — ~25h: Cortex-M programming with no vendor HAL, linker scripts, assembly startup code, memory-mapped I/O straight from the datasheet, hand-built interrupt vector tables
- **Contributing to a Real Open-Source Systems Project** — ~25h: finding a 'good first issue' in Linux, U-Boot, Zephyr, or a RISC-V toolchain, the project's contribution workflow (mailing list or PR), getting real review feedback
- **Advanced Networking: Beyond the Basics** — ~15h: TCP congestion control internals (Reno/CUBIC/BBR), the TLS handshake, NAT and load balancing, a tiny userspace TCP stack or raw-socket mini-router

**Quizzes / assessment:**

- *Micro-quiz (SRS-eligible)* — MESI state-transition diagrams, pipeline-hazard identification, and branch-predictor-behavior prediction, auto-graded.
- *Bug hunt* — Given C code that produces correct output but terrible performance due to false sharing, find and fix it using profiling data, not guesswork.
- *Explain it back* — Teach back why Spectre and Meltdown work, at a level a security-conscious non-specialist engineer could follow.
- *Prompting drill* — Use an AI to help interpret a perf flame graph and hot-loop disassembly and to propose a SIMD rewrite, then benchmark to confirm the suggestion actually helped (or diagnose why it didn't).

**Checkpoint project:** Two parts. (1) Take CPU-bound code from earlier in this curriculum, profile it with perf, identify a real cache/branch/SIMD bottleneck, fix it, and document a measured speedup with before/after flame graphs or perf stat numbers — no unverified claims. (2) Submit one real patch to an open-source systems project (a Linux 'good first issue' via kernelnewbies.org, Zephyr RTOS, U-Boot, or a RISC-V toolchain), and show the submission, the review feedback received, and your response to it — merged or not.

**Creative teaching methods:**

- Bug hunt / code-review kata on real performance bugs (false sharing, cache-unfriendly layouts)
- Portfolio artifact requirement: the real open-source patch (merged, or submitted with review feedback) as the tier's centerpiece
- Build-then-break: write a lock-free-looking data structure, then have a later/adversarial pass try to construct a breaking interleaving using ThreadSanitizer

**Curated resources:**

- [MIT OCW 6.823 — Computer System Architecture](https://ocw.mit.edu/courses/6-823-computer-system-architecture-fall-2005/) — Graduate-level MIT architecture course covering pipelining through out-of-order execution.
- [Agner Fog's Software Optimization Resources](https://www.agner.org/optimize/) — Free, widely-cited instruction tables and optimization manuals for the performance module.
- [Onur Mutlu — Computer Architecture / Digital Design lectures](https://safari.ethz.ch/architecture/) — Full free lecture recordings and materials covering cache coherence and memory systems in depth.
- [kernelnewbies.org](https://kernelnewbies.org/) — The standard free on-ramp for real Linux kernel contribution, including a curated 'good first bug' list.
- [Zephyr Project documentation](https://docs.zephyrproject.org/) — Official docs and contribution guide for a real, industry-used embedded RTOS.
- [RFC 5681 — TCP Congestion Control](https://www.rfc-editor.org/rfc/rfc5681) — Primary-source reading for the advanced networking module, paired with Stanford CS144's later units.

---

## Tier 5: Expert / Innovator

**Goal:** Per The Manual's uniform Tier-5 assessment policy (MASTERFILE.md §4.5), traditional quizzes are retired here in favor of portfolio/peer/maintainer review — everything below is a judged, practical artifact, not a recognition test. By the end of Tier 5 the learner can design a novel (or meaningfully remixed) systems component, contribute upstream at a maintainer-recognized level, mentor others through earlier tiers, and read current architecture/systems research with an informed, critical eye. This tier is explicitly scoped: literal semiconductor fabrication and VLSI research are out of reach for a self-learner without a fab and six-to-seven-figure tooling, so 'invent, don't just apply' is channeled into the genuinely reachable 2026 frontier — FPGA-realized novel cores, reproduced published research, and real OS/RTOS subsystem design.

**Modules** (~130h):

- **Design Your Own ISA/CPU on FPGA** — ~30h: extending or designing a RISC-V soft core, open FPGA toolchains (Yosys/nextpnr), adding a custom instruction or accelerator, simulation before hardware
- **Reading & Reproducing Architecture/Systems Research** — ~25h: reading ISCA/MICRO/ASPLOS/OSDI-style papers, finding public artifacts, reproducing a core result or a simplified version of one
- **OS/Kernel Subsystem Design** — ~30h: designing (not just patching) a subsystem, an RFC-style design document, upstream submission and review
- **Novel Embedded/Hardware Systems Project** — ~30h: custom PCB design in KiCad, bare-metal or RTOS firmware for original hardware, solving a problem with no off-the-shelf answer
- **Teaching, Mentoring & Technical Writing** — ~15h: writing a from-scratch tutorial or talk, mentoring someone through Tier 0-2 material, thorough code review for others' systems code

**Quizzes / assessment:**

- *Explain it back, at teaching scale* — Produce a public post or recorded talk explaining your Tier 5 project to Tier 2/3 learners, then collect and respond to real questions — the test is whether real learners understand you, not a multiple-choice score.
- *Peer/maintainer review as assessment* — Track the actual review feedback from an upstream maintainer or a research-reproduction peer group, and how many rounds it takes to reach acceptance.
- *CTF/war-game (optional edge-sharpening)* — Compete in an OS/architecture-flavored CTF category (e.g. pwn or kernel-exploitation style challenges on a picoCTF-style archive) — kept as a skill check, not the primary assessment at this tier.

**Checkpoint project:** Ship one invention-grade artifact end to end, your choice: (a) an FPGA-realized RISC-V core with one custom instruction or accelerator, benchmarked against the stock core on a workload you chose and justified; or (b) a reproduction of a specific published systems/architecture paper's core result, with public code and an honest writeup of where your numbers matched or diverged and why; or (c) an accepted, or seriously reviewed, upstream contribution to a real kernel/RTOS/toolchain that a maintainer would call non-trivial. Pair it with a public writeup or talk aimed at Tier 2/3 learners, and mentor at least one other person — or, if none is available, run a structured self-review a month later as if coaching a new mentee — through one earlier-tier checkpoint.

**Creative teaching methods:**

- Portfolio artifact requirement as the entire tier: an FPGA core, a research-reproduction writeup, an upstream RFC/patch series, or a novel embedded project, each documented publicly
- Feynman teach-back at scale: a public talk or long-form writeup for earlier-tier learners
- 'Invent, then defend': present a key design decision to a skeptical peer or an AI acting as devil's advocate, and revise the design based on the strongest objection raised

**Curated resources:**

- [RISC-V International — Technical Specifications](https://riscv.org/technical/specifications/) — Official, free ISA specifications for the FPGA CPU-design module.
- [riscv-sodor educational cores](https://github.com/ucb-bar/riscv-sodor) — Open-source, teaching-oriented RISC-V cores of increasing complexity, widely used in university FPGA courses.
- [Yosys / nextpnr open FPGA toolchain](https://yosyshq.net/yosys/) — The realistic no-fab path to 'design your own chip', fully open-source and free.
- [arXiv.org — cs.AR (Hardware Architecture) and cs.OS listings](https://arxiv.org/list/cs.AR/recent) — Primary source for current architecture/systems research, paired with Semantic Scholar for literature search.
- [Linux Kernel Documentation — Submitting Patches](https://docs.kernel.org/process/submitting-patches.html) — The official process reference for real upstream kernel contribution.
- [KiCad official documentation](https://www.kicad.org/help/documentation/) — Free, official EDA tool docs for the novel hardware/PCB module.

---
