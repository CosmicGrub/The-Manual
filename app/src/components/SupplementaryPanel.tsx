'use client'

import { useEffect, useState } from 'react'
import type { SupplementaryConcept } from '@/lib/supplementary'
import { getViewedSupplementaryIds, markSupplementaryViewed } from '@/lib/supplementaryMode'

/**
 * Renders a lesson's supplementary concepts as collapsible disclosures,
 * woven directly into the "Check your understanding" section (see
 * app/src/app/tracks/[trackId]/[tier]/[slug]/page.tsx). Always visible
 * regardless of the mode toggle — the toggle controls the soft-gate nudge
 * (see SupplementaryGate), not whether this content exists, so a curious
 * learner can open it any time. Expanding a concept marks it viewed, which
 * is what clears that lesson's nudge.
 */
export function SupplementaryPanel({ concepts }: { concepts: SupplementaryConcept[] }) {
  const [viewed, setViewed] = useState<Set<string>>(new Set())

  useEffect(() => {
    setViewed(getViewedSupplementaryIds())
  }, [])

  if (concepts.length === 0) return null

  function expand(id: string) {
    markSupplementaryViewed(id)
    setViewed((prev) => new Set(prev).add(id))
  }

  return (
    <div className="space-y-2 rounded-lg border border-sky-200 dark:border-sky-900 bg-sky-50/50 dark:bg-sky-950/20 p-4">
      <p className="text-sm font-medium text-sky-900 dark:text-sky-200">
        Related foundations ({concepts.length}) — optional background from math, science &amp; history
      </p>
      {concepts.map((c) => (
        <details key={c.id} onToggle={(e) => e.currentTarget.open && expand(c.id)}>
          <summary className="cursor-pointer text-sm py-1 flex items-center gap-2 flex-wrap">
            <span className="text-xs uppercase tracking-wide text-sky-700 dark:text-sky-400">{c.domain}</span>
            <span>{c.title}</span>
            {viewed.has(c.id) && <span className="text-xs text-emerald-600 dark:text-emerald-400">✓ viewed</span>}
          </summary>
          <div className="pl-4 pt-1 pb-2 text-sm text-neutral-700 dark:text-neutral-300 space-y-2">
            <p>{c.explainer}</p>
            <ul className="list-disc pl-4 space-y-1">
              {c.resources.map((r) => (
                <li key={r.url}>
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline">
                    {r.title}
                  </a>
                  <span className="text-neutral-500"> — {r.source}</span>
                </li>
              ))}
            </ul>
          </div>
        </details>
      ))}
    </div>
  )
}
