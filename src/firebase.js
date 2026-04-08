import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCqt5y6tnTDj6P8CTQynV2zRFQSuTueRGk",
  authDomain: "luz-catolica.firebaseapp.com",
  projectId: "luz-catolica",
  storageBucket: "luz-catolica.firebasestorage.app",
  messagingSenderId: "897427753569",
  appId: "1:897427753569:web:de9b60e5c9793e5e4df820",
  measurementId: "G-LFD8BSGB91"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
