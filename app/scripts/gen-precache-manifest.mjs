// Runs after `velite build`, before `next build` (see package.json's `build`
// script). Reads the just-compiled lesson index and writes
// public/precache-manifest.json: every URL the service worker should cache
// for full offline use, plus a content-hash version so the SW knows exactly
// when the curriculum has actually changed and it's time to refetch — see
// public/sw.js and MASTERFILE.md §3.8.
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const APP_ROOT = path.join(__dirname, '..')

const lessonsPath = path.join(APP_ROOT, '.velite', 'lessons.json')
const lessons = JSON.parse(readFileSync(lessonsPath, 'utf-8'))

const trackIds = [...new Set(lessons.map((l) => l.trackId))]

const staticUrls = ['/', '/review', '/resources', '/manifest.json', '/offline.html', '/icons/icon.svg', '/icons/icon-maskable.svg']
const trackUrls = trackIds.map((id) => `/tracks/${id}`)
const lessonUrls = lessons.map((l) => `/tracks/${l.trackId}/${l.tier}/${l.slug}`)
// Every track has exactly one checkpoint per tier 0-5 (see
// docs/curriculum/*.md and app/src/lib/curriculumDocs.ts) — mechanical, no
// need to re-parse the curriculum docs just for their URLs here.
const checkpointUrls = trackIds.flatMap((id) => [0, 1, 2, 3, 4, 5].map((tier) => `/checkpoints/${id}/tier-${tier}/checkpoint`))

const urls = [...staticUrls, ...trackUrls, ...lessonUrls, ...checkpointUrls]

// Version is a hash of the actual lesson content, not a timestamp (Velite's
// build is otherwise deterministic) — the cache name only changes when the
// curriculum genuinely changed, so the service worker doesn't force a
// pointless re-fetch of everything on every rebuild.
const version = createHash('sha256').update(JSON.stringify(lessons)).digest('hex').slice(0, 16)

const manifest = { version, generatedFrom: `${lessons.length} lessons across ${trackIds.length} tracks`, urls }

writeFileSync(path.join(APP_ROOT, 'public', 'precache-manifest.json'), JSON.stringify(manifest, null, 2) + '\n')

console.log(`precache-manifest.json: version ${version}, ${urls.length} URLs (${lessons.length} lessons, ${trackIds.length} tracks)`)
