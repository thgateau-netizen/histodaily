const CACHE_NAME = "histodaily-beta166-friend-requests-v1";
const APP_VERSION = "1.0.0-beta.166";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css?v=1.0.0-beta.166",
  "/app-core.js?v=1.0.0-beta.166",
  "/app-onboarding.js?v=1.0.0-beta.166",
  "/app.js?v=1.0.0-beta.166",
  "/lessons-lite.js?v=1.0.0-beta.166",
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

  if (event.request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(event.request, { cache: "no-store" });
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          cache.put("/index.html", fresh.clone()).catch(() => {});
        }
        return fresh;
      } catch {
        return (await caches.match("/index.html")) || Response.error();
      }
    })());
    return;
  }

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


// BETA149_VERSION_MESSAGE: permet à l'app de vérifier la version du service worker sans effet de bord.
self.addEventListener("message", event => {
  if (event.data && event.data.type === "HISTODAILY_VERSION") {
    event.source?.postMessage?.({ type: "HISTODAILY_VERSION", version: APP_VERSION, cache: CACHE_NAME });
  }
});
