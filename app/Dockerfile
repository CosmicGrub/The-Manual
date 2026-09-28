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
COPY app/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["npm", "start"]
