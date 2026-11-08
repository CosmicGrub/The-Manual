'use client'

import { useState } from 'react'
import { setStoredProfile } from '@/lib/profileClient'
import { AVATAR_TOKENS, AVATAR_COLORS, type AvatarToken } from '@/lib/profileAvatars'

type ProfileSummary = { id: string; name: string; avatar: string }

function Avatar({ name, avatar, size = 56 }: { name: string; avatar: string; size?: number }) {
  const color = AVATAR_COLORS[avatar as AvatarToken] ?? AVATAR_COLORS.blue
  const initials = name.trim().slice(0, 2).toUpperCase()
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-semibold shrink-0"
      style={{ width: size, height: size, backgroundColor: color, fontSize: size * 0.36 }}
      aria-hidden="true"
    >
      {initials}
    </div>
  )
}

export function ProfilePicker({ profiles }: { profiles: ProfileSummary[] }) {
  const [selecting, setSelecting] = useState<string | null>(null)
  const [adding, setAdding] = useState(profiles.length === 0)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState<AvatarToken>('blue')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function selectProfile(profile: ProfileSummary) {
    setSelecting(profile.id)
    setError(null)
    const res = await fetch('/api/profile/select', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profileId: profile.id }),
    })
    if (!res.ok) {
      setSelecting(null)
      setError("Couldn't select that profile — try again.")
      return
    }
    setStoredProfile(profile)
    // A full navigation, not router.push — the root layout (ProfileBar,
    // RequireProfile on whatever page comes next) only reads localStorage
    // once on mount, and since it persists across client-side transitions,
    // a soft push would leave it showing the pre-selection "no profile"
    // state. A real reload guarantees every profile-aware component mounts
    // fresh. Found live: the dashboard's own "Welcome back, <name>" (read
    // server-side from the cookie) was correct while the profile bar still
    // said "Choose a profile" until this fix.
    window.location.href = '/'
  }

  async function createProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSubmitting(true)
    setError(null)

    const createRes = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), avatar }),
    })
    if (!createRes.ok) {
      setSubmitting(false)
      setError("Couldn't create that profile — try again.")
      return
    }
    const { profile } = await createRes.json()
    await selectProfile(profile)
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      {profiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => selectProfile(profile)}
              disabled={selecting !== null}
              className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 disabled:opacity-50 min-h-[104px]"
            >
              <Avatar name={profile.name} avatar={profile.avatar} />
              <span className="text-sm font-medium truncate w-full text-center">
                {selecting === profile.id ? 'Loading…' : profile.name}
              </span>
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600">{error}</p>}

      {adding ? (
        <form onSubmit={createProfile} className="space-y-4 border rounded-lg p-4">
          <div>
            <label htmlFor="profile-name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              id="profile-name"
              type="text"
              required
              maxLength={40}
              autoFocus
              className="border rounded px-2 py-1 w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-medium mb-2">Avatar color</legend>
            <div className="flex gap-2">
              {AVATAR_TOKENS.map((token) => (
                <button
                  key={token}
                  type="button"
                  onClick={() => setAvatar(token)}
                  aria-label={`${token} avatar color`}
                  aria-pressed={avatar === token}
                  className="rounded-full min-h-11 min-w-11 flex items-center justify-center"
                  style={{
                    backgroundColor: AVATAR_COLORS[token],
                    outline: avatar === token ? '2px solid currentColor' : 'none',
                    outlineOffset: 2,
                  }}
                >
                  {avatar === token && <span className="text-white text-xs">✓</span>}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={submitting || !name.trim()}
              className="px-4 py-2 rounded-md bg-neutral-900 text-white disabled:opacity-50"
            >
              {submitting ? 'Creating…' : 'Create profile'}
            </button>
            {profiles.length > 0 && (
              <button type="button" onClick={() => setAdding(false)} className="px-4 py-2 text-sm underline">
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="w-full px-4 py-2 rounded-md border border-dashed border-neutral-300 dark:border-neutral-700 text-sm text-neutral-500 min-h-11"
        >
          + Add a profile
        </button>
      )}
    </div>
  )
}
