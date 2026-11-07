import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requireUserId } from '@/lib/session'
import { ensureCheckpoint, DEFAULT_RUBRIC_ITEMS } from '@/lib/checkpoints'

// GET /api/checkpoint-submissions?checkpointId=yyy — this learner's
// submission history for one checkpoint (newest first), so the checkpoint
// page can show past attempts instead of only "submitted, then forgotten."
export async function GET(req: NextRequest) {
  const userId = await requireUserId(req)
  if (!userId) return NextResponse.json({ error: 'not signed in' }, { status: 401 })

  const checkpointId = req.nextUrl.searchParams.get('checkpointId')
  if (!checkpointId) {
    return NextResponse.json({ error: 'checkpointId is required' }, { status: 400 })
  }

  const submissions = await db.checkpointSubmission.findMany({
    where: { userId, checkpointId },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ submissions })
}

// POST /api/checkpoint-submissions — { checkpointId, artifactUrl, selfRubric }
// selfRubric is a boolean[] aligned to DEFAULT_RUBRIC_ITEMS' order (see
// src/lib/checkpoints.ts). Self-graded, same spirit as the quiz's
// explain_back questions: status reflects what the learner themself
// checked, not an external grader — "needs_revision" is an honest, useful
// outcome here, not a failure state to hide.
export async function POST(req: NextRequest) {
  const userId = await requireUserId(req)
  if (!userId) return NextResponse.json({ error: 'not signed in' }, { status: 401 })

  const body = await req.json()
  const { checkpointId, artifactUrl, selfRubric } = body as {
    checkpointId?: string
    artifactUrl?: string
    selfRubric?: boolean[]
  }

  if (!checkpointId || !artifactUrl || !Array.isArray(selfRubric)) {
    return NextResponse.json({ error: 'checkpointId, artifactUrl, and selfRubric are required' }, { status: 400 })
  }
  if (selfRubric.length !== DEFAULT_RUBRIC_ITEMS.length || !selfRubric.every((v) => typeof v === 'boolean')) {
    return NextResponse.json({ error: `selfRubric must be ${DEFAULT_RUBRIC_ITEMS.length} booleans` }, { status: 400 })
  }
  try {
    new URL(artifactUrl)
  } catch {
    return NextResponse.json({ error: 'artifactUrl must be a valid URL' }, { status: 400 })
  }

  try {
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
  } catch (err) {
    console.error('POST /api/checkpoint-submissions failed:', err)
    return NextResponse.json({ error: 'failed to record submission' }, { status: 500 })
  }
}
