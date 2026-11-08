'use client'

// Client-side mirror of the active profile (id, name, avatar token), kept in
// localStorage so components can show "who's using this" instantly on
// render instead of waiting on a round trip. The actual access-control bit
// is the manual_profile_id cookie the server reads (src/lib/profile.ts) —
// this is purely a display/UX cache and is never trusted for anything a
// server route depends on. Wrapped in try/catch throughout: localStorage can
// throw or come back empty in a private window or with site data cleared.

const STORAGE_KEY = 'manual_active_profile'

export type ActiveProfile = { id: string; name: string; avatar: string }

export function getStoredProfile(): ActiveProfile | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed?.id !== 'string' || typeof parsed?.name !== 'string') return null
    return parsed as ActiveProfile
  } catch {
    return null
  }
}

export function setStoredProfile(profile: ActiveProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
  } catch {
    // Private window, cleared site data, etc. — the server-side cookie is
    // still what actually gates writes, so this is a degraded display only.
  }
}

export function clearStoredProfile(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // no-op
  }
}
