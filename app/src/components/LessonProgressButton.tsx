'use client'

import { useState } from 'react'
import { postWithOfflineFallback, saveFailureMessage } from '@/lib/offlineOutbox'

export function LessonProgressButton({ moduleId }: { moduleId: string }) {
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'queued' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function markComplete() {
    setStatus('saving')
    // No userId in the body — the server derives it from the active-profile cookie.
    const result = await postWithOfflineFallback('/api/progress', { moduleId, status: 'completed' })
    if (result.ok) setStatus('done')
    else if (result.queued) setStatus('queued')
    else {
      setErrorMessage(saveFailureMessage(result.status))
      setStatus('error')
    }
  }

  if (status === 'done') return <p className="text-sm text-emerald-600">Marked complete.</p>
  if (status === 'queued') return <p className="text-sm text-amber-600">Marked complete offline — will sync once you're back online.</p>
  if (status === 'error') {
    return (
      <p className="text-sm text-red-600">
        {errorMessage}{' '}
        {errorMessage?.includes('No active profile') && (
          <a href="/profiles" className="underline">
            Pick a profile
          </a>
        )}
      </p>
    )
  }

  return (
    <button onClick={markComplete} disabled={status === 'saving'} className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 text-sm">
      {status === 'saving' ? 'Saving…' : 'Mark this lesson complete'}
    </button>
  )
}
