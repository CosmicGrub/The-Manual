import { useEffect, useState } from 'react'

// A minimal hash router — no react-router dependency, consistent with the
// rest of this project's "no framework beyond what's needed" habit (app/
// doesn't reach for extra UI libraries either). Capacitor serves this app
// from the device's local filesystem with no server to configure rewrite
// rules on, so hash-based routing (no server round-trip for any path) is
// the simplest thing that can't break on-device.
export function useHashPath(): string[] {
  const [path, setPath] = useState(() => parseHash())

  useEffect(() => {
    const onHashChange = () => setPath(parseHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return path
}

function parseHash(): string[] {
  const hash = window.location.hash.replace(/^#\/?/, '')
  return hash ? hash.split('/').map(decodeURIComponent) : []
}

export function navigate(path: string): void {
  window.location.hash = path.startsWith('/') ? path : `/${path}`
}
