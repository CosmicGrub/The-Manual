import { TIER_LABELS, getTrackName } from '@the-manual/core'
import { getLessonsByTrackAndTier } from '../lib/content'
import { navigate } from '../router'

// Ported from app/'s /tracks/[trackId]/page.tsx. Checkpoint submission and
// the resource library are out of scope for this fork's v1 (see
// MASTERFILE.md §3.6.5) — those links are intentionally dropped here rather
// than pointing at routes that don't exist yet.
export function TrackPage({ trackId }: { trackId: string }) {
  return (
    <main className="space-y-8 px-4 pb-10">
      <header className="pt-6">
        <button onClick={() => navigate('/')} className="inline-block py-2 text-sm text-neutral-500 hover:underline">
          ← Dashboard
        </button>
        <h1 className="text-2xl font-semibold mt-1">{getTrackName(trackId)}</h1>
      </header>

      {[0, 1, 2, 3, 4, 5].map((tier) => {
        const lessons = getLessonsByTrackAndTier(trackId, tier)
        return (
          <section key={tier}>
            <h2 className="text-lg font-medium">
              Tier {tier}: {TIER_LABELS[tier]}
            </h2>
            {lessons.length === 0 ? (
              <p className="text-sm text-neutral-500 mt-1">No lessons written yet.</p>
            ) : (
              <ul className="mt-2">
                {lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <button
                      onClick={() => navigate(`/tracks/${trackId}/${tier}/${lesson.slug}`)}
                      className="block w-full text-left py-2 -mx-2 px-2 rounded text-neutral-900 dark:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:underline"
                    >
                      {lesson.title}
                      <span className="text-sm text-neutral-500 font-normal"> — ~{lesson.estimatedHours}h</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )
      })}
    </main>
  )
}
