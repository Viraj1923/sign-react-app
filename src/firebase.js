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
  apiKey: "AIzaSyDflLjbxCiP5kpOr5eorfBU3a8SrdItPlc",
  authDomain: "fingertalkauth.firebaseapp.com",
  projectId: "fingertalkauth",
  storageBucket: "fingertalkauth.firebasestorage.com",
  messagingSenderId: "1034270713819",
  appId: "1:1034270713819:web:6508ed5cad019437fae9fe"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
