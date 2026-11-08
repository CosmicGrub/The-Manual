import { useState } from 'react'
import { gradeQuiz, type QuizQuestion } from '@the-manual/core'
import { recordQuizAttempt } from '../db/repository'

type Props = {
  profileId: string
  moduleId: string
  questions: QuizQuestion[]
}

// Ported from app/'s QuizRunner.tsx, carrying over the 2026-11-08 a11y fix
// (fieldset/legend for multiple-choice, label/htmlFor for short-answer and
// explain-back) — writes straight to on-device SQLite instead of POSTing to
// an API route, and since there's no network in this fork at all, there's
// no offline-outbox/queued-save state to handle: a write either succeeds
// immediately or the on-device DB itself is broken, which is a different,
// much rarer failure than "no connectivity right now."
export function QuizRunner({ profileId, moduleId, questions }: Props) {
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)

  async function handleSubmit() {
    const { score: finalScore, missedQuestionIds } = gradeQuiz(questions, answers)
    setScore(finalScore)
    setSubmitted(true)
    try {
      await recordQuizAttempt(profileId, moduleId, finalScore, answers, missedQuestionIds)
    } catch {
      setSaveError('Failed to save to the on-device database — try again.')
    }
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
        </p>
      )}
      {saveError && <p className="text-sm text-red-600">{saveError}</p>}
    </div>
  )
}
