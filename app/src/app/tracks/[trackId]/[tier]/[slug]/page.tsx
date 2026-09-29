import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllLessonParams, getLesson } from '@/lib/content'
import { getQuizQuestions } from '@/lib/quizzes'
import { getTrackName } from '@/lib/tracks'
import { LOCAL_USER_ID } from '@/lib/user'
import { QuizRunner } from '@/components/QuizRunner'
import { LessonProgressButton } from '@/components/LessonProgressButton'

// One statically generated page per lesson (all content baked in at build
// time, quiz questions included) — this is what lets a lesson be fully
// readable and quizzable with zero network connection once the service
// worker has it cached. See MASTERFILE.md §3.8.
export function generateStaticParams() {
  return getAllLessonParams()
}

export default function LessonPage({ params }: { params: { trackId: string; tier: string; slug: string } }) {
  const tier = Number(params.tier)
  const lesson = getLesson(params.trackId, tier, params.slug)
  if (!lesson) notFound()

  const questions = getQuizQuestions(params.trackId, tier, params.slug)
  // No DB access here on purpose — this page is statically generated (offline-safe,
  // see MASTERFILE.md §3.8), so it uses the fixed local-learner id directly rather
  // than a server-side lookup. The row is guaranteed to exist by the time any write
  // actually reaches the API, since getOrCreateDefaultUser() upserts the same id.
  const userId = LOCAL_USER_ID

  return (
    <main className="space-y-8">
      <header>
        <Link href={`/tracks/${params.trackId}`} className="inline-block py-2 text-sm text-neutral-500 hover:underline">
          ← {getTrackName(params.trackId)}
        </Link>
        <h1 className="text-2xl font-semibold mt-1">{lesson.title}</h1>
        <p className="text-sm text-neutral-500">
          Tier {tier} · ~{lesson.estimatedHours}h
        </p>
      </header>

      <article
        className="prose prose-neutral dark:prose-invert max-w-none prose-pre:bg-neutral-100 dark:prose-pre:bg-neutral-900"
        dangerouslySetInnerHTML={{ __html: lesson.body }}
      />

      <LessonProgressButton userId={userId} moduleId={lesson.moduleId} />

      {questions.length > 0 && (
        <section className="space-y-4 border-t border-neutral-200 dark:border-neutral-800 pt-6">
          <h2 className="text-lg font-medium">Check your understanding</h2>
          <QuizRunner moduleId={lesson.moduleId} userId={userId} questions={questions} />
        </section>
      )}
    </main>
  )
}
