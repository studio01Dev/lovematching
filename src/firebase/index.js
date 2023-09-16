/* eslint-disable */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJ-j92XchVm_eEI0bt_fSbvIHgNV8-S5k",
  authDomain: "love-matching-ecb3c.firebaseapp.com",
  projectId: "love-matching-ecb3c",
  storageBucket: "love-matching-ecb3c.appspot.com",
  messagingSenderId: "226419079396",
  appId: "1:226419079396:web:5cf3b9abb740a23a6a54f1",
  measurementId: "G-YXQTZ6EF4S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

export default {db, storage}

