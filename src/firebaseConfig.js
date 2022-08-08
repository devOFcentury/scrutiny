// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5eUAMLXUVOG7UVAh0RB-whrpkS8OcqYw",
  authDomain: "pointage-9dda8.firebaseapp.com",
  projectId: "pointage-9dda8",
  storageBucket: "pointage-9dda8.appspot.com",
  messagingSenderId: "1039706944165",
  appId: "1:1039706944165:web:1de657a83c8b471806934c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);