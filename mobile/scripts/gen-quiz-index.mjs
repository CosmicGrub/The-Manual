// Runs after `velite build` (see package.json's `build` script), before the
// Vite build. app/'s server reads each lesson's sibling <slug>.quiz.json
// directly off disk at request time (app/src/lib/quizzes.ts) — this fork has
// no server and no filesystem access at runtime, so every quiz file gets
// consolidated into one bundled JSON index instead, keyed by moduleId, the
// same key .velite/lessons.json's lessons use.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const MOBILE_ROOT = path.join(__dirname, '..')
const CONTENT_ROOT = path.join(MOBILE_ROOT, '..', 'content')

const lessons = JSON.parse(readFileSync(path.join(MOBILE_ROOT, '.velite', 'lessons.json'), 'utf-8'))

const quizzes = {}
for (const lesson of lessons) {
  const quizPath = path.join(CONTENT_ROOT, lesson.trackId, `tier-${lesson.tier}`, `${lesson.slug}.quiz.json`)
  if (!existsSync(quizPath)) continue
  quizzes[lesson.moduleId] = JSON.parse(readFileSync(quizPath, 'utf-8'))
}

writeFileSync(path.join(MOBILE_ROOT, '.velite', 'quizzes.json'), JSON.stringify(quizzes, null, 2) + '\n')
console.log(`quizzes.json: ${Object.keys(quizzes).length} modules with quizzes bundled`)
