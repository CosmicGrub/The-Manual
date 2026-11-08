import type { QuizQuestion } from './types'

/**
 * Grading is intentionally simple/local for multiple-choice and short-answer
 * (exact/contains match against acceptedAnswers); explain-back questions are
 * self-graded by the learner — the point is retrieval practice and
 * articulation, not a strict oracle. Pure function, no network/storage:
 * shared verbatim by both forks' quiz UI.
 */
export function isCorrect(q: QuizQuestion, answer: string | number | undefined): boolean {
  if (q.type === 'multiple_choice') return answer === q.correctIndex
  if (q.type === 'short_answer') {
    const given = String(answer ?? '').trim().toLowerCase()
    return q.acceptedAnswers.some((accepted) => accepted.toLowerCase() === given)
  }
  return true // explain_back is self-graded, never counted as "missed"
}

export function gradeQuiz(
  questions: QuizQuestion[],
  answers: Record<string, string | number>
): { score: number; missedQuestionIds: string[] } {
  const gradable = questions.filter((q) => q.type !== 'explain_back')
  const missed = gradable.filter((q) => !isCorrect(q, answers[q.id]))
  const score = gradable.length === 0 ? 1 : (gradable.length - missed.length) / gradable.length
  return { score, missedQuestionIds: missed.map((q) => q.id) }
}
