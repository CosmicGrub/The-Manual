// Typed, higher-level operations over the raw SQLite connection (db.ts) —
// the Android-fork equivalent of app/'s 4 Prisma-backed API routes plus
// src/lib/db.ts, just called directly from React components instead of over
// HTTP, since there's no server here to route through. Business logic
// (SM-2 scheduling) comes from @the-manual/core, not reimplemented here.
import { nextReviewState, type ProgressRow } from '@the-manual/core'
import { getDb, newId, nowIso, queryAll, queryOne, run } from './db'

export type Profile = { id: string; name: string; avatar: string; createdAt: string }

export async function listProfiles(): Promise<Profile[]> {
  const rows = await queryAll<{ id: string; name: string; avatar: string; created_at: string }>(
    'SELECT id, name, avatar, created_at FROM profile ORDER BY created_at ASC'
  )
  return rows.map((r) => ({ id: r.id, name: r.name, avatar: r.avatar, createdAt: r.created_at }))
}

export async function createProfile(name: string, avatar: string): Promise<Profile> {
  const id = newId()
  const createdAt = nowIso()
  await run('INSERT INTO profile (id, name, avatar, created_at) VALUES (?, ?, ?, ?)', [id, name, avatar, createdAt])
  return { id, name, avatar, createdAt }
}

export async function getProfile(id: string): Promise<Profile | undefined> {
  const row = await queryOne<{ id: string; name: string; avatar: string; created_at: string }>(
    'SELECT id, name, avatar, created_at FROM profile WHERE id = ?',
    [id]
  )
  return row && { id: row.id, name: row.name, avatar: row.avatar, createdAt: row.created_at }
}

export async function getProgress(profileId: string): Promise<ProgressRow[]> {
  const rows = await queryAll<{ module_id: string; status: string; mastery_score: number | null }>(
    'SELECT module_id, status, mastery_score FROM progress WHERE profile_id = ?',
    [profileId]
  )
  return rows.map((r) => ({ moduleId: r.module_id, status: r.status, masteryScore: r.mastery_score }))
}

export async function upsertProgress(profileId: string, moduleId: string, status: string, masteryScore?: number): Promise<void> {
  const db = await getDb()
  const existing = await queryOne<{ id: string }>('SELECT id FROM progress WHERE profile_id = ? AND module_id = ?', [profileId, moduleId])
  if (existing) {
    if (masteryScore === undefined) {
      await db.run('UPDATE progress SET status = ?, updated_at = ? WHERE id = ?', [status, nowIso(), existing.id])
    } else {
      await db.run('UPDATE progress SET status = ?, mastery_score = ?, updated_at = ? WHERE id = ?', [status, masteryScore, nowIso(), existing.id])
    }
  } else {
    await db.run(
      'INSERT INTO progress (id, profile_id, module_id, status, mastery_score, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      [newId(), profileId, moduleId, status, masteryScore ?? null, nowIso()]
    )
  }
}

/**
 * Mirrors app/'s POST /api/quiz-attempts transaction: record the attempt,
 * recompute the module's rolling mastery score from every attempt
 * (including the one just inserted), upsert Progress, and seed a due-now
 * ReviewState for every missed question. SQLite on Android doesn't need an
 * explicit transaction wrapper here the way Prisma's $transaction does for
 * multi-statement atomicity concerns across a network round trip — these
 * are sequential local calls against the same on-device connection.
 */
export async function recordQuizAttempt(
  profileId: string,
  moduleId: string,
  score: number,
  answers: unknown,
  missedQuestionIds: string[]
): Promise<void> {
  const db = await getDb()
  await db.run('INSERT INTO quiz_attempt (id, profile_id, module_id, score, answers, created_at) VALUES (?, ?, ?, ?, ?, ?)', [
    newId(),
    profileId,
    moduleId,
    score,
    JSON.stringify(answers ?? {}),
    nowIso(),
  ])

  const agg = await queryOne<{ avg_score: number | null }>(
    'SELECT AVG(score) as avg_score FROM quiz_attempt WHERE profile_id = ? AND module_id = ?',
    [profileId, moduleId]
  )
  await upsertProgress(profileId, moduleId, 'in_progress', agg?.avg_score ?? score)

  for (const questionId of missedQuestionIds) {
    await upsertReviewStateDueNow(profileId, questionId, 'quiz_question')
  }
}

