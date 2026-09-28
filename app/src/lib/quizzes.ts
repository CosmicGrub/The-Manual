// Server-only: reads a lesson's sibling `<slug>.quiz.json` directly off disk.
// Not ingested by Velite (only *.mdx is) — quiz files are small and read
// straightforwardly at build time (these pages are statically generated, see
// app/src/app/tracks/[trackId]/[tier]/[slug]/page.tsx), so a second content
// pipeline would be pure ceremony. Questions end up embedded in that page's
// static output, which is exactly what makes them available offline with no
// separate fetch — see docs/running-on-your-devices.md and MASTERFILE.md §3.8.
import fs from 'node:fs'
import path from 'node:path'
import type { QuizQuestion } from '@/components/QuizRunner'

const CONTENT_ROOT = path.join(process.cwd(), '..', 'content')

export function getQuizQuestions(trackId: string, tier: number, slug: string): QuizQuestion[] {
  const quizPath = path.join(CONTENT_ROOT, trackId, `tier-${tier}`, `${slug}.quiz.json`)
  if (!fs.existsSync(quizPath)) return []
  return JSON.parse(fs.readFileSync(quizPath, 'utf-8')) as QuizQuestion[]
}

/**
 * A ReviewState.itemId (for itemType "quiz_question") is the question's own id,
 * e.g. "cs-foundations/tier-0/what-is-a-computer/q3" — <trackId>/tier-<n>/<slug>/<qId>,
 * matching the id scheme every generated quiz.json uses. Parses that back to the
 * source quiz file and returns the actual question, so the /review page can show
 * more than a bare id.
 */
export function resolveQuizQuestionItem(itemId: string): QuizQuestion | undefined {
  const match = itemId.match(/^(.+)\/tier-(\d+)\/(.+)\/(q\d+)$/)
  if (!match) return undefined
  const [, trackId, tierStr, slug] = match
  const questions = getQuizQuestions(trackId, Number(tierStr), slug)
  return questions.find((q) => q.id === itemId)
}
