import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDYs3oQfHEQs_5nz9pLe1-qOzWMmKPX-54",
    authDomain: "test-project-eb690.firebaseapp.com",
    projectId: "test-project-eb690",
    storageBucket: "test-project-eb690.appspot.com",
    messagingSenderId: "651850347297",
    appId: "1:651850347297:web:6888519f10bccbd96d8460",
    measurementId: "G-5PLW1LVKT6"
};

function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const app = initializeApp(firebaseConfig);

      const messaging = getMessaging(app);
      getToken(messaging, {
        vapidKey:
          "BAVOPiaYQlawP_j_tO5HLzhHVuHPihr33ADysaNsyH9g0yMCPaxa8dCbSmUNWOC5cfPnV8Viy71CobWUJm3E6EE",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();