import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireUserId } from '@/lib/profile'

// GET /api/progress — this learner's status across every module
export async function GET(req: NextRequest) {
  const userId = await requireUserId(req)
  if (!userId) return NextResponse.json({ error: 'not signed in' }, { status: 401 })

  const progress = await db.progress.findMany({ where: { userId } })
  return NextResponse.json({ progress })
}

// POST /api/progress — { moduleId, status } — mark a module started/completed
export async function POST(req: NextRequest) {
  const userId = await requireUserId(req)
  if (!userId) return NextResponse.json({ error: 'not signed in' }, { status: 401 })

  const body = await req.json()
  const { moduleId, status } = body as { moduleId?: string; status?: string }

  if (typeof moduleId !== 'string' || !moduleId || typeof status !== 'string') {
    return NextResponse.json({ error: 'moduleId and status are required' }, { status: 400 })
  }
  if (!['not_started', 'in_progress', 'completed'].includes(status)) {
    return NextResponse.json({ error: 'invalid status' }, { status: 400 })
  }

  try {
    const progress = await db.progress.upsert({
      where: { userId_moduleId: { userId, moduleId } },
      create: { userId, moduleId, status },
      update: { status },
    })

    return NextResponse.json({ progress })
  } catch (err) {
    console.error('POST /api/progress failed:', err)
    return NextResponse.json({ error: 'failed to update progress' }, { status: 500 })
  }
}
