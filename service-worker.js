
const CACHE_NAME = 'grade-app-v1';
const ASSETS = [
  '/pwa_grade_calculator/index.html',
  '/pwa_grade_calculator/manifest.json',
  '/pwa_grade_calculator/icons/icon-192.png',
  '/pwa_grade_calculator/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
