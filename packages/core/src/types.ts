// Shared types for The Manual's two forks (the Next.js/Prisma PC app in
// app/, and the Capacitor/local-SQLite Android app in mobile/). Deliberately
// framework- and storage-agnostic — no Prisma types, no Next.js types, no
// Capacitor types. Each fork maps its own storage shape onto these.

export type Lesson = {
  trackId: string
  tier: number
  title: string
  order: number
  estimatedHours: number
  slug: string
  body: string
  moduleId: string
}

export type ProgressRow = {
  moduleId: string
  status: string
  masteryScore: number | null
}

export type QuizQuestion =
  | { id: string; type: 'multiple_choice'; prompt: string; choices: string[]; correctIndex: number }
  | { id: string; type: 'short_answer'; prompt: string; acceptedAnswers: string[] }
  | { id: string; type: 'explain_back'; prompt: string }
