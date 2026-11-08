import { CapacitorSQLite, SQLiteConnection, type SQLiteDBConnection } from '@capacitor-community/sqlite'
import { SCHEMA_SQL } from './schema'

const DB_NAME = 'themanual'
const sqlite = new SQLiteConnection(CapacitorSQLite)

let dbPromise: Promise<SQLiteDBConnection> | null = null

/**
 * Opens (or reuses) the single on-device connection, applying the schema on
 * first open — idempotent via `IF NOT EXISTS`, the same spirit as app/'s
 * `prisma db push` + `docker-entrypoint.sh` seed step always being safe to
 * re-run. No migration framework: the schema only ever grows additively for
 * now, matching this fork's v1 scope (see MASTERFILE.md §3.6.5).
 */
export async function getDb(): Promise<SQLiteDBConnection> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await sqlite.createConnection(DB_NAME, false, 'no-encryption', 1, false)
      await db.open()
      await db.execute('PRAGMA foreign_keys = ON;')
      await db.execute(SCHEMA_SQL)
      return db
    })()
  }
  return dbPromise
}

/** One row back, or undefined — the common case for lookups by id/unique key. */
export async function queryOne<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T | undefined> {
  const db = await getDb()
  const result = await db.query(sql, params)
  return (result.values?.[0] as T | undefined) ?? undefined
}

export async function queryAll<T = Record<string, unknown>>(sql: string, params: unknown[] = []): Promise<T[]> {
  const db = await getDb()
  const result = await db.query(sql, params)
  return (result.values as T[] | undefined) ?? []
}

export async function run(sql: string, params: unknown[] = []): Promise<void> {
  const db = await getDb()
  await db.run(sql, params)
}

export function newId(): string {
  return crypto.randomUUID()
}

export function nowIso(): string {
  return new Date().toISOString()
}
