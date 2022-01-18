const FILES_TO_CACHE = [
    "/",
    "/index.html",
    "/favicon.ico",
    "asset/images/icons/android-chrome-192x192.png",
    "asset/images/icons/android-chrome-512x512.png"
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";
// install
self.addEventListener("install", function (evt) {
    // pre cache image data
    evt.waitUntil(
        caches.open(DATA_CACHE_NAME).then((cache) => {
            console.log("Your image files were pre-cached successfully!");
            cache.add("/api/transaction")
        })
    );

    // pre cache all static assets
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Your static assets were pre-cached successfully!");
            cache.addAll(FILES_TO_CACHE)
        })
    );

    // tell the browser to activate this service worker immediately once it
    // has finished installing
    self.skipWaiting();
});

// activate
self.addEventListener("activate", function (evt) {
    // remove unwanted cache
    evt.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Removing old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});


// fetch
self.addEventListener("fetch", function (evt) {
    console.log("fetching");
    if (evt.request.url.includes("/api/")) {
        evt.respondWith(
            caches.open(DATA_CACHE_NAME).then(async cache => {
                try {
                    const response = await fetch(evt.request);
                    // If the response was good, clone it and store it in the cache.
                    if (response.status === 200) {
                        cache.put(evt.request.url, response.clone());
                    }
                    return response;
                } catch {
                    return await cache.match(evt.request);
                }
            }).catch(err => console.log(err))
        );

        return;
    }

    evt.respondWith(
        caches.open(CACHE_NAME).then(async cache => {
            const response = await cache.match(evt.request);
            return response || fetch(evt.request);
        })
    );
});