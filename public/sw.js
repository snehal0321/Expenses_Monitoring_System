self.addEventListener("install", (event) => {
  self.skipWaiting(); // Activate immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim()); // Take control of all clients
});

self.addEventListener("fetch", (event) => {
  // Always fetch fresh data from the network
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
