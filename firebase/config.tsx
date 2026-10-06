// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore/lite";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSSz-EVtx6-WWKpftSXC9SZzWPemOig6o",
  authDomain: "app-react-d7f85.firebaseapp.com",
  databaseURL: "https://app-react-d7f85-default-rtdb.firebaseio.com",
  projectId: "app-react-d7f85",
  storageBucket: "app-react-d7f85.firebasestorage.app",
  messagingSenderId: "260161005470",
  appId: "1:260161005470:web:324a10d79ac27380bad88f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth( app );
export const db = getDatabase(app); 