import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { nextReviewState } from '@/lib/srs'
import { ensureUser } from '@/lib/user'

// GET /api/review-queue?userId=xxx — items due for spaced-repetition review right now
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 })

  const due = await db.reviewState.findMany({
    where: { userId, dueAt: { lte: new Date() } },
    orderBy: { dueAt: 'asc' },
  })
  return NextResponse.json({ due })
}

// POST /api/review-queue — { userId, itemId, itemType, grade } — self-reported recall (0-5), reschedules via SM-2
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { userId, itemId, itemType, grade } = body as {
    userId?: string
    itemId?: string
    itemType?: string
    grade?: number
  }

  if (!userId || !itemId || !itemType || grade === undefined) {
    return NextResponse.json({ error: 'userId, itemId, itemType, and grade are required' }, { status: 400 })
  }

  await ensureUser(userId)
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
}
