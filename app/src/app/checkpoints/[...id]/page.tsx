import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllCheckpointBriefs, getCheckpointBrief } from '@/lib/curriculumDocs'
import { DEFAULT_RUBRIC_ITEMS } from '@/lib/checkpoints'
import { TIER_LABELS, getTrackName } from '@/lib/tracks'
import { CheckpointSubmissionForm } from '@/components/CheckpointSubmissionForm'
import { RequireProfile } from '@/components/RequireProfile'

// One statically generated page per checkpoint (54 total: 9 tracks x 6
// tiers) — same offline-safe pattern as the lesson pages, see
// MASTERFILE.md §3.8. The id ("<trackId>/tier-<tier>/checkpoint", matching
// Checkpoint.id in schema.prisma) contains slashes, hence the catch-all
// [...id] segment instead of a single [id].
export function generateStaticParams() {
  return getAllCheckpointBriefs().map((c) => ({ id: c.id.split('/') }))
}

export default async function CheckpointPage(props: { params: Promise<{ id: string[] }> }) {
  const params = await props.params;
  const checkpointId = params.id.join('/')
  const checkpoint = getCheckpointBrief(checkpointId)
  if (!checkpoint) notFound()

  return (
    <main className="space-y-8">
      <header>
        <Link href={`/tracks/${checkpoint.trackId}`} className="inline-block py-2 text-sm text-neutral-500 hover:underline">
          ← {getTrackName(checkpoint.trackId)}
        </Link>
        <h1 className="text-2xl font-semibold mt-1">{checkpoint.title}</h1>
        <p className="text-sm text-neutral-500">
          Tier {checkpoint.tier} · {TIER_LABELS[checkpoint.tier]} · gate to the next tier
        </p>
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none">
        <p>{checkpoint.brief}</p>
      </article>

      <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-6">
        <h2 className="text-lg font-medium">Submit your checkpoint</h2>
        <RequireProfile>
          <CheckpointSubmissionForm checkpointId={checkpoint.id} rubricItems={DEFAULT_RUBRIC_ITEMS} />
        </RequireProfile>
      </section>
    </main>
  )
}
