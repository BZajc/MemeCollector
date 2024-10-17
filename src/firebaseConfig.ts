// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcJz32t1T7F9n6LHaz4SCGv4RfIuTfzi8",
  authDomain: "meme-collector-4795d.firebaseapp.com",
  projectId: "meme-collector-4795d",
  storageBucket: "meme-collector-4795d.appspot.com",
  messagingSenderId: "778991442864",
  appId: "1:778991442864:web:8f22dc8877d287302c1475",
  measurementId: "G-1PF58PG68L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Keep User Logged In
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Persistence is set, no further action required here
  })
  .catch((error) => {
    console.error("Error occured related to persistence", error);
  });

export { app, analytics, auth };
