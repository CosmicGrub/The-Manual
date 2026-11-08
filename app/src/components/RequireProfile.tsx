'use client'

import { useEffect, useState } from 'react'
import { getStoredProfile, type ActiveProfile } from '@/lib/profileClient'

/**
 * Lesson/checkpoint pages are statically generated (offline-safe, see
 * MASTERFILE.md §3.8) so they can't check the active profile server-side —
 * content itself stays freely viewable. This wraps the pieces that actually
 * write per-profile data (quiz submission, progress, checkpoint submission)
 * and swaps them for a "pick a profile" prompt when none is selected,
 * checked client-side after hydration via the local profile cache. Replaces
 * the old Better-Auth-backed RequireSession — see MASTERFILE.md §3.6.4.
 */
export function RequireProfile({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<ActiveProfile | null | undefined>(undefined)

  useEffect(() => {
    setProfile(getStoredProfile())
  }, [])

  if (profile === undefined) return null
  if (!profile) {
    return (
      <p className="text-sm text-neutral-500 border rounded-lg p-4">
        <a href="/profiles" className="underline font-medium">
          Pick a profile
        </a>{' '}
        to track your progress and submit this.
      </p>
    )
  }

  return <>{children}</>
}
