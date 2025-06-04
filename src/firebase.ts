import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdTWz9WhqlRcqtiw3mfoNL5g3ulJGSwaQ",
    authDomain: "breakfast-buddy-5bafb.firebaseapp.com",
    projectId: "breakfast-buddy-5bafb",
    storageBucket: "breakfast-buddy-5bafb.firebasestorage.app",
    messagingSenderId: "1096012025865",
    appId: "1:1096012025865:web:d660018d1c29e7f915a8d8",
    measurementId: "G-6HR0F2PM01"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);