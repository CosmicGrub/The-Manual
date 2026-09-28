import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

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
    missedQuestionIds?: string[]
  }

  if (!userId || !moduleId || score === undefined) {
    return NextResponse.json({ error: 'userId, moduleId, and score are required' }, { status: 400 })
  }

  const attempt = await db.quizAttempt.create({
    data: { userId, moduleId, score, answers: JSON.stringify(answers ?? {}) },
  })

  await db.progress.upsert({
    where: { userId_moduleId: { userId, moduleId } },
    create: { userId, moduleId, status: 'in_progress', masteryScore: score },
    update: { masteryScore: score },
  })

  for (const questionId of missedQuestionIds ?? []) {
    await db.reviewState.upsert({
      where: { userId_itemId_itemType: { userId, itemId: questionId, itemType: 'quiz_question' } },
      create: { userId, itemId: questionId, itemType: 'quiz_question' },
      update: { dueAt: new Date() }, // due again immediately — SM-2 grading happens on next review
    })
  }

  return NextResponse.json({ attempt })
}
