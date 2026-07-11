const CACHE_NAME = "histodaily-beta225-v1";
const APP_VERSION = "1.0.0-beta.225.0";
const ASSETS = [
  "/",
  "/index.html",
  "/app.css?v=1.0.0-beta.225.0",
  "/lessons-lite.js?v=1.0.0-beta.225.0",
  "/app-bootstrap.js?v=1.0.0-beta.225.0",
  "/app.js?v=1.0.0-beta.225.0",
  "/content-library.js?v=1.0.0-beta.225.0",
  "/app-runtime.js?v=1.0.0-beta.225.0",
  "/visual-v4.js?v=1.0.0-beta.225.0",
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
    // Un seul asset optionnel en erreur ne doit pas invalider toute
    // l’installation du service worker. Les fichiers essentiels seront
    // de toute façon récupérés à la première requête réseau réussie.
    await Promise.allSettled(ASSETS.map(async asset => {
      const request = new Request(asset, { cache: "reload" });
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
    }));
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


// Expose la version active du service worker sans effet de bord.
self.addEventListener("message", event => {
  if (event.data && event.data.type === "HISTODAILY_VERSION") {
    event.source?.postMessage?.({ type: "HISTODAILY_VERSION", version: APP_VERSION, cache: CACHE_NAME });
  }
});
