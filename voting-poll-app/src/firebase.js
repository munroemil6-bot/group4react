// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0MwI5J0zvWmXdxGkoRZ8VR3v9eQGz6HE",
  authDomain: "voting-poll-app-101cc.firebaseapp.com",
  projectId: "voting-poll-app-101cc",
  storageBucket: "voting-poll-app-101cc.firebasestorage.app",
  messagingSenderId: "693634678213",
  appId: "1:693634678213:web:282f5d12e1c1e256245fac",
  measurementId: "G-MHHZY8Q8LR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);