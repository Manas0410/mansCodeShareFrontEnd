import React, { useState } from "react";
import "./SignUpForm.css"; // Import your CSS file for styling

const SignUpForm = () => {
  // State variables to store form input values
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    console.log(Object.fromEntries(formData.entries()));
    // You can perform form validation and submit data to your backend here
    // console.log("Form submitted with:", { fullName, email, password });
    // Clear form fields after submission
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
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
        <button type="submit" className="submit-btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
