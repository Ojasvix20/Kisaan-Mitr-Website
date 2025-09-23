// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBT47N02p8tRzTjEs3APShaL_vBkoYR9VM",
  authDomain: "kisaan-mitr-chat.firebaseapp.com",
  projectId: "kisaan-mitr-chat",
  storageBucket: "kisaan-mitr-chat.firebasestorage.app",
  messagingSenderId: "262309019501",
  appId: "1:262309019501:web:8a15e90438b1b572816464",
  measurementId: "G-V6N65E7R05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the services you'll need
export const auth = getAuth(app);
export const db = getFirestore(app);
