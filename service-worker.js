// menyimpan asset ke cache storage
// const CACHE_NAME = "RealMadrid-v1";
// let urlsToCache = [
//     "/",
//     "/manifest.json",
//     "/nav-menu.html",
//     "/index.html",
//     "/match-data.html",
//     "/pages/home.html",
//     "/pages/match.html",
//     "/pages/saved.html",
//     "/pages/standings.html",
//     "/src/css/materialize.min.css",
//     "/src/css/main.css",
//     "/src/js/materialize.min.js",
//     "/src/js/loadContent.js",
//     "/src/js/api.js",
//     "src/images/PLAYER.png",
//     "src/images/GK.jpg",
//     "src/images/COACH.jpg",
//     "src/images/header.jpg",
//     "src/images/Real_Madrid_Logo.svg",
//     "src/images/ic_RealMadrid.png",
// ];

// self.addEventListener("install", function(event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function(cache) {
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// //menggunakan asset dari cache bila ada jika tidak ada maka menggunakan fetch request
// self.addEventListener("fetch", function(event) {
//     let base_url = "https://api.football-data.org/v2/";
//     if (event.request.url.indexOf(base_url) > -1) {
//         event.respondWith(
//             caches.open(CACHE_NAME).then(function(cache) {
//                 return fetch(event.request).then(function(response) {
//                     cache.put(event.request.url, response.clone());
//                     return response;
//                 })
//             })
//         );
//     } else {
//         event.respondWith(
//             caches.match(event.request, { ignoreSearch: true }).then(function(response) {
//                 return response || fetch(event.request);
//             })
//         )
//     }
// });

// //menghapus cache lama
// self.addEventListener('activate', function(event) {
//     console.log('Aktivasi service worker baru');
//     event.waitUntil(
//         caches.keys().then(function(cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function(cacheName) {
//                     if (cacheName !== CACHE_NAME && cacheName.startsWith("RealMadrid")) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });