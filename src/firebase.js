import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLTjSRXTHZtBfmVyJasxitqVNs4R2YaWM",
  authDomain: "my-first-metamask-39906.firebaseapp.com",
  projectId: "my-first-metamask-39906",
  storageBucket: "my-first-metamask-39906.firebasestorage.app",
  messagingSenderId: "46843422728",
  appId: "1:46843422728:web:5503373e01c0f6543009bd",
  measurementId: "G-BF9LVJ7KK3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);