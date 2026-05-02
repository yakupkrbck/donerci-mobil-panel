importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBNpz1_e4eqKCsdTQJSOxBg4O9gF9qOWX8",
    authDomain: "donerci-ismail-siparis.firebaseapp.com",
    projectId: "donerci-ismail-siparis",
    storageBucket: "donerci-ismail-siparis.firebasestorage.app",
    messagingSenderId: "641245277881",
    appId: "1:641245277881:web:1faaac95dbb2fcd1abb568"
});

const messaging = firebase.messaging();

// Uygulama KAPALI veya ARKA PLANDA iken bildirim göster
messaging.onBackgroundMessage(payload => {
    const title = payload.notification?.title || 'YENİ SİPARİS!';
    const body  = payload.notification?.body  || 'Paneli kontrol edin';

    self.registration.showNotification(title, {
        body,
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-192.png',
        tag: 'siparis-uyari',
        renotify: true,
        requireInteraction: true, // bildirim otomatik kapanmaz
        vibrate: [300, 100, 300, 100, 300],
        actions: [
            { action: 'open', title: 'Paneli Aç' }
        ]
    });
});

// Bildirime tıklanınca uygulamayı aç
self.addEventListener('notificationclick', event => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
            for (const client of clientList) {
                if (client.url.includes('/') && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});
