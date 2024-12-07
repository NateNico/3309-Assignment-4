// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCProZtTtfjhy6VewmOKACr17G6vvOymy8",
  authDomain: "expense-tracker-d1726.firebaseapp.com",
  projectId: "expense-tracker-d1726",
  storageBucket: "expense-tracker-d1726.firebasestorage.app",
  messagingSenderId: "347513266799",
  appId: "1:347513266799:web:0a168c7e6f5897986be39a",
  measurementId: "G-BFDE5322WB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;

