// Thin app-specific wrapper over the shared core algorithm (packages/core) —
// supplies this fork's lesson source (the Velite-built content index) so
// every existing call site (`suggestedNextForTrack(trackId, progress)`)
// keeps working unchanged. The actual "what's next" logic lives in
// @the-manual/core/suggestedNext.ts, shared with mobile/.
import { getLessonsByTrack } from '@/lib/content'
import { suggestedNextForTrack as suggestedNextForTrackCore, type ProgressRow, type SuggestedNext } from '@the-manual/core'

export type { ProgressRow, SuggestedNext }

export function suggestedNextForTrack(trackId: string, progress: ProgressRow[]): SuggestedNext | null {
  return suggestedNextForTrackCore(trackId, getLessonsByTrack(trackId), progress)
}
