// src/components/ProfilePopup.jsx
import React, { useEffect, useRef } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import "./ProfilePopup.css";

const ProfilePopup = ({ user, onLogout, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose(); // call parent to close popup
      }
    };  
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!user) return null;

  return (
    <div className="profile-popup" ref={popupRef}>
      <div className="avatar-circle">
        {user.displayName ? user.displayName.charAt(0).toUpperCase() : "U"}
      </div>
      <p><FaUser /> {user.displayName || "Unnamed User"}</p>
      <p><FaEnvelope /> {user.email}</p>
      <button className="logout-button" onClick={onLogout}>
        <FaLock /> Logout
      </button>
    </div>
  );
};

export default ProfilePopup;
