import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkZcaqSkfStmp6XppcBYfPuiHaIm9LlIw", //not publish in github
  authDomain: "loginapp-deb69.firebaseapp.com", //not publish in github
  projectId: "loginapp-deb69",
  storageBucket: "loginapp-deb69.appspot.com",
  messagingSenderId: "702229184126",
  appId: "1:702229184126:web:f497a5beefbc698934622f",
  measurementId: "G-K19EL9259W",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
