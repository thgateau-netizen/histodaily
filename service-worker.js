const CACHE_NAME = "histodaily-rc13-1-push-v1";
const APP_VERSION = "1.0.0-rc.13.1";
const CRITICAL_ASSETS = [
  "/",
  "/index.html",
  "/histodaily.css?v=1.0.0-rc.13.1",
  "/lessons-lite.js?v=1.0.0-rc.13.1",
  "/app-bootstrap.js?v=1.0.0-rc.13.1",
  "/sound-ui.js?v=1.0.0-rc.13.1",
  "/app.js?v=1.0.0-rc.13.1",
  "/content-library.js?v=1.0.0-rc.13.1",
  "/content-literature.js?v=1.0.0-rc.13.1",
  "/content-premium-233.js?v=1.0.0-rc.13.1",
  "/content-premium-234.js?v=1.0.0-rc.13.1",
  "/content-premium-235.js?v=1.0.0-rc.13.1",
  "/content-premium-236.js?v=1.0.0-rc.13.1",
  "/content-premium-237.js?v=1.0.0-rc.13.1",
  "/content-coherence-239.js?v=1.0.0-rc.13.1",
  "/content-humanize-240.js?v=1.0.0-rc.13.1",
  "/content-cleanup-241.js?v=1.0.0-rc.13.1",
  "/content-audit-v267.js?v=1.0.0-rc.13.1",
  "/mystery-clarity-v272.js?v=1.0.0-rc.13.1",
  "/app-runtime.js?v=1.0.0-rc.13.1",
  "/visual-v4.js?v=1.0.0-rc.13.1",
  "/engagement-v263.js?v=1.0.0-rc.13.1",
  "/mobile-layout.js?v=1.0.0-rc.13.1",
  "/social-v2.js?v=1.0.0-rc.13.1",
  "/expedition-v264.js?v=1.0.0-rc.13.1",
  "/streak-v265.js?v=1.0.0-rc.13.1",
  "/archive-mobile-v268.js?v=1.0.0-rc.13.1",
  "/course-mobile-v269.js?v=1.0.0-rc.13.1",
  "/onboarding-v275.js?v=1.0.0-rc.13.1",
  "/expedition-delivery-v276.js?v=1.0.0-rc.13.1",
  "/release-polish-v278.js?v=1.0.0-rc.13.1",
  "/release-center-v279.js?v=1.0.0-rc.13.1",
  "/polish-v280.js?v=1.0.0-rc.13.1",
  "/course-polish-v283.js?v=1.0.0-rc.13.1",
  "/launch-readiness-v284.js?v=1.0.0-rc.13.1",
  "/performance-accessibility-v285.js?v=1.0.0-rc.13.1",
  "/stability-v286.js?v=1.0.0-rc.13.1",
  "/notifications-v288.js?v=1.0.0-rc.13.1",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png",
  "/favicon.ico"
];
const OPTIONAL_ASSETS = [
  "/privacy.html",
  "/robots.txt",
  "/hero-astronomy-art-v2.png",
  "/hero-astronomy-art-v3-faded.png",
  "/hero-astronomy-blackhole.png"
];
const ASSETS = [...CRITICAL_ASSETS, ...OPTIONAL_ASSETS];

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

async function cacheAsset(cache, asset) {
  const request = new Request(asset, { cache: "reload" });
  const response = await fetch(request);
  if (!response?.ok) throw new Error(`Precache impossible: ${asset} (${response?.status || "réseau"})`);
  await cache.put(request, response.clone());
}

async function cacheInBatches(cache, assets, { required = true, batchSize = 6 } = {}) {
  for (let index = 0; index < assets.length; index += batchSize) {
    const jobs = assets.slice(index, index + batchSize).map(asset => cacheAsset(cache, asset));
    if (required) await Promise.all(jobs);
    else await Promise.allSettled(jobs);
  }
}

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      // Le nouveau worker ne s'installe que si tout le code nécessaire
      // est disponible. Un réseau coupé ne peut donc plus remplacer un cache sain
      // par une version partielle.
      await cacheInBatches(cache, CRITICAL_ASSETS, { required: true, batchSize: 6 });
      await cacheInBatches(cache, OPTIONAL_ASSETS, { required: false, batchSize: 4 });
      await self.skipWaiting();
    } catch (error) {
      // Un installateur refusé ne doit laisser aucune trace : l'ancien worker
      // utilise caches.match() globalement et ne doit jamais trouver un mélange
      // incomplet de deux versions lors d'un démarrage hors connexion.
      await caches.delete(CACHE_NAME).catch(() => false);
      throw error;
    }
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

  const isVersionedCode = /\.(?:js|css)$/.test(url.pathname) && url.searchParams.has("v");
  if (isVersionedCode) {
    // Les URL versionnées changent à chaque livraison : cache immédiat, mise à jour en arrière-plan.
    event.respondWith((async () => {
      const cached = await caches.match(event.request);
      const refresh = fetch(event.request).then(response => putIfUsable(event.request, response)).catch(() => null);
      if (cached) {
        event.waitUntil(refresh);
        return cached;
      }
      return (await refresh) || Response.error();
    })());
    return;
  }

  const isFreshCode = /\.(?:html)$/.test(url.pathname) || url.pathname.endsWith("manifest.webmanifest");
  if (isFreshCode) {
    event.respondWith(networkFirst(event.request, event.request, 3200));
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


/* Web Push notifications — RC13.1 */
self.addEventListener("push", event => {
  event.waitUntil((async () => {
    let payload = {};
    try { payload = event.data ? event.data.json() : {}; } catch {
      try { payload = JSON.parse(event.data?.text?.() || "{}"); } catch { payload = {}; }
    }
    const title = String(payload.title || "HistoDaily");
    const data = payload.data && typeof payload.data === "object" ? payload.data : {};
    const url = String(payload.url || data.url || "/?view=daily&source=push");
    const options = {
      body: String(payload.body || "Ton expédition du jour est disponible."),
      icon: String(payload.icon || "/icon-192.png"),
      badge: String(payload.badge || "/icon-192.png"),
      tag: String(payload.tag || "histodaily-reminder"),
      renotify: false,
      data: { ...data, url },
      actions: [{ action: "open", title: "Ouvrir HistoDaily" }]
    };
    try { await self.navigator?.setAppBadge?.(1); } catch {}
    await self.registration.showNotification(title, options);
  })());
});

self.addEventListener("notificationclick", event => {
  event.notification?.close?.();
  const targetUrl = new URL(event.notification?.data?.url || "/?view=daily&source=push", self.location.origin).href;
  event.waitUntil((async () => {
    try { await self.navigator?.clearAppBadge?.(); } catch {}
    const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    const sameOrigin = windows.find(client => {
      try { return new URL(client.url).origin === self.location.origin; } catch { return false; }
    });
    if (sameOrigin) {
      await sameOrigin.focus();
      if (typeof sameOrigin.navigate === "function") await sameOrigin.navigate(targetUrl);
      return;
    }
    await self.clients.openWindow(targetUrl);
  })());
});
