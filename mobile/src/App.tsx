import { useEffect, useState } from 'react'
import { useHashPath } from './router'
import { getActiveProfileId } from './lib/activeProfile'
import { getProfile, type Profile } from './db/repository'
import { Nav } from './components/Nav'
import { ProfilesPage } from './pages/ProfilesPage'
import { DashboardPage } from './pages/DashboardPage'
import { TrackPage } from './pages/TrackPage'
import { LessonPage } from './pages/LessonPage'
import { ReviewPage } from './pages/ReviewPage'

export function App() {
  const path = useHashPath()
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined) // undefined = not checked yet

  useEffect(() => {
    const id = getActiveProfileId()
    if (!id) {
      setProfile(null)
      return
    }
    getProfile(id).then((p) => setProfile(p ?? null))
  }, [])

  if (profile === undefined) return null // first paint, DB not checked yet

  // Any route but the picker itself requires an active profile — same
  // gating role as app/'s server-side redirect('/profiles'), just resolved
  // client-side since there's no server here to redirect from.
  if (!profile && path[0] !== 'profiles') {
    return (
      <div className="min-h-screen">
        <Nav profile={null} />
        <ProfilesPage onSelected={setProfile} />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Nav profile={profile} />
      <Route path={path} profile={profile} onProfileSelected={setProfile} />
    </div>
  )
}

function Route({ path, profile, onProfileSelected }: { path: string[]; profile: Profile | null; onProfileSelected: (p: Profile) => void }) {
  if (path[0] === 'profiles') {
    return <ProfilesPage onSelected={onProfileSelected} />
  }
  if (!profile) return null // shouldn't happen — App already gates on this above

  if (path[0] === 'review') {
    return <ReviewPage profile={profile} />
  }
  if (path[0] === 'tracks' && path[1] && path[2] === undefined) {
    return <TrackPage trackId={path[1]} />
  }
  if (path[0] === 'tracks' && path[1] && path[2] !== undefined && path[3] !== undefined) {
    return <LessonPage profile={profile} trackId={path[1]} tier={Number(path[2])} slug={path[3]} />
  }
  return <DashboardPage profile={profile} />
}
