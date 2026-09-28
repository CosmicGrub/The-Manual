import { db } from '@/lib/db'

// Single local learner by default (see .env.example / MASTERFILE.md §3.1).
// A fixed, well-known id — not Prisma's default cuid() — is deliberate: the
// statically generated lesson pages (app/src/app/tracks/**) need a userId to
// stamp onto quiz-attempt/progress writes with zero database access (that's
// what makes them offline-safe, see MASTERFILE.md §3.8), so there has to be
// a stable id every part of the app can reference without a DB round-trip.
export const LOCAL_USER_ID = 'local-learner'

// Server components with live DB access (dashboard, /review) call this to
// ensure that row exists and get the display name; static pages just import
// LOCAL_USER_ID directly instead.
export async function getOrCreateDefaultUser() {
  const name = process.env.DEFAULT_USER_NAME ?? 'Learner'
  return db.user.upsert({
    where: { id: LOCAL_USER_ID },
    create: { id: LOCAL_USER_ID, name },
    update: {},
  })
}

// A learner's very first interaction with the app can be a statically
// generated lesson page (linked directly, no dashboard visit yet) submitting
// a quiz attempt — there's no server-rendered entry point in that path to
// have already called getOrCreateDefaultUser(). Every mutating API route
// calls this first so the foreign-key target always exists, regardless of
// which page a learner lands on first.
export async function ensureUser(userId: string) {
  await db.user.upsert({
    where: { id: userId },
    create: { id: userId, name: userId === LOCAL_USER_ID ? process.env.DEFAULT_USER_NAME ?? 'Learner' : userId },
    update: {},
  })
}
