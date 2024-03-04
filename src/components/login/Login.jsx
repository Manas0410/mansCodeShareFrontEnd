import { useState } from "react";
import SignInForm from "./SignIn/SignIn";
import SignUpForm from "./SignUp/SignUp";

const Login = () => {
  const [signUpFlag, setSignUpFlag] = useState("");
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
