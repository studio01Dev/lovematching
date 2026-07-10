import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// NEXT_PUBLIC_* 는 빌드 타임에 주입됩니다.
// Cloudflare Workers 배포에서 env가 빠져도 동작하도록 공개 클라이언트 키를 fallback 으로 둡니다.
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyDJ-j92XchVm_eEI0bt_fSbvIHgNV8-S5k",
  authDomain: "love-matching-ecb3c.firebaseapp.com",
  projectId: "love-matching-ecb3c",
  storageBucket: "love-matching-ecb3c.appspot.com",
  messagingSenderId: "226419079396",
  appId: "1:226419079396:web:5cf3b9abb740a23a6a54f1",
  measurementId: "G-YXQTZ6EF4S",
};

let app;
let db;
let storage;

function getFirebaseApp() {
  if (!app) {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}

function getDb() {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

function getFirebaseStorage() {
  if (!storage) {
    storage = getStorage(getFirebaseApp());
  }
  return storage;
}

const firebase = {
  get db() {
    return getDb();
  },
  get storage() {
    return getFirebaseStorage();
  },
};

export default firebase;
