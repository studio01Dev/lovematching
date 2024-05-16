import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "love-matching-ecb3c.firebaseapp.com",
  projectId: "love-matching-ecb3c",
  storageBucket: "love-matching-ecb3c.appspot.com",
  messagingSenderId: "226419079396",
  appId: "1:226419079396:web:5cf3b9abb740a23a6a54f1",
  measurementId: "G-YXQTZ6EF4S"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default {db, storage}

