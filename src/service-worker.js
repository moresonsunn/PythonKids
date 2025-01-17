const CACHE_NAME = "python-lessons-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/static/js/bundle.js", // Passe dies an deine Build-Dateien an
    "/static/css/main.css"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
