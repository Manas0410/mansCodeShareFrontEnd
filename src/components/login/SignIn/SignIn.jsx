import React, { useState } from "react";
import "./SignInForm.css"; // Import your CSS file for styling

const SignInForm = () => {
  // State variables to store form input values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform form validation and submit data to your backend here
    console.log("Form submitted with:", { email, password });
    // Clear form fields after submission
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
        <button type="submit" className="submit-btn">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
