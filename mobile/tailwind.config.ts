import type { Config } from 'tailwindcss'

// Same config as app/tailwind.config.ts, for visual consistency between the
// two forks — see MASTERFILE.md §3.6.5.
const config: Config = {
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/typography')],
}

export default config
