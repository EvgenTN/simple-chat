// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.S_CHAT_API_KEY,
  authDomain: process.env.S_CHAT_AUTH_DOMAIN,
  databaseURL: process.env.S_CHAT_DATABASE_URL,
  projectId: process.env.S_CHAT_PROJECT_ID,
  storageBucket: process.env.S_CHAT_STORAGE_BUCKET,
  messagingSenderId: process.env.S_CHAT_MESSAGING_SENDER_ID,
  appId: process.env.S_CHAT_APP_ID,
  measurementId: process.env.S_CHAT_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);

export default firebase