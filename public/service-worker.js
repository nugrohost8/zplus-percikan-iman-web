
var ServiceWorkerGlobalScope;
//remember to update version number if updating.
const cacheName = "zplus-v1.0.0";

self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      //if you want to manually add resources
      //await cache.addAll([contentToCache,...]);
      return self.skipWaiting();
    })()
  );
});

//lets keep our cache's clean
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === cacheName) {
            return;
          }
          return caches.delete(key);
        })
      );
    })
  );
});

//lets auto cache GET requests

self.addEventListener("fetch", (e) => {

  e.respondWith((async function() {
    const cachedResponse = await caches.match(e.request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return fetch(e.request);
    //const networkResponse = await fetch(e.request);
    //return networkResponse;
  })());
  
});