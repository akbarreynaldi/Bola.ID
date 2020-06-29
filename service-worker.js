//menyimpan asset ke cache storage
const version = "0.1.2";
const CACHE_NAME = `RealMadrid-${version}`;
let urlsToCache = [
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.googleapis.com/css?family=Assistant:200,400,700&&display=swap",
    "/",
    "/manifest.json",
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
    "src/images/PLAYER.jpg",
    "src/images/GK.jpg",
    "src/images/COACH.jpg",
    "src/images/header.jpg",
    "src/images/Real_Madrid_Logo.svg",
    "src/images/ic_RealMadrid.png",
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
    var base_url = "https://api.football-data.org/v2/";
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
                    if (cacheName !== CACHE_NAME && cacheName.startsWith("RealMadrid")) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});