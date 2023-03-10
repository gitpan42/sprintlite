// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth} from 'firebase/auth'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0FdN1lNiAt56QcBkWxwm7Xs_LXZVdfCI",
  authDomain: "sprintlite-7bd60.firebaseapp.com",
  projectId: "sprintlite-7bd60",
  storageBucket: "sprintlite-7bd60.appspot.com",
  messagingSenderId: "760171550964",
  appId: "1:760171550964:web:9c6c79fddc069f753ee6a1",
  measurementId: "G-YLES6VDVTB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const globalAuth = getAuth(app);
export const db  = getFirestore(app); 