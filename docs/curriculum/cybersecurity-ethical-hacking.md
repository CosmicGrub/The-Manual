# Cybersecurity & Ethical Hacking

_Part of [The Manual](../../MASTERFILE.md) — track `cybersecurity-ethical-hacking`. Tier numbering matches MASTERFILE.md §1._

This track closes two real gaps in The Manual at once: it teaches the learner to defend their own accounts and data (personal digital security — the thing every other track assumes but none teaches), and it builds a genuine white-hat offensive/defensive security discipline on top of that foundation. It runs bottom-up from legal/ethical framing and personal OpSec (Tier 0), through OWASP Top 10 web app security and networking/Linux fundamentals (Tier 1), independent CTF-platform practice and Metasploit/forensics basics (Tier 2), full pentest methodology and an Active Directory home lab (Tier 3), a Tier 4 choice between Red Team, Blue Team, and Application Security specialization paths plus real bug-bounty basics, to Tier 5 research-level work — contributing to real security tooling, competing in real CTFs, and responsibly disclosing findings. Every tier, every exercise, is confined to systems the learner owns, an isolated VM lab, or platforms that explicitly grant permission to be attacked for learning (OWASP Juice Shop/DVWA/WebGoat, PortSwigger Web Security Academy, TryHackMe, HackTheBox, picoCTF, OverTheWire, VulnHub) — never a real system without explicit authorization. Blue-team/defensive work gets real, growing weight starting with Tier 1's hands-on remediation component, becomes its own dedicated module in Tier 3, and reaches full architectural parity with offense at the Tier 4 Blue Team path — it is never a bolted-on afterthought, even though Tiers 1-2 are necessarily offense-heavy while the learner is still building exploitation fundamentals to defend against. ~516 estimated hours across all 6 tiers (Tier 4 hours assume one specialization path).

**How this feeds AI/prompting literacy:** This track is where "AI literacy" and "security literacy" turn out to be the same muscle. Prompt injection is taught explicitly (Tier 1, alongside the OWASP Top 10) as a genuine vulnerability class with the same shape as SQL injection or XSS — untrusted input controlling execution — which is exactly why it belongs next to them, not in a separate "AI safety" silo. Tier 0/1's habit of verifying an AI's claims against a primary source (a datasheet, an RFC, official docs) becomes, here, the difference between safely using an AI to triage a vulnerability report or draft a Python fuzzing script and blindly running an AI-hallucinated "exploit" that does nothing or (worse) something unintended — every prompting drill in this track requires manually verifying the AI's output in the isolated lab before trusting it. Tier 4's Red/Blue paths explicitly cover AI-assisted red teaming (using an LLM to help generate test payloads or triage scan output, always human-verified) and AI-assisted blue teaming (using an LLM to help summarize SIEM alerts or draft an IR timeline, again human-verified). Most directly: this track is the reason "why does an LLM agent need to run in a sandbox" stops being a slogan — the same host-only-VM isolation principle the learner sets up for their own hacking lab in Tier 0 is the identical architectural pattern (least privilege, network isolation, no ambient authority) that makes an autonomous LLM agent with tool access safe to run at all.

**How this transfers across platforms (PC/mobile/web/embedded):** Security is the one discipline that is genuinely identical underneath every platform's UI. The OWASP Top 10 web app vulnerabilities taught hands-on in Tier 1 apply to any platform's backend the moment it exposes an API — a native iOS app, an Android app, an Electron desktop app, and a React web app are all, from the server's point of view, just another HTTP client, so the injection/auth/XSS classes taught here transfer unmodified. Tier 3's dedicated mobile app security module (OWASP Mobile Top 10, static/dynamic analysis of a deliberately vulnerable Android app) is the platform-specific complement. Tier 1-3's networking-security material (TCP/IP, TLS, DNS) is the transport layer every platform runs on, full stop. Tier 4's Application Security path (threat modeling, secure SDLC, SAST/DAST) is the "secure-by-design" discipline for anything shipped, on any platform, by any team. This is also where The Manual's cross-track de-duplication closes a loop explicitly: DevOps & Tooling deliberately keeps only pipeline/supply-chain/infra security depth and points here for real application-security, exploit development, and penetration-testing depth — this track is that canonical owner.

