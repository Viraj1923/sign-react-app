// src/components/Navbar.js
import React, { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
// import ProfilePopup from "./ProfilePopup";
import "./Navbar.css";
import logo from "../assets/FingerTalk.png";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.js";
import ProfilePopup from "./ProfilePopup.jsx";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showProfile, setShowProfile] = useState(false);


  // const toggleProfile = () => setShowProfile(prev => !prev);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const isHomePage = location.pathname === "/";

  const handleLogout = async () => {
    await signOut(auth);
    closeMenu();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo-container" style={{textDecoration:"none"}} onClick={closeMenu}>
          <img src={logo} alt="Logo" className="logo-img" />
          <h2 className="logo-text">FingerTalk</h2>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {isHomePage ? (
            <>
              <li><ScrollLink to="home" smooth duration={500} offset={-50} onClick={closeMenu}>Home</ScrollLink></li>
              <li><ScrollLink to="about" smooth duration={500} offset={-50} onClick={closeMenu}>About</ScrollLink></li>
              <li><ScrollLink to="team" smooth duration={500} offset={-50} onClick={closeMenu}>Our Team</ScrollLink></li>
              <li><ScrollLink to="contact" smooth duration={500} offset={-50} onClick={closeMenu}>Contact</ScrollLink></li>
            </>
          ) : (
            <li>
              <Link to="/" onClick={closeMenu} className={currentPath === "/" ? "active" : ""}>
                Home
              </Link>
            </li>
          )}

          <li>
            <Link to={user ? "/detect" : "/login"} onClick={closeMenu} className={currentPath === "/detect" ? "active" : ""}>
              Detect
            </Link>
          </li>

          {user && (
            <div className="profile-wrapper">
              <FiUser className="profile-icon" onClick={() => setShowProfile(!showProfile)} />
              {showProfile && (
                <ProfilePopup
                  user={user}
                  onLogout={handleLogout}
                  onClose={() => setShowProfile(false)}
                />
              )}
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
