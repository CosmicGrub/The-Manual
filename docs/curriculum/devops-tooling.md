# DevOps, Tooling & Professional Practice

_Part of [The Manual](../../MASTERFILE.md) — track `devops-tooling`. Tier numbering matches MASTERFILE.md §1._

This track turns a self-learner into someone who can take code from a laptop to a reliable, observable, secure production system on any cloud — and work like a professional engineer while doing it. It runs from "what is a terminal" through Docker, CI/CD, Terraform/IaC, Kubernetes, observability, OWASP-level security, and finally SRE/platform-engineering leadership and open-source maintainership. Two scoping calls worth stating up front: (1) Tier 0 here is deliberately heavier than a generic "orientation" tier in other tracks, because CLI fluency IS this track's home turf, not just a prerequisite; (2) deep application-security/cryptography/exploit-development content is intentionally kept OUT of this track at OWASP-basics depth — that belongs to a dedicated security track elsewhere in The Manual, and this track only goes as deep as a working engineer needs for pipeline/supply-chain/infra security.

**How this feeds AI/prompting literacy:** Every layer of this track is also an AI-literacy layer in disguise. Learning to give an AI a terminal error, a failing CI log, or a Terraform plan and get a *correct, non-hallucinated* fix teaches the exact skill of context-provision that good prompting requires — you learn what information an LLM needs to reason about a system it cannot see, because you had to debug that system yourself first. Observability (structured logs, metrics, traces) is literally the same discipline used to monitor AI systems in production (token usage, latency, cost, hallucination/error rates), so Tier 3's "three pillars" module transfers directly to instrumenting an LLM-backed app. IaC and CI/CD teach reproducibility and versioning — the same mental model behind versioning prompts, eval suites, and model configs. The security tier (OWASP Top 10, supply-chain/SBOM, policy-as-code) maps almost one-to-one onto AI-specific concerns like prompt injection, insecure output handling, and agentic tool-permission scoping (OWASP's own "Top 10 for LLM Applications" is a direct extension of the Top 10 taught here). And the "prompting drills" embedded in every tier — debug this pipeline via AI, get AI to write correct Terraform, use AI as a pair-SRE during a simulated incident — are deliberate reps at collaborating with an AI on real infrastructure, which is precisely the skill of "AI engineering" the learner is trying to build.

**How this transfers across platforms (PC/mobile/web/embedded):** Containers are the great equalizer: a Docker image built and tested once runs identically on a Windows dev laptop (via WSL2/Docker Desktop), a Linux cloud VM, and a Mac — which is why Tier 1's WSL2/Linux-fundamentals work matters even for Windows-first learners. CI/CD pipelines are literally cross-platform build farms: the same GitHub Actions/GitLab CI concepts taught here are what compiles an iOS build on a macOS runner, an Android APK on a Linux runner, and a Windows/macOS/Linux desktop app in one matrix build — the exact plumbing behind Flutter, React Native, and Electron release pipelines taught elsewhere in The Manual. Cloud-platform basics (AWS/GCP/Azure) are the backend for essentially every mobile app, web app, and game the learner will ever ship, so Tier 2-3's deployment and IaC work is not "extra," it IS the backend track for every other platform track. Kubernetes and observability generalize to any platform that needs multiple services talking to each other, whether that's a mobile app's microservices backend or an IoT fleet's control plane. And understanding the Linux/process/networking fundamentals from Tier 0-1 demystifies why mobile and desktop platforms behave the way they do (Android IS Linux; macOS/iOS build on BSD/Darwin foundations), giving the learner one coherent mental model instead of separate, disconnected ones per platform.

---

## Tier 0: Orientation & Literacy

**Goal:** NOTE ON WEIGHT (per MASTERFILE.md §4.5): general terminal/filesystem/git literacy is CS Foundations Tier 0's job and is assumed complete before this tier — this is NOT a from-scratch re-teach. What makes this tier "heavier" than other tracks' light Tier 0s is deliberate and explicit: CLI mastery is this whole track's home turf, so this tier goes straight past basics into ops-specific depth (professional piping/redirection patterns, WSL2 for a real Linux environment, the client-server/cloud mental model, permissions and processes from an operations angle) that no other track teaches at all.

