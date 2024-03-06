import React, { useState } from "react";
import "./SignUpForm.css"; // Import your CSS file for styling
import { useUserAuth } from "../../AuthContext/UserAuthContext";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";

const SignUpForm = ({ setSignUpFlag }) => {
  // State variables to store form input values
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log("in err", err);
    }
    console.log(error, "dasd");
    setFullName("");
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
      <div className="signup-form">
        <h2>Create an account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name:</label>
            <input
              name="name"
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              name="mail"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              name="pwd"
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
          <div>{error}</div>
          <div className="btn-container">
            <button type="submit" className="submit-btn">
              Sign Up
            </button>
          </div>
        </form>
        <p className="new-text">
          Already have an account?
          <span onClick={() => setSignUpFlag(false)}>{" SignIn here !"}</span>
        </p>
        {/* <GoogleButton
          className="g-btn"
          type="dark"
          onClick={handleGoogleSignIn}
          style={{ width: "435px" }}
        /> */}
      </div>
    </div>
  );
};

export default SignUpForm;
// let formData = new FormData(event.target);
// console.log(Object.fromEntries(formData.entries()));
