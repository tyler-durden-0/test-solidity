import firebaseConfig from './firebaseConfig'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
import localforage from 'localforage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function initFirebase() {
  if (typeof window !== undefined) {
      initializeApp(firebaseConfig);
      console.log("Firebase has been init successfully");
  }
}


const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

const testNotificationSetUp = async () => {
  try {
    const tokenInLocalForage = await localforage.getItem("fcm_token");
  
     // Return the token if it is alredy in our local storage
    if (tokenInLocalForage !== null) {
      return tokenInLocalForage;
    }
  
    // Request the push notification permission from browser
    const status = await Notification.requestPermission();
    if (status && status === "granted") {
    // Get new token from Firebase
      const fcm_token = await getToken(messaging, {
        vapidKey: "BAVOPiaYQlawP_j_tO5HLzhHVuHPihr33ADysaNsyH9g0yMCPaxa8dCbSmUNWOC5cfPnV8Viy71CobWUJm3E6EE",
      });
  
      // Set token in our local storage
      if (fcm_token) {
        localforage.setItem("fcm_token", fcm_token);
        return fcm_token;
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
export { initFirebase, testNotificationSetUp, analytics, auth, db, messaging };
