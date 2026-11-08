import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { nextReviewState } from '@the-manual/core'
import { requireUserId } from '@/lib/profile'

// GET /api/review-queue — items due for spaced-repetition review right now
export async function GET(req: NextRequest) {
  const userId = await requireUserId(req)
  if (!userId) return NextResponse.json({ error: 'not signed in' }, { status: 401 })

  const due = await db.reviewState.findMany({
    where: { userId, dueAt: { lte: new Date() } },
    orderBy: { dueAt: 'asc' },
  })
  return NextResponse.json({ due })
}

// POST /api/review-queue — { itemId, itemType, grade } — self-reported recall (0-5), reschedules via SM-2
export async function POST(req: NextRequest) {
  const userId = await requireUserId(req)
  if (!userId) return NextResponse.json({ error: 'not signed in' }, { status: 401 })

  const body = await req.json()
  const { itemId, itemType, grade } = body as {
    itemId?: string
    itemType?: string
    grade?: number
  }

  if (!itemId || !itemType || typeof grade !== 'number') {
    return NextResponse.json({ error: 'itemId, itemType, and grade are required' }, { status: 400 })
  }
  if (grade < 0 || grade > 5) {
    return NextResponse.json({ error: 'grade must be 0..5' }, { status: 400 })
  }

  try {
    const existing = await db.reviewState.findUnique({
      where: { userId_itemId_itemType: { userId, itemId, itemType } },
    })
    const prev = existing ?? { easeFactor: 2.5, intervalDays: 0, repetitions: 0 }

    const next = nextReviewState(prev, grade)
    const dueAt = new Date(Date.now() + next.dueInDays * 24 * 60 * 60 * 1000)

    const reviewState = await db.reviewState.upsert({
      where: { userId_itemId_itemType: { userId, itemId, itemType } },
      create: {
        userId,
        itemId,
        itemType,
        easeFactor: next.easeFactor,
        intervalDays: next.intervalDays,
        repetitions: next.repetitions,
        dueAt,
      },
      update: {
        easeFactor: next.easeFactor,
        intervalDays: next.intervalDays,
        repetitions: next.repetitions,
        dueAt,
      },
    })

    return NextResponse.json({ reviewState })
  } catch (err) {
    console.error('POST /api/review-queue failed:', err)
    return NextResponse.json({ error: 'failed to update review state' }, { status: 500 })
  }
}
