// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCy71zmWTeyTXFuIZSfqWRJxlIQXU0mxhw",
  authDomain: "codeshare-1c25d.firebaseapp.com",
  projectId: "codeshare-1c25d",
  storageBucket: "codeshare-1c25d.appspot.com",
  messagingSenderId: "41209039787",
  appId: "1:41209039787:web:092c1b667dc7a47c7520ee",
  measurementId: "G-G8Q135BPDT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
