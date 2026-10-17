'use client'

import { useEffect, useState } from 'react'
import { isSupplementaryModeEnabled, setSupplementaryModeEnabled, SUPPLEMENTARY_CHANGE_EVENT } from '@/lib/supplementaryMode'

/**
 * The single on/off control for Supplementary Foundations mode. Every
 * mount reads/writes the same localStorage flag (see supplementaryMode.ts)
 * — there's no shared global instance since the app has no persistent nav
 * chrome — kept in sync across mounts on the same page via a custom event.
 */
export function SupplementaryToggle() {
  const [enabled, setEnabled] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setEnabled(isSupplementaryModeEnabled())
    const sync = () => setEnabled(isSupplementaryModeEnabled())
    window.addEventListener(SUPPLEMENTARY_CHANGE_EVENT, sync)
    return () => window.removeEventListener(SUPPLEMENTARY_CHANGE_EVENT, sync)
  }, [])

  // Skip the first render so the checkbox never flashes "off" before
  // localStorage has been read on the client.
  if (!mounted) return null

  return (
    <label className="inline-flex items-start gap-2 text-sm cursor-pointer select-none">
      <input
        type="checkbox"
        checked={enabled}
        onChange={() => setSupplementaryModeEnabled(!enabled)}
        className="h-4 w-4 mt-0.5"
      />
      <span>
        <span className="font-medium">Supplementary Foundations mode</span>
        <span className="text-neutral-500"> — nudge me toward related math, science &amp; history before marking a lesson complete</span>
      </span>
    </label>
  )
}
