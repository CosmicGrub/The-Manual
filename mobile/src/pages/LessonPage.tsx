import { useState } from 'react'
import { getTrackName } from '@the-manual/core'
import { getLesson } from '../lib/content'
import { getQuizQuestions } from '../lib/quizzes'
import { upsertProgress } from '../db/repository'
import { QuizRunner } from '../components/QuizRunner'
import { navigate } from '../router'
import type { Profile } from '../db/repository'

export function LessonPage({ profile, trackId, tier, slug }: { profile: Profile; trackId: string; tier: number; slug: string }) {
  const lesson = getLesson(trackId, tier, slug)
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle')

  if (!lesson) {
    return (
      <main className="px-4 pb-10 pt-6">
        <p>Lesson not found.</p>
      </main>
    )
  }

  const questions = getQuizQuestions(lesson.moduleId)

  async function markComplete() {
    setStatus('saving')
    try {
      await upsertProgress(profile.id, lesson!.moduleId, 'completed')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="space-y-8 px-4 pb-10">
      <header className="pt-6">
        <button onClick={() => navigate(`/tracks/${trackId}`)} className="inline-block py-2 text-sm text-neutral-500 hover:underline">
          ← {getTrackName(trackId)}
        </button>
        <h1 className="text-2xl font-semibold mt-1">{lesson.title}</h1>
        <p className="text-sm text-neutral-500">
          Tier {tier} · ~{lesson.estimatedHours}h
        </p>
      </header>

      <article
        className="prose prose-neutral dark:prose-invert max-w-none prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900"
        dangerouslySetInnerHTML={{ __html: lesson.body }}
      />

      {status === 'done' ? (
        <p className="text-sm text-emerald-600">Marked complete.</p>
      ) : status === 'error' ? (
        <p className="text-sm text-red-600">Failed to save — try again.</p>
      ) : (
        <button onClick={markComplete} disabled={status === 'saving'} className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 text-sm">
          {status === 'saving' ? 'Saving…' : 'Mark this lesson complete'}
        </button>
      )}

      {questions.length > 0 && (
        <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-6">
          <h2 className="text-lg font-medium">Check your understanding</h2>
          <QuizRunner profileId={profile.id} moduleId={lesson.moduleId} questions={questions} />
        </section>
      )}
    </main>
  )
}