**Modules** (~15h):

- **Terminal Fluency for Ops** — ~4h: assumes cd/ls/pwd/mkdir basics from CS Foundations — goes straight to ops-relevant depth: pipes and redirection chains, man pages and --help as a research habit, keyboard-only workflow, WSL2 setup for Windows users (a real Linux environment, not a toy)
- **Client-server and 'the cloud,' demystified** — ~3h: client vs. server, what a server actually is (a computer, always-on), IaaS/PaaS/SaaS in plain language, what 'deploying' means
- **Files, Permissions & Processes, the Ops Angle** — ~4h: file permissions in a multi-user/server context (not just "your own laptop"), what a running process is from an operations perspective, opening/using a free-tier cloud shell for the first time
- **Environment Setup for Ops Work** — ~4h: package managers beyond a single dev machine (apt/homebrew/winget at ops scale), installing package managers, verifying a reproducible setup a teammate could follow

**Quizzes / assessment:**

- *Spaced-repetition flashcard deck* — 20-30 cards on core CLI commands (ls, cd, cat, grep, chmod, ps) and vocabulary (process, PATH, shell, daemon) reviewed daily until automatic.
- *Micro-quiz (auto-gradable)* — 5-question 'predict the terminal output' quiz after each terminal session — given a command sequence, predict what prints before running it.

**Checkpoint project:** Terminal Scavenger Hunt + Environment Proof: with zero GUI file browser allowed, complete a 15-task scavenger hunt entirely from the terminal (create a nested directory structure, find a specific file by content with grep, change permissions to a target mode, redirect output to a log file, etc.), then submit a screen recording or transcript plus a working dev environment (editor, git installed and configured, a cloud free-tier account created) as proof of setup.

**Creative teaching methods:**

- CLI-only scavenger/treasure hunt with a scored checklist of filesystem tasks
- Prompting drill: before running any unfamiliar command, ask an AI to explain exactly what it will do and what could go wrong, then verify the AI's explanation against the man page
- Feynman teach-back: explain 'what happens when you type ls -la and press Enter' to a rubber duck or recorded video, tracing OS → shell → process → output

**Curated resources:**

