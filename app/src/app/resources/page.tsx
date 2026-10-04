import { Suspense } from 'react'
import Link from 'next/link'
import { getAllResources } from '@/lib/curriculumDocs'
import { TRACKS } from '@/lib/tracks'
import { ResourceLibrary } from '@/components/ResourceLibrary'

// No DB access, no params — statically generated once at build time, same
// as /tracks/[trackId]. Reads docs/curriculum/*.md directly (see
// curriculumDocs.ts), so it's as current as the last build, not the last
// request — fine for curated reading material, unlike per-user progress.
export default function ResourcesPage() {
  const resources = getAllResources()

  return (
    <main className="space-y-8">
      <header>
        <Link href="/" className="inline-block py-2 text-sm text-neutral-500 hover:underline">
          ← Dashboard
        </Link>
        <h1 className="text-2xl font-semibold mt-1">Resource Library</h1>
        <p className="text-neutral-500">{resources.length} curated resources — free courses, books, and docs — pulled from every track's syllabus.</p>
      </header>

      <Suspense>
        <ResourceLibrary resources={resources} tracks={TRACKS.map((t) => ({ id: t.id, name: t.name }))} />
      </Suspense>
    </main>
  )
}
