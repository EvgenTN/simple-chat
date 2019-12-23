// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEZkN7o1_ZLZ59cbb-9oe1XZtrnEC7iDY",
  authDomain: "simple-chat-875d9.firebaseapp.com",
  databaseURL: "https://simple-chat-875d9.firebaseio.com",
  projectId: "simple-chat-875d9",
  storageBucket: "simple-chat-875d9.appspot.com",
  messagingSenderId: "51457124671",
  appId: "1:51457124671:web:1e2827b2e02293df318b8a",
  measurementId: "G-PZQMFM9KR1"
};

firebase.initializeApp(firebaseConfig);

export default firebase