
let cacheName = 'v2';
const cacheFiles = [
  './',
  './index.html'
]


self.addEventListener('install', function(e) {
  console.log("[ServiceWorker] Installed");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log("[serviceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
    })
  )
})

self.addEventListener('activate', function(e) {
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

self.addEventListener('fetch', function(e) {
  console.log("[ServiceWorker] Fetching", e.request);
  e.respondWith(
    fetch(e.request).then((response) => {
      if (response.status === 404) {
        return new Response("Oops!!! Not Found");
      }
      return response
    }).catch(() => {
      return new Response("Oops!!! Totally Failed")
    })
  );
})
