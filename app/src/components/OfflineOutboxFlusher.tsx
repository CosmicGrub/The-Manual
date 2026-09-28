'use client'

import { useEffect } from 'react'
import { flushOutbox } from '@/lib/offlineOutbox'

/** Flushes queued offline writes on load (covers a backlog from a prior offline session) and whenever the device regains connectivity. */
export function OfflineOutboxFlusher() {
  useEffect(() => {
    flushOutbox().catch(() => {})
    const onOnline = () => flushOutbox().catch(() => {})
    window.addEventListener('online', onOnline)
    return () => window.removeEventListener('online', onOnline)
  }, [])

  return null
}
