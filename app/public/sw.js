// Minimal service worker: makes the app installable on Android/desktop and
// keeps it usable (app shell + last-seen pages) when connectivity drops —
// intentionally simple, not a full offline-first sync engine.
const CACHE_VERSION = 'the-manual-v1'
const APP_SHELL = ['/manifest.json', '/icons/icon.svg', '/icons/icon-maskable.svg', '/offline.html']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  // Page navigations: try the network first (this app is server-rendered and
  // reflects live progress/DB state), fall back to a cached copy, then the
  // offline page, so a dropped connection on the train doesn't just white-screen.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy))
          return response
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/offline.html')))
    )
    return
  }

  // Static assets (icons, manifest, Next's hashed build output): cache-first,
  // since these are immutable per build and safe to serve instantly from cache.
  if (request.url.includes('/_next/static/') || APP_SHELL.some((path) => request.url.endsWith(path))) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => {
        const copy = response.clone()
        caches.open(CACHE_VERSION).then((cache) => cache.put(request, copy))
        return response
      }))
    )
  }
})