---

## Tier 0: Orientation & Literacy

**Goal:** Before any technical content: unauthorized access to a computer system is a crime under laws like the U.S. Computer Fraud and Abuse Act (CFAA) and equivalents worldwide (UK's Computer Misuse Act, etc.) — intent does not matter, only authorization does, and 'I didn't mean harm' is not a legal defense. Every exercise in this track, from here through Tier 5, is confined to systems the learner owns, an isolated lab they build themselves (VMs on their own machine via VirtualBox/VMware with host-only networking), or platforms that explicitly grant permission (a named legal practice platform like OWASP Juice Shop or a real bug-bounty program's defined scope) — never a real system without explicit authorization. With that ground rule set, this tier's actual content starts with the learner's own digital self-defense: password managers, 2FA, and phishing recognition. This closes a real gap (The Manual otherwise only teaches securing systems for others, never the learner's own accounts) and it doubles as the mental model for everything that follows — understanding how accounts actually get compromised is the first lesson in how to test for it safely. By the end of this tier the learner has a hardened personal security posture and a working isolated hacking lab, and has not yet touched a single unauthorized system.

**Modules** (~20h):

- **Law, Ethics & the Hacker Mindset** — ~5h: CFAA and international equivalents (Computer Misuse Act, etc.), authorization vs. unauthorized access — why intent is irrelevant, white hat vs. grey hat vs. black hat, responsible/coordinated disclosure principles, reading and respecting a practice platform's terms of service and a bug bounty program's defined scope
- **Personal Digital Security & Privacy Fundamentals** — ~6h: password managers (Bitwarden) and passphrase hygiene, 2FA/MFA: TOTP apps vs. SMS vs. hardware keys (YubiKey), phishing and social-engineering recognition, safe browsing habits and HTTPS basics, breach-notification services (Have I Been Pwned), basic personal OpSec and privacy-settings audits
- **How the Internet Actually Works, Security Edition** — ~5h: client-server model, HTTP vs. HTTPS and what TLS actually protects, cookies and sessions, DNS resolution basics, ports and common protocols at a glance
- **Setting Up Your Legal Hacking Lab** — ~4h: installing VirtualBox or VMware, host-only networking — why it matters and how to configure it, installing Kali Linux as a guest VM, standing up OWASP Juice Shop and DVWA locally, why this isolation is the non-negotiable foundation of everything after this module

**Quizzes / assessment:**

- *Micro-quiz (SRS-eligible)* — Scenario-based 'is this authorized?' questions (a friend's Wi-Fi, a company's public site, a CTF platform, an open bug bounty program) — auto-graded, missed items feed spaced repetition.
- *Spaced-repetition flashcards* — Terminology deck: CFAA, responsible disclosure, phishing, TOTP, host-only networking, white/grey/black hat — definition-recall on an SM-2 schedule.
- *Explain it back (Feynman teach-back)* — Record a 2-minute explanation of why 2FA matters, aimed at a non-technical relative, self-graded against a 'no jargon, one concrete example' rubric.

**Checkpoint project:** Two parts, submitted together. (1) A personal security audit: migrate your real accounts to a password manager, enable 2FA on every account that offers it, run a Have I Been Pwned check on your own emails, and write up what you found and fixed. (2) Stand up your isolated lab — a Kali Linux VM on host-only networking with OWASP Juice Shop and DVWA running locally — with screenshots proving isolation (no route to your host network) and a one-page 'rules of engagement' document you write for yourself, stating in your own words what you will and will not attack going forward.

**Creative teaching methods:**

- Feynman teach-back recorded explanation of 2FA/phishing for a non-technical audience
- Spaced-repetition flashcard deck for legal/ethical and security terminology
- Bug hunt: 'spot the phish' — given a set of real, anonymized phishing email screenshots, identify every red flag

**Curated resources:**

- [OWASP Top Ten Project](https://owasp.org/www-project-top-ten/) — The project this entire track orbits — free, community-maintained, canonical.
- [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) — A deliberately vulnerable web app built and hosted specifically to be legally attacked for learning.
- [EFF — Computer Fraud and Abuse Act overview](https://www.eff.org/issues/cfaa) — Free, plain-language explainer of the law that governs every exercise in this track.
- [Have I Been Pwned](https://haveibeenpwned.com/) — Free breach-notification lookup used directly in the checkpoint project.
- [TryHackMe — Pre Security path](https://tryhackme.com/path/outline/presecurity) — Free-tier, absolute-beginner-friendly path covering networking and web basics from a security angle.
- [Kali Linux official documentation](https://www.kali.org/docs/) — Official docs for installing and configuring the lab VM this tier builds.

---

## Tier 1: Foundations

**Goal:** Ground rule stands unchanged from Tier 0: every exploit in this tier is run against the learner's own local Juice Shop/DVWA/WebGoat instances or PortSwigger's hosted practice labs — never anything else. With that settled, by the end of Tier 1 the learner can navigate Kali Linux and the command line fluently for security work, understands TCP/IP and can run and read an nmap scan against their own lab VMs, has walked through every category of the OWASP Top 10 hands-on with guided exercises AND implemented real fixes for several of them (this tier treats remediation as a coded, verified skill from day one, not something deferred to a later "defensive" tier), and has a working conceptual grasp of hashing, encryption, and TLS. Heavy scaffolding throughout — every vulnerability class is introduced with a guided walkthrough before any independent attempt.

**Modules** (~73h):

- **Ground Rules Recap & Lab Practice** — ~4h: re-confirming host-only isolation before any scanning begins, reviewing your Tier 0 rules-of-engagement document, verifying Juice Shop/DVWA are reachable only from the lab network
- **Linux & Kali Fundamentals for Security** — ~12h: command-line fluency for security tooling, the Kali toolset landscape (what's installed and why), basic bash scripting for repetitive security tasks, file permissions and why they matter for privilege escalation later
- **Networking for Security I** — ~14h: TCP/IP recap through a security lens, ports, services, and banners, nmap scanning against your own lab VMs (never anything else), Wireshark basics: capturing and reading your own lab traffic
- **OWASP Top 10 Guided Tour: Exploit *and* Fix** — ~23h: injection (SQLi, command injection), broken authentication and session management, cross-site scripting (XSS), broken access control, security misconfiguration, guided challenges in Juice Shop, DVWA, and WebGoat for each category — and for each of the first three categories, forking DVWA's source, actually patching the vulnerability (parameterized queries, output encoding, a real auth check), and re-running the same exploit to confirm it now fails; remediation is not optional narration here, it's a coded, verified fix
- **Cryptography Fundamentals** — ~12h: hashing vs. encryption vs. encoding, symmetric vs. asymmetric encryption at a conceptual level, the TLS handshake and what HTTPS actually guarantees, common real-world crypto mistakes (weak hashing for passwords, ECB mode, etc.)
- **Intro to Web Proxies** — ~8h: Burp Suite Community Edition setup, intercepting and modifying your own lab requests, PortSwigger Web Security Academy's first apprentice-level labs

**Quizzes / assessment:**

- *Micro-quiz (SRS-eligible)* — OWASP Top 10 category identification and hashing-vs-encryption drills, auto-graded.
- *Bug hunt / code-review kata* — Given a small vulnerable Flask/Node snippet, identify which OWASP Top 10 category it falls under and why, before touching a proxy.
- *CTF-style challenge* — picoCTF beginner-track challenges (real platform, real flags) as a literal, low-stakes CTF introduction.
- *Prompting drill* — Ask an AI to explain a specific OWASP Top 10 vulnerability class, then verify its explanation line-by-line against the official OWASP Top 10 project page and flag anything it got wrong or oversimplified.

**Checkpoint project:** Complete a guided walkthrough of OWASP Juice Shop capturing at least 10 challenges spanning at least 5 different OWASP Top 10 categories. Produce a written report, formatted like a mini pentest report, documenting for each: the vulnerability, exactly how you exploited it in the lab, and the correct fix. Then, in your own DVWA fork, actually implement and commit the fix for at least 3 of those categories (not just describe it) and re-run your original exploit against the patched version to prove, with evidence in the report, that it now fails.

**Creative teaching methods:**

- CTF-style challenges on picoCTF's real beginner track
- Build-then-break: write a tiny intentionally-vulnerable Flask app yourself, then exploit your own SQL injection in it
- Prompting drill verified against OWASP's own documentation

**Curated resources:**

- [OWASP Top Ten Project](https://owasp.org/www-project-top-ten/) — The spine of this tier's guided tour.
- [DVWA (Damn Vulnerable Web Application)](https://github.com/digininja/DVWA) — Free, deliberately vulnerable PHP/MySQL app for local, isolated practice.
- [OWASP WebGoat](https://owasp.org/www-project-webgoat/) — Free, guided, lesson-structured vulnerable app — pairs well with Juice Shop's more open-ended challenges.
- [PortSwigger Web Security Academy](https://portswigger.net/web-security) — Free, hosted, legally-sanctioned labs for every OWASP Top 10 category, from apprentice to expert.
- [picoCTF](https://picoctf.org/) — Free, perpetually-available CTF platform built by Carnegie Mellon specifically for security education.
- [Wireshark User's Guide](https://www.wireshark.org/docs/wsug_html_chunked/) — Official documentation for the packet-capture work in this tier.

---

## Tier 2: Builder

**Goal:** Same ground rule, now applied independently: every target in this tier is either your own VM, a named legal practice platform (TryHackMe, HackTheBox, VulnHub), or a hosted academy lab — the learner picks targets and works through them with no guided hand-holding. By the end of Tier 2 the learner can independently run a real web app pentest against a defined lab target using a documented methodology, has completed a real set of TryHackMe/HackTheBox rooms and machines solo, can use Metasploit against an intentionally vulnerable VM (Metasploitable2) in an isolated network, can write small Python security tools, and has a working grasp of basic digital forensics.

**Modules** (~75h):

- **Web App Pentesting Methodology** — ~20h: reconnaissance and mapping an application's attack surface, PortSwigger Academy intermediate-level labs, a repeatable manual testing workflow, deeper Burp Suite usage (Repeater, Intruder on lab targets)
- **Independent TryHackMe / HackTheBox Practice** — ~18h: choosing appropriately-scoped beginner-to-intermediate rooms and machines, working a box methodically without walkthroughs first, writing your own technical write-ups afterward, respecting each platform's write-up policy
- **Scripting for Security** — ~12h: Python for security automation, writing a simple port scanner or fuzzer against your own lab targets only, working with public, legitimate security APIs (e.g. Have I Been Pwned's API, VirusTotal's public API)
- **Intro to Exploitation & Metasploit** — ~15h: the Metasploit Framework's structure: exploits, payloads, auxiliary modules, compromising Metasploitable2 in an isolated host-only network, the difference between running an exploit and understanding why it works
- **Digital Forensics Fundamentals** — ~10h: filesystem forensics basics, Autopsy for disk image analysis, Volatility for memory forensics, log analysis fundamentals

**Quizzes / assessment:**

- *CTF-style challenge* — Completion of assigned TryHackMe rooms and HackTheBox easy machines functions as the literal, real assessment for this tier — not a metaphor.
- *Bug hunt / code-review kata* — Given a vulnerable script (yours or provided), find and explain the exploitable flaw through code review, then confirm it dynamically in the lab.
- *Prompting drill* — Ask an AI to help write a Python port scanner, then manually verify every line for correctness and for accidental scope creep (e.g. does it default to scanning beyond your lab subnet) before ever running it.

**Checkpoint project:** Complete 5 TryHackMe rooms or 2 HackTheBox easy machines independently, each with your own written technical write-up. Separately, compromise Metasploitable2 using Metasploit inside your own host-only VirtualBox network, and produce a full pentest-report-style write-up covering scope, methodology, findings, and remediation recommendations for each vulnerability exploited.

**Creative teaching methods:**

- CTF/war-game challenges on real platforms (TryHackMe, HackTheBox) as the literal assessment mechanism
- Portfolio artifact requirement: every machine/room write-up published (respecting each platform's write-up policy) as a growing public portfolio
- Build-then-break: write a small vulnerable network service yourself, then have it exploited via Metasploit in a later session

**Curated resources:**

- [TryHackMe](https://tryhackme.com/) — Free-tier rooms with guided and independent tracks; this tier leans on the independent ones.
- [HackTheBox](https://www.hackthebox.com/) — Free-tier retired machines and Starting Point track for independent practice.
- [VulnHub](https://www.vulnhub.com/) — Free, downloadable, intentionally vulnerable VMs for fully offline isolated-lab practice.
- [Metasploit Unleashed (Offensive Security, free)](https://www.offsec.com/metasploit-unleashed/) — Offensive Security's own free, official Metasploit training material.
- [Metasploitable2](https://sourceforge.net/projects/metasploitable/) — The canonical intentionally-vulnerable target VM this tier's Metasploit module is built around.
- [Volatility Foundation documentation](https://www.volatilityfoundation.org/) — Official docs for the memory-forensics tool used in this tier's forensics module.

---

## Tier 3: Practitioner

**Goal:** Ground rule unchanged: the Active Directory lab and every machine attacked this tier are built and owned by the learner, or are named legal platforms. By the end of Tier 3 the learner works confidently at real, multi-component intermediate complexity: they can follow a formal penetration-testing methodology (PTES / OWASP Testing Guide) end to end, have built and attacked their own Active Directory home lab AND instrumented that same lab to detect the attacks they just ran, can test modern APIs and JWT-based auth, understand the OWASP Mobile Top 10 well enough to analyze a deliberately vulnerable Android app, and can write a professional-grade pentest report — the deliverable that actually matters in real engagements. Detection engineering gets a real, dedicated module here rather than waiting for Tier 4's Blue Team path to be the learner's first exposure to defense.

**Modules** (~108h):

- **Formal Pentest Methodology & Reporting** — ~15h: PTES (Penetration Testing Execution Standard), OWASP Testing Guide, writing a scoping document and rules of engagement, professional report structure: executive summary, findings, risk ratings, remediation
- **Active Directory & Internal Network Pentesting** — ~22h: building an AD lab: a domain controller plus 2 client VMs in VirtualBox/VMware, host-only networking, enumeration (BloodHound, PowerView), common AD attack techniques (Kerberoasting, pass-the-hash) against your own lab only, privilege escalation and lateral movement concepts
- **Detection Engineering & Logging Basics for AD** — ~18h: enabling and reading Windows Security Event Logs on your own domain controller, installing Sysinternals Sysmon for richer process/network telemetry, writing detection logic (even a simple log-grep or PowerShell script counts) for the exact Kerberoasting and pass-the-hash techniques you just ran, re-attacking your own lab and confirming your detections actually fire — the same "attack it, then instrument it, then attack it again" loop a real blue team lives in, done here instead of deferred to Tier 4
- **Advanced Web & API Security** — ~20h: PortSwigger Academy advanced-level labs, REST and GraphQL API testing, JWT attacks (algorithm confusion, weak secrets), business-logic vulnerabilities
- **Mobile App Security Basics** — ~13h: OWASP Mobile Top 10, static and dynamic analysis of a deliberately vulnerable Android app (e.g. OWASP's InsecureBankv2 or MASTG crackmes), insecure storage, weak platform-API usage, and insecure communication classes
- **HackTheBox / TryHackMe Intermediate Practice** — ~20h: intermediate-difficulty machines and rooms, combining recon, exploitation, and privilege escalation without walkthroughs, documenting findings in report form, not just a flag

**Quizzes / assessment:**

- *CTF-style challenge* — HackTheBox/TryHackMe intermediate machines function as the literal skills test for this tier.
- *Code-review kata* — Given a REST API's code, identify a real JWT or business-logic vulnerability through review, then confirm it dynamically in Burp.
- *Checkpoint-style report review* — Self-review your own pentest report against the PTES structure checklist before considering the checkpoint complete.

**Checkpoint project:** Build a home-lab Active Directory environment (one domain controller, two clients) and conduct and fully document an internal penetration test against it end to end — reconnaissance, exploitation, privilege escalation, lateral movement, and persistence concepts — written up as a professional report following the PTES structure. Then instrument the same lab with Sysmon and Windows Event Logging, write detection logic for the Kerberoasting/pass-the-hash techniques you used, and re-run the attack to show your detections firing — include the detection write-up as a second section of the same report, not a separate afterthought. Separately, complete 3 HackTheBox or TryHackMe intermediate machines with individual write-ups.

**Creative teaching methods:**

- Portfolio artifact requirement: the AD pentest report as this tier's centerpiece deliverable
- CTF/war-game challenges (HTB/THM intermediate track, real and literal)
- Build-then-break, now closed into a full loop: attack your own AD lab, instrument it with the detection-engineering module, confirm your detections fire, harden the lab further, then re-attack it yourself weeks later to confirm the fixes actually held

**Curated resources:**

- [OWASP Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) — Free, official, comprehensive web app testing methodology.
- [PTES (Penetration Testing Execution Standard)](http://www.pentest-standard.org/) — The industry-standard free methodology this tier's reporting module is built around.
- [Sysinternals Sysmon (Microsoft, official)](https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon) — Free, official Windows telemetry tool this tier's detection-engineering module is built around.
- [Windows Security Log Encyclopedia (Ultimate Windows Security, free)](https://www.ultimatewindowssecurity.com/securitylog/encyclopedia/) — Free reference for reading and interpreting the Windows Event IDs the detection module generates.
- [PortSwigger Web Security Academy — advanced/expert labs](https://portswigger.net/web-security/all-labs) — Free hosted labs covering JWT attacks, GraphQL, and business logic flaws.
- [OWASP Mobile Application Security Testing Guide (MASTG)](https://mas.owasp.org/MASTG/) — Free, official reference for the mobile security module, including the OWASP Mobile Top 10.
- [HackTheBox Academy (free-tier modules)](https://academy.hackthebox.com/) — Structured, official learning content pairing with independent HTB machine practice.

---

## Tier 4: Advanced / Specialist

**Goal:** Ground rule unchanged, now with a real addition: bug bounty work means testing against a real, named program's explicitly defined scope, using its safe-harbor terms, and never testing anything outside that scope. By the end of Tier 4 the learner picks ONE primary specialization path — Red Team (offensive), Blue Team (defensive/incident response), or Application Security — and goes deep enough to reach architecture-level thinking in it, while understanding the other two well enough to work alongside specialists in them. Blue-team/defensive work carries equal weight and respect to offensive work here: this is a full white-hat discipline, not just 'how to attack.' The learner also does real, scoped bug-bounty work for the first time.

**Modules** (~150h):

- **Bug Bounty Fundamentals & Responsible Disclosure** — ~12h: reading and strictly respecting a program's defined scope, HackerOne and Bugcrowd public programs and safe-harbor terms, triage basics: severity, CVSS scoring, duplicate-checking, writing a clear, reproducible, professional vulnerability report
- **Path A — Red Team: Advanced Offensive Operations** — ~35h: OSCP-style methodology using Offensive Security's free PEN-200 syllabus material, advanced Active Directory attack chains against your own lab, command-and-control (C2) concepts using an open-source C2 framework (Sliver or Mythic) deployed entirely inside your own isolated lab, basic evasion concepts, always against your own or Proving-Grounds-authorized targets
- **Path B — Blue Team: Detection Engineering, IR & Forensics** — ~35h: SIEM fundamentals using a free-tier ELK stack, writing detections for the attack techniques from your own Tier 3 AD lab, the NIST incident-response lifecycle (SP 800-61), memory and disk forensics on provided forensic images with Volatility and Autopsy, threat-hunting fundamentals
- **Path C — Application Security Specialist: Threat Modeling & Secure SDLC** — ~35h: STRIDE threat modeling, secure code review as a practiced discipline, SAST/DAST tooling (e.g. Semgrep, OWASP ZAP), PortSwigger Academy expert-level labs, building security into the SDLC rather than bolting it on after
- **Cloud Security Fundamentals (shared, all paths)** — ~15h: common AWS/Azure misconfiguration classes, hands-on labs against flaws.cloud and flAWS 2, IAM misconfigurations and least-privilege principles
- **CTF Team Practice & Bug Bounty Lab Time** — ~18h: team-based CTF practice via CTFtime.org-listed events, structured bug-bounty hunting time within a chosen program's scope, peer review of your own vulnerability reports before submission

**Quizzes / assessment:**

- *CTF-style challenge* — Offensive Security Proving Grounds Practice boxes (free tier) or picoCTF's advanced archive, used as literal, real assessment.
- *Portfolio/peer review* — A real (or Hacker101 CTF practice) vulnerability report is reviewed for clarity, reproducibility, and professionalism before submission.
- *Path-specific checkpoint quiz* — Scenario-based quiz specific to the chosen path — an attack-chain decision tree for Red, a detection/response decision tree for Blue, a threat-model walkthrough for AppSec.

**Checkpoint project:** Choose your path and ship its checkpoint: (Red) chain together a multi-box Offensive Security Proving Grounds Practice network end to end with a full professional report; (Blue) given a provided or self-staged forensic memory image and SIEM log set from a simulated breach, produce a complete incident-response report — timeline, indicators of compromise, root cause, remediation; (AppSec) take a real codebase you have permission to test (your own project or an open-source project that welcomes security contributions), run a full threat model plus secure code review plus SAST/DAST pass, and submit the resulting fixes as pull requests. Regardless of path: submit at least one real report to a legitimate bug bounty program within its defined scope (or complete Hacker101 CTF's flag set as a safe proxy if not yet ready for live scope).

**Creative teaching methods:**

- CTF/war-game challenges on real platforms (Proving Grounds, picoCTF advanced) as literal assessment
- Portfolio artifact requirement: the path checkpoint report or merged PRs as centerpiece
- Build-then-break for Blue Team learners specifically: harden a system, then have a Red-Team peer or instructor attempt a breach and measure detection time

**Curated resources:**

- [HackerOne Hacker101](https://www.hacker101.com/) — Free bug-bounty training plus a real practice CTF with legitimate flags.
- [Bugcrowd University](https://www.bugcrowd.com/hackers/bugcrowd-university/) — Free, official bug-bounty methodology training.
- [Offensive Security PEN-200 / OSCP syllabus](https://www.offsec.com/courses/pen-200/) — Publicly available syllabus and free introductory material for the Red Team path.
- [Offensive Security Proving Grounds Practice](https://www.offsec.com/labs/individual/) — Legal, purpose-built practice machines with a free tier, used for this tier's Red Team checkpoint.
- [NIST SP 800-61 — Computer Security Incident Handling Guide](https://csrc.nist.gov/pubs/sp/800/61/r2/final) — The official, free federal reference the Blue Team path's IR process is built on.
- [flaws.cloud](http://flaws.cloud/) — Free, legal, purpose-built AWS misconfiguration wargame for the cloud security module.

---

## Tier 5: Expert / Innovator

**Goal:** Per The Manual's uniform Tier 5 policy, auto-graded quizzes are retired here in favor of portfolio, peer, and maintainer review — everything below is a judged, practical artifact. Ground rule at this level: vulnerability research happens only against your own isolated reproductions of already-disclosed CVEs, or against real open-source projects that explicitly welcome security contributions and coordinated disclosure — never a live, unpatched target. By the end of Tier 5 the learner has contributed to real security tooling, competed in real CTF competitions, engaged in a real (or realistically simulated) coordinated-disclosure process, and taught or mentored others — genuinely research-adjacent, novel work.

**Modules** (~90h):

- **Contributing to Security Open-Source Tooling** — ~25h: finding a real, welcoming issue in a project like OWASP Juice Shop, WebGoat, or ZAP, or writing a Nuclei detection template, the project's actual contribution workflow (issue, PR, review), responding to real maintainer review feedback
- **Advanced CTF & Research** — ~25h: competing in real, scheduled CTF competitions listed on CTFtime.org, working through OverTheWire's advanced wargame levels, writing and publishing a public, technically rigorous CTF write-up
- **Vulnerability Research on Disclosed CVEs** — ~20h: reading real CVE advisories and MITRE/NVD entries, reproducing an already-patched, publicly disclosed vulnerability against an intentionally old/vulnerable version in your isolated lab, optionally: responsibly disclosing a novel finding in an open-source project that explicitly welcomes reports, with a documented coordinated-disclosure timeline
- **Teaching, Mentoring & Security Community Contribution** — ~20h: writing a from-scratch technical blog post or conference-style talk, mentoring a Tier 0-2 learner through a real checkpoint, running or contributing to a local/online CTF or workshop

**Quizzes / assessment:**

- *Portfolio/maintainer review as assessment* — Track the actual review feedback from an open-source maintainer on a real contribution, and how many rounds it takes to reach acceptance.
- *CTF competition placement* — Real placement/score in a CTFtime.org-listed competition, used as an authentic skill measure rather than a quiz.
- *Explain it back, at teaching scale* — Publish a technical write-up or talk aimed at Tier 2/3 learners, then collect and respond to their real questions — the test is whether they understand you.

**Checkpoint project:** Ship one expert-grade artifact, your choice: (a) a merged, or seriously maintainer-reviewed, contribution to a real open-source security tool or project (a Nuclei template, a Metasploit module, an OWASP project contribution); or (b) a real CTF competition result plus a published, technically rigorous write-up for a nontrivial challenge you solved; or (c) a responsibly disclosed vulnerability finding in an open-source project that explicitly welcomes reports, with the full coordinated-disclosure timeline documented honestly, including any friction. Pair it with a public write-up or talk aimed at Tier 2/3 learners, and mentor at least one other person through an earlier-tier checkpoint.

**Creative teaching methods:**

- Portfolio artifact requirement as the entire tier: a merged OSS contribution, a CTF write-up, or a documented disclosure, each public
- Feynman teach-back at scale: a public talk or long-form write-up for earlier-tier learners
- 'Invent, then defend': present a nontrivial finding or design decision to a skeptical peer or an AI acting as devil's advocate, and revise based on the strongest objection raised

**Curated resources:**

- [CTFtime.org](https://ctftime.org/) — The canonical, free listing of real, scheduled CTF competitions and team rankings.
- [OverTheWire wargames](https://overthewire.org/wargames/) — Free, long-running wargame server with genuinely advanced late-game levels.
- [MITRE CVE Program](https://www.cve.org/) — The official, free source for disclosed vulnerability records used in the research module.
- [Nuclei Templates (ProjectDiscovery)](https://github.com/projectdiscovery/nuclei-templates) — Real, actively-maintained open-source project accepting community-contributed detection templates.
- [OWASP Juice Shop / WebGoat / ZAP GitHub repositories](https://github.com/juice-shop/juice-shop) — Real, actively-maintained OWASP projects that explicitly welcome contributions — the on-ramp for this tier's OSS module.
- [arXiv.org — cs.CR (Cryptography and Security)](https://arxiv.org/list/cs.CR/recent) — Free, primary-source current security research listing for the reading/reproducing side of this tier.

---
