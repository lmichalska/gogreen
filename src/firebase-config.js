import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAAilgvycmAVskhOkm63rRdDqslhstrqfY",
  authDomain: "gogreen-69200.firebaseapp.com",
  projectId: "gogreen-69200",
  storageBucket: "gogreen-69200.appspot.com",
  messagingSenderId: "188424932293",
  appId: "1:188424932293:web:472c4c9015ba972be4d9ac",
  measurementId: "G-D9PGW3T8B3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth; // Default export
