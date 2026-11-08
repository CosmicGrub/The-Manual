import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  // Relative base — Capacitor serves the built bundle from the device's
  // local filesystem/WebView root, not a server, so absolute `/assets/...`
  // URLs would 404 on-device even though they work fine in `vite dev`.
  base: './',
  resolve: {
    alias: {
      '#content/lessons.json': path.resolve(__dirname, '.velite/lessons.json'),
      '#content/quizzes.json': path.resolve(__dirname, '.velite/quizzes.json'),
    },
  },
})
