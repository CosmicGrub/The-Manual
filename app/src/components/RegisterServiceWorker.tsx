'use client'

import { useEffect } from 'react'

/** Registers the PWA service worker (public/sw.js) once, client-side only. */
export function RegisterServiceWorker() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => console.error('SW registration failed:', err))
    }
  }, [])

  return null
}
