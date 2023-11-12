import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD4KsYOJ_--X08O3RvyraKzVOZW-qVuZBs",
  authDomain: "bazaruniversal-d5502.firebaseapp.com",
  projectId: "bazaruniversal-d5502",
  storageBucket: "bazaruniversal-d5502.appspot.com",
  messagingSenderId: "681583002025",
  appId: "1:681583002025:web:2a7cfe8a0cb1d4b38c84b8"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };