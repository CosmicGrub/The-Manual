// Canonical track list (order = display/dependency order left-to-right on the dashboard).
// Mirrors the 8 tracks defined in content/ and documented in MASTERFILE.md.
export const TRACKS = [
  { id: 'cs-foundations', name: 'CS & Programming Foundations', order: 0 },
  { id: 'languages', name: 'Language Mastery', order: 1 },
  { id: 'software-engineering', name: 'Software Engineering & Architecture', order: 2 },
  { id: 'hardware-systems', name: 'Hardware & Computer Systems', order: 3 },
  { id: 'ai-ml-prompting', name: 'AI, ML & Prompt Engineering', order: 4 },
  { id: 'platforms', name: 'Platform & Cross-Platform Dev', order: 5 },
  { id: 'devops-tooling', name: 'DevOps, Tooling & Practice', order: 6 },
  { id: 'capstones-career', name: 'Capstones & Career Launch', order: 7 },
] as const

export type TrackId = (typeof TRACKS)[number]['id']
