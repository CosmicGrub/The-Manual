'use client'

import { useEffect, useState } from 'react'
import { getStoredProfile, type ActiveProfile } from '@/lib/profileClient'
import { AVATAR_COLORS, type AvatarToken } from '@/lib/profileAvatars'

// Replaces the old Better-Auth-backed AccountBar (see MASTERFILE.md §3.6.4).
// No sign-out concept — this is a local profile switch, not a session to
// end. `undefined` = not checked yet (first paint, before the localStorage
// read can run), `null` = checked, no profile picked.
export function ProfileBar() {
  const [profile, setProfile] = useState<ActiveProfile | null | undefined>(undefined)

  useEffect(() => {
    setProfile(getStoredProfile())
  }, [])

  if (profile === undefined) return null

  return (
    <div className="flex justify-end items-center gap-2 text-sm text-neutral-500 py-2">
      {profile ? (
        <>
          <span
            className="inline-block w-5 h-5 rounded-full shrink-0"
            style={{ backgroundColor: AVATAR_COLORS[profile.avatar as AvatarToken] ?? AVATAR_COLORS.blue }}
            aria-hidden="true"
          />
          <span>{profile.name}</span>
          <a href="/profiles" className="underline">
            Switch profile
          </a>
        </>
      ) : (
        <a href="/profiles" className="underline">
          Choose a profile
        </a>
      )}
    </div>
  )
}
