// Same API shape as app/src/lib/content.ts, reading from this fork's own
// bundled copy of the Velite-compiled lesson index (see velite.config.ts +
// vite.config.ts's alias) instead of app/'s .next pipeline.
import lessons from '#content/lessons.json'
import type { Lesson } from '@the-manual/core'

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

export function getAllTrackIds(): string[] {
  return Array.from(new Set(ALL_LESSONS.map((l) => l.trackId)))
}
