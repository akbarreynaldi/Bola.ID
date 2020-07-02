const version = "0.1.8";
const CACHE_NAME = `RealMadrid-${version}`;
let urlsToCache = [
    "/",
    "/manifest.json",
    "/apple-icon.png",
    "/apple-icon-57x57.png",
    "/apple-icon-60x60.png",
    "/apple-icon-72x72.png",
    "/apple-icon-76x76.png",
    "/apple-icon-114x114.png",
    "/apple-icon-120x120.png",
    "/apple-icon-144x144.png",
    "/apple-icon-152x152.png",
    "/apple-icon-180x180.png",
    "/apple-icon-precomposed.png",
    "/favicon-16x16.png",
    "/favicon-32x32.png",
    "/favicon-96x96.png",
    "/nav-menu.html",
    "/index.html",
    "/match-detail.html",
    "/pages/home.html",
    "/pages/match.html",
    "/pages/saved.html",
    "/pages/standings.html",
    "/src/css/materialize.min.css",
    "/src/css/main.css",
    "/src/js/materialize.min.js",
    "/src/js/loadContent.js",
    "/src/js/api.js",
    "/src/js/idb.js",
    "/src/js/db.js",
    "src/images/PLAYER.jpg",
    "src/images/GK.jpg",
    "src/images/COACH.jpg",
    "src/images/header-background.jpg",
    "src/images/Real_Madrid_Logo.png",
    "src/images/notification.png",
    "/src/images/icons/icon-72x72.png",
    "/src/images/icons/icon-96x96.png",
    "/src/images/icons/icon-128x128.png",
    "/src/images/icons/icon-144x144.png",
    "/src/images/icons/icon-152x152.png",
    "/src/images/icons/icon-192x192.png",
    "/src/images/icons/icon-384x384.png",
    "/src/images/icons/icon-512x512.png",
    "/src/images/splash/launch-640x1136.png",
    "/src/images/splash/launch-750x1294.png",
    "/src/images/splash/launch-1125x2436.png",
    "/src/images/splash/launch-1242x2148.png",
    "/src/images/splash/launch-1536x2048.png",
    "/src/images/splash/launch-1668x2224.png",
    "/src/images/splash/launch-2048x2732.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.googleapis.com/css?family=Assistant:200,400,700&&display=swap",
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll((urlsToCache))
                .then(() => self.skipWaiting());
        })
    );
});

//menggunakan asset dari cache bila ada jika tidak ada maka menggunakan fetch request
self.addEventListener("fetch", event => {
    let base_url = "https://api.football-data.org/v2/";
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            caches.open(CACHE_NAME).then(cache => {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                })
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request, { ignoreSearch: true }).then(response => {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }

                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
        )
    }
});

//menghapus cache lama
self.addEventListener('activate', event => {
    console.log('Aktivasi service worker baru');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: '/src/images/notification.png',
        vibrate: [100, 50, 100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});