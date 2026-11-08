import { db } from '@/lib/db'
import { getCheckpointBrief } from '@/lib/curriculumDocs'
import { DEFAULT_RUBRIC_ITEMS } from '@the-manual/core'

// Re-exported for existing call sites (the checkpoint page, the
// checkpoint-submissions API route) — the rubric itself now lives in
// packages/core/src/checkpoints.ts, shared with mobile/.
export { DEFAULT_RUBRIC_ITEMS }

// Checkpoint rows are mirrored from the curriculum docs the same way
// prisma/seed.ts mirrors Module rows from Velite's content index — see that
// file for the primary seeding path. This defensive upsert exists because a
// learner's first interaction with a checkpoint can be its statically
// generated page, submitting before any seed step is guaranteed to have run
// against the current database file.
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
      rubric: JSON.stringify(DEFAULT_RUBRIC_ITEMS),
    },
  })
}