async function upsertReviewStateDueNow(profileId: string, itemId: string, itemType: string): Promise<void> {
  const db = await getDb()
  const existing = await queryOne<{ id: string }>(
    'SELECT id FROM review_state WHERE profile_id = ? AND item_id = ? AND item_type = ?',
    [profileId, itemId, itemType]
  )
  if (existing) {
    await db.run('UPDATE review_state SET due_at = ? WHERE id = ?', [nowIso(), existing.id])
  } else {
    await db.run(
      'INSERT INTO review_state (id, profile_id, item_id, item_type, ease_factor, interval_days, repetitions, due_at) VALUES (?, ?, ?, ?, 2.5, 0, 0, ?)',
      [newId(), profileId, itemId, itemType, nowIso()]
    )
  }
}

export type ReviewStateRow = {
  id: string
  itemId: string
  itemType: string
  easeFactor: number
  intervalDays: number
  repetitions: number
  dueAt: string
}

export async function getDueReviewItems(profileId: string): Promise<ReviewStateRow[]> {
  const rows = await queryAll<{
    id: string
    item_id: string
    item_type: string
    ease_factor: number
    interval_days: number
    repetitions: number
    due_at: string
  }>('SELECT id, item_id, item_type, ease_factor, interval_days, repetitions, due_at FROM review_state WHERE profile_id = ? AND due_at <= ? ORDER BY due_at ASC', [
    profileId,
    nowIso(),
  ])
  return rows.map((r) => ({
    id: r.id,
    itemId: r.item_id,
    itemType: r.item_type,
    easeFactor: r.ease_factor,
    intervalDays: r.interval_days,
    repetitions: r.repetitions,
    dueAt: r.due_at,
  }))
}

/** Grades one review item via @the-manual/core's SM-2 implementation, same as app/'s /api/review-queue POST. */
export async function gradeReviewItem(profileId: string, itemId: string, itemType: string, grade: number): Promise<void> {
  const db = await getDb()
  const existing = await queryOne<{ id: string; ease_factor: number; interval_days: number; repetitions: number }>(
    'SELECT id, ease_factor, interval_days, repetitions FROM review_state WHERE profile_id = ? AND item_id = ? AND item_type = ?',
    [profileId, itemId, itemType]
  )
  const prev = existing
    ? { easeFactor: existing.ease_factor, intervalDays: existing.interval_days, repetitions: existing.repetitions }
    : { easeFactor: 2.5, intervalDays: 0, repetitions: 0 }

  const next = nextReviewState(prev, grade)
  const dueAt = new Date(Date.now() + next.dueInDays * 24 * 60 * 60 * 1000).toISOString()

  if (existing) {
    await db.run('UPDATE review_state SET ease_factor = ?, interval_days = ?, repetitions = ?, due_at = ? WHERE id = ?', [
      next.easeFactor,
      next.intervalDays,
      next.repetitions,
      dueAt,
      existing.id,
    ])
  } else {
    await db.run(
      'INSERT INTO review_state (id, profile_id, item_id, item_type, ease_factor, interval_days, repetitions, due_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [newId(), profileId, itemId, itemType, next.easeFactor, next.intervalDays, next.repetitions, dueAt]
    )
  }
}

export type CheckpointSubmissionRow = { id: string; artifactUrl: string; status: string; createdAt: string }

export async function recordCheckpointSubmission(
  profileId: string,
  checkpointId: string,
  artifactUrl: string,
  selfRubric: boolean[]
): Promise<CheckpointSubmissionRow> {
  const id = newId()
  const createdAt = nowIso()
  const status = selfRubric.every(Boolean) ? 'passed' : 'needs_revision'
  await run('INSERT INTO checkpoint_submission (id, profile_id, checkpoint_id, artifact_url, self_rubric, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [
    id,
    profileId,
    checkpointId,
    artifactUrl,
    JSON.stringify(selfRubric),
    status,
    createdAt,
  ])
  return { id, artifactUrl, status, createdAt }
}

export async function getCheckpointSubmissions(profileId: string, checkpointId: string): Promise<CheckpointSubmissionRow[]> {
  const rows = await queryAll<{ id: string; artifact_url: string; status: string; created_at: string }>(
    'SELECT id, artifact_url, status, created_at FROM checkpoint_submission WHERE profile_id = ? AND checkpoint_id = ? ORDER BY created_at DESC',
    [profileId, checkpointId]
  )
  return rows.map((r) => ({ id: r.id, artifactUrl: r.artifact_url, status: r.status, createdAt: r.created_at }))
}
