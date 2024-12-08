import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCProZtTtfjhy6VewmOKACr17G6vvOymy8",
  authDomain: "expense-tracker-d1726.firebaseapp.com",
  projectId: "expense-tracker-d1726",
  storageBucket: "expense-tracker-d1726.firebasestorage.app",
  messagingSenderId: "347513266799",
  appId: "1:347513266799:web:0a168c7e6f5897986be39a",
  measurementId: "G-BFDE5322WB"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;

