// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBdkxW_9XAcdYJJMx9iXG952QC6XfimBlE",
  authDomain: "journeypath-17d60.firebaseapp.com",
  projectId: "journeypath-17d60",
  storageBucket: "journeypath-17d60.appspot.com",
  messagingSenderId: "487331008287",
  appId: "1:487331008287:web:4015af05b65ca40cd12a2a",
  measurementId: "G-T6NCQQYDXD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();