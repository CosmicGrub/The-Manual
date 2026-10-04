import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { ensureUser } from '@/lib/user'
import { ensureCheckpoint, DEFAULT_RUBRIC_ITEMS } from '@/lib/checkpoints'

// GET /api/checkpoint-submissions?userId=xxx&checkpointId=yyy — this learner's
// submission history for one checkpoint (newest first), so the checkpoint
// page can show past attempts instead of only "submitted, then forgotten."
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  const checkpointId = req.nextUrl.searchParams.get('checkpointId')
  if (!userId || !checkpointId) {
    return NextResponse.json({ error: 'userId and checkpointId are required' }, { status: 400 })
  }

  const submissions = await db.checkpointSubmission.findMany({
    where: { userId, checkpointId },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ submissions })
}

// POST /api/checkpoint-submissions — { userId, checkpointId, artifactUrl, selfRubric }
// selfRubric is a boolean[] aligned to DEFAULT_RUBRIC_ITEMS' order (see
// src/lib/checkpoints.ts). Self-graded, same spirit as the quiz's
// explain_back questions: status reflects what the learner themself
// checked, not an external grader — "needs_revision" is an honest, useful
// outcome here, not a failure state to hide.
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { userId, checkpointId, artifactUrl, selfRubric } = body as {
    userId?: string
    checkpointId?: string
    artifactUrl?: string
    selfRubric?: boolean[]
  }

  if (!userId || !checkpointId || !artifactUrl || !Array.isArray(selfRubric)) {
    return NextResponse.json({ error: 'userId, checkpointId, artifactUrl, and selfRubric are required' }, { status: 400 })
  }
  if (selfRubric.length !== DEFAULT_RUBRIC_ITEMS.length) {
    return NextResponse.json({ error: `selfRubric must have exactly ${DEFAULT_RUBRIC_ITEMS.length} entries` }, { status: 400 })
  }

  await ensureUser(userId)
  const checkpoint = await ensureCheckpoint(checkpointId)
  if (!checkpoint) return NextResponse.json({ error: 'unknown checkpointId' }, { status: 404 })

  const status = selfRubric.every(Boolean) ? 'passed' : 'needs_revision'
  const submission = await db.checkpointSubmission.create({
    data: {
      userId,
      checkpointId,
      artifactUrl,
      selfRubric: JSON.stringify(selfRubric),
      status,
    },
  })

  return NextResponse.json({ submission })
}
