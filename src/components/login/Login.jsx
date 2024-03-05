import { useState } from "react";
import SignInForm from "./SignIn/SignIn";
import SignUpForm from "./SignUp/SignUp";
import firebase from "../../utils/firebase";

const Login = () => {
  const [signUpFlag, setSignUpFlag] = useState(true);
  return (
    <>
      
      <button
        onClick={() => {
          setSignUpFlag(!signUpFlag);
        }}
      >
        togle
      </button>
      {signUpFlag ? <SignUpForm /> : <SignInForm />}
    </>
  );
};
export default Login;
