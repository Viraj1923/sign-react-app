import React, { useState } from "react";
import "./Login.css";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase.js";
import { toast } from "react-toastify";

const AuthPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // true = login, false = signup

  // Google Auth
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      toast.success("Google login/signup successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Auth Error:", error.message);
      toast.error("Google auth failed");
    }
  };

  // Email Auth (Login or Signup)
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Auth Error:", error.message);
      toast.error("Authentication failed: " + error.message);
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    if (!email) return toast.warn("Enter your email first.");
    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Password reset email sent!");
    } catch (error) {
      toast.error("Error: " + error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="form-container">
        <p className="title-login">{isLogin ? "Login" : "Sign Up"}</p>

        <form className="form" onSubmit={handleAuth}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isLogin && (
              <div className="forgot">
                <button type="button" className="forgot-link" onClick={handleForgotPassword}>
                  Forgot Password?
                </button>
              </div>
            )}
          </div>

          <button type="submit" className="sign">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div className="social-message">
          <div className="line" />
          <p className="message">or continue with</p>
          <div className="line" />
        </div>

        <div className="social-icons">
          <button aria-label="Google" className="icon" onClick={handleGoogleAuth}>
            <img src="\images\google-icon.png" alt="Google" className="google-icon" />
          </button>
        </div>

        <p className="toggle-auth">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link className="switch-link" style={{textDecoration:"none"}} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
