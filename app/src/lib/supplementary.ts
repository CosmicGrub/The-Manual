// Server-only: reads per-lesson supplementary-foundations sidecar files
// directly off disk — a <slug>.supplementary.json next to <slug>.mdx and
// <slug>.quiz.json, same colocated-sidecar pattern as app/src/lib/quizzes.ts.
// Not ingested by Velite: this is optional, pilot-scope content (CS
// Foundations only for now — see MASTERFILE.md §3.9), and most lessons don't
// have a sidecar at all, so a schema change to the main content pipeline
// would be premature for something this track-partial.
import fs from 'node:fs'
import path from 'node:path'
import { getLessonsByTrack } from '@/lib/content'

const CONTENT_ROOT = path.join(process.cwd(), '..', 'content')

export type SupplementaryResource = {
  title: string
  url: string
  source: string
}

export type SupplementaryConcept = {
  id: string
  title: string
  domain: 'math' | 'science' | 'history'
  explainer: string
  resources: SupplementaryResource[]
}

export function getSupplementaryConcepts(trackId: string, tier: number, slug: string): SupplementaryConcept[] {
  const filePath = path.join(CONTENT_ROOT, trackId, `tier-${tier}`, `${slug}.supplementary.json`)
  if (!fs.existsSync(filePath)) return []
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as SupplementaryConcept[]
}

export type SupplementaryLessonGroup = {
  tier: number
  slug: string
  lessonTitle: string
  concepts: SupplementaryConcept[]
}

/**
 * Every lesson in a track that has supplementary content, in tier/lesson
 * order. Powers the standalone Foundations page and its
 * generateStaticParams gate (a track with zero groups never gets a
 * Foundations route at build time, so there's no empty page to land on).
 */
export function getAllSupplementaryForTrack(trackId: string): SupplementaryLessonGroup[] {
  const groups: SupplementaryLessonGroup[] = []
  for (const lesson of getLessonsByTrack(trackId)) {
    const concepts = getSupplementaryConcepts(trackId, lesson.tier, lesson.slug)
    if (concepts.length > 0) groups.push({ tier: lesson.tier, slug: lesson.slug, lessonTitle: lesson.title, concepts })
  }
  return groups
}
