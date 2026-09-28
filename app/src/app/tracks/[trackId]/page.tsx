import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllTrackIds, getLessonsByTrackAndTier } from '@/lib/content'
import { TRACKS, TIER_LABELS, getTrackName } from '@/lib/tracks'

// Statically generated at build time for every track — this page has zero
// server dependency once built, which is what makes it work fully offline
// after the service worker precaches it. See MASTERFILE.md §3.8.
export function generateStaticParams() {
  return TRACKS.map((t) => ({ trackId: t.id }))
}

export default function TrackPage({ params }: { params: { trackId: string } }) {
  const { trackId } = params
  if (!getAllTrackIds().includes(trackId)) notFound()

  return (
    <main className="space-y-8">
      <header>
        <Link href="/" className="text-sm text-neutral-500 hover:underline">
          ← Dashboard
        </Link>
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
              <p className="text-sm text-neutral-500 mt-1">No lessons written yet — see docs/curriculum/{trackId}.md for the syllabus.</p>
            ) : (
              <ul className="mt-2 space-y-1">
                {lessons.map((lesson) => (
                  <li key={lesson.slug}>
                    <Link href={`/tracks/${trackId}/${tier}/${lesson.slug}`} className="text-neutral-900 dark:text-neutral-100 hover:underline">
                      {lesson.title}
                    </Link>
                    <span className="text-sm text-neutral-500"> — ~{lesson.estimatedHours}h</span>
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
