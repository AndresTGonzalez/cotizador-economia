
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAQc5V4cvXDEe6QOK11J94bLS0Zaj2EqQM",
  authDomain: "cotizador-661f2.firebaseapp.com",
  projectId: "cotizador-661f2",
  storageBucket: "cotizador-661f2.appspot.com",
  messagingSenderId: "122851240424",
  appId: "1:122851240424:web:6a82a0a93b35d5c1791c5d"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);