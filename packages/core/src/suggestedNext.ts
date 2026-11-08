import type { Lesson, ProgressRow } from './types'

// A mastery score below this counts as "weak" even on a lesson marked
// completed — low enough that later lessons built on top of it are a bad
// bet. 0.7 is a judgment call, not derived from data (see MASTERFILE.md
// §3.6: the "smart," population-tuned version of this feature is explicitly
// deferred until there's real multi-session usage to tune against — this is
// the cheap, deterministic version on purpose).
const WEAK_MASTERY_THRESHOLD = 0.7

export type SuggestedNext = {
  trackId: string
  tier: number
  moduleId: string
  slug: string
  title: string
  estimatedHours: number
  reason: 'continue' | 'revisit-weak' | 'next'
}

function isSolid(progress: ProgressRow | undefined): boolean {
  if (!progress) return false
  if (progress.status !== 'completed') return false
  if (progress.masteryScore !== null && progress.masteryScore < WEAK_MASTERY_THRESHOLD) return false
  return true
}

function reasonFor(progress: ProgressRow | undefined): SuggestedNext['reason'] {
  if (!progress || progress.status === 'not_started') return 'next'
  if (progress.status === 'in_progress') return 'continue'
  // Only remaining case a non-solid lesson can reach here: completed, but
  // masteryScore dropped below the weak threshold.
  return 'revisit-weak'
}

/**
 * Deterministic "what's next" for one track: walk tiers in order, skip any
 * tier where every lesson is solid (completed AND not weak), then within the
 * first non-solid tier return the first non-solid lesson in content order.
 * That's the whole algorithm — a weak-but-"completed" lesson earlier in the
 * sequence surfaces before a never-touched lesson later in it, same as a
 * genuinely unmet prerequisite would. No schema change, no population data
 * needed: see MASTERFILE.md §3.6 for why the research-backed adaptive
 * version is deliberately NOT this.
 *
 * Takes the track's lessons as a parameter (already sorted by tier/order)
 * rather than importing a content module directly — each fork supplies its
 * own lesson source (app/'s Velite-built index vs. mobile/'s bundled JSON).
 */
export function suggestedNextForTrack(trackId: string, lessons: Lesson[], progress: ProgressRow[]): SuggestedNext | null {
  const byModuleId = new Map(progress.map((p) => [p.moduleId, p]))

  const byTier = new Map<number, Lesson[]>()
  for (const lesson of lessons) {
    const list = byTier.get(lesson.tier) ?? []
    list.push(lesson)
    byTier.set(lesson.tier, list)
  }

  for (const tier of [0, 1, 2, 3, 4, 5]) {
    const tierLessons = byTier.get(tier)
    if (!tierLessons || tierLessons.length === 0) continue // no content yet — don't block on it

    const tierIsSolid = tierLessons.every((l) => isSolid(byModuleId.get(l.moduleId)))
    if (tierIsSolid) continue

    const target = tierLessons.find((l) => !isSolid(byModuleId.get(l.moduleId)))
    if (!target) continue // shouldn't happen given tierIsSolid was false, but stay defensive

    return {
      trackId,
      tier,
      moduleId: target.moduleId,
      slug: target.slug,
      title: target.title,
      estimatedHours: target.estimatedHours,
      reason: reasonFor(byModuleId.get(target.moduleId)),
    }
  }

  return null // every tier with content is solid — this track is done
}
