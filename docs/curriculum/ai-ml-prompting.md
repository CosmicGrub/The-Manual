# AI, Machine Learning & Prompt Engineering

_Part of [The Manual](../../MASTERFILE.md) — track `ai-ml-prompting`. Tier numbering matches MASTERFILE.md §1._

This track takes a learner from "what even is a token" to genuine AI/ML expertise: the math ML runs on (linear algebra, probability/stats, calculus intuition), classical ML with scikit-learn, neural networks and deep learning, NLP and the transformer architecture, LLM fundamentals (pretraining/fine-tuning/RLHF), prompt engineering as a real craft (not just chatting), building production systems with LLM APIs, agents/tool-use/RAG, evaluation/red-teaming/safety, and lightweight MLOps. It is deliberately the backbone track for the whole curriculum's AI-literacy goal — every other track eventually calls back to it (using AI to accelerate learning, and understanding what's under the hood of the tools doing that accelerating) — while staying honest about where it should defer to the Hardware track (deep GPU microarchitecture) and the Platforms track (actually shipping AI features on iOS/Android/web/desktop).

**How this feeds AI/prompting literacy:** Prompt engineering isn't parked in one module here — it's threaded through every tier at increasing sophistication, which is the whole point of this track existing. Tier 0 builds raw AI literacy (what a token/context-window/hallucination actually is) so prompting isn't cargo-culted. Tier 1 teaches prompting as a craft with technique names and comparisons (zero-shot vs few-shot vs chain-of-thought, system/role prompting, structured JSON output) validated against real model calls, not guesses. Tier 2 turns prompting into an evaluation discipline — few-shot prompts are scored against held-out labeled data like any other model, and API-building work (streaming, tool/function calling, conversation-state management) is exactly what "understanding how to develop with AI" means in practice. Tier 3 covers what a prompt is actually doing mechanically (attention, tokenization, context windows, scaling laws) and extends prompting into multi-step agentic patterns (ReAct, tool orchestration, RAG) — the skill set for building genuinely useful AI applications rather than toy demos. Tier 4 turns prompting adversarial (red-teaming, jailbreak testing, guardrail design) and operational (prompt versioning, cost/latency budgeting, eval harnesses), which is what separates a hobbyist prompt from a production one. Tier 5 treats prompting and interpretability as open research questions — designing new prompting/agentic patterns, understanding why they work at a mechanistic level, and teaching that understanding to others. By the end, a learner doesn't just "know how to prompt AI well" as a checklist skill; they understand the statistical/architectural reasons prompting techniques work at all, which is what makes the skill transfer to models and providers that don't exist yet.

**How this transfers across platforms (PC/mobile/web/embedded):** Every tier maps onto real, shippable software across platforms, not just notebooks. Tier 0/1's API literacy (auth, .env secrets, rate limits, cost tracking) is identical whether the eventual client is a Windows/macOS/Linux desktop app, a web frontend, or a mobile app calling the same REST endpoint — the AI backend doesn't care what OS is asking. Tier 2's "build a small LLM-powered CLI/app" checkpoint is deliberately platform-agnostic so it can be re-skinned later (in the Platforms track) as an Electron desktop app, a web app, or wrapped into a mobile app shell. Tier 3's RAG/agent pipeline is the pattern behind virtually every real cross-platform AI feature shipped today (in-app assistants, doc Q&A, copilots) — the vector store and retrieval logic live server-side once and serve web, iOS, Android, and desktop clients identically. Tier 4 is where platform constraints get real: quantization (int8/int4) and small-model serving are exactly what let a model run on-device on a phone or laptop instead of requiring a cloud call — the direct bridge to on-device inference stacks like Core ML, TensorFlow Lite, ONNX Runtime Mobile, and llama.cpp/Ollama for local desktop inference, and to the Hardware track's explanation of why GPUs/NPUs/unified memory matter for both training and on-device inference at all. Tier 5's research skills (reproducing results, designing evals) are exactly the skills needed to evaluate whether a given model is even viable for a given platform's constraints (latency, memory, battery, offline capability) before committing an architecture to it. In short: this track supplies the "brain," the Platforms track supplies the "body" it gets embedded in, and the Hardware track explains the physical constraints both have to respect.

