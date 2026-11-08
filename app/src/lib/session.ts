import { NextRequest } from 'next/server'
import { auth } from '@/lib/auth'

// UNUSED by the active app as of the offline-profile rework (MASTERFILE.md
// §3.6.4) — every API route now imports requireUserId from
// src/lib/profile.ts instead, which reads the local profile cookie rather
// than a Better Auth session. Kept in place, not deleted, alongside auth.ts
// — see that file's header comment.

/** Every mutating/per-user API route derives userId from this, never from the request body/query — closes the IDOR gap where any client could claim to be any userId. */
export async function requireUserId(req: NextRequest): Promise<string | null> {
  const session = await auth.api.getSession({ headers: req.headers })
  return session?.user.id ?? null
}
