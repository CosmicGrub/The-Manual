'use client'

import { useState } from 'react'
import { postWithOfflineFallback, saveFailureMessage } from '@/lib/offlineOutbox'
import type { QuizQuestion } from '@/components/QuizRunner'

const GRADE_LABELS = ['Blackout', 'Wrong, familiar', 'Wrong, close', 'Hard but right', 'Easy', 'Instant']

export function ReviewQueueItem({ itemId, itemType, question }: { itemId: string; itemType: string; question?: QuizQuestion }) {
  const [revealed, setRevealed] = useState(false)
  const [graded, setGraded] = useState<'idle' | 'queued' | 'done' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  // Guards against a fast double-tap across two grade buttons firing two
  // POSTs with different grades before the first one re-renders this item
  // out of the grading state — see the 2026-11-08 audit finding.
  const [submitting, setSubmitting] = useState(false)

  async function grade(score: number) {
    if (submitting) return
    setSubmitting(true)
    // No userId in the body — the server derives it from the session
    // cookie, which `fetch()` attaches automatically (same-origin), even on
    // a later offline-queue replay. See api/review-queue/route.ts.
    const result = await postWithOfflineFallback('/api/review-queue', { itemId, itemType, grade: score })
    if (result.ok) setGraded('done')
    else if (result.queued) setGraded('queued')
    else {
      setErrorMessage(saveFailureMessage(result.status))
      setGraded('error')
    }
    setSubmitting(false)
  }

  if (graded === 'error') {
    return (
      <li className="border rounded-lg p-4 text-sm text-red-600">
        {errorMessage}{' '}
        {errorMessage?.includes('signed out') && (
          <a href="/login" className="underline">
            Sign in
          </a>
        )}
      </li>
    )
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