---

## Tier 0: Orientation & Literacy

**Goal:** Get truly AI-literate before touching any ML math: know what an LLM actually is and is not (and the compressed AI history that got us here — symbolic AI, expert systems, the ML winters, the deep learning and transformer revolutions), be comfortable in a terminal and a Python environment (venv, pip, Jupyter, Colab), and write deliberate first prompts with a working understanding of tokens, context windows, temperature, and why models hallucinate confidently. This tier is deliberately LIGHT on math and on ML theory proper — that is Tier 1's job. Tier 0 exists purely so nothing later feels like unexplained magic.

**Modules** (~30h):

- **What Is AI, Really?** — ~4h: Symbolic AI vs statistical/ML AI, Turing test, expert systems, the AI winters, The deep learning revolution and why transformers changed everything, Narrow AI vs general AI, current myths vs reality, Conceptually how an LLM turns a prompt into text (tokens -> probabilities -> sampling), without the math yet
- **Dev Environment for AI/Python Work** — ~5h: Terminal basics (navigation, permissions, PATH), Installing Python, pip, and virtual environments (venv/conda), VS Code + Jupyter notebooks vs Google Colab, Managing API keys safely (.env files, never committing secrets), Installing and sanity-checking an LLM SDK (anthropic/openai Python packages)
- **Python Crash Course for Data & AI** — ~10h: Variables, control flow, functions, Lists, dicts, list/dict comprehensions, Reading/writing CSV and JSON, Intro to numpy arrays and pandas DataFrames, Writing your first script end-to-end, not just REPL snippets
- **Prompting 101 — Literacy Before Craft** — ~6h: What a prompt is; chat vs completion APIs, System/user/assistant roles, Context window and why it's finite, Temperature and sampling (why the same prompt gives different answers), Hallucination: why models are confidently wrong, Basic prompting etiquette and safety (never paste secrets/PII into a prompt)
- **Math Literacy Refresher** — ~5h: Reading mathematical notation without fear, Basic algebra and functions review, What a vector and a matrix are, conceptually (no operations yet), Why this refresher exists: Tier 1's linear algebra/probability will assume this is solid

**Quizzes / assessment:**

- *Micro-quiz (spaced-repetition flashcards)* — 10-question auto-graded deck on core AI/ML vocabulary (LLM, token, parameter, inference vs. training, fine-tuning, hallucination, context window, temperature, prompt, embedding); missed cards requeue via spaced repetition.
- *Feynman teach-back* — Explain, in plain language a non-technical friend would understand and with zero jargon, how an LLM turns a prompt into a reply (tokens -> probabilities -> sampling); self-graded against a provided rubric checklist.
- *Terminal/environment bug hunt* — Given a deliberately broken Python setup (wrong interpreter on PATH, an unactivated venv, a package installed in the wrong environment, a malformed .env API key), diagnose and fix each fault using only the terminal.
- *AI-or-not calibration game* — Given 10 paired text/image samples, guess which are AI-generated and rate your own confidence for each; scored on calibration (not just accuracy) to build honest intuition about detecting AI output.

**Checkpoint project:** Set up a complete local + cloud AI dev environment (Python, a virtual environment, Jupyter or Colab, and a working API key for at least one LLM provider), then produce a short Jupyter notebook that: (a) calls an LLM API to answer three real questions, (b) logs token usage and estimated cost for each call, and (c) includes a written reflection comparing two different prompts for the same task, with evidence for which worked better and why.

**Creative teaching methods:**

- Prompting drills: iteratively prompt an AI to explain a hard concept (e.g., 'explain gradient descent using a cooking analogy') until you can pass the Feynman teach-back, logging every prompt revision and why you changed it.
- AI-or-not calibration game across text, image, and (optionally) audio samples to build early detection intuition.
- Build your own spaced-repetition flashcard deck (e.g., in Anki) for every new term as you meet it, instead of being handed a finished deck.

