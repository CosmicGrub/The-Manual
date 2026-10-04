'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { TIER_LABELS } from '@/lib/tracks'
import type { Resource } from '@/lib/curriculumDocs'

type Track = { id: string; name: string }

const TIERS = [0, 1, 2, 3, 4, 5] as const

export function ResourceLibrary({ resources, tracks }: { resources: Resource[]; tracks: Track[] }) {
  const searchParams = useSearchParams()
  const [trackId, setTrackId] = useState(searchParams.get('track') ?? 'all')
  const [tier, setTier] = useState(searchParams.get('tier') ?? 'all')
  const [query, setQuery] = useState('')

  const trackName = useMemo(() => new Map(tracks.map((t) => [t.id, t.name])), [tracks])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return resources.filter((r) => {
      if (trackId !== 'all' && r.trackId !== trackId) return false
      if (tier !== 'all' && r.tier !== Number(tier)) return false
      if (q && !r.title.toLowerCase().includes(q) && !r.description.toLowerCase().includes(q)) return false
      return true
    })
  }, [resources, trackId, tier, query])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <select value={trackId} onChange={(e) => setTrackId(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="all">All tracks</option>
          {tracks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <select value={tier} onChange={(e) => setTier(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="all">All tiers</option>
          {TIERS.map((t) => (
            <option key={t} value={t}>
              Tier {t} — {TIER_LABELS[t]}
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Search title or description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border rounded px-2 py-1 text-sm flex-1 min-w-[12rem]"
        />
      </div>

      <p className="text-sm text-neutral-500">
        {filtered.length} resource{filtered.length === 1 ? '' : 's'}
        {trackId !== 'all' || tier !== 'all' || query ? ' matching your filters' : ' across all 9 tracks'}.
      </p>

      <ul className="space-y-3">
        {filtered.map((r, i) => (
          <li key={`${r.trackId}-${r.tier}-${i}`} className="border rounded-lg p-4">
            <div className="flex items-start justify-between gap-3">
              {r.url ? (
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-medium underline">
                  {r.title}
                </a>
              ) : (
                <span className="font-medium">{r.title}</span>
              )}
              <span className="text-xs text-neutral-500 whitespace-nowrap">
                {trackName.get(r.trackId) ?? r.trackId} · T{r.tier}
              </span>
            </div>
            {r.description && <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{r.description}</p>}
          </li>
        ))}
      </ul>

      {filtered.length === 0 && <p className="text-neutral-500">No resources match those filters — try widening them.</p>}
    </div>
  )
}
