import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { getActiveProfile } from '@/lib/profile'
import { TRACKS, getTrackName } from '@/lib/tracks'
import { SkillTree, type TrackSummary } from '@/components/SkillTree'
import { SupplementaryToggle } from '@/components/SupplementaryToggle'
import { suggestedNextForTrack } from '@/lib/suggestedNext'

// Dynamic by nature (per-user progress, read live) — must not be statically
// prerendered. Without this, `next build` tries to prerender it at build
// time (before a DB exists, e.g. in the Docker build stage — see
// docker-entrypoint.sh) and fails outright. See MASTERFILE.md §3.8.
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const profile = await getActiveProfile()
  if (!profile) redirect('/profiles')
  const progress = await db.progress.findMany({ where: { userId: profile.id } })

  const tracks: TrackSummary[] = TRACKS.map((track) => {
    const tierStatus: TrackSummary['tierStatus'] = [0, 1, 2, 3, 4, 5].map((tier) => {
      const inTier = progress.filter((p) => p.moduleId.startsWith(`${track.id}/tier-${tier}/`))
      if (inTier.length === 0) return 'locked'
      if (inTier.every((p) => p.status === 'completed')) return 'completed'
      return 'in_progress'
    })
    return { id: track.id, name: track.name, tierStatus }
  })

  // Deterministic "what's next" per track (see lib/suggestedNext.ts) — only
  // for tracks the learner has actually touched, so a brand-new account
  // doesn't get 9 nudges toward tracks they haven't chosen to start yet.
  const startedTrackIds = new Set(progress.map((p) => p.moduleId.split('/')[0]))
  const suggestions = TRACKS.filter((t) => startedTrackIds.has(t.id))
    .map((t) => suggestedNextForTrack(t.id, progress))
    .filter((s): s is NonNullable<typeof s> => s !== null)

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">The Manual</h1>
        <p className="text-neutral-500">Welcome back, {profile.name}. Here's where you stand across all 9 tracks.</p>
      </header>

      {suggestions.length > 0 && (
        <section>
          <h2 className="text-lg font-medium mb-2">Continue learning</h2>
          <ul className="space-y-2">
            {suggestions.map((s) => (
              <li key={s.trackId}>
                <a
                  href={`/tracks/${s.trackId}/${s.tier}/${s.slug}`}
                  className="block border rounded-lg p-3 hover:bg-neutral-50 dark:hover:bg-neutral-900"
                >
                  <p className="font-medium">{s.title}</p>
                  <p className="text-sm text-neutral-500">
                    {getTrackName(s.trackId)} · Tier {s.tier} · ~{s.estimatedHours}h
                    {s.reason === 'revisit-weak' && ' · weak mastery here — worth another pass before moving on'}
                    {s.reason === 'continue' && ' · continue where you left off'}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <SkillTree tracks={tracks} />

      <div className="flex flex-wrap gap-3">
        <a href="/review" className="inline-block px-4 py-2 rounded-md bg-neutral-900 text-white">
          Go to today's spaced-repetition review
        </a>
        <a href="/resources" className="inline-block px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700">
          Browse the resource library
        </a>
      </div>

      <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4">
        <SupplementaryToggle />
      </div>
    </main>
  )
}
