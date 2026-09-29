'use client'

import { useState } from 'react'
import { postWithOfflineFallback } from '@/lib/offlineOutbox'

export type QuizQuestion =
  | { id: string; type: 'multiple_choice'; prompt: string; choices: string[]; correctIndex: number }
  | { id: string; type: 'short_answer'; prompt: string; acceptedAnswers: string[] }
  | { id: string; type: 'explain_back'; prompt: string }

type Props = {
  moduleId: string
  userId: string
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
export function QuizRunner({ moduleId, userId, questions, onComplete }: Props) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [savedOffline, setSavedOffline] = useState(false)

  function isCorrect(q: QuizQuestion): boolean {
    const a = answers[q.id]
    if (q.type === 'multiple_choice') return a === q.correctIndex
    if (q.type === 'short_answer') {
      const given = String(a ?? '').trim().toLowerCase()
      return q.acceptedAnswers.some((accepted) => accepted.toLowerCase() === given)
    }
    return true // explain_back is self-graded, never counted as "missed"
  }

  function grade(): { score: number; missedQuestionIds: string[] } {
    const gradable = questions.filter((q) => q.type !== 'explain_back')
    const missed = gradable.filter((q) => !isCorrect(q))
    const score = gradable.length === 0 ? 1 : (gradable.length - missed.length) / gradable.length
    return { score, missedQuestionIds: missed.map((q) => q.id) }
  }

  async function handleSubmit() {
    const { score: finalScore, missedQuestionIds } = grade()
    setScore(finalScore)
    setSubmitted(true)

    // No network round-trip required to grade or to keep the attempt: it's
    // queued locally (IndexedDB) and replayed automatically once the device
    // — or the PC it talks to over LAN — is reachable again. See
    // app/src/lib/offlineOutbox.ts and MASTERFILE.md §3.8.
    const { queued } = await postWithOfflineFallback('/api/quiz-attempts', {
      userId,
      moduleId,
      score: finalScore,
      answers,
      missedQuestionIds,
    })
    setSavedOffline(queued)

    onComplete?.(finalScore)
  }

  return (
    <div className="space-y-6">
      {questions.map((q) => (
        <div key={q.id} className="border rounded-lg p-4">
          <p className="font-medium mb-2">{q.prompt}</p>

          {q.type === 'multiple_choice' &&
            q.choices.map((choice, i) => (
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

          {q.type === 'short_answer' && (
            <input
              type="text"
              disabled={submitted}
              className="border rounded px-2 py-1 w-full"
              value={(answers[q.id] as string) ?? ''}
              onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
            />
          )}

          {q.type === 'explain_back' && (
            <textarea
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
    </div>
  )
}
