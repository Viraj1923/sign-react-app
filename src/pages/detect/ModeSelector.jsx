import React from "react";
import { FaBookOpen, FaCheckCircle } from "react-icons/fa";
import "./ModeSelector.css";

const ModeSelector = ({ onSelect }) => (
  <div className="mode-container">
    <h2 className="mode-title">Choose Your Mode</h2>
    <div className="mode-card-container">
      <div className="mode-card learn" onClick={() => onSelect("learn")}>
        <FaBookOpen className="mode-icon" />
        <h4>Learn</h4>
        <p>Explore signs and build your skills step-by-step.</p>
      </div>

      <div className="mode-card practice" onClick={() => onSelect("practice")}>
        <FaCheckCircle className="mode-icon" />
        <h4>Practice</h4>
        <p>Test your knowledge and challenge yourself.</p>
      </div>
    </div>
  </div>
);

export default ModeSelector;
