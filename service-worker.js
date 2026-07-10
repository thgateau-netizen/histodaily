const CACHE_NAME = "histodaily-beta197-alignement-visuels-v1";
const APP_VERSION = "1.0.0-beta.197";
const ASSETS = [
  "/",
  "/index.html",
  "/styles.css?v=1.0.0-beta.197",
  "/concept-expedition.css?v=1.0.0-beta.197",
  "/app-core.js?v=1.0.0-beta.197",
  "/app-onboarding.js?v=1.0.0-beta.197",
  "/app-icons.js?v=1.0.0-beta.197",
  "/app-art.js?v=1.0.0-beta.197",
  "/app.js?v=1.0.0-beta.197",
  "/content-editorial.js?v=1.0.0-beta.197",
  "/content-expansion.js?v=1.0.0-beta.197",
  "/content-nonhistory.js?v=1.0.0-beta.197",
  "/content-astronomy.js?v=1.0.0-beta.197",
  "/mystery-rescue.js?v=1.0.0-beta.197",
  "/social-runtime.js?v=1.0.0-beta.197",
  "/progression-systems.js?v=1.0.0-beta.197",
  "/interface-polish.js?v=1.0.0-beta.197",
  "/experience-audit.js?v=1.0.0-beta.197",
  "/visual-upgrade.js?v=1.0.0-beta.197",
  "/concept-expedition.js?v=1.0.0-beta.197",
  "/lessons-lite.js?v=1.0.0-beta.197",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/favicon.ico"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(ASSETS);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("histodaily-") && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  if (event.request.mode === "navigate") {
    event.respondWith((async () => {
      const cached = await caches.match("/index.html");
      const update = fetch(event.request, { cache: "no-store" }).then(async fresh => {
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_NAME);
          await cache.put("/index.html", fresh.clone());
        }
        return fresh;
      }).catch(() => null);
      if (cached) {
        event.waitUntil(update);
        return cached;
      }
      return (await update) || Response.error();
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    const update = fetch(event.request).then(async response => {
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(event.request, response.clone());
      }
      return response;
    }).catch(() => null);

    if (cached) {
      event.waitUntil(update);
      return cached;
    }
    return (await update) || Response.error();
  })());
});


// BETA149_VERSION_MESSAGE: permet à l'app de vérifier la version du service worker sans effet de bord.
self.addEventListener("message", event => {
  if (event.data && event.data.type === "HISTODAILY_VERSION") {
    event.source?.postMessage?.({ type: "HISTODAILY_VERSION", version: APP_VERSION, cache: CACHE_NAME });
  }
});
