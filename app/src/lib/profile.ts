import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { db } from '@/lib/db'

// The active local profile is tracked by a plain (non-httpOnly) cookie
// holding its id — not a security token. There's no password behind a
// profile and nothing secret in the cookie's value; it answers "which
// household member is using this device right now," the same role a game
// console's local profile picker plays. See MASTERFILE.md §3.6.4.
export const PROFILE_COOKIE = 'manual_profile_id'

/**
 * Every mutating/per-profile API route derives its id from this, never from
 * the request body/query — same IDOR-closing discipline the old Better-Auth
 * `requireUserId` (src/lib/session.ts, now unused) followed, just sourced
 * from the local profile cookie instead of a server-validated session.
 * Drop-in replacement: routes only needed their import path changed.
 */
export async function requireUserId(req: NextRequest): Promise<string | null> {
  const id = req.cookies.get(PROFILE_COOKIE)?.value
  if (!id) return null
  // Validates the cookie still points at a real profile (not one deleted
  // since) rather than trusting it blindly — a stale id would otherwise hit
  // Progress/etc.'s foreign-key constraint and surface as an opaque 500.
  const profile = await db.profile.findUnique({ where: { id }, select: { id: true } })
  return profile?.id ?? null
}

/** Server components: the active profile's id, or null if none selected yet. */
export async function getActiveProfileId(): Promise<string | null> {
  const store = await cookies()
  return store.get(PROFILE_COOKIE)?.value ?? null
}

/** Server components: the active profile's full row, or null. */
export async function getActiveProfile() {
  const id = await getActiveProfileId()
  if (!id) return null
  return db.profile.findUnique({ where: { id } })
}
