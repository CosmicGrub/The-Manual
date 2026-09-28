import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ensureUser } from '@/lib/user'

// GET /api/progress?userId=xxx — this learner's status across every module
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  if (!userId) return NextResponse.json({ error: 'userId is required' }, { status: 400 })

  const progress = await db.progress.findMany({ where: { userId } })
  return NextResponse.json({ progress })
}

// POST /api/progress — { userId, moduleId, status } — mark a module started/completed
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { userId, moduleId, status } = body as { userId?: string; moduleId?: string; status?: string }

  if (!userId || !moduleId || !status) {
    return NextResponse.json({ error: 'userId, moduleId, and status are required' }, { status: 400 })
  }
  if (!['not_started', 'in_progress', 'completed'].includes(status)) {
    return NextResponse.json({ error: 'invalid status' }, { status: 400 })
  }

  await ensureUser(userId)
  const progress = await db.progress.upsert({
    where: { userId_moduleId: { userId, moduleId } },
    create: { userId, moduleId, status },
    update: { status },
  })

  return NextResponse.json({ progress })
}
