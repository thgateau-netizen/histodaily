const CACHE_NAME = "histodaily-beta111-release-log";
const APP_VERSION = "1.0.0-beta.111";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css?v=1.0.0-beta.111",
  "/app-core.js?v=1.0.0-beta.111",
  "/app-onboarding.js?v=1.0.0-beta.111",
  "/app.js?v=1.0.0-beta.111",
  "/lessons-lite.js?v=1.0.0-beta.111",
  "/manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(ASSETS.map(asset => cache.add(asset)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;
  event.respondWith((async () => {
    try {
      const response = await fetch(event.request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(event.request, response.clone()).catch(() => {});
      }
      return response;
    } catch {
      const cached = await caches.match(event.request);
      return cached || caches.match("/index.html");
    }
  })());
});
