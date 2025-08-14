// AuthPage.js  (merged design + Firebase logic)
import React, { useState } from "react";
import "./Login.css"; // use your new styles.css
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  // GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth,provider } from "../firebase.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // for signup

  // Google Auth
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Google login successful!");
      navigate("/");
    } catch (error) {
      console.error("Google Sign-in Error:", error.message);
      toast.error("Failed to sign in with Google");
    }
  };

  // Email Auth
  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful! Welcome back.");
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Save displayName
        await updateProfile(userCredential.user, {
          displayName: name,
        });

        toast.success("Your account has been created successfully!");
      }
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Authentication failed. Please try again.");
    }
  };

  // Forgot Password
  const handleForgotPassword = async () => {
    if (!email) return toast.warn("Please enter your email first.");
    try {
      await sendPasswordResetEmail(auth, email);
      toast.info("Password reset email has been sent.");
    } catch (error) {
      toast.error(error.message || "Unable to send reset email.");
    }
  };

  const containerClass =
    "container " + (!isLogin ? "right-panel-active" : "");

  return (
    <div className="App">
      <div className={containerClass} id="container">
        {/* Sign Up Form */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleAuth}>
            <h1>Create Account</h1>
            <div className="social-container">
              <button className="google-icon" onClick={handleGoogleAuth}>
                <img src="\images\google-icon.png" alt="Google" className="google-icon" />
              </button>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleAuth}>
            <h1>Sign in</h1>
            <div className="social-container">
              <button className="google-icon" onClick={handleGoogleAuth}>
                <img src="\images\google-icon.png" alt="Google" className="google-icon" />
              </button>
            </div>
            <span>or use your account</span>
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
            <a href="/login" onClick={(e) => { e.preventDefault(); handleForgotPassword(); }}>
              Forgot your password?
            </a>
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => setIsLogin(true)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={() => setIsLogin(false)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
