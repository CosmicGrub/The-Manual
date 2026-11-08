'use client'

import { useState } from 'react'
import { postWithOfflineFallback, saveFailureMessage } from '@/lib/offlineOutbox'
import { gradeQuiz, type QuizQuestion } from '@the-manual/core'

// Re-exported for existing call sites (ReviewQueueItem, lib/quizzes.ts) —
// the type itself now lives in packages/core/src/types.ts, shared with
// mobile/'s quiz UI.
export type { QuizQuestion }

type Props = {
  moduleId: string
  questions: QuizQuestion[]
  onComplete?: (score: number) => void
}

/**
 * Generic quiz runner. Grading is intentionally simple/local for multiple-choice
 * and short-answer (exact/contains match against acceptedAnswers); explain-back
 * questions are self-graded by the learner — the point is retrieval practice and
 * articulation, not a strict oracle. Submits to /api/quiz-attempts, which is what
 * updates Progress and seeds spaced-repetition review for missed items.
 */
export function QuizRunner({ moduleId, questions, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [savedOffline, setSavedOffline] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  function grade(): { score: number; missedQuestionIds: string[] } {
    return gradeQuiz(questions, answers)
  }

  async function handleSubmit() {
    const { score: finalScore, missedQuestionIds } = grade()
    setScore(finalScore)
    setSubmitted(true)

    // No network round-trip required to grade or to keep the attempt: it's
    // queued locally (IndexedDB) and replayed automatically once the device
    // — or the PC it talks to over LAN — is reachable again. See
    // app/src/lib/offlineOutbox.ts and MASTERFILE.md §3.8. No userId in the
    // body — the server derives it from the active-profile cookie.
    const result = await postWithOfflineFallback('/api/quiz-attempts', {
      moduleId,
      score: finalScore,
      answers,
      missedQuestionIds,
    })
    setSavedOffline(result.queued)
    if (!result.ok && !result.queued) setSaveError(saveFailureMessage(result.status))

    onComplete?.(finalScore)
  }

  return (
    <div className="space-y-6">
      {questions.map((q) => (
        <div key={q.id} className="border rounded-lg p-4">
          {q.type === 'multiple_choice' ? (
            <fieldset>
              <legend className="font-medium mb-2">{q.prompt}</legend>
              {q.choices.map((choice, i) => (
                <label key={i} className="flex items-center gap-2 py-2">
                  <input
                    type="radio"
                    name={q.id}
                    disabled={submitted}
                    checked={answers[q.id] === i}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
                  />
                  {choice}
                </label>
              ))}
            </fieldset>
          ) : (
            <label htmlFor={q.id} className="font-medium mb-2 block">
              {q.prompt}
            </label>
          )}

          {q.type === 'short_answer' && (
            <input
              id={q.id}
              type="text"
              disabled={submitted}
              className="border rounded px-2 py-1 w-full"
              value={(answers[q.id] as string) ?? ''}
              onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
            />
          )}

          {q.type === 'explain_back' && (
            <textarea
              id={q.id}
              disabled={submitted}
              className="border rounded px-2 py-1 w-full"
              rows={4}
              placeholder="Explain this back in your own words, as if teaching someone else…"
              value={(answers[q.id] as string) ?? ''}
              onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
            />
          )}
        </div>
      ))}

      {!submitted ? (
        <button onClick={handleSubmit} className="px-4 py-2 rounded-md bg-neutral-900 text-white">
          Submit
        </button>
      ) : (
        <p className="font-medium">
          {score !== null && `Score: ${Math.round(score * 100)}%`} — missed items will resurface for spaced review.
          {savedOffline && ' (Saved offline — will sync automatically once you\'re back online.)'}
        </p>
      )}
      {saveError && (
        <p className="text-sm text-red-600">
          {saveError}{' '}
          {saveError.includes('No active profile') && (
            <a href="/profiles" className="underline">
              Pick a profile
            </a>
          )}
        </p>
      )}
    </div>
  )
}
