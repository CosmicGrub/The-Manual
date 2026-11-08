import { useEffect, useState } from 'react'
import { AVATAR_TOKENS, AVATAR_COLORS, type AvatarToken } from '@the-manual/core'
import { createProfile, listProfiles, type Profile } from '../db/repository'
import { setActiveProfileId } from '../lib/activeProfile'
import { navigate } from '../router'

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

// Mirrors app/'s /profiles + ProfilePicker — same "no password, pick or
// create a local profile" flow, reading/writing on-device SQLite directly
// instead of a POST to a server API route (there is no server in this
// fork).
export function ProfilesPage({ onSelected }: { onSelected: (profile: Profile) => void }) {
  const [profiles, setProfiles] = useState<Profile[] | null>(null)
  const [adding, setAdding] = useState(false)
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState<AvatarToken>('blue')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    listProfiles()
      .then((p) => {
        setProfiles(p)
        setAdding(p.length === 0)
      })
      .catch(() => setError('Could not read the on-device database.'))
  }, [])

  async function selectProfile(profile: Profile) {
    setBusy(true)
    setActiveProfileId(profile.id)
    onSelected(profile)
    navigate('/')
    setBusy(false)
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setBusy(true)
    setError(null)
    try {
      const profile = await createProfile(name.trim(), avatar)
      await selectProfile(profile)
    } catch {
      setError("Couldn't create that profile — try again.")
      setBusy(false)
    }
  }

  return (
    <main className="max-w-lg mx-auto space-y-8 mt-12 px-4">
      <header className="text-center">
        <h1 className="text-2xl font-semibold">The Manual</h1>
        <p className="text-neutral-500 mt-1">Who's using this?</p>
      </header>

      {profiles === null ? null : (
        <div className="space-y-6">
          {profiles.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {profiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => selectProfile(profile)}
                  disabled={busy}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 disabled:opacity-50 min-h-[104px]"
                >
                  <Avatar name={profile.name} avatar={profile.avatar} />
                  <span className="text-sm font-medium truncate w-full text-center">{profile.name}</span>
                </button>
              ))}
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          {adding ? (
            <form onSubmit={handleCreate} className="space-y-4 border rounded-lg p-4">
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
                <button type="submit" disabled={busy || !name.trim()} className="px-4 py-2 rounded-md bg-neutral-900 text-white disabled:opacity-50">
                  {busy ? 'Creating…' : 'Create profile'}
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
      )}
    </main>
  )
}
