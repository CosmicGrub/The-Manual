# The Manual — one image, identical behavior on Windows/macOS/any Linux distro
# running Docker Desktop or Docker Engine. This sidesteps "which Linux distro"
# entirely: whatever the host OS, the container's userspace is the same Debian
# base every time. See docs/running-on-your-devices.md for how to reach this
# from a phone/tablet on the same network once it's running.
#
# Debian-slim (glibc), not Alpine (musl) — Prisma's query-engine binaries are
# built against glibc and are the single most common thing that silently
# breaks on Alpine for a scaffold like this.
#
# BUILD CONTEXT IS THE REPO ROOT (see ../docker-compose.yml's `context: .`),
# not this app/ directory — velite.config.ts's `root: '../content'` means the
# curriculum content one level above app/ must be in the build context too.

FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY app/package.json ./
RUN npm install

FROM node:20-bookworm-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY app/ .
COPY content/ ../content
RUN npx prisma generate
RUN npm run build
# next start never reads the Turbopack incremental-build cache — it's
# build-time-only and was measured at ~70MB (42% of .next) on a clean build.
# Strip it so the runtime image doesn't carry pure dead weight.
RUN rm -rf .next/cache

FROM node:20-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/.velite ./.velite
COPY --from=build /app/public ./public
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.mjs ./next.config.mjs
# src/ + scripts/ + tsconfig.json: not needed to *serve* the already-built
# .next output, but `npm run create-user` (docker compose exec) runs
# scripts/create-user.ts via tsx against real TypeScript source, not the
# compiled app — tsx needs tsconfig.json present to resolve the @/ path
# alias src/lib/auth.ts itself imports.
COPY --from=build /app/src ./src
COPY --from=build /app/scripts ./scripts
COPY --from=build /app/tsconfig.json ./tsconfig.json
COPY app/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "start"]
