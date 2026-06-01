import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCgyp42aSAzI3VdHSKmtglFJAPsMATKyaM",
  authDomain: "gaslikeage.firebaseapp.com",
  databaseURL: "https://gaslikeage-default-rtdb.firebaseio.com",
  projectId: "gaslikeage",
  storageBucket: "gaslikeage.firebasestorage.app",
  messagingSenderId: "460435846128",
  appId: "1:460435846128:web:5e834909c5b538efa02335",
  measurementId: "G-BGRFBT41EB"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
