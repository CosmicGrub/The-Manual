// Server-only: parses docs/curriculum/<trackId>.md directly off disk. These
// files are the syllabus prose written before any lesson MDX existed (see
// content/README.md) — each one already carries, per tier, a **Curated
// resources** list and a **Checkpoint project** brief in a fully uniform
// format across all 9 tracks (verified: exactly 6 tiers / 6 checkpoints / 6
// resource blocks per file). Rather than duplicate that prose into new MDX
// or a database, this reads it straight from the source doc — same
// read-off-disk approach as app/src/lib/quizzes.ts.
import fs from 'node:fs'
import path from 'node:path'
import { TRACKS } from '@/lib/tracks'

const DOCS_ROOT = path.join(process.cwd(), '..', 'docs', 'curriculum')

export type Resource = {
  trackId: string
  tier: number
  title: string
  url?: string
  description: string
}

export type CheckpointBrief = {
  id: string // "<trackId>/tier-<tier>/checkpoint" — matches Checkpoint.id's format in schema.prisma
  trackId: string
  tier: number
  title: string
  brief: string
}

const TIER_HEADER_RE = /^## Tier (\d+):/gm

function splitTiers(text: string): Map<number, string> {
  const matches = [...text.matchAll(TIER_HEADER_RE)]
  const blocks = new Map<number, string>()
  matches.forEach((m, i) => {
    const tier = Number(m[1])
    const start = m.index! + m[0].length
    const end = i + 1 < matches.length ? matches[i + 1]!.index! : text.length
    blocks.set(tier, text.slice(start, end))
  })
  return blocks
}

// Captures a "**Label:** ..." field's body up to the next "**OtherLabel:**"
// or the tier-block-ending "---", whichever comes first.
function extractField(block: string, label: string): string | undefined {
  const re = new RegExp(`\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\*\\*[A-Za-z /]+:\\*\\*|\\n---|$)`)
  const m = block.match(re)
  const value = m?.[1]?.trim()
  return value || undefined
}

const RESOURCE_LINKED_RE = /^- \[(.+?)\]\((https?:\/\/[^)]+)\)\s*(?:—|-)\s*(.+)$/

// A handful of curated-resource lines have no markdown link (just "Title —
// Description"), and a couple of those titles themselves contain an em dash
// (e.g. "3Blue1Brown — Essence of Linear Algebra (video series)"). The
// description is always the final " — "-delimited segment; everything
// before it is the title, dashes and all.
function parsePlainResourceLine(content: string): { title: string; description: string } {
  const parts = content.split(/\s+—\s+/)
  if (parts.length < 2) return { title: content, description: '' }
  const description = parts.pop()!
  return { title: parts.join(' — '), description }
}

function parseResourceLine(line: string): Omit<Resource, 'trackId' | 'tier'> | undefined {
  const linked = line.match(RESOURCE_LINKED_RE)
  if (linked) return { title: linked[1]!, url: linked[2]!, description: linked[3]! }
  if (!line.startsWith('- ')) return undefined
  return parsePlainResourceLine(line.slice(2).trim())
}

let cache: { resources: Resource[]; checkpoints: CheckpointBrief[] } | undefined

function loadAll() {
  if (cache) return cache
  const resources: Resource[] = []
  const checkpoints: CheckpointBrief[] = []

  for (const track of TRACKS) {
    const docPath = path.join(DOCS_ROOT, `${track.id}.md`)
    if (!fs.existsSync(docPath)) continue
    const text = fs.readFileSync(docPath, 'utf-8')

    for (const [tier, block] of splitTiers(text)) {
      const brief = extractField(block, 'Checkpoint project')
      if (brief) {
        checkpoints.push({
          id: `${track.id}/tier-${tier}/checkpoint`,
          trackId: track.id,
          tier,
          title: `${track.name} — Tier ${tier} Checkpoint`,
          brief,
        })
      }

      const resourceBlock = extractField(block, 'Curated resources')
      if (resourceBlock) {
        for (const rawLine of resourceBlock.split('\n')) {
          const line = rawLine.trim()
          if (!line.startsWith('- ')) continue // skips the occasional italic context note
          const parsed = parseResourceLine(line)
          if (parsed) resources.push({ trackId: track.id, tier, ...parsed })
        }
      }
    }
  }

  cache = { resources, checkpoints }
  return cache
}

export function getAllResources(): Resource[] {
  return loadAll().resources
}

export function getAllCheckpointBriefs(): CheckpointBrief[] {
  return loadAll().checkpoints
}

export function getCheckpointBrief(id: string): CheckpointBrief | undefined {
  return loadAll().checkpoints.find((c) => c.id === id)
}
