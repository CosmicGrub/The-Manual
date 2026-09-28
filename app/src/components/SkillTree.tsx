const TIERS = [0, 1, 2, 3, 4, 5] as const
const TIER_LABELS = ['Orientation', 'Foundations', 'Builder', 'Practitioner', 'Advanced', 'Expert']

export type TrackSummary = {
  id: string
  name: string
  /** status per tier index 0-5: none of this tier started yet, in progress, or fully cleared */
  tierStatus: Array<'locked' | 'in_progress' | 'completed'>
}

const STATUS_STYLE: Record<TrackSummary['tierStatus'][number], string> = {
  locked: 'bg-neutral-200 dark:bg-neutral-800 text-neutral-400',
  in_progress: 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100',
  completed: 'bg-emerald-500 text-white',
}

/**
 * The dashboard's tracks x tiers grid — one cell per (track, tier), colored by
 * mastery status. This is the "visual representation" of overall progress
 * through The Manual: 8 tracks wide, 6 tiers tall.
 */
export function SkillTree({ tracks }: { tracks: TrackSummary[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-1">
        <thead>
          <tr>
            <th className="text-left text-sm font-medium text-neutral-500 p-2">Track</th>
            {TIER_LABELS.map((label, i) => (
              <th key={i} className="text-xs font-medium text-neutral-500 p-1 w-20">
                T{i}
                <div className="font-normal">{label}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tracks.map((track) => (
            <tr key={track.id}>
              <td className="text-sm font-medium p-2 whitespace-nowrap">{track.name}</td>
              {TIERS.map((tier) => {
                const status = track.tierStatus[tier] ?? 'locked'
                return (
                  <td key={tier} className="p-1">
                    <div
                      className={`h-10 w-full rounded-md flex items-center justify-center text-xs ${STATUS_STYLE[status]}`}
                      title={`${track.name} · Tier ${tier} (${TIER_LABELS[tier]}): ${status.replace('_', ' ')}`}
                    >
                      {status === 'completed' ? '✓' : status === 'in_progress' ? '…' : ''}
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
