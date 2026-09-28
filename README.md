# The Manual

A holistic, self-taught coding curriculum — plus the app that delivers it — spanning programming languages, software engineering, computer hardware/systems, AI/ML and prompt engineering, and cross-platform development (PC, mobile, web, embedded).

**Start here:** [`MASTERFILE.md`](./MASTERFILE.md) — the canonical architecture and curriculum map. See [`CHANGELOG.md`](./CHANGELOG.md) for how this project has evolved.

## Layout

- `content/` — the curriculum itself: MDX lessons + quizzes, organized `<track>/tier-<0-5>/`.
- `docs/curriculum/` — the full tier-by-tier syllabus per track (modules, quizzes, checkpoints, resources).
- `app/` — the Next.js app that serves lessons, runs quizzes, tracks progress, and schedules spaced-repetition review. Installable as a PWA.
- `docs/diagrams/` — Mermaid diagrams of the curriculum map and app architecture.

## Running the app

**Quickest — Docker (same steps on Windows/macOS/any Linux distro):**

```bash
docker compose up --build
```

**Or natively:**

```bash
cd app
cp .env.example .env
npm install
npm run build   # compiles content/ via Velite, then builds Next.js
npx prisma db push
npm run db:seed
npm run dev
```

Either way, the app is reachable at `http://localhost:3000`, and — since it binds `0.0.0.0` — from any other device on the same Wi-Fi network at `http://<this-machine's-LAN-IP>:3000`, installable as an app on Android (tested against a Galaxy Z Fold 5 and Galaxy Tab S9 FE). See **[`docs/running-on-your-devices.md`](./docs/running-on-your-devices.md)** for per-OS setup, finding your LAN IP, and installing it as a PWA.
