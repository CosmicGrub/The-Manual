import { defineConfig, s } from 'velite'

// Reads every lesson MDX file under ../content and builds a typed JSON index
// at build time. This is the "content pipeline": git-versioned Markdown in,
// typed data the app can query out — no CMS, no database round-trip for lesson text.
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
          body: s.mdx(),
        })
        .transform((data) => ({ ...data, moduleId: `${data.trackId}/tier-${data.tier}/${data.slug}` })),
    },
  },
})
