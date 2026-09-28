'use client'

// A minimal IndexedDB-backed write queue. When a POST to one of our API routes
// fails (device offline, or the PC server unreachable over LAN), the request
// is queued here instead of being lost; `flushOutbox()` replays every queued
// request in order once the device is back online. No external dependency —
// this is a thin wrapper over the native IndexedDB API, sized for a handful
// of queued writes at a time, not a general sync engine.

const DB_NAME = 'the-manual-outbox'
const STORE_NAME = 'requests'
const DB_VERSION = 1

type QueuedRequest = {
  id: number
  url: string
  method: string
  body: string
  queuedAt: number
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

/** Queue a POST for later replay. Call this from a fetch()'s .catch(). */
export async function queueRequest(url: string, body: unknown): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).add({ url, method: 'POST', body: JSON.stringify(body), queuedAt: Date.now() })
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

/** Attempt every queued request in order; stop at the first failure so ordering is preserved. */
export async function flushOutbox(): Promise<{ flushed: number; remaining: number }> {
  const db = await openDb()
  const all = await new Promise<QueuedRequest[]>((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const req = tx.objectStore(STORE_NAME).getAll()
    req.onsuccess = () => resolve(req.result as QueuedRequest[])
    req.onerror = () => reject(req.error)
  })

  let flushed = 0
  for (const item of all.sort((a, b) => a.queuedAt - b.queuedAt)) {
    try {
      const res = await fetch(item.url, { method: item.method, headers: { 'Content-Type': 'application/json' }, body: item.body })
      if (!res.ok) break // server rejected it (not a connectivity failure) — stop and leave it queued for inspection
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite')
        tx.objectStore(STORE_NAME).delete(item.id)
        tx.oncomplete = () => resolve()
        tx.onerror = () => reject(tx.error)
      })
      flushed++
    } catch {
      break // still offline — stop, leave the rest queued, try again next time
    }
  }
  return { flushed, remaining: all.length - flushed }
}

/** POST with an automatic offline fallback: tries the network, queues on failure. Returns whether it was queued. */
export async function postWithOfflineFallback(url: string, body: unknown): Promise<{ queued: boolean }> {
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (!res.ok) throw new Error(`${url} responded ${res.status}`)
    return { queued: false }
  } catch {
    await queueRequest(url, body)
    return { queued: true }
  }
}
