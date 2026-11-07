import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ensureUser } from '@/lib/user'

// POST /api/quiz-attempts — { userId, moduleId, score, answers, missedQuestionIds }
// Records one attempt at a module's whole quiz set, rolls it into the module's
// mastery score, and seeds a ReviewState per missed QUESTION (not per module) so
// spaced repetition targets exactly what was gotten wrong.
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { userId, moduleId, score, answers, missedQuestionIds } = body as {
    userId?: string
    moduleId?: string
    score?: number
    answers?: unknown
    missedQuestionIds?: unknown
  }

  if (typeof userId !== 'string' || !userId || typeof moduleId !== 'string' || !moduleId || typeof score !== 'number') {
    return NextResponse.json({ error: 'userId, moduleId, and score are required' }, { status: 400 })
  }
  if (score < 0 || score > 1) {
    return NextResponse.json({ error: 'score must be 0..1' }, { status: 400 })
  }
  const missed = Array.isArray(missedQuestionIds) ? missedQuestionIds.filter((id): id is string => typeof id === 'string') : []

  try {
    const [attempt] = await db.$transaction(async (tx) => {
      await ensureUser(userId, tx)
      const attempt = await tx.quizAttempt.create({
        data: { userId, moduleId, score, answers: JSON.stringify(answers ?? {}) },
      })

      // Real rolling average, not a last-write-wins overwrite: recompute from
      // every QuizAttempt this learner has made on this module, including the
      // one just created above.
      const agg = await tx.quizAttempt.aggregate({
        where: { userId, moduleId },
        _avg: { score: true },
      })
      await tx.progress.upsert({
        where: { userId_moduleId: { userId, moduleId } },
        create: { userId, moduleId, status: 'in_progress', masteryScore: agg._avg.score ?? score },
        update: { status: 'in_progress', masteryScore: agg._avg.score ?? score },
      })

      for (const questionId of missed) {
        await tx.reviewState.upsert({
          where: { userId_itemId_itemType: { userId, itemId: questionId, itemType: 'quiz_question' } },
          create: { userId, itemId: questionId, itemType: 'quiz_question' },
          update: { dueAt: new Date() }, // due again immediately — SM-2 grading happens on next review
        })
      }

      return [attempt]
    })

    return NextResponse.json({ attempt })
  } catch (err) {
    console.error('POST /api/quiz-attempts failed:', err)
    return NextResponse.json({ error: 'failed to record quiz attempt' }, { status: 500 })
  }
}
