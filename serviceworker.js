const newsAPI = "https://newsapi.org/v1/articles?source=bbc-news&apiKey=cccfebb8552d4b1899fb0cbbc7e08309";
const BASE_PATH = "/portfoliostuff/",
const CACHED_URLS = [
    BASE_PATH + 'index.html',
		BASE_PATH + 'projects.html',
		BASE_PATH + 'news.html',
		BASE_PATH + 'contact.html',
		BASE_PATH + 'projects.html',
    BASE_PATH + 'main.js',
		BASE_PATH + 'script.js',
    BASE_PATH + 'Images/android-icon-36x36.png',
    BASE_PATH + 'Images/android-icon-48x48.png',
    BASE_PATH + 'Images/android-icon-72x72.png',
    BASE_PATH + 'Images/android-icon-96x96.png',
    BASE_PATH + 'Images/android-icon-144x144.png',
    BASE_PATH + 'Images/android-icon-192x192.png',
    BASE_PATH + 'Images/logoNew.gif',
    //BASE_PATH + 'img/ico/favicon-16x16.png',
    // BASE_PATH + 'img/ico/favicon-32x32.png',
    //BASE_PATH + 'img/ico/favicon-96x96.png',
    // BASE_PATH + 'img/ico/ms-icon-144x144.png',
		// BASE_PATH + 'img/offlinemap.jpg',
		// BASE_PATH + 'img/hangman.png',
		// BASE_PATH + 'img/snakeye.png',
		// BASE_PATH + 'img/soundboard.png',
		// BASE_PATH + 'img/fishtank.png',
		// BASE_PATH + 'img/logo.svg',
		// BASE_PATH + 'img/technews-default.svg',
    BASE_PATH + 'manifest.json',
    // BASE_PATH + 'css/SourceCodePro-Black.otf',
    // BASE_PATH + 'css/SourceCodePro-Regular.otf',
    BASE_PATH + 'style.css',
    // BASE_PATH + 'css/main.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(CACHED_URLS);
    })
  );
});

self.addEventListener('fetch', function(event) {
  let requestURL = new URL(event.request.url);
  if (requestURL.pathname === BASE_PATH + 'index.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('index.html').then(function(cachedResponse) {
          let fetchPromise = fetch('index.html').then(function(networkResponse) {
            cache.put('index.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.pathname === BASE_PATH + 'news.html') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match('news.html').then(function(cachedResponse) {
          let fetchPromise = fetch('news.html').then(function(networkResponse) {
            cache.put('news.html', networkResponse.clone());
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        });
      })
    );
  } else if (requestURL.href === googleMapsAPIJS) {
    event.respondWith(
      fetch(
        googleMapsAPIJS+'&'+Date.now(),
        { mode: 'no-cors', cache: 'no-store' }
      ).catch(function() {
        return caches.match('omap.js');
      })
    );
  } else if (requestURL.href === newsAPI) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return fetch(event.request).then(function(networkResponse) {
          cache.put(event.request, networkResponse.clone());
          caches.delete(TEMP_IMAGE_CACHE_NAME);
          return networkResponse;
        }).catch(function() {
          return caches.match(event.request);
        });
      })
    );
} else if (CACHED_URLS.includes(requestURL.href) ||
    				CACHED_URLS.includes(requestURL.pathname)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request);
        });
      })
    );
  }
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName.startsWith('gih-cache') && CACHE_NAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
