const CACHE_NAME = "histodaily-beta57-course-disclosure-fix";
const APP_VERSION = "1.0.0-beta.57";
const ASSETS = ["/", "/index.html", "/styles.css?v=1.0.0-beta.57", "/app-core.js?v=1.0.0-beta.57", "/app-quality.js?v=1.0.0-beta.57", "/app-onboarding.js?v=1.0.0-beta.57", "/app.js?v=1.0.0-beta.57", "/lessons-lite.js?v=1.0.0-beta.57", "/manifest.webmanifest"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response && response.ok) caches.open(CACHE_NAME).then(cache => cache.put(event.request, response.clone()));
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || caches.match("/index.html"))));
});

