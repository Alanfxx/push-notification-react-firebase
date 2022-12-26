// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCO02jU_miPJIckTfvwqvaaEmgAhIrtyws",
  authDomain: "push-app-1f72a.firebaseapp.com",
  projectId: "push-app-1f72a",
  storageBucket: "push-app-1f72a.appspot.com",
  messagingSenderId: "444645290665",
  appId: "1:444645290665:web:dc60bd277d244dc8626fb8"
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.onBackgroundMessage(({ notification }) => {
  const notificationTitle = notification?.title ?? ''
  const notificationOptions = {
    body: notification?.body ?? '',
    icon: notification?.image ?? 'src/assets/icons/protech72.png'
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})

