// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyB8YRdb_KbPojO3pJ9hj1WWjRojHcg6oS4",
	authDomain: "lillahyra.firebaseapp.com",
	projectId: "lillahyra",
	storageBucket: "lillahyra.appspot.com",
	messagingSenderId: "720219879579",
	appId: "1:720219879579:web:02b4f4e03633ee526b6e3e",
	measurementId: "G-15722VVX7H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(firebaseApp);
