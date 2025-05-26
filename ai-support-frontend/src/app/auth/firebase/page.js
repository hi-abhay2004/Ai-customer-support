// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBK4A9sMzu0rHs4emVV_H-AAZE1jC-uGh4",
    authDomain: "ai-solution-f039f.firebaseapp.com",
    projectId: "ai-solution-f039f",
    storageBucket: "ai-solution-f039f.firebasestorage.app",
    messagingSenderId: "367173057308",
    appId: "1:367173057308:web:bea0bf304e6f50c930d8d9",
    measurementId: "G-25ZBE0FMX7"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
