import { db } from '@/lib/db'
import { getCheckpointBrief } from '@/lib/curriculumDocs'

// The curriculum docs' checkpoint briefs (see curriculumDocs.ts) are free
// prose, not a structured per-checkpoint grading rubric — the source material
// doesn't break cleanly into granular pass/fail criteria across all 54 of
// them (phrasing varies: "Rubric-graded on X, Y, Z", "Gate: ...", or no
// trailing grading sentence at all). Rather than regex-mangle inconsistent
// fragments into fake-precise checklist items, every checkpoint gets the
// same self-rubric, matching exactly what MASTERFILE.md §2 defines a
// checkpoint as: rubric-graded, artifact-required. The brief itself (shown
// above this checklist on the page) is the actual grading criteria.
export const DEFAULT_RUBRIC_ITEMS = [
  'I produced the real artifact this checkpoint calls for — not a partial attempt — and linked it below.',
  "It actually works end-to-end — I ran/used it myself before submitting, not just 'it should compile.'",
  'I could explain and defend every design decision in it to a stranger, out loud, right now.',
] as const

// Checkpoint rows are mirrored from the curriculum docs the same way
// prisma/seed.ts mirrors Module rows from Velite's content index — see that
// file for the primary seeding path. This defensive upsert exists for the
// same reason app/src/lib/user.ts's ensureUser() does: a learner's first
// interaction with a checkpoint can be its statically generated page,
// submitting before any seed step is guaranteed to have run against the
// current database file.
export async function ensureCheckpoint(checkpointId: string) {
  const brief = getCheckpointBrief(checkpointId)
  if (!brief) return undefined

  return db.checkpoint.upsert({
    where: { id: brief.id },
    create: {
      id: brief.id,
      trackId: brief.trackId,
      tier: brief.tier,
      title: brief.title,
      rubric: JSON.stringify(DEFAULT_RUBRIC_ITEMS),
    },
    update: {
      trackId: brief.trackId,
      tier: brief.tier,
      title: brief.title,
    },
  })
}
