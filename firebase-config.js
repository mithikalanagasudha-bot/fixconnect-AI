import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8YjVfI4l6e7tYYR_JJBXdMowUrVNbkdc",
  authDomain: "fixconnect-ai.firebaseapp.com",
  projectId: "fixconnect-ai",
  storageBucket: "fixconnect-ai.firebasestorage.app",
  messagingSenderId: "1072996195291",
  appId: "1:1072996195291:web:868c0e38f5cca4e58da5fe",
  measurementId: "G-HRPP970FJD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();