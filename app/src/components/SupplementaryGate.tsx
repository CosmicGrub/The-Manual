'use client'

import { useEffect, useState } from 'react'
import { LessonProgressButton } from './LessonProgressButton'
import type { SupplementaryConcept } from '@/lib/supplementary'
import { getViewedSupplementaryIds, isSupplementaryModeEnabled, SUPPLEMENTARY_CHANGE_EVENT } from '@/lib/supplementaryMode'

/**
 * Soft gate: when Supplementary Foundations mode is on and this lesson has
 * concepts the learner hasn't opened yet (see SupplementaryPanel), shows a
 * dismissible nudge above the ordinary "Mark complete" button. It never
 * blocks — the button underneath always works, and dismissing or expanding
 * every concept clears the nudge for this page view. This mirrors the
 * app's existing tier-checkpoint philosophy (see schema.prisma's
 * Checkpoint model comment: "soft gate — the app nudges, it doesn't
 * hard-lock, since this is a self-study tool") rather than introducing the
 * app's first hard lock.
 */
export function SupplementaryGate({ userId, moduleId, concepts }: { userId: string; moduleId: string; concepts: SupplementaryConcept[] }) {
  const [dismissed, setDismissed] = useState(false)
  const [shouldNudge, setShouldNudge] = useState(false)

  useEffect(() => {
    function recompute() {
      if (concepts.length === 0 || !isSupplementaryModeEnabled()) {
        setShouldNudge(false)
        return
      }
      const viewed = getViewedSupplementaryIds()
      setShouldNudge(!concepts.every((c) => viewed.has(c.id)))
    }
    recompute()
    window.addEventListener(SUPPLEMENTARY_CHANGE_EVENT, recompute)
    return () => window.removeEventListener(SUPPLEMENTARY_CHANGE_EVENT, recompute)
  }, [concepts])

  return (
    <div className="space-y-3">
      {shouldNudge && !dismissed && (
        <div className="rounded-md border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
          <p>
            Supplementary Foundations mode is on — this lesson has {concepts.length} related concept{concepts.length === 1 ? '' : 's'} below (in "Check your understanding") worth a look before moving on.
          </p>
          <button onClick={() => setDismissed(true)} className="mt-2 text-xs underline">
            Got it — mark complete without reviewing
          </button>
        </div>
      )}
      <LessonProgressButton userId={userId} moduleId={moduleId} />
    </div>
  )
}
