// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7cda8.firebaseapp.com",
  projectId: "mern-estate-7cda8",
  storageBucket: "mern-estate-7cda8.appspot.com",
  messagingSenderId: "324009239394",
  appId: "1:324009239394:web:d36b2559ddda41c3bd823b"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);