**Curated resources:**

- [CS50's Introduction to Artificial Intelligence with Python](https://cs50.harvard.edu/ai/) — Harvard/edX, free. Use the early conceptual lectures for orientation, not the full course yet.
- [The Python Tutorial (official docs)](https://docs.python.org/3/tutorial/index.html) — First 5-6 chapters cover everything Tier 0's Python module needs.
- [Khan Academy — Algebra 1](https://www.khanacademy.org/math/algebra) — Math literacy refresher; free, self-paced, with practice problems.
- [Anthropic Docs — Intro to Claude & Prompt Engineering Overview](https://docs.anthropic.com/en/docs/intro-to-claude) — Official vendor docs on how the model and prompting basics actually work.
- [Google Colab — Welcome Notebook](https://colab.research.google.com/notebooks/intro.ipynb) — Official intro to running Python/Jupyter with zero local setup.
- [freeCodeCamp — Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Free, project-based reinforcement of the Python crash course module.

---

## Tier 1: Foundations

**Goal:** Build the actual mathematical and conceptual foundation ML sits on — linear algebra, probability/statistics, and calculus intuition — with every concept tied immediately to a numpy exercise so the math never stays abstract for more than a day. Layer on core ML vocabulary (supervised/unsupervised, train/test split, overfitting/underfitting, bias-variance) and the first real prompt-engineering craft (zero-shot, few-shot, chain-of-thought, structured output). Heavy scaffolding throughout: every new idea gets a guided notebook before an independent one.

**Modules** (~70h):

- **Linear Algebra for ML I** — ~12h: Vectors and vector operations, Dot product and its geometric meaning, Matrices and matrix multiplication, Linear transformations, Implementing each by hand in numpy, then checking against built-ins
- **Linear Algebra for ML II** — ~10h: Norms (L1/L2), Eigenvalues and eigenvectors, intuitively, PCA as 'find the directions of most variance' (conceptual precursor to Tier 2's PCA), Why these show up everywhere in ML
- **Probability & Statistics for ML** — ~14h: Probability basics, random variables, Common distributions (Bernoulli, Binomial, Gaussian), Bayes' theorem and applying it to word problems, Expectation and variance, Intro to hypothesis testing
- **Calculus Intuition for ML** — ~10h: Derivatives as rate of change, Partial derivatives and the chain rule, Gradients as 'the direction of steepest increase', Why gradient descent works, built up from these pieces
- **Python for Data** — ~10h: Vectorized numpy operations (why loops are slow), pandas DataFrames: filtering, grouping, merging, Plotting with matplotlib/seaborn, A repeatable Jupyter experiment workflow
- **Prompt Engineering Craft I** — ~8h: Zero-shot vs. few-shot prompting, System/role prompting, Chain-of-thought prompting, Structured output (asking for and validating JSON), Prompt templates and iterative refinement
- **ML Vocabulary & Mental Models** — ~6h: Supervised vs. unsupervised vs. reinforcement learning, Features and labels, Train/validation/test splits, Overfitting/underfitting and the bias-variance tradeoff

**Quizzes / assessment:**

- *Micro-quiz (spaced-repetition drills)* — Compute a dot product and a matrix multiply by hand, then verify with numpy; apply Bayes' theorem to a word problem; identify a distribution from a description. Auto-graded, spaced-repetition eligible.
- *Feynman teach-back* — Explain gradient descent using a physical analogy (e.g., a ball rolling downhill in fog) to someone who has never taken calculus.
- *Prompting drill* — Take one weak, vague prompt for a real task and rewrite it through zero-shot -> few-shot -> chain-of-thought versions; submit all versions plus the model's actual outputs and a short analysis of what changed and why.
- *Code-review / bug-hunt kata* — Given numpy/pandas snippets containing a silent broadcasting bug and an off-by-one indexing error, predict the (wrong) output first, then find and fix each bug.

**Checkpoint project:** Build a 'Linear Regression from Scratch' notebook — no scikit-learn — implementing gradient descent using only numpy on a real toy dataset, with a plot of the loss curve converging. Pair it with a short 'Prompt Engineering Playbook' document where you test and record 5 distinct prompt patterns against one real task of your own choosing (e.g., summarizing your own notes), showing before/after outputs for each.

**Creative teaching methods:**

- Prompting drills as the core exercise for the prompt-craft module: zero-shot -> few-shot -> chain-of-thought rewrite chains against a real model.
- Feynman teach-backs required for every math concept (a derivative, Bayes' theorem, matrix multiplication) before moving to the next module.
- Spaced-repetition flashcards for formulas and ML vocabulary, reviewed on the app's SM-2 schedule.
- Build-then-break: build a tiny prompt-template function, then feed it deliberately malformed or adversarial inputs and see what breaks.

**Curated resources:**

- [MIT OCW 18.06 — Linear Algebra (Gilbert Strang)](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/) — The canonical free linear algebra course; watch lectures 1-10 for this tier's scope.
- [MIT OCW 6.041SC — Probabilistic Systems Analysis and Applied Probability](https://ocw.mit.edu/courses/6-041sc-probabilistic-systems-analysis-and-applied-probability-fall-2013/) — Free, full course with assignments; use the first few units.
- [OpenStax — Introductory Statistics 2e](https://openstax.org/details/books/introductory-statistics-2e) — Free, full textbook PDF; covers distributions and hypothesis testing rigorously.
- [Khan Academy — Calculus 1](https://www.khanacademy.org/math/calculus-1) — Derivatives and chain rule units map directly to this tier's calculus module.
- 3Blue1Brown — Essence of Linear Algebra (video series) — Free supplementary intuition-builder for eigenvectors/PCA before the formal MIT OCW treatment; not a substitute for doing the numpy exercises.
- [Anthropic Docs — Prompt Engineering Techniques](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) — Official reference for few-shot, chain-of-thought, and structured-output prompting.

---

## Tier 2: Builder

**Goal:** Apply the fundamentals independently: train and evaluate real classical ML models (regression, classification, clustering) on real datasets with scikit-learn, get a first working feel for neural networks, and — central to this track's AI-literacy mission — start building actual software against LLM APIs instead of just chatting with them. No more guided-notebook hand-holding; projects are specified by outcome, not by step-by-step instructions.

**Modules** (~68h):

- **Classical ML with scikit-learn** — ~16h: Linear/logistic regression, decision trees, random forests, k-NN, Train/test/validation splits and cross-validation, Confusion matrix, precision/recall/F1, ROC-AUC, Choosing a model and metric for a given problem
- **Feature Engineering & Data Prep** — ~10h: Handling missing data, Categorical encoding, Scaling and normalization (and why order matters vs. data leakage), L1/L2 regularization as an overfitting fix
- **Unsupervised Learning** — ~8h: k-means clustering, PCA in practice (not just theory now), Dimensionality reduction for visualization
- **Intro to Neural Networks** — ~14h: The perceptron and the multi-layer perceptron, Activation functions, Forward pass and backprop intuition (full derivation deferred to Tier 3), Training a small network in PyTorch
- **Building with LLM APIs** — ~12h: Calling Anthropic/OpenAI APIs programmatically, Streaming responses, Managing multi-turn conversation state, Structured outputs and function/tool calling basics, Cost and rate-limit management
- **Prompt Engineering Craft II** — ~8h: Prompt chaining, Self-consistency (sampling multiple times and aggregating), Structured output schemas (JSON schema validation), Building a simple prompt-evaluation harness

**Quizzes / assessment:**

- *Micro-quiz* — scikit-learn API and metrics: precision vs. recall vs. F1, when to use ROC-AUC vs. PR-AUC, what cross-validation actually splits and why.
- *Code-review kata* — Given a scikit-learn pipeline that scales the full dataset before the train/test split (a classic leakage bug), find the leak, fix it, and explain in one sentence why the reported accuracy was inflated.
- *Prompting drill (eval-style)* — Build a few-shot prompt that classifies 20 held-out text examples, score its accuracy against ground truth, then iterate the prompt to improve accuracy by a measurable margin.
- *Build-then-break challenge* — Build a small LLM-powered CLI tool, then attempt at least 3 categories of adversarial input against your own tool (prompt injection, off-topic abuse, malformed input) and patch what breaks.

**Checkpoint project:** Ship an end-to-end classical ML project on a real public dataset (Kaggle/UCI): a documented comparison of at least 3 models with proper train/validation/test methodology, pushed to GitHub with a README a stranger could follow. Pair it with a small LLM-powered companion tool (CLI or simple Streamlit app) that calls an LLM API to explain the model's predictions in plain English — combining classical ML output with an LLM explainer layer.

**Creative teaching methods:**

- Build-then-break challenges on your own LLM-powered CLI tool (prompt injection, malformed input, off-topic abuse).
- Portfolio artifact requirement: every project pushed to a public GitHub repo with a README a stranger could follow.
- CTF-lite 'jailbreak your own toy chatbot' mini-challenge to build early safety intuition ahead of Tier 4's full red-teaming work.
- Prompting drills used as a real evaluation harness against held-out labeled data, not just vibes-based iteration.

**Curated resources:**

- [Machine Learning Specialization (Andrew Ng)](https://www.coursera.org/specializations/machine-learning-introduction) — Free to audit on Coursera; the canonical intro to classical ML.
- [An Introduction to Statistical Learning (with Python)](https://www.statlearning.com/) — Free official PDF; the standard reference for the modeling/metrics covered here.
- [scikit-learn — Official Tutorials](https://scikit-learn.org/stable/tutorial/index.html) — Official docs; use alongside the model modules above.
- [Kaggle Learn — Intro to Machine Learning / Intermediate ML / Feature Engineering](https://www.kaggle.com/learn) — Free micro-courses with hands-on notebooks, directly matched to this tier's modules.
- [Anthropic Docs — Tool Use (Function Calling)](https://docs.anthropic.com/en/docs/build-with-claude/tool-use) — Official reference for the LLM-API module's function/tool-calling section.
- [PyTorch — 60 Minute Blitz](https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html) — Official tutorial; enough to train the Tier 2 intro neural network.

---

## Tier 3: Practitioner

**Goal:** Go from 'I can use scikit-learn' to 'I understand how a transformer and an LLM actually work,' and from 'I can call an API' to 'I can build a multi-component AI system.' Covers full backpropagation, CNNs/RNNs for context, the transformer architecture in real depth (including implementing a mini one from scratch), LLM pretraining/fine-tuning/RLHF conceptually, and RAG plus agentic tool-use as this tier's first genuinely multi-file, multi-component projects. Includes reading and contributing to a real open-source codebase — the 'reading other people's code' requirement for this tier.

**Modules** (~78h):

- **Deep Learning Foundations** — ~16h: Backpropagation, fully derived, Loss functions, Optimizers (SGD, Adam), Regularization (dropout, batch norm), CNNs for vision, briefly, for architectural context
- **Sequence Models & NLP Fundamentals** — ~10h: Tokenization (BPE/WordPiece), Word embeddings and why they encode meaning, RNNs/LSTMs, Why they were replaced by attention
- **The Transformer Architecture** — ~18h: Self-attention and multi-head attention, Positional encoding, Encoder vs. decoder vs. decoder-only architectures, Reading and annotating 'Attention Is All You Need', Implementing a mini-transformer from scratch
- **LLM Fundamentals** — ~10h: Pretraining vs. fine-tuning vs. RLHF, Tokenization and context windows at scale, Scaling laws, intuitively, Open vs. closed models, reading model cards
- **Retrieval-Augmented Generation (RAG) & Agents** — ~16h: Embeddings for semantic search, Vector databases and chunking strategies, Building a full RAG pipeline, Intro to agents and the ReAct tool-use pattern, Multi-step tool orchestration
- **Reading Real Code** — ~8h: Annotated walkthrough of a real open-source project (e.g., nanoGPT or a minimal RAG framework), Tracing a request through someone else's multi-file codebase, Contributing a small, real fix or PR

**Quizzes / assessment:**

- *Micro-quiz (spaced repetition)* — Transformer internals: what Q/K/V represent, why attention scores are scaled by sqrt(d_k), what positional encoding solves, encoder vs. decoder-only distinctions.
- *Code-review / bug-hunt kata* — Debug a from-scratch attention implementation with an injected bug (missing softmax normalization, a wrong transpose, a missing causal mask) using only failing unit tests as clues.
- *Feynman teach-back* — Explain self-attention to a peer without using the word 'attention' or 'weighted' at all.
- *Prompting drill (agentic)* — Design and test a ReAct-style prompt that must correctly decide when to call a search tool vs. a calculator tool across 10 mixed questions; log tool-choice accuracy.

**Checkpoint project:** Build a working RAG-based Q&A application over a real corpus of your choosing (your own notes, a documentation set) — embedding pipeline, vector store, retrieval, and an agent loop that decides when to retrieve vs. answer directly — deployed somewhere accessible (even a local simple UI is fine). Write an architecture doc explaining every component's job. Separately, submit one real (even small) pull request to an open-source ML/LLM tooling repository.

**Creative teaching methods:**

- Bug-hunt / code-review katas on intentionally broken attention/transformer implementations.
- Build-then-break on the full RAG pipeline, swapped with a peer (or adversarially prompted by another AI) to find failure modes.
- Portfolio artifact: publish an annotated from-scratch mini-transformer notebook with commentary explaining every shape and matrix multiply.
- Open-source contribution as an applied 'reading other people's code' exercise, not merely a reading assignment.

**Curated resources:**

- [MIT 6.S191 — Introduction to Deep Learning](http://introtodeeplearning.com/) — Free, full lecture videos and labs, MIT-affiliated; the core deep-learning-foundations resource for this tier.
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762) — The original transformer paper; read and annotate it as this tier's module instructs.
- [Andrej Karpathy — 'Let's build GPT: from scratch, in code, spelled out' + nanoGPT repo](https://github.com/karpathy/nanoGPT) — Free video walkthrough plus the actual repo; the direct guide for the mini-transformer implementation.
- [Hugging Face NLP Course](https://huggingface.co/learn/nlp-course) — Free, official course covering tokenization, transformers, and fine-tuning with real code.
- [LangChain Docs — Retrieval-Augmented Generation Concepts](https://python.langchain.com/docs/concepts/rag/) — Official vendor docs for the RAG module's chunking/retrieval concepts.
- [Anthropic — Building Effective Agents](https://www.anthropic.com/research/building-effective-agents) — Official research write-up on agent/tool-use design patterns used in the RAG & Agents module.

---

## Tier 4: Advanced / Specialist

**Goal:** Specialize toward production-grade AI engineering: fine-tune models efficiently (LoRA/QLoRA), build real evaluation and red-teaming harnesses instead of trusting vibes, understand inference-time performance (quantization, KV-cache, serving frameworks) well enough to make architecture-level tradeoffs, and run lightweight MLOps like a professional. Deep hardware internals (GPU microarchitecture, memory hierarchies) are treated LIGHTLY here on purpose — that is the Hardware & Computer Systems track's job; this tier goes only as deep into hardware as needed to reason about inference cost and deployment tradeoffs.

**Modules** (~78h):

- **Fine-Tuning & Parameter-Efficient Methods** — ~16h: Full fine-tuning vs. LoRA/QLoRA, Instruction tuning, RLHF and DPO, conceptually, Curating a fine-tuning dataset
- **Model Evaluation, Red-Teaming & Safety** — ~14h: Building eval harnesses and benchmarks, Measuring hallucination rate, Adversarial prompting / jailbreak testing, Bias and fairness evaluation, Responsible AI frameworks (NIST AI RMF, Constitutional AI)
- **Inference Optimization & Serving** — ~12h: Quantization (int8/int4) and its accuracy/speed tradeoff, KV-cache and why it matters for latency, Batching and throughput, Serving frameworks (vLLM, TGI), Model compression and distillation
- **Lightweight MLOps** — ~12h: Experiment tracking (MLflow / Weights & Biases), Data and model versioning (DVC), CI for ML pipelines, Monitoring model/data drift in production
- **Architecture for AI-Powered Systems** — ~12h: Designing a production LLM application: caching, fallback models, prompt versioning, guardrails, observability, Cost/latency budgeting across cloud, desktop, and mobile deployment targets
- **Advanced Prompt Engineering & Agentic Systems** — ~12h: Multi-agent orchestration, Tool-use reliability patterns, Long-context strategies and prompt compression, Structured planning (ReAct, Reflexion, Tree-of-Thought)

**Quizzes / assessment:**

- *Micro-quiz (spaced repetition)* — Inference/serving tradeoffs: int8 vs. int4 quantization error and speed, what the KV-cache stores and why it matters for latency, LoRA vs. full fine-tune parameter counts.
- *CTF-style red-team challenge* — Attempt to extract a sandboxed toy assistant's hidden system prompt, or make it violate a stated content policy, using only prompting (no external jailbreak libraries); write up the successful technique and the guardrail fix.
- *Code-review kata* — Review a real (sanitized) inference-serving pull request containing a KV-cache/batching bug and flag the defect before checking the actual fix.
- *Feynman teach-back* — Explain LoRA/QLoRA to someone who already understands full fine-tuning but has never used a parameter-efficient method.

**Checkpoint project:** Fine-tune (LoRA/QLoRA) a small open-weight model for a specific task; build a proper evaluation harness comparing base vs. fine-tuned model (quantitative metrics plus qualitative red-teaming); quantize and serve it locally (e.g., via vLLM or llama.cpp); and write a full system-design doc for deploying this model across a web app and a resource-constrained mobile/edge client, including fallback strategy, cost budget, and safety guardrails.

**Creative teaching methods:**

- CTF-style red-teaming of a sandboxed toy assistant as the primary safety-learning method.
- Build-then-break on a guardrail/safety-filter system you build yourself, attacked by a peer or another AI.
- Portfolio artifact: a real LoRA-fine-tuned small open model with a full quantitative + qualitative evaluation report.
- Feynman teach-backs aimed at a simulated 'engineer who knows the adjacent concept but not this one' audience.

**Curated resources:**

- [Hugging Face PEFT Documentation](https://huggingface.co/docs/peft/index) — Official docs and guides for LoRA/QLoRA fine-tuning.
- [Constitutional AI: Harmlessness from AI Feedback](https://arxiv.org/abs/2212.08073) — Anthropic's foundational safety/alignment paper for the red-teaming module.
- [Full Stack Deep Learning](https://fullstackdeeplearning.com/) — Free, production-focused course covering MLOps, serving, and deployment tradeoffs.
- [vLLM — Official Documentation](https://docs.vllm.ai/) — Official docs for the high-throughput serving framework used in the inference module.
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) — Official U.S. government framework for the responsible-AI section of the safety module.
- [Made With ML](https://madewithml.com/) — Free, practical MLOps course covering experiment tracking, versioning, and CI for ML.

---

## Tier 5: Expert / Innovator

**Goal:** Cross from applying AI to advancing and teaching it: read and reproduce real papers, get a working grasp of mechanistic interpretability and current alignment research, design and run an original small experiment end-to-end (hypothesis through public write-up), land a substantive contribution in a major open-source AI project, and teach what you've learned to an actual beginner. This is the research-adjacent, invent-rather-than-apply tier — output is judged by originality and rigor, not completion.

**Modules** (~86h):

- **Research Literacy** — ~14h: How to read an ML paper efficiently (abstract -> figures -> methods -> results), Reproducing a paper's core result from scratch, Understanding ablations and statistical significance in ML research, Using arXiv and Semantic Scholar effectively for literature review
- **Mechanistic Interpretability & Alignment Research** — ~16h: Circuits and features in neural networks, Probing and activation patching, Current alignment research directions, Reading real interpretability papers from Anthropic/OpenAI/DeepMind
- **Novel System Design** — ~20h: Prototyping a genuinely novel small system (new agent architecture, new eval method, or new fine-tuning trick), Running a full research cycle: hypothesis, experiment, write-up
- **Contributing Upstream** — ~14h: Navigating a major open-source AI project's issue tracker and contribution norms, Making a substantive, non-trivial, merged pull request (e.g., to transformers, vLLM, or a RAG/agent framework)
- **Teaching & Mentoring** — ~10h: Writing a public tutorial teaching something from this track to a beginner, Running a study group or pairing session, Gathering and incorporating real learner feedback
- **Frontier Tracking & Independent Research Agenda** — ~12h: Setting up a personal system for tracking frontier papers and model releases, Forming and pursuing an original research question, Presenting findings publicly (blog post, talk, or paper-style write-up)

**Quizzes / assessment:**

- *Paper-reproduction checkpoint* — Reproduce a specific published result (e.g., a benchmark number from a short paper) from scratch and compare your number against the paper's within a stated tolerance; rubric-graded on methodology, not just whether the number matches.
- *Research-grade Feynman teach-back* — Actually teach a Tier-1 concept to a real beginner (not hypothetical), collect their written feedback, and revise the explanation based on where they got confused.
- *CTF/war-game (research-ethics framed)* — Attempt known jailbreak/red-team techniques against a hardened model within a defined responsible-disclosure scope; document any novel variant found and write a one-page responsible-disclosure note.
- *'Break the eval' build-then-break* — Propose a new evaluation metric or benchmark for some LLM behavior, then have a peer (or another AI) try to game the metric without actually improving the underlying behavior — a hands-on Goodhart's-law exercise.

**Checkpoint project:** Complete a small original research project end-to-end: pick a real open question (e.g., 'does prompt structure X measurably reduce hallucination on task Y'), design and run the experiment, reproduce and cite relevant baseline paper(s), write a paper-style report (abstract/methods/results/discussion), publish it publicly (blog, GitHub, or an arXiv-adjacent preprint server), and get at least one substantive external review or piece of feedback (a peer, a mentor, or a public comment thread).

**Creative teaching methods:**

- Teaching/mentoring as the primary creative method: write a public tutorial or run a live study-group session teaching a Tier-1/2 concept, then incorporate real learner feedback.
- Build-then-break at the meta level: propose a new eval/benchmark, then have someone try to game it (a direct Goodhart's-law exercise).
- Portfolio artifact requirement: a public repo plus a paper-style write-up of a genuinely original small experiment.
- Responsible-disclosure-framed CTF/war-game red-teaming against hardened models, within a clearly defined ethical scope.

**Curated resources:**

- [Semantic Scholar](https://www.semanticscholar.org/) — Primary tool for literature search, citation graphs, and tracking a paper's influence.
- [Transformer Circuits (Anthropic interpretability publications)](https://transformer-circuits.pub/) — Official ongoing mechanistic interpretability research, free to read.
- [Papers With Code](https://paperswithcode.com/) — Pairs papers with their official implementations; essential for the reproduction module.
- [Hugging Face Transformers — Contributing Guide](https://github.com/huggingface/transformers/blob/main/CONTRIBUTING.md) — Official guide for making a real, mergeable contribution to a major open-source AI project.
- [Stanford CS25: Transformers United](https://web.stanford.edu/class/cs25/) — Free, public, research-level seminar series with recorded talks from leading researchers.
- [Class Central — Machine Learning subject listing](https://www.classcentral.com/subject/machine-learning) — Use to find current free advanced ML/NLP research-level MOOCs as the field moves; a living resource rather than a fixed course.

---
