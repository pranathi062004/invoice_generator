import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBs07z3gAObY9Be4k3QQWLrmY_HxXRgCbo",
  authDomain: "invoice-generator-a1d91.firebaseapp.com",
  projectId: "invoice-generator-a1d91",
  storageBucket: "invoice-generator-a1d91.firebasestorage.app",
  messagingSenderId: "1072770413870",
  appId: "1:1072770413870:web:7b14b06026b72f5d4bb6bf",
  measurementId: "G-WJZZBD9G67"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
