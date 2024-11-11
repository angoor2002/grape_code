import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDEPGA_dVbBTbCInRdU49nlukH1Hj96XI8",
  authDomain: "idex-51f40.firebaseapp.com",
  projectId: "idex-51f40",
  storageBucket: "idex-51f40.firebasestorage.app",
  messagingSenderId: "1034569405186",
  appId: "1:1034569405186:web:98aec40e32aa729b56681b",
  measurementId: "G-9TH005L9NQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);