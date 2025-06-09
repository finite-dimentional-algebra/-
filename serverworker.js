self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("練習用-cache").then(cache => {
            return cache.addAll([
                "index.html",
                "style.css",
                "script.js",
                "manifest.json"
            ]);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

self.addEventListener("push", event => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: "/icon.png"
    });
});

