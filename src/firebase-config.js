// Import Firebase functions
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAilgvycmAVskhOkm63rRdDqslhstrqfY",
  authDomain: "gogreen-69200.firebaseapp.com",
  projectId: "gogreen-69200",
  storageBucket: "gogreen-69200.appspot.com",
  messagingSenderId: "188424932293",
  appId: "1:188424932293:web:472c4c9015ba972be4d9ac",
  measurementId: "G-D9PGW3T8B3"
};

// Check if the Firebase app is already initialized
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export the Firebase auth instance
export const auth = getAuth(app);
export default app;
