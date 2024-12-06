import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config"; // Assuming Firebase is correctly initialized here
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore"; // Firestore for additional user data

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const db = getFirestore(); // Initialize Firestore

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      if (isSignUp) {
        // Sign up logic
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name,
          sex,
          birthDate,
          email,
        });

        alert("Account created successfully!");
        navigate("/");
      } else {
        // Log in logic
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        alert("Logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Store user info in Firestore if signing up for the first time
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        name: user.displayName || "Google User",
        email: user.email,
      }, { merge: true });

      alert(`Welcome, ${user.displayName || "User"}!`);
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setErrorMessage("Google sign-in failed. Please try again.");
    }
  };

  return (
    <main>
      {/* Form Section */}
      <section className="form-section">
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Type your full name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </>
          )}

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Type your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Type your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          {isSignUp && (
            <>
              <label htmlFor="sex">Your Gender</label>
              <select
                id="sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>

              <label htmlFor="birthDate">Your Birthdate</label>
              <input
                id="birthDate"
                type="date"
                placeholder="Birth Date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                required
              />
            </>
          )}

          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}

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

      {/* Switch between Sign Up / Log In */}
      <section className="nav-prompt">
        <p>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
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

export default AuthPage;
