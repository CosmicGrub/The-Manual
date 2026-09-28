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
          // Compiled to an HTML string (remark/rehype), not an MDX component function —
          // lesson content is plain Markdown (no embedded JSX), and this avoids pulling
          // in an MDX component runtime just to render text. Rendered via
          // dangerouslySetInnerHTML in the lesson page; safe because this is our own
          // authored content, not user input.
          body: s.markdown(),
        })
        .transform((data) => ({ ...data, moduleId: `${data.trackId}/tier-${data.tier}/${data.slug}` })),
    },
  },
})
