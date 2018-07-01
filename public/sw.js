
let cacheName = 'v3';
const cacheFiles = [
  './index.html',
  'https://fonts.googleapis.com/css?family=Montserrat:300,400,400i,500',
  '../src/css/style.css',
  '../src/images/converter-bg.png'
]


self.addEventListener('install', (e) => {
  console.log("[ServiceWorker] Installed");
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("[serviceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
    })
  )
})

self.addEventListener('activate', (e) => {
  console.log("[ServiceWorker] Activated");
  e.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(cacheNames.map(function(thisCacheName) {
          if (thisCacheName !== cacheName) {
            console.log("[ServiceWorker] Removing cached Files from ", thisCacheName);
            return caches.delete(thisCacheName);
          }
        }))
      })
    )
  })

self.addEventListener('fetch', (e) => {
  console.log("[ServiceWorker] Fetching Requests ...");
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) return response;
        return fetch(e.request);
    })
  );
});
