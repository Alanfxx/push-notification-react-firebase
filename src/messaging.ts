import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage } from "firebase/messaging"

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyCO02jU_miPJIckTfvwqvaaEmgAhIrtyws",
  authDomain: "push-app-1f72a.firebaseapp.com",
  projectId: "push-app-1f72a",
  storageBucket: "push-app-1f72a.appspot.com",
  messagingSenderId: "444645290665",
  appId: "1:444645290665:web:dc60bd277d244dc8626fb8"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app)

function requestPermission() {
  console.log('Requesting permission...')

  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      console.log('Notification permission granted.')

      getToken(messaging, {
        vapidKey: 'BMRcg-j6B53H0kQx510PN92mIokcHwExk4mwsfa5Y_Zikq1hAtEhnDfwpmaUa4g2UphCP3yjQQFgLQJdJARpKv4'
      }).then(currentToken => {
        if (currentToken) {
          console.log('currentToken - ', currentToken)
        } else {
          console.log('can not get token')
        }
      })

      onMessage(messaging, ({ notification }) => {
        const notificationTitle = notification?.title ?? ''
        const notificationOptions = {
          body: notification?.body ?? '',
          icon: notification?.image ?? 'src/assets/icons/protech72.png'
        }
        navigator.serviceWorker.getRegistration().then(registration => {
          registration?.showNotification(notificationTitle, notificationOptions)
        })
      })

    } else {
      console.log('Do not have permission.')
    }
  })
}

requestPermission()
