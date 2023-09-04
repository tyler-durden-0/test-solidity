// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import firebaseConfig from "./firebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const initializeFirebase = () => {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  console.log('app', app);
  const analytics = getAnalytics(app);
  console.log('analytics', analytics)
  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);
  console.log('auth', auth);
  return {app, analytics, auth};
}

