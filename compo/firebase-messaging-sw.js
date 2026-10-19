// Le service worker des notifications push de Compo : il reçoit les messages de Firebase Cloud
// Messaging même quand le site est fermé, et les montre. Les messages envoyés depuis la console
// (« Notification ») s'affichent d'eux-mêmes ; un toucher ouvre Compo.
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyA_ADxYhx1KL_xjzjhlGxF75Lh3422i9FE",
    authDomain: "compo-21510.firebaseapp.com",
    projectId: "compo-21510",
    storageBucket: "compo-21510.firebasestorage.app",
    messagingSenderId: "156312710218",
    appId: "1:156312710218:web:b2aa03c9d3de80fb23cab3",
});

firebase.messaging();

// Toucher la notification ouvre Compo — ou le ramène devant s'il est déjà ouvert.
self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: "window", includeUncontrolled: true }).then(function (windows) {
            for (var i = 0; i < windows.length; i++) {
                if ("focus" in windows[i]) return windows[i].focus();
            }
            return clients.openWindow("./");
        }),
    );
});
