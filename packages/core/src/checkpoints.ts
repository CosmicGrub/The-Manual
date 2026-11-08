// The curriculum docs' checkpoint briefs are free prose, not a structured
// per-checkpoint grading rubric — the source material doesn't break cleanly
// into granular pass/fail criteria across all 54 of them. Rather than
// regex-mangle inconsistent fragments into fake-precise checklist items,
// every checkpoint gets the same self-rubric, matching exactly what
// MASTERFILE.md §2 defines a checkpoint as: rubric-graded, artifact-required.
// Pure data — shared by both forks' checkpoint-submission UI.
export const DEFAULT_RUBRIC_ITEMS = [
  'I produced the real artifact this checkpoint calls for — not a partial attempt — and linked it below.',
  "It actually works end-to-end — I ran/used it myself before submitting, not just 'it should compile.'",
  'I could explain and defend every design decision in it to a stranger, out loud, right now.',
] as const
