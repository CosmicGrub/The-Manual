// Client-only localStorage helpers for the opt-in "Supplementary
// Foundations" mode (see MASTERFILE.md §3.9). A plain browser flag, not a
// Prisma field: this is a single-local-learner app (see lib/user.ts) and the
// toggle never needs to be read server-side or synced across devices, so a
// DB migration would be pure overhead for what's really a per-browser UI
// preference — same reasoning as the offline outbox being IndexedDB-only
// rather than server-backed (see lib/offlineOutbox.ts).
//
// There's no persistent nav chrome in this app to host one shared toggle
// instance (see layout.tsx), so SupplementaryToggle is mounted separately on
// the dashboard, every lesson page's panel, and the Foundations page — all
// reading/writing this same key. The native `storage` event only fires
// across tabs, not within the same tab, so same-tab sync (toggle flipped in
// one mounted instance should be reflected by a nudge banner elsewhere on
// the same page) goes through this module's own custom event instead.
export const SUPPLEMENTARY_CHANGE_EVENT = 'the-manual:supplementary-change'

const MODE_KEY = 'the-manual:supplementary-mode'
const VIEWED_KEY = 'the-manual:supplementary-viewed'

export function isSupplementaryModeEnabled(): boolean {
  try {
    return localStorage.getItem(MODE_KEY) === 'on'
  } catch {
    return false
  }
}

export function setSupplementaryModeEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(MODE_KEY, enabled ? 'on' : 'off')
    window.dispatchEvent(new Event(SUPPLEMENTARY_CHANGE_EVENT))
  } catch {
    // localStorage unavailable (private browsing, etc.) — the toggle just won't persist.
  }
}

function readViewedSet(): Set<string> {
  try {
    const raw = localStorage.getItem(VIEWED_KEY)
    return new Set(raw ? (JSON.parse(raw) as string[]) : [])
  } catch {
    return new Set()
  }
}

export function getViewedSupplementaryIds(): Set<string> {
  return readViewedSet()
}

export function markSupplementaryViewed(id: string): void {
  try {
    const viewed = readViewedSet()
    viewed.add(id)
    localStorage.setItem(VIEWED_KEY, JSON.stringify([...viewed]))
    window.dispatchEvent(new Event(SUPPLEMENTARY_CHANGE_EVENT))
  } catch {
    // localStorage unavailable — viewed state just won't persist this session.
  }
}
