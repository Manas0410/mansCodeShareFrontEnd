import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";

function logIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
function logOut() {
  return signOut(auth);
}
function googleSignIn() {
  const googleAuthProvider = new GoogleAuthProvider();
  return signInWithPopup(auth, googleAuthProvider);
}
