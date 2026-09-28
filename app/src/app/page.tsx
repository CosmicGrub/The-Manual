import { db } from '@/lib/db'
import { TRACKS } from '@/lib/tracks'
import { SkillTree, type TrackSummary } from '@/components/SkillTree'
import { getOrCreateDefaultUser } from '@/lib/user'

// Dynamic by nature (per-user progress, read live) — must not be statically
// prerendered. Without this, `next build` tries to prerender it at build
// time (before a DB exists, e.g. in the Docker build stage — see
// docker-entrypoint.sh) and fails outright. See MASTERFILE.md §3.8.
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await getOrCreateDefaultUser()
  const progress = await db.progress.findMany({ where: { userId: user.id } })

  const tracks: TrackSummary[] = TRACKS.map((track) => {
    const tierStatus: TrackSummary['tierStatus'] = [0, 1, 2, 3, 4, 5].map((tier) => {
      const inTier = progress.filter((p) => p.moduleId.startsWith(`${track.id}/tier-${tier}/`))
      if (inTier.length === 0) return 'locked'
      if (inTier.every((p) => p.status === 'completed')) return 'completed'
      return 'in_progress'
    })
    return { id: track.id, name: track.name, tierStatus }
  })

  return (
    <main className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold">The Manual</h1>
        <p className="text-neutral-500">Welcome back, {user.name}. Here's where you stand across all 9 tracks.</p>
      </header>

      <SkillTree tracks={tracks} />

      <a href="/review" className="inline-block px-4 py-2 rounded-md bg-neutral-900 text-white">
        Go to today's spaced-repetition review
      </a>
    </main>
  )
}
