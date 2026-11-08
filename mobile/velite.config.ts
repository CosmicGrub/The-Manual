import { defineConfig, s } from 'velite'

// Same content pipeline as app/velite.config.ts, pointed at the same
// content/ directory — the Android fork bundles its own copy of the
// compiled lesson index at build time (no runtime fetch of any kind, this
// fork never talks to a server). Kept as a near-duplicate of app/'s config
// rather than shared, since the two forks' output targets differ (app/
// writes into its own .next pipeline; this one feeds a Vite static bundle)
// and the config itself is ~15 lines — not worth a shared package for.
export default defineConfig({
  root: '../content',
  output: {
    data: '.velite',
    assets: 'public/static',
    base: '/static/',
    clean: true,
  },
  collections: {
    lessons: {
      name: 'Lesson',
      pattern: '**/*.mdx',
      schema: s
        .object({
          trackId: s.string(),
          tier: s.number().min(0).max(5),
          title: s.string(),
          order: s.number(),
          estimatedHours: s.number(),
          slug: s.slug('lessons'),
          body: s.markdown(),
        })
        .transform((data) => ({ ...data, moduleId: `${data.trackId}/tier-${data.tier}/${data.slug}` })),
    },
  },
})
