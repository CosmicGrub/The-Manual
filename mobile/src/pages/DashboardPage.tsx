import { useEffect, useState } from 'react'
import { TRACKS, getTrackName, suggestedNextForTrack, type SuggestedNext } from '@the-manual/core'
import { getProgress } from '../db/repository'
import { getLessonsByTrack } from '../lib/content'
import { SkillTree, type TrackSummary } from '../components/SkillTree'
import { navigate } from '../router'
import type { Profile } from '../db/repository'

export function DashboardPage({ profile }: { profile: Profile }) {
  const [tracks, setTracks] = useState<TrackSummary[] | null>(null)
  const [suggestions, setSuggestions] = useState<SuggestedNext[]>([])

  useEffect(() => {
    let cancelled = false
    getProgress(profile.id).then((progress) => {
      if (cancelled) return

      const summaries: TrackSummary[] = TRACKS.map((track) => {
        const tierStatus: TrackSummary['tierStatus'] = [0, 1, 2, 3, 4, 5].map((tier) => {
          const inTier = progress.filter((p) => p.moduleId.startsWith(`${track.id}/tier-${tier}/`))
          if (inTier.length === 0) return 'locked'
          if (inTier.every((p) => p.status === 'completed')) return 'completed'
          return 'in_progress'
        })
        return { id: track.id, name: track.name, tierStatus }
      })
      setTracks(summaries)

      const startedTrackIds = new Set(progress.map((p) => p.moduleId.split('/')[0]))
      const next = TRACKS.filter((t) => startedTrackIds.has(t.id))
        .map((t) => suggestedNextForTrack(t.id, getLessonsByTrack(t.id), progress))
        .filter((s): s is SuggestedNext => s !== null)
      setSuggestions(next)
    })
    return () => {
      cancelled = true
    }
  }, [profile.id])

  if (!tracks) return null

  return (
    <main className="space-y-8 px-4 pb-10">
      <header className="pt-6">
        <h1 className="text-2xl font-semibold">The Manual</h1>
        <p className="text-neutral-500">
          Welcome back, {profile.name}. Here's where you stand across all 9 tracks.
        </p>
      </header>

      {suggestions.length > 0 && (
        <section>
          <h2 className="text-lg font-medium mb-2">Continue learning</h2>
          <ul className="space-y-2">
            {suggestions.map((s) => (
              <li key={s.trackId}>
                <button
                  onClick={() => navigate(`/tracks/${s.trackId}/${s.tier}/${s.slug}`)}
                  className="block w-full text-left border rounded-lg p-3 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                >
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-neutral-500">
                    {getTrackName(s.trackId)} · Tier {s.tier} · ~{s.estimatedHours}h
                    {s.reason === 'revisit-weak' && ' · weak mastery here — worth another pass before moving on'}
                    {s.reason === 'continue' && ' · continue where you left off'}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <SkillTree tracks={tracks} />

      <div className="flex flex-wrap gap-3">
        <button onClick={() => navigate('/review')} className="inline-block px-4 py-2 rounded-md bg-neutral-900 text-white">
          Go to today's spaced-repetition review
        </button>
      </div>
    </main>
  )
}
