import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDfwY7iVwQJyZOE0_sGia4Hf4z0PjOU6_E",
    authDomain: "organizer-320a3.firebaseapp.com",
    projectId: "organizer-320a3",
    storageBucket: "organizer-320a3.appspot.com",
    messagingSenderId: "995249317646",
    appId: "1:995249317646:web:e13ca20f50eead7ce9595f",
    measurementId: "G-T4P11P6T8V"
  };
  
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();

export default db;