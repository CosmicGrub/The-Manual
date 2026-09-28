import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'media',
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  // Typography plugin styles the raw HTML from Velite's compiled Markdown
  // (lesson pages render it via dangerouslySetInnerHTML) — otherwise it's
  // unstyled tags with no relation to the app's design.
  plugins: [require('@tailwindcss/typography')],
}

export default config
