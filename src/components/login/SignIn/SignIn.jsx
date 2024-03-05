import React, { useState } from "react";
import "./SignInForm.css"; // Import your CSS file for styling
import { useUserAuth } from "../../AuthContext/UserAuthContext";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
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

  return (
    <div className="signin-form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
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
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div> {error}</div>
        <button type="submit" className="submit-btn">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
