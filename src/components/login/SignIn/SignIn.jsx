import React, { useState } from "react";
import "./SignInForm.css"; // Import your CSS file for styling
import { useUserAuth } from "../../AuthContext/UserAuthContext";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";

const SignInForm = ({ setSignUpFlag }) => {
  // State variables to store form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { logIn } = useUserAuth();
  let navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log("in err", err);
    }

    setEmail("");
    setPassword("");
  };

  const { googleSignIn } = useUserAuth();
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setError(error.message);

      console.log(error.message);
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#121721",
        display: "grid",
        placeItems: "center",
        height: "100vh",
      }}
    >
      <div className="signin-form">
        <h2 className="form-heading">Sign in to CodeShare</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="line"></div>
          <div className="form-group" style={{ marginTop: 12 }}>
            <GoogleButton
              className="g-btn"
              type="dark"
              onClick={handleGoogleSignIn}
              style={{ width: "435px" }}
            />
          </div>
          <div> {error}</div>
          <div className="btn-container">
            <button type="submit" className="submit-btn">
              Sign In
            </button>
          </div>
        </form>
        <p className="new-text">
          New to CodeShare?
          <span onClick={() => setSignUpFlag(true)}>{" SignUp now !"}</span>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
