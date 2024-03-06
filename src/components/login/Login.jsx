import { useState } from "react";
import SignInForm from "./SignIn/SignIn";
import SignUpForm from "./SignUp/SignUp";
import firebase from "../../utils/firebase";

const Login = () => {
  const [signUpFlag, setSignUpFlag] = useState(false);
  return (
    <>
      {signUpFlag ? (
        <SignUpForm setSignUpFlag={setSignUpFlag} />
      ) : (
        <SignInForm setSignUpFlag={setSignUpFlag} />
      )}
    </>
  );
};
export default Login;
