#!/bin/sh
# Applies the Prisma schema to the (persisted-volume) SQLite file before every
# start — cheap and idempotent against SQLite, and means a fresh volume just
# works with no manual migration step on any host OS.
set -e
npx prisma db push --skip-generate
exec "$@"
