import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { isAvatarToken } from '@/lib/profileAvatars'

const MAX_NAME_LENGTH = 40

// POST /api/profile — { name, avatar } — create a new local profile. No
// password, no email: this is the entire account-creation flow for the
// offline profile system (replaces the old admin-provisioned
// scripts/create-user.ts path for day-to-day use — see MASTERFILE.md
// §3.6.4). Intentionally reachable with no auth check at all: creating a
// profile is how a new household member gets their own progress slot on
// this device, the same as picking "new profile" on a shared game console.
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, avatar } = body as { name?: string; avatar?: string }

  const trimmedName = typeof name === 'string' ? name.trim() : ''
  if (!trimmedName || trimmedName.length > MAX_NAME_LENGTH) {
    return NextResponse.json({ error: `name is required (1-${MAX_NAME_LENGTH} characters)` }, { status: 400 })
  }
  if (!isAvatarToken(avatar)) {
    return NextResponse.json({ error: 'avatar must be one of the fixed palette tokens' }, { status: 400 })
  }

  try {
    const profile = await db.profile.create({ data: { name: trimmedName, avatar } })
    return NextResponse.json({ profile })
  } catch (err) {
    console.error('POST /api/profile failed:', err)
    return NextResponse.json({ error: 'failed to create profile' }, { status: 500 })
  }
}
