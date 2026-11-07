'use client'

import { useState } from 'react'
import { postWithOfflineFallback } from '@/lib/offlineOutbox'

export function LessonProgressButton({ moduleId }: { moduleId: string }) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'queued'>('idle')

  async function markComplete() {
    setStatus('saving')
    // No userId in the body — the server derives it from the session cookie.
    const { queued } = await postWithOfflineFallback('/api/progress', { moduleId, status: 'completed' })
    setStatus(queued ? 'queued' : 'done')
  }

  if (status === 'done') return <p className="text-sm text-emerald-600">Marked complete.</p>
  if (status === 'queued') return <p className="text-sm text-amber-600">Marked complete offline — will sync once you're back online.</p>

  return (
    <button onClick={markComplete} disabled={status === 'saving'} className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 text-sm">
      {status === 'saving' ? 'Saving…' : 'Mark this lesson complete'}
    </button>
  )
}
