// Offline-first service worker for The Manual.
//
// Strategy:
//  - Install: fetch precache-manifest.json (network, cache-busted) and cache
//    every URL it lists — the whole curriculum, not just the app shell, is
//    what "totally functional offline" requires. Each URL is fetched
//    individually (not cache.addAll, which aborts the ENTIRE precache if any
//    single URL fails) so one bad lesson route can't silently wipe out
//    offline access to everything else — failures are logged, not fatal.
//  - The manifest's `version` is a hash of the actual lesson content
//    (see scripts/gen-precache-manifest.mjs) — the cache name changes only
//    when the curriculum genuinely changed, so a rebuild with no content
//    changes doesn't force a pointless full re-fetch.
//  - Fetch: static/precached GETs are cache-first (instant, works offline).
//    Page navigations are network-first — always try to show the freshest
//    version when online — falling back to the cached snapshot, then
//    offline.html, when the network is unreachable. API POSTs are left
//    untouched (not intercepted) so the client-side offline outbox
//    (src/lib/offlineOutbox.ts) can catch and queue failures itself.
const MANIFEST_URL = '/precache-manifest.json'
const FALLBACK_SHELL = ['/manifest.json', '/icons/icon.svg', '/icons/icon-maskable.svg', '/offline.html']

async function currentCacheName() {
  try {
    const res = await fetch(MANIFEST_URL, { cache: 'no-store' })
    const { version } = await res.json()
    return `the-manual-${version}`
  } catch {
    return 'the-manual-fallback'
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cacheName = await currentCacheName()
      const cache = await caches.open(cacheName)

      let urls = FALLBACK_SHELL
      try {
        const res = await fetch(MANIFEST_URL, { cache: 'no-store' })
        const manifest = await res.json()
        urls = manifest.urls
      } catch (err) {
        console.warn('SW install: could not fetch precache manifest, caching shell only', err)
      }

      await Promise.all(
        urls.map(async (url) => {
          try {
            const res = await fetch(url)
            if (res.ok) await cache.put(url, res)
            else console.warn(`SW install: ${url} responded ${res.status}, not cached`)
          } catch (err) {
            console.warn(`SW install: failed to precache ${url}`, err)
          }
        })
      )

      self.skipWaiting()
    })()
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const currentName = await currentCacheName()
      const keys = await caches.keys()
      await Promise.all(keys.filter((k) => k !== currentName).map((k) => caches.delete(k)))
      self.clients.claim()
    })()
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return // POSTs (progress/quiz-attempts/review) pass through untouched

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          currentCacheName().then((name) => caches.open(name).then((cache) => cache.put(request, copy)))
          return response
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/offline.html')))
    )
    return
  }

  if (request.url.includes('/_next/static/') || FALLBACK_SHELL.some((path) => request.url.endsWith(path))) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            const copy = response.clone()
            currentCacheName().then((name) => caches.open(name).then((cache) => cache.put(request, copy)))
            return response
          })
      )
    )
  }
})
