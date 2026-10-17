import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllTrackIds } from '@/lib/content'
import { getAllSupplementaryForTrack } from '@/lib/supplementary'
import { getTrackName } from '@/lib/tracks'
import { SupplementaryToggle } from '@/components/SupplementaryToggle'

// Statically generated only for tracks that currently have supplementary
// content — the pilot (CS Foundations only, see MASTERFILE.md §3.9). Other
// tracks never get this route built, so there's no empty page to land on;
// the "Foundations" link on /tracks/[trackId] is itself only shown when a
// track has content (see that page), so a learner shouldn't reach a 404
// here through normal navigation.
export function generateStaticParams() {
  return getAllTrackIds()
    .filter((id) => getAllSupplementaryForTrack(id).length > 0)
    .map((trackId) => ({ trackId }))
}

export default function FoundationsPage({ params }: { params: { trackId: string } }) {
  const { trackId } = params
  const groups = getAllSupplementaryForTrack(trackId)
  if (groups.length === 0) notFound()

  return (
    <main className="space-y-8">
      <header className="space-y-2">
        <Link href={`/tracks/${trackId}`} className="inline-block py-2 text-sm text-neutral-500 hover:underline">
          ← {getTrackName(trackId)}
        </Link>
        <h1 className="text-2xl font-semibold">Supplementary Foundations</h1>
        <p className="text-neutral-500">
          Optional math, science, and history behind {getTrackName(trackId)} — read it here on its own, or meet the same concepts inline on each lesson's page under "Check your understanding."
        </p>
        <SupplementaryToggle />
      </header>

      {groups.map((group) => (
        <section key={`${group.tier}/${group.slug}`} className="space-y-3">
          <h2 className="text-lg font-medium">
            <Link href={`/tracks/${trackId}/${group.tier}/${group.slug}`} className="hover:underline">
              {group.lessonTitle}
            </Link>
            <span className="text-sm text-neutral-500 font-normal"> — Tier {group.tier}</span>
          </h2>
          <div className="space-y-4">
            {group.concepts.map((c) => (
              <div key={c.id} className="rounded-lg border border-sky-200 dark:border-sky-900 bg-sky-50/50 dark:bg-sky-950/20 p-4 space-y-2">
                <p className="text-sm">
                  <span className="text-xs uppercase tracking-wide text-sky-700 dark:text-sky-400 mr-2">{c.domain}</span>
                  <span className="font-medium">{c.title}</span>
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">{c.explainer}</p>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  {c.resources.map((r) => (
                    <li key={r.url}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline">
                        {r.title}
                      </a>
                      <span className="text-neutral-500"> — {r.source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
