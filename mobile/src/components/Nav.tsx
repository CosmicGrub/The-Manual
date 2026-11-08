import { navigate } from '../router'
import type { Profile } from '../db/repository'

// Mirrors app/'s ProfileBar — shows the active profile and a way to switch,
// no sign-out concept (same reasoning as app/, just doubly true here: there
// is no session of any kind to end, not even a local one).
export function Nav({ profile }: { profile: Profile | null }) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
      <button onClick={() => navigate('/')} className="font-semibold text-lg">
        The Manual
      </button>
      <div className="flex items-center gap-3 text-sm">
        {profile ? (
          <>
            <button onClick={() => navigate('/review')} className="text-neutral-500 hover:underline">
              Review
            </button>
            <span>{profile.name}</span>
            <button onClick={() => navigate('/profiles')} className="text-neutral-500 underline">
              Switch profile
            </button>
          </>
        ) : (
          <button onClick={() => navigate('/profiles')} className="text-neutral-500 underline">
            Choose a profile
          </button>
        )}
      </div>
    </header>
  )
}
