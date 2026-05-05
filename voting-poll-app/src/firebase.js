// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0MwI5J0zvWmXdxGkoRZ8VR3v9eQGz6HE",
  authDomain: "voting-poll-app-101cc.firebaseapp.com",
  projectId: "voting-poll-app-101cc",
  storageBucket: "voting-poll-app-101cc.firebasestorage.app",
  messagingSenderId: "693634678213",
  appId: "1:693634678213:web:3c32185b017b8e06245fac",
  measurementId: "G-4YF38QV7P8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics (optional - only works in production)
const analytics = getAnalytics(app);

// Initialize Authentication
export const auth = getAuth(app);

// Export the app if needed elsewhere
export default app;