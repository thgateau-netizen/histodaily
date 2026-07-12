const CACHE_NAME = "histodaily-beta258-v1";
const APP_VERSION = "1.0.0-beta.258.0";
const ASSETS = [
  "/",
  "/index.html",
  "/app.css?v=1.0.0-beta.258.0",
  "/mobile-layout.css?v=1.0.0-beta.258.0",
  "/social-v2.css?v=1.0.0-beta.258.0",
  "/profile-v258.css?v=1.0.0-beta.258.0",
  "/lessons-lite.js?v=1.0.0-beta.258.0",
  "/app-bootstrap.js?v=1.0.0-beta.258.0",
  "/app.js?v=1.0.0-beta.258.0",
  "/content-library.js?v=1.0.0-beta.258.0",
  "/content-literature.js?v=1.0.0-beta.258.0",
  "/content-premium-233.js?v=1.0.0-beta.258.0",
  "/content-premium-234.js?v=1.0.0-beta.258.0",
  "/content-premium-235.js?v=1.0.0-beta.258.0",
  "/content-premium-236.js?v=1.0.0-beta.258.0",
  "/content-premium-237.js?v=1.0.0-beta.258.0",
  "/content-coherence-239.js?v=1.0.0-beta.258.0",
  "/content-humanize-240.js?v=1.0.0-beta.258.0",
  "/content-cleanup-241.js?v=1.0.0-beta.258.0",
  "/app-runtime.js?v=1.0.0-beta.258.0",
  "/visual-v4.js?v=1.0.0-beta.258.0",
  "/mobile-layout.js?v=1.0.0-beta.258.0",
  "/social-v2.js?v=1.0.0-beta.258.0",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/favicon.ico",
  "/hero-astronomy-art-v3-faded.png"
];

async function putIfUsable(request, response) {
  if (response && response.ok) {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
  }
  return response;
}

async function fetchWithTimeout(request, timeout = 5000) {
  const controller = typeof AbortController === "function" ? new AbortController() : null;
  const timer = controller ? setTimeout(() => controller.abort(), timeout) : null;
  try {
    return await fetch(request, { cache: "no-store", signal: controller?.signal });
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function networkFirst(request, fallbackKey = request, timeout = 5000) {
  try {
    const fresh = await fetchWithTimeout(request, timeout);
    if (fresh?.ok) return putIfUsable(fallbackKey, fresh);
  } catch {}
  return (await caches.match(fallbackKey)) || (await caches.match(request)) || Response.error();
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
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
    event.respondWith(networkFirst(event.request, "/index.html", 4500));
    return;
  }

  const isCode = /\.(?:js|css|html)$/.test(url.pathname) || url.pathname.endsWith("manifest.webmanifest");
  if (isCode) {
    event.respondWith(networkFirst(event.request, event.request, 4500));
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response?.ok) await putIfUsable(event.request, response);
      return response || Response.error();
    } catch {
      return Response.error();
    }
  })());
});

self.addEventListener("message", event => {
  if (event.data?.type === "HISTODAILY_VERSION") {
    event.source?.postMessage?.({ type: "HISTODAILY_VERSION", version: APP_VERSION, cache: CACHE_NAME });
  }
  if (event.data?.type === "HISTODAILY_SKIP_WAITING") self.skipWaiting();
});
