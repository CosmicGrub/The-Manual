// Typed access over the Velite-compiled lesson index (.velite/lessons.json,
// produced by `velite build` from content/**/*.mdx — see velite.config.ts).
// This file is the only place that should import '#content/lessons' directly,
// so every consumer (routes, the precache-manifest script) goes through one
// stable shape.
import lessons from '#content/lessons.json'

export type Lesson = {
  trackId: string
  tier: number
  title: string
  order: number
  estimatedHours: number
  slug: string
  body: string
  moduleId: string
}

const ALL_LESSONS = lessons as Lesson[]

export function getAllLessons(): Lesson[] {
  return ALL_LESSONS
}

export function getLessonsByTrack(trackId: string): Lesson[] {
  return ALL_LESSONS.filter((l) => l.trackId === trackId).sort((a, b) => a.tier - b.tier || a.order - b.order)
}

export function getLessonsByTrackAndTier(trackId: string, tier: number): Lesson[] {
  return ALL_LESSONS.filter((l) => l.trackId === trackId && l.tier === tier).sort((a, b) => a.order - b.order)
}

export function getLesson(trackId: string, tier: number, slug: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.trackId === trackId && l.tier === tier && l.slug === slug)
}

export function getAllLessonParams(): Array<{ trackId: string; tier: string; slug: string }> {
  return ALL_LESSONS.map((l) => ({ trackId: l.trackId, tier: String(l.tier), slug: l.slug }))
}

export function getAllTrackIds(): string[] {
  return Array.from(new Set(ALL_LESSONS.map((l) => l.trackId)))
}
