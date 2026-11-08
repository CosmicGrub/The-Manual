// Same role as app/src/lib/quizzes.ts, but reading from this fork's bundled
// quiz index (scripts/gen-quiz-index.mjs's output) instead of the
// filesystem — there's no server/fs access at runtime here.
import quizzes from '#content/quizzes.json'
import type { QuizQuestion } from '@the-manual/core'

const QUIZ_INDEX = quizzes as Record<string, QuizQuestion[]>

export function getQuizQuestions(moduleId: string): QuizQuestion[] {
  return QUIZ_INDEX[moduleId] ?? []
}

/**
 * A ReviewState itemId (for itemType "quiz_question") is the question's own
 * id, e.g. "cs-foundations/tier-0/what-is-a-computer/q3" —
 * <trackId>/tier-<n>/<slug>/<qId>. Parses that back to the source module and
 * returns the actual question, same scheme app/'s version uses.
 */
export function resolveQuizQuestionItem(itemId: string): QuizQuestion | undefined {
  const match = itemId.match(/^(.+\/tier-\d+\/[^/]+)\/(q\d+)$/)
  if (!match) return undefined
  const [, moduleId] = match
  if (!moduleId) return undefined
  return getQuizQuestions(moduleId).find((q) => q.id === itemId)
}
