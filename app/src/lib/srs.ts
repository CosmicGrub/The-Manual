/**
 * SM-2 spaced-repetition scheduling (the classic SuperMemo-2 algorithm).
 * Grade is 0-5 self-reported recall quality: <3 means "forgot", resets the interval.
 */

export type ReviewState = {
  easeFactor: number
  intervalDays: number
  repetitions: number
}

export function nextReviewState(prev: ReviewState, grade: number): ReviewState & { dueInDays: number } {
  if (grade < 0 || grade > 5) throw new Error('grade must be 0..5')

  const easeFactor = Math.max(
    1.3,
    prev.easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  )

  if (grade < 3) {
    return { easeFactor, intervalDays: 1, repetitions: 0, dueInDays: 1 }
  }

  const repetitions = prev.repetitions + 1
  let intervalDays: number
  if (repetitions === 1) intervalDays = 1
  else if (repetitions === 2) intervalDays = 6
  else intervalDays = Math.round(prev.intervalDays * easeFactor)

  return { easeFactor, intervalDays, repetitions, dueInDays: intervalDays }
}
