# Running The Manual across your devices

Target setup: the app's server runs on one PC (Windows, macOS, or any Linux distro), and your **Galaxy Z Fold 5** and **Galaxy Tab S9 FE** reach it over the same Wi-Fi network and install it as an app. This is a local-first, single-learner app (see MASTERFILE.md §3) — there's no cloud server to point at; the PC *is* the server.

## 1. Run it on the PC

### Option A — Docker (recommended: identical steps on Windows/macOS/any Linux distro)

Docker sidesteps "which Linux distro" entirely — whatever the host, the container is the same Debian userspace every time.

1. Install Docker:
   - **Windows / macOS:** [Docker Desktop](https://www.docker.com/products/docker-desktop/). On Windows, Docker Desktop uses WSL2 automatically — accept the prompt to enable it if asked.
   - **Linux (any distro):** [Docker Engine](https://docs.docker.com/engine/install/) — the install page has exact commands per distro (Ubuntu/Debian via apt, Fedora via dnf, Arch via pacman, etc.).
2. From the repo root, create a `.env` file with a real auth secret (`docker compose` reads this automatically — never reuse the same value across deployments):
   ```bash
   echo "BETTER_AUTH_SECRET=$(openssl rand -base64 32)" > .env
   ```
3. Start it:
   ```bash
   docker compose up --build
   ```
4. Open `http://localhost:3000` on the PC. Keep it running — your phone/tablet will connect to this same process (see §2).
5. **The app is invite-only — create your first account** (from another terminal, while the container is running):
   ```bash
   docker compose exec the-manual npm run create-user -- --email you@example.com --name "Your Name" --role admin
   ```
   It'll prompt for a password interactively. Run this again (with `--role admin` or without — `admin` just means "can create other accounts") for everyone else in the household who should have their own tracked progress.

To stop: `docker compose down` (your progress persists in a Docker volume; `docker compose down -v` would erase it).

### Option B — Native Node.js

Install **Node.js 20 LTS**:

| OS | How |
|---|---|
| **Windows** | [nodejs.org installer](https://nodejs.org/) (LTS), or `winget install OpenJS.NodeJS.LTS` in PowerShell. WSL2 + a Linux distro inside it also works if you prefer that environment. |
| **macOS** | `brew install node@20` (Homebrew), or the [nodejs.org installer](https://nodejs.org/). |
| **Linux (any distro)** | Easiest cross-distro option: [nvm](https://github.com/nvm-sh/nvm) → `nvm install 20`. Or your distro's package manager (`apt install nodejs npm` on Debian/Ubuntu, `dnf install nodejs` on Fedora, `pacman -S nodejs npm` on Arch) — check the version matches 20.x, distro-packaged Node is sometimes older. |

Then, from `app/`:

```bash
cd app
cp .env.example .env
# Replace the BETTER_AUTH_SECRET placeholder .env.example left in .env —
# never ship the placeholder value:
sed -i.bak "s#replace-with-a-real-openssl-rand--base64-32-secret#$(openssl rand -base64 32)#" .env && rm .env.bak
npm install
npm run build        # compiles content/ via Velite, then builds Next.js
npx prisma db push
npm run db:seed
npm start             # binds 0.0.0.0:3000 — reachable from other devices on your network
```

(`npm run dev` also binds `0.0.0.0` for the same reason, if you're actively editing content/code rather than running a built copy. Use `npm run dev:local-only` if you specifically want it unreachable from other devices.)

**The app is invite-only — create your first account** before signing in (run from `app/`, while the server above is running or stopped, either works):

```bash
npm run create-user -- --email you@example.com --name "Your Name" --role admin
```

It prompts for a password interactively (never pass one on the command line — shell history and `ps` would leak it). Run it again for anyone else in the household who should have their own tracked progress; `--role admin` just means "can also create accounts," not anything higher-privilege within the app itself.

## 2. Reach it from your Galaxy Z Fold 5 / Galaxy Tab S9 FE

Both devices need to be on the **same Wi-Fi network** as the PC.

1. Find the PC's LAN IP address:

   | OS | Command |
   |---|---|
   | Windows | `ipconfig` → look for "IPv4 Address" under your active adapter |
   | macOS | `ipconfig getifaddr en0` (Wi-Fi) in Terminal, or System Settings → Wi-Fi → Details |
   | Linux | `hostname -I` or `ip addr show` |

2. If a firewall prompt appears the first time the server starts (Windows Defender Firewall, macOS's firewall), **allow** the connection — that prompt is the OS asking whether Node/Docker may accept incoming network requests, which is exactly what you want here.
3. On the Z Fold 5 or Tab S9 FE, open Chrome and go to `http://<that-IP>:3000` (e.g. `http://192.168.1.23:3000`).

## 3. Install it as an app on Android

Once the page loads in Chrome on either device:

- Tap the Chrome menu (⋮) → **Install app** (or **Add to Home screen** on older Chrome versions).
- It installs with its own icon and opens in a standalone window (no address bar), per the manifest in `app/public/manifest.json`.
- The layout is responsive and safe-area-aware (`app/src/app/layout.tsx`) specifically so it works whether the **Z Fold 5 is folded** (phone-width) or **unfolded** (tablet-width, where the layout gets more breathing room), and on the **Tab S9 FE's** larger fixed screen — nothing assumes one fixed width.
- The service worker (`app/public/sw.js`) precaches the **entire written curriculum** — every track page and every lesson (quiz included), not just the app shell — per the standing offline-first rule in MASTERFILE.md §3.8. Once you've opened the app online at least once (so the first precache can run), every lesson you've had built works fully with no connection at all: reading it, taking its quiz, marking it complete. Quiz attempts and progress writes made offline are queued locally and sync automatically the moment you're back online — nothing is lost to a dropped connection. The dashboard and `/review` page (which reflect live, per-moment state) show your last-synced snapshot when offline and refresh the instant you're reconnected.

## 4. The HTTPS caveat (read this if "Install app" doesn't show up)

Browsers restrict full PWA install behavior to "secure contexts": `https://` or `http://localhost`. Your PC's LAN IP (`http://192.168.1.23:3000`) is neither. In practice, Chrome on Android is lenient about this for private/local addresses and installability usually still works — but if it doesn't:

- **Simplest fix — skip installing:** just use it as a normal browser tab at that URL. Everything works identically; you only lose the standalone app icon/window chrome, not any functionality.
- **Proper fix — get a trusted local HTTPS cert:** use [mkcert](https://github.com/FiloSottile/mkcert) to generate a certificate for your PC's hostname or IP, then run Next.js with it:
  ```bash
  mkcert -install
  mkcert 192.168.1.23   # use your actual LAN IP; re-run if it changes
  # then run Next.js with the resulting cert (see Next.js custom-server docs),
  # or put a reverse proxy like Caddy in front, which can automate this step.
  ```
  This is optional polish, not required to use the app.

## 5. Summary of what's covered

| Device | How | Status |
|---|---|---|
| Windows PC | Docker or native Node | ✅ |
| macOS | Docker or native Node | ✅ |
| Linux (any distro) | Docker (identical everywhere) or native Node | ✅ |
| Galaxy Z Fold 5 | Chrome over LAN, installable as PWA, responsive folded/unfolded | ✅ |
| Galaxy Tab S9 FE | Chrome over LAN, installable as PWA | ✅ |

See MASTERFILE.md §3.6 for what's still phase-2 (multi-user auth, a real hosted deployment instead of LAN-only, etc.) — this setup is single-learner, local-network, by design.
