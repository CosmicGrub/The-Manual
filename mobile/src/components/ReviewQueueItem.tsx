import { useState } from 'react'
import type { QuizQuestion } from '@the-manual/core'
import { gradeReviewItem } from '../db/repository'

const GRADE_LABELS = ['Blackout', 'Wrong, familiar', 'Wrong, close', 'Hard but right', 'Easy', 'Instant']

// Ported from app/'s ReviewQueueItem.tsx — carries over the 2026-11-08
// in-flight guard (a fast double-tap across two grade buttons can't fire
// two grades) and the accessible ~44px touch targets from the same audit.
export function ReviewQueueItem({
  profileId,
  itemId,
  itemType,
  question,
}: {
  profileId: string
  itemId: string
  itemType: string
  question?: QuizQuestion
}) {
  const [revealed, setRevealed] = useState(false)
  const [graded, setGraded] = useState<'idle' | 'done' | 'error'>('idle')
  const [submitting, setSubmitting] = useState(false)

  async function grade(score: number) {
    if (submitting) return
    setSubmitting(true)
    try {
      await gradeReviewItem(profileId, itemId, itemType, score)
      setGraded('done')
    } catch {
      setGraded('error')
    }
    setSubmitting(false)
  }

  if (graded === 'error') {
    return <li className="border rounded-lg p-4 text-sm text-red-600">Failed to save — try again.</li>
  }

  if (graded !== 'idle') {
    return <li className="border rounded-lg p-4 text-sm text-neutral-500">Graded. Next review scheduled via SM-2.</li>
  }

  return (
    <li className="border rounded-lg p-4 space-y-3">
      <p className="font-medium">{question?.prompt ?? itemId}</p>

      {!revealed ? (
        <button onClick={() => setRevealed(true)} className="text-sm underline">
          Reveal / think it through first
        </button>
      ) : (
        <>
          {question?.type === 'multiple_choice' && <p className="text-sm text-neutral-500">Correct answer: {question.choices[question.correctIndex]}</p>}
          {question?.type === 'short_answer' && <p className="text-sm text-neutral-500">Accepted: {question.acceptedAnswers.join(', ')}</p>}
          <p className="text-sm">How well did you recall it?</p>
          <div className="flex flex-wrap gap-2">
            {GRADE_LABELS.map((label, i) => (
              <button
                key={i}
                onClick={() => grade(i)}
                disabled={submitting}
                className="min-h-11 px-4 py-2.5 rounded border border-neutral-300 dark:border-neutral-700 text-sm disabled:opacity-50"
              >
                {i} — {label}
              </button>
            ))}
          </div>
        </>
      )}
    </li>
  )
}
