import "./Pages.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Acc = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      // Handle Sign-Up Logic
      console.log("Sign-Up with", { name, email, sex, birthDate, password });
      alert("Account created successfully!");
    } else {
      // Handle Login Logic
      console.log("Log-In with", { email, password });
      alert("Logged in successfully!");
    }

    // Navigate to Home after login/signup
    navigate("/");
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Google Sign-In Successful:", user);
        alert(`Welcome, ${user.displayName}!`);
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        alert("Google Sign-In failed. Please try again.");
      });
  };

  return (
    <main>
      {/* Switch Between Login and Sign-Up */}
      <button
        onClick={() => setIsSignUp((prev) => !prev)}
        className="theme-toggle"
      >
        Switch to {isSignUp ? "Log In" : "Sign Up"}
      </button>

      {/* Hero Section */}
      <section className="hero" aria-labelledby="auth-heading">
        <div className="hero-content">
          <h1 id="auth-heading">{isSignUp ? "Create Account" : "Welcome Back"}</h1>
          <p>
            {isSignUp
              ? "Join us and start making a difference today!"
              : "Log in to access your account and explore opportunities."}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="form-section">
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                required
              >
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="date"
                placeholder="Birth Date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">
            {isSignUp ? "Sign Up" : "Log In"}
          </button>
        </form>
      </section>

      {/* Google Sign-In Button */}
      <section className="google-auth">
        <p>Or</p>
        <button onClick={handleGoogleSignIn} className="btn-secondary">
      {isSignUp ? "Sign Up" : "Log In"} with Google
        </button>
      </section>

      {/* Navigation Prompt */}
      <section className="nav-prompt">
        <p>
          {isSignUp
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignUp((prev) => !prev)}
            className="link-button"
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </p>
      </section>
    </main>
  );
};

export default Acc;
