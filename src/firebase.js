// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional


// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);




// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDra9k9fUOAfImp7yXyBBhSuSSCrHzztII",
  authDomain: "slr-fingertalk.firebaseapp.com",
  projectId: "slr-fingertalk",
  storageBucket: "slr-fingertalk.firebasestorage.app",
  messagingSenderId: "651023047429",
  appId: "1:651023047429:web:c8021ed7c3f0b0463e356c",
  measurementId: "G-EPS33CX57X"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
