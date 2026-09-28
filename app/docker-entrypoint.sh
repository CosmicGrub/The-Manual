#!/bin/sh
# Applies the Prisma schema, then mirrors the built lesson index into the
# Module table (both idempotent against SQLite) before every start — a fresh
# volume just works with no manual migration/seed step on any host OS. Without
# the seed step, every quiz-attempt/progress write would fail its foreign-key
# check against a Module row that was never created.
set -e
npx prisma db push --skip-generate
npx tsx prisma/seed.ts
exec "$@"
