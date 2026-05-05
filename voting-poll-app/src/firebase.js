// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "AIzaSyB9roDaPkLdyVY9mf-u57Wp-R0wF4mwXaY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "voting-app-a1e54.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "voting-app-a1e54",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "voting-app-a1e54.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "630366081282",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "1:630366081282:web:c544658d149823411a721b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "G-6DHDL8W6L2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
