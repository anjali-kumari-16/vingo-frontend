// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
  authDomain: "petpuja-a5262.firebaseapp.com",
  projectId: "petpuja-a5262",
  storageBucket: "petpuja-a5262.firebasestorage.app",
  messagingSenderId: "1039361329628",
  appId: "1:1039361329628:web:d34faecebbc3967dfaa719",
  measurementId: "G-M17GGQRJPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {app,auth}