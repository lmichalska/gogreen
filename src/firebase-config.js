import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAAilgvycmAVskhOkm63rRdDqslhstrqfY",
  authDomain: "gogreen-69200.firebaseapp.com",
  projectId: "gogreen-69200",
  storageBucket: "gogreen-69200.appspot.com",
  messagingSenderId: "188424932293",
  appId: "1:188424932293:web:472c4c9015ba972be4d9ac",
  measurementId: "G-D9PGW3T8B3",
  databaseURL: "https://gogreen-69200-default-rtdb.europe-west1.firebasedatabase.app", // Added the correct database URL
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get the database instance using the modular SDK
const database = getDatabase(firebaseApp);

export { database };