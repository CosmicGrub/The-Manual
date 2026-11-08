'use client'

import { useEffect, useState } from 'react'
import { postWithOfflineFallback, saveFailureMessage } from '@/lib/offlineOutbox'

type Submission = {
  id: string
  artifactUrl: string
  status: string
  createdAt: string
}

const STATUS_LABEL: Record<string, string> = {
  passed: 'Passed (self-graded)',
  needs_revision: 'Needs revision',
  submitted: 'Submitted',
}

export function CheckpointSubmissionForm({ checkpointId, rubricItems }: { checkpointId: string; rubricItems: readonly string[] }) {
  const [history, setHistory] = useState<Submission[] | null>(null)
  const [artifactUrl, setArtifactUrl] = useState('')
  const [checked, setChecked] = useState<boolean[]>(rubricItems.map(() => false))
  const [state, setState] = useState<'idle' | 'saving' | 'done' | 'queued' | 'error'>('idle')
  const [lastStatus, setLastStatus] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Best-effort: shows past attempts when online, silently skipped offline —
  // the form itself works either way, same offline-first contract as every
  // other mutating page in the app. See MASTERFILE.md §3.8. No userId in the
  // query string — the server derives it from the active-profile cookie.
  useEffect(() => {
    fetch(`/api/checkpoint-submissions?checkpointId=${encodeURIComponent(checkpointId)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setHistory(data?.submissions ?? []))
      .catch(() => setHistory([]))
  }, [checkpointId])

  async function handleSubmit() {
    if (!artifactUrl.trim()) return
    setState('saving')
    const result = await postWithOfflineFallback('/api/checkpoint-submissions', {
      checkpointId,
      artifactUrl: artifactUrl.trim(),
      selfRubric: checked,
    })
    if (result.ok) {
      setLastStatus(checked.every(Boolean) ? 'passed' : 'needs_revision')
      setState('done')
    } else if (result.queued) {
      setLastStatus(checked.every(Boolean) ? 'passed' : 'needs_revision')
      setState('queued')
    } else {
      setErrorMessage(saveFailureMessage(result.status))
      setState('error')
    }
  }

  return (
    <div className="space-y-6">
      {history !== null && history.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-neutral-500">Your past submissions</h3>
          <ul className="space-y-1">
            {history.map((s) => (
              <li key={s.id} className="text-sm border rounded-lg p-3 flex items-center justify-between gap-3">
                <a href={s.artifactUrl} target="_blank" rel="noopener noreferrer" className="underline truncate">
                  {s.artifactUrl}
                </a>
                <span className={s.status === 'passed' ? 'text-emerald-600 whitespace-nowrap' : 'text-amber-600 whitespace-nowrap'}>
                  {STATUS_LABEL[s.status] ?? s.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {state === 'error' && (
        <p className="text-sm text-red-600">
          {errorMessage}{' '}
          {errorMessage?.includes('No active profile') && (
            <a href="/profiles" className="underline">
              Pick a profile
            </a>
          )}
        </p>
      )}

      {state === 'done' || state === 'queued' ? (
        <div className="space-y-1">
          <p className={lastStatus === 'passed' ? 'text-emerald-600 font-medium' : 'text-amber-600 font-medium'}>
            {lastStatus === 'passed' ? 'Submitted — self-graded as passed.' : "Submitted — marked needs revision (not every rubric item was checked)."}
          </p>
          {state === 'queued' && <p className="text-sm text-amber-600">Saved offline — will sync once you're back online.</p>}
          <button onClick={() => { setState('idle'); setArtifactUrl(''); setChecked(rubricItems.map(() => false)) }} className="text-sm underline">
            Submit another attempt
          </button>
        </div>
      ) : (
        <div className="space-y-4 border rounded-lg p-4">
          <div>
            <label htmlFor="artifact-url" className="block text-sm font-medium mb-1">
              Link to your artifact (repo, deployed app, write-up — whatever this checkpoint calls for)
            </label>
            <input
              id="artifact-url"
              type="url"
              required
              placeholder="https://github.com/you/your-project"
              className="border rounded px-2 py-1 w-full"
              value={artifactUrl}
              onChange={(e) => setArtifactUrl(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Self-rubric — be honest, this is for you</p>
            {rubricItems.map((item, i) => (
              <label key={i} className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={checked[i] ?? false}
                  onChange={(e) => setChecked((c) => c.map((v, idx) => (idx === i ? e.target.checked : v)))}
                />
                {item}
              </label>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={state === 'saving' || !artifactUrl.trim()}
            className="px-4 py-2 rounded-md bg-neutral-900 text-white disabled:opacity-50"
          >
            {state === 'saving' ? 'Saving…' : 'Submit checkpoint'}
          </button>
        </div>
      )}
    </div>
  )
}
