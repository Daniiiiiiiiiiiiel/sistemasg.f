const CACHE_NAME = "sistemaSG-v1";

const STATIC_ASSETS = [
  "index.html",
  "pages/cliente.html",
  "pages/admin.html",
  "css/styles.css",
  "js/app.js",
  "assets/icon-192.png",
  "assets/icon-512.png"
];

// ============================
// INSTALL
// ============================
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ============================
// ACTIVATE
// ============================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => key !== CACHE_NAME && caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ============================
// FETCH
// ============================
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // ❌ NO interceptar API ni POST
  if (
    request.url.includes("/api/") ||
    request.method !== "GET"
  ) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, response.clone());
          return response;
        });
      });
    })
  );
});
