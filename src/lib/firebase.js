// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbOmwFaM0n4AS-iAROP0Q-ckxEQe01bg4",
  authDomain: "time-capsules-1ac14.firebaseapp.com",
  databaseURL: "https://time-capsules-1ac14-default-rtdb.firebaseio.com",
  projectId: "time-capsules-1ac14",
  storageBucket: "time-capsules-1ac14.firebasestorage.app",
  messagingSenderId: "227076563227",
  appId: "1:227076563227:web:ae6aa3b2ef56434a4533be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);

export default app;
