import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqFrPKW1bcYrYZ4Ta4UxNBYdRUpSpaGjk",
  authDomain: "xiominails.firebaseapp.com",
  projectId: "xiominails",
  storageBucket: "xiominails.firebasestorage.app",
  messagingSenderId: "919234938375",
  appId: "1:919234938375:web:4ad4ff4e489ccf1dba8ca2",
  measurementId: "G-0P62EL1L0D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
