import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKQmjNerxwlOBkQ9bbDYP3Yz3BErO4RCc",
  authDomain: "creative-library-f09a7.firebaseapp.com",
  projectId: "creative-library-f09a7",
  storageBucket: "creative-library-f09a7.firebasestorage.app",
  messagingSenderId: "163749731410",
  appId: "1:163749731410:web:e9690c3b7e18a98baf538b",
  measurementId: "G-D9TV4F006B"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