- [The Missing Semester of Your CS Education (MIT)](https://missing.csail.mit.edu/) — Lectures 1 (shell) and 2 (shell tools, scripting) are the best 'zero to functional terminal user' materials that exist, free and official from MIT.
- [CS50x — Introduction to Computer Science (Harvard)](https://cs50.harvard.edu/x/) — Week 0 and the CS50 shell orientation build correct computational-thinking foundations before any real syntax.
- [Khan Academy — Computers and the Internet (Computing course)](https://www.khanacademy.org/computing/computers-and-internet) — Good plain-language grounding in what a computer, OS, and network actually are.
- freeCodeCamp — Command Line for Beginners — Free hands-on terminal-navigation practice, good for immediate repetition after Missing Semester.
- [Microsoft Learn — WSL documentation](https://learn.microsoft.com/windows/wsl/) — Official, free, and the correct way for Windows-based learners to get a real Linux environment before touching cloud VMs.

---

## Tier 1: Foundations

**Goal:** Build real, guided competence in git/GitHub workflows, bash scripting, core Linux administration, basic networking, and the first hands-on contact with containers and cloud VMs — tightly scaffolded, with a lot of 'here is exactly why this command exists.'

**Modules** (~48h):

- **Git fundamentals** — ~8h: commits, branches, merges, remotes and .gitignore, resolving merge conflicts, git log/diff/stash
- **GitHub collaboration workflows** — ~5h: forks and pull requests, issues and project boards, branch protection basics, first real open-source PR
- **Bash scripting fundamentals** — ~8h: variables and quoting, conditionals and loops, functions and exit codes, reading arguments, basic error handling with set -e
- **Linux fundamentals for developers** — ~10h: filesystem hierarchy standard, permissions (chmod/chown, octal notation), processes and signals (ps, kill, jobs), package management (apt/yum), systemd basics: starting/stopping a service
- **Networking basics for developers** — ~6h: (applied, ops-focused angle only — Hardware & Computer Systems Tier 3 is the canonical deep networking module, see MASTERFILE.md §4.5) IP addresses, DNS, ports, HTTP request/response basics, curl and wget, localhost vs. remote, SSH fundamentals
- **First contact with containers** — ~6h: VM vs. container distinction, installing Docker, docker run / ps / logs / exec, images vs. containers
- **First contact with the cloud** — ~5h: provisioning a free-tier VM (AWS EC2/GCP Compute Engine/Azure VM), SSH-ing into a real remote machine, shutting it down responsibly (cost awareness from day one)

**Quizzes / assessment:**

- *Bug hunt (intentionally broken bash scripts)* — Given 5 short scripts each with one deliberate bug (unquoted variable, off-by-one loop, missing exit code check), find and fix each one and explain the failure mode.
- *Spaced-repetition flashcard deck* — Git command deck (checkout vs. switch, reset vs. revert, rebase vs. merge) and a Linux-permissions octal-notation deck (chmod 755 vs 644, etc.).
- *Micro-quiz* — 10-question quiz on HTTP status codes and what each layer of a curl request/response actually represents.

**Checkpoint project:** Provision a free-tier cloud VM from scratch, SSH in, and write and deploy a bash automation script that performs a real sysadmin task (e.g., rotates/compresses logs older than N days, or backs up a directory to a timestamped archive) running on a cron schedule. Push the project to GitHub with a real README, then open and get merged one real pull request against a public open-source repo (even a documentation fix) to practice the actual PR workflow.

**Creative teaching methods:**

- Bug hunt / code-review kata on broken bash scripts, done in pairs or against an AI first, then against a human check
- Prompting drill: ask an AI to write a one-liner (regex, find/sed/awk command) to solve a real problem, then independently verify it actually does what was asked before trusting it
- Feynman teach-back: record yourself explaining the difference between git merge and git rebase to someone who has never used git

**Curated resources:**

- [The Missing Semester of Your CS Education (MIT) — Version Control and Command-line Environment lectures](https://missing.csail.mit.edu/) — Direct continuation from Tier 0 into real git and shell-environment mastery.
- [The Odin Project — Foundations course, Git section](https://www.theodinproject.com/) — Free, full, project-based git/GitHub curriculum with real practice repos.
- [Exercism — Bash track](https://exercism.org/tracks/bash) — Mentored bash exercises with real human feedback on scripts — rare and valuable for a scripting language.
- [Introduction to Linux (LFS101x, The Linux Foundation)](https://www.classcentral.com/course/edx-introduction-to-linux-2) — Free, official Linux Foundation course covering filesystem, permissions, and processes — matches this tier's Linux module directly.
- [AWS Skill Builder — AWS Cloud Practitioner Essentials](https://skillbuilder.aws/) — Free, official AWS training on cloud fundamentals (IaaS/PaaS/SaaS, shared responsibility model, regions/AZs).
- [Advent of Code](https://adventofcode.com/) — Language-agnostic daily coding puzzles — excellent recurring bash/Python scripting practice to build fluency alongside the formal modules.

---

## Tier 2: Builder

**Goal:** Move from guided exercises to independently building and shipping small real systems: containerize an app, stand up a CI/CD pipeline, provision infrastructure with code, and deploy to a real cloud platform — without hand-holding.

**Modules** (~52h):

- **Dockerizing a real application** — ~10h: writing a correct Dockerfile, multi-stage builds for smaller images, docker-compose for multi-container local dev, volumes and networking between containers
- **Container registries and image hygiene** — ~4h: pushing to Docker Hub / GitHub Container Registry, tagging strategy (latest vs. semver vs. git SHA), image size and layer-caching optimization
- **CI/CD fundamentals with GitHub Actions** — ~10h: (this is the canonical CI/CD module for The Manual — see MASTERFILE.md §4.5; Software Engineering Tier 3 only covers what CI is, just enough to work on a team, and points here to actually build a pipeline) workflow YAML syntax, build/test/deploy stages, caching dependencies, secrets in CI, triggering on PR vs. push vs. tag
- **Deploying a container to the cloud** — ~8h: choosing a target (Cloud Run / ECS Fargate / Azure Container Apps), environment variables and config at deploy time, rolling back a bad deploy
- **Infrastructure as Code, first pass (Terraform)** — ~10h: providers and resources, terraform plan/apply/destroy, state file basics, variables and outputs
- **Basic observability** — ~6h: structured (JSON) logging vs. print debugging, shipping logs to CloudWatch/Cloud Logging, a real health-check endpoint
- **Secrets and config management basics** — ~4h: env vars vs. a real secrets manager, why committing .env files is a security incident, 12-factor app config principles

**Quizzes / assessment:**

- *Bug hunt (broken Dockerfiles)* — Given 4 Dockerfiles that build but produce a broken or bloated image (wrong base image, missing COPY, no .dockerignore, secrets baked into a layer), diagnose and fix each.
- *Micro-quiz* — 10-question quiz on core Terraform HCL syntax: resource blocks, variable interpolation, and what terraform plan output actually means before you apply it.
- *CTF-style pipeline debugging challenge* — Given a GitHub Actions run that failed at a specific step with real (redacted) logs, identify the root cause and propose the exact YAML fix — timed, scored on speed and correctness.

**Checkpoint project:** Take a small full-stack app (from another track, or a simple API+frontend you build for this purpose), containerize it with a multi-stage Dockerfile, provision its cloud infrastructure with Terraform, and wire up a GitHub Actions pipeline that builds, tests, and deploys it automatically to Cloud Run/ECS/Azure Container Apps on every push to main, including a working health-check endpoint and structured logs visible in the cloud provider's log viewer. This becomes a portfolio artifact.

**Creative teaching methods:**

- Build-then-break: once your CI/CD pipeline is green, deliberately introduce a failing test and a broken Dockerfile in separate commits to confirm the pipeline actually catches both — a pipeline that can't fail loudly is a pipeline you can't trust
- Prompting drill: paste a real (sanitized) failing GitHub Actions log to an AI and get it to correctly diagnose root cause — then verify its diagnosis by reproducing the fix locally before trusting it
- Portfolio artifact requirement: the checkpoint project itself, published with a README that documents the architecture and includes an architecture diagram

**Curated resources:**

- [Docker official docs — Get Started](https://docs.docker.com/get-started/) — The canonical, currently-maintained Docker walkthrough; use this over any third-party tutorial that might be stale.
- [HashiCorp Developer — Terraform: Get Started tutorials](https://developer.hashicorp.com/terraform/tutorials) — Official, free, hands-on Terraform tutorials directly from the vendor.
- [GitHub Skills — Continuous Integration course](https://skills.github.com/) — Official, free, interactive GitHub Actions course that runs inside real GitHub repos you own.
- [Google Cloud Skills Boost — Cloud Run quickstart labs](https://www.cloudskillsboost.google/) — Free/low-cost official Google Cloud hands-on labs; good for the deployment module regardless of which cloud you standardize on.
- [The Odin Project — Deployment lessons](https://www.theodinproject.com/) — Free guided deployment walkthroughs that pair well with the checkpoint project.

---

## Tier 3: Practitioner

**Goal:** Operate like a working engineer on a real team: multi-environment CI/CD, a working Kubernetes mental model, the three pillars of observability, OWASP-level security awareness, and the collaboration norms (code review, agile ritual, design docs) that make a team function.

**Modules** (~72h):

- **Advanced CI/CD patterns** — ~10h: multi-environment pipelines (dev/staging/prod), blue-green and canary deploys, artifact versioning and semantic versioning, pipeline-as-code review practices
- **Kubernetes fundamentals** — ~16h: pods, deployments, services, ingress, ConfigMaps and Secrets, kubectl workflows, readiness/liveness probes
- **Advanced Infrastructure as Code** — ~10h: Terraform modules and reuse, remote state and backends, workspaces for multi-environment infra, Pulumi/CDK as an alternative IaC paradigm (code-first vs. HCL)
- **Observability deep dive** — ~12h: the three pillars: metrics, logs, traces, Prometheus + Grafana dashboards, OpenTelemetry basics, writing a useful alert (not a noisy one)
- **Security fundamentals for engineers** — ~10h: OWASP Top 10 walkthrough with real examples, dependency scanning (Dependabot/Renovate), container image scanning (Trivy), secrets scanning in CI
- **Agile and collaboration norms** — ~6h: Scrum vs. Kanban in practice, writing a reviewable pull request, code review etiquette (giving and receiving), writing a lightweight RFC/design doc
- **Cloud architecture patterns** — ~8h: load balancing and auto-scaling, basic multi-region thinking, cost-aware architecture decisions

**Quizzes / assessment:**

- *Code-review kata* — Given 3 real-looking pull requests with planted issues (an N+1 query pattern, a missing input validation, an unreviewable 2000-line diff), write the review comments you'd actually leave, then compare against a model answer.
- *CTF-style container security challenge* — A small, deliberately vulnerable containerized app must be found and exploited (e.g., an exposed secret, an outdated base image with a known CVE), then patched and re-scanned clean with Trivy.
- *Micro-quiz* — 10-question quiz mapping real code snippets to the correct OWASP Top 10 category they violate.

**Checkpoint project:** Deploy a multi-service application to a Kubernetes cluster (minikube/kind locally, or a managed free tier), instrument it with Prometheus metrics and a Grafana dashboard, and build a staged CI/CD pipeline (dev → staging → prod) that runs automated dependency, image, and secrets scans on every PR. Write a one-page RFC proposing the architecture before building it, and conduct (and document) a real code review on a peer's PR or your own past commit history, applying the review-etiquette module.

**Creative teaching methods:**

- Code-review kata using intentionally broken/risky PRs, scored against a rubric for what a reviewer should have caught
- CTF-style container security challenge against a deliberately vulnerable target app
- Prompting drill: have an AI review your Terraform/Kubernetes manifests for security misconfigurations, then independently verify each flagged issue against the OWASP Top 10 or CIS benchmarks before accepting or rejecting the AI's findings
- Feynman teach-back: explain Kubernetes service discovery and networking to someone who only knows Docker, using a whiteboard/diagram

**Curated resources:**

- [Kubernetes official docs — Kubernetes Basics interactive tutorial](https://kubernetes.io/docs/tutorials/kubernetes-basics/) — The canonical, free, official starting point; runs in-browser, no local setup required to start.
- [OWASP Top Ten (official project)](https://owasp.org/www-project-top-ten/) — Primary source, not a summary — read the actual project pages for each category.
- [Site Reliability Engineering (Google, free online book)](https://sre.google/sre-book/table-of-contents/) — Chapters on monitoring distributed systems and postmortem culture are directly relevant to this tier's observability module.
- [Introduction to Kubernetes (LFS158x, The Linux Foundation)](https://www.classcentral.com/course/edx-introduction-to-kubernetes-8544) — Free, official Linux Foundation course; pairs with the hands-on kubernetes.io tutorial for a fuller mental model.
- [Prometheus official docs — Getting Started](https://prometheus.io/docs/introduction/first_steps/) — Official, minimal, and current — better than most third-party Prometheus tutorials.
- [Grafana official tutorials](https://grafana.com/tutorials/) — Free official walkthroughs for building your first real dashboards on top of Prometheus data.

---

## Tier 4: Advanced / Specialist

**Goal:** Go deep on one or more specializations that senior/staff-level DevOps and platform engineers actually own: SRE practice, platform engineering and GitOps, advanced Kubernetes, supply-chain/policy-as-code security, and cost/performance engineering at scale — plus a first real open-source contribution.

**Modules** (~74h):

- **Site Reliability Engineering practice** — ~10h: SLIs, SLOs, and error budgets, incident response and on-call rotations, blameless postmortem culture, toil reduction
- **Platform engineering and GitOps** — ~12h: internal developer platforms (what/why), GitOps with ArgoCD or Flux, self-service infrastructure patterns
- **Advanced Kubernetes** — ~14h: Custom Resource Definitions and Operators, service mesh basics (Istio/Linkerd), multi-cluster management concepts
- **Advanced security and compliance** — ~12h: threat modeling for infrastructure, supply-chain security: SBOM and SLSA levels, policy-as-code with Open Policy Agent/Gatekeeper, zero-trust networking concepts
- **Performance and cost engineering at scale** — ~8h: infrastructure profiling and capacity planning, FinOps basics: attributing and reducing cloud spend, right-sizing and autoscaling tuning
- **Contributing to open-source infrastructure tooling** — ~10h: finding a project and understanding its contribution guide, reading an unfamiliar large codebase (a Terraform provider, a Kubernetes ecosystem tool), the RFC/design-review process upstream projects use
- **Multi-cloud and hybrid architecture design** — ~8h: when multi-cloud is (and isn't) justified, abstraction costs of cloud-agnostic tooling, hybrid on-prem/cloud patterns

**Quizzes / assessment:**

- *Incident-response tabletop simulation* — Given a fabricated production outage (logs, metrics graphs, a Slack thread transcript), diagnose root cause under a time limit and draft the incident timeline and mitigation, then compare against a model postmortem.
- *War-game / CTF-style challenge* — Work through Kubernetes Goat scenarios (an intentionally vulnerable-by-design Kubernetes cluster) to find and remediate real misconfiguration classes: exposed dashboards, over-privileged service accounts, secrets in env vars.
- *Spaced-repetition flashcard deck* — SRE and platform-engineering terminology deck: SLI vs. SLO vs. SLA, error budget burn rate, toil, blast radius, GitOps reconciliation loop.

**Checkpoint project:** Build a GitOps-managed mini-platform: an ArgoCD instance managing a Kubernetes cluster's application deployments, with OPA/Gatekeeper policy-as-code guardrails enforced (e.g., 'no container may run as root'), SBOMs generated for your images with supply-chain checks gating CI, and a defined SLO with real alerting on error-budget burn. Separately, submit one genuine, seriously-attempted contribution (a PR, not just an issue) to an open-source DevOps/infrastructure tool, following its actual contribution process end to end.

**Creative teaching methods:**

- Build-then-break at scale: run a controlled chaos-engineering experiment (e.g., with Chaos Mesh's free tier) against your own service and observe the real impact on your defined SLOs — then fix what breaks
- War-game/CTF-style challenge against Kubernetes Goat, ethically 'attacking' your own deliberately vulnerable cluster
- Prompting drill: use an AI as a simulated pair-SRE during a timed mock incident — you must supply it the right context (logs, dashboards, recent deploys) and correctly judge when to trust vs. override its suggested fix
- Portfolio artifact requirement: the GitOps platform repo plus the accepted (or seriously reviewed) upstream PR, both linked from your portfolio

**Curated resources:**

- [Google SRE Workbook (free online)](https://sre.google/workbook/table-of-contents/) — The practical companion to the SRE Book — SLO worksheets and real postmortem examples.
- [Kubernetes Goat](https://github.com/madhuakula/kubernetes-goat) — Open-source, actively maintained, deliberately vulnerable Kubernetes environment built specifically for this kind of ethical war-gaming.
- [OWASP Software Component Verification Standard (SCVS)](https://owasp.org/www-project-software-component-verification-standard/) — Official OWASP project for supply-chain/SBOM verification maturity — directly supports the advanced-security module.
- [SLSA framework (Supply-chain Levels for Software Artifacts)](https://slsa.dev/) — The industry-standard, vendor-neutral framework for supply-chain security levels; official docs, free.
- [Open Policy Agent — official documentation](https://www.openpolicyagent.org/docs/latest/) — Primary source for policy-as-code, used directly in the checkpoint project.
- [Apache Software Foundation — 'How It Works'](https://www.apache.org/foundation/how-it-works.html) — Real, official documentation of how a large open-source foundation's contribution and governance model actually functions, useful context before your first real upstream PR.

---

## Tier 5: Expert / Innovator

**Goal:** Operate at the level of someone who invents infrastructure rather than just consuming it: understand the distributed-systems theory underneath the tools, design and ship a novel piece of tooling, and take on maintainer/mentor responsibility. SCOPING NOTE: this tier is deliberately 'light' on formal academic-paper output compared to, say, an AI/ML research track — DevOps' version of 'research-adjacent' is systems papers, postmortems, and RFCs rather than a steady stream of new arxiv preprints, so the reading list here leans on classic systems papers and real-world case studies rather than current literature.

**Modules** (~56h):

- **Distributed systems theory for infrastructure engineers** — ~10h: consensus algorithms (Raft/Paxos) conceptually and by implementation, the CAP theorem and what it actually constrains, consistency models (strong, eventual, causal)
- **Designing novel developer tooling** — ~14h: building a CLI tool from scratch, writing a minimal Kubernetes operator or Terraform provider, API design for tools other engineers will depend on
- **Advanced observability and AIOps** — ~10h: anomaly detection over telemetry data, using LLMs for root-cause-analysis assistance, the limits of automated incident diagnosis
- **Large-scale system design case studies** — ~8h: reading real public postmortems (major cloud/CDN outages), reverse-engineering the architecture decisions behind a well-known outage, what 'blast radius' looks like at planet scale
- **Becoming a maintainer** — ~8h: open-source governance models, authoring and defending an RFC, mentoring contributors through review
- **Teaching and technical writing** — ~6h: writing a tutorial or course module that a real beginner can follow, presenting technical work publicly, iterating on teaching material from learner feedback

**Quizzes / assessment:**

- *Spaced-repetition flashcard deck* — Distributed-systems terminology deck: linearizability, quorum, split-brain, leader election, idempotency — reviewed until instant recall.
- *Peer/rubric-graded review (replaces traditional quizzes at this tier)* — Real contributions (an RFC, a shipped tool, a teaching artifact) are assessed against a rubric by peers or a mentor rather than auto-graded, since the point of this tier is judged, not scored, work.

**Checkpoint project:** Design, build, and open-source an original piece of infrastructure tooling that solves a real, currently-unsolved-well problem (e.g., a Kubernetes operator, a Terraform provider for an underserved API, or a novel CI/CD plugin). Write a full RFC/design doc for it before building, gather real feedback from at least a few external users, and separately mentor at least one other learner (from Tier 2 or 3) through one of their checkpoint projects — then write up the mentoring experience as a public teaching artifact (blog post or course module).

**Creative teaching methods:**

- Teach-it-back at scale: publish a real tutorial or course module and have actual learners use it, then revise based on where they got stuck
- Contribute-upstream-and-defend: submit a substantive RFC to an open-source project and defend it through real maintainer pushback in review — the review process itself is the checkpoint, not a synthetic exercise
- Prompting drill (frontier-facing): design an evaluation to test whether an AI agent can autonomously diagnose and fix a simulated production incident end-to-end — this doubles as genuine AI-engineering practice, since building good evals for agentic systems is itself a research-adjacent skill

**Curated resources:**

- [MIT 6.5840 (Distributed Systems) — official course site](https://pdos.csail.mit.edu/6.824/) — MIT's own public course site (successor to 6.824); the labs build a real Raft implementation from scratch and are widely regarded as the best free distributed-systems coursework available.
- [Raft consensus algorithm — official paper and site](https://raft.github.io/) — 'In Search of an Understandable Consensus Algorithm' by Ongaro & Ousterhout — the primary source behind most modern coordination systems (etcd, Kubernetes' own control plane).
- [Amazon Dynamo paper (SOSP 2007)](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf) — Classic, freely available systems paper on eventual consistency and quorum-based replication, hosted by its own author (Werner Vogels) — directly relevant to the consistency-models module.
- [Google SRE Book — postmortem and incident chapters](https://sre.google/sre-book/table-of-contents/) — Revisit chapters 15-16 (postmortem culture, incident management) at this tier for the maintainer/leadership angle rather than the practitioner angle.
- [AWS official post-event summaries](https://aws.amazon.com/premiumsupport/technology/pes/) — Real, official root-cause write-ups AWS publishes after major regional outages — ideal primary-source material for the system-design case-study module.
- [Apache Software Foundation — 'How It Works'](https://www.apache.org/foundation/how-it-works.html) — Concrete, official reference for governance models when designing how your own open-source project will be run.

---
