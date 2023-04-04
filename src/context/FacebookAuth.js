import {
  FacebookAuthProvider,
  getAuth,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
import { createContext } from "react";

const AuthContext = createContext();
const provider = new FacebookAuthProvider();
const auth = getAuth();
signInWithRedirect(auth, provider);

getRedirectResult(auth).then((result) => {
  const user = result.user;
});
