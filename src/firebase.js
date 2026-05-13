import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBOCj82PIM-Qw-wpUj7O5f8xkdsoZuaX-I",
  authDomain: "fingertalkauth.firebaseapp.com",
  projectId: "fingertalkauth",
  storageBucket: "fingertalkauth.firebasestorage.app",
  messagingSenderId: "1034270713819",
  appId: "1:1034270713819:web:82b1080e31badcdafae9fe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


