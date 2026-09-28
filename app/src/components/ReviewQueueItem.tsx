'use client'

import { useState } from 'react'
import { postWithOfflineFallback } from '@/lib/offlineOutbox'
import type { QuizQuestion } from '@/components/QuizRunner'

const GRADE_LABELS = ['Blackout', 'Wrong, familiar', 'Wrong, close', 'Hard but right', 'Easy', 'Instant']

export function ReviewQueueItem({ userId, itemId, itemType, question }: { userId: string; itemId: string; itemType: string; question?: QuizQuestion }) {
  const [revealed, setRevealed] = useState(false)
  const [graded, setGraded] = useState<'idle' | 'queued' | 'done'>('idle')

  async function grade(score: number) {
    const { queued } = await postWithOfflineFallback('/api/review-queue', { userId, itemId, itemType, grade: score })
    setGraded(queued ? 'queued' : 'done')
  }

  if (graded !== 'idle') {
    return (
      <li className="border rounded-lg p-4 text-sm text-neutral-500">
        Graded{graded === 'queued' ? ' offline — will sync once back online' : ''}. Next review scheduled via SM-2.
      </li>
    )
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
          {question?.type === 'multiple_choice' && (
            <p className="text-sm text-neutral-500">Correct answer: {question.choices[question.correctIndex]}</p>
          )}
          {question?.type === 'short_answer' && (
            <p className="text-sm text-neutral-500">Accepted: {question.acceptedAnswers.join(', ')}</p>
          )}
          <p className="text-sm">How well did you recall it?</p>
          <div className="flex flex-wrap gap-2">
            {GRADE_LABELS.map((label, i) => (
              <button key={i} onClick={() => grade(i)} className="px-3 py-1 rounded border border-neutral-300 dark:border-neutral-700 text-sm">
                {i} — {label}
              </button>
            ))}
          </div>
        </>
      )}
    </li>
  )
}
