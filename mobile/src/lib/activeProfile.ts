// This fork has no server, so there's no cookie/localStorage split the way
// app/'s profile.ts (server-trusted cookie) + profileClient.ts
// (display-only localStorage cache) need — one localStorage value is the
// single source of truth for "which profile is active on this device."
const STORAGE_KEY = 'manual_active_profile_id'

export function getActiveProfileId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function setActiveProfileId(id: string): void {
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // no-op — private mode / cleared storage; the picker will just ask again
  }
}

export function clearActiveProfileId(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // no-op
  }
}
