import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { PROFILE_COOKIE } from '@/lib/profile'

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365

// POST /api/profile/select — { profileId } — make this the device's active
// profile. Validates the id is a real profile (never trusts it blindly —
// same reasoning as requireUserId in src/lib/profile.ts), then sets the
// plain (non-httpOnly) profile cookie every other route reads. No password
// check: this is a local profile switch, not a sign-in.
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { profileId } = body as { profileId?: string }

  if (typeof profileId !== 'string' || !profileId) {
    return NextResponse.json({ error: 'profileId is required' }, { status: 400 })
  }

  const profile = await db.profile.findUnique({ where: { id: profileId } })
  if (!profile) return NextResponse.json({ error: 'unknown profileId' }, { status: 404 })

  const res = NextResponse.json({ profile })
  res.cookies.set(PROFILE_COOKIE, profile.id, {
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
    maxAge: ONE_YEAR_SECONDS,
  })
  return res
}
