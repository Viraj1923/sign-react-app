import React from "react";
import { FaBookOpen, FaCheckCircle } from "react-icons/fa";
import "./ModeSelector.css";

const ModeSelector = ({ onSelect }) => (
  <div className="mode-container">
    <h2 className="mode-title">Choose Detection Experience</h2>
    <div className="mode-card-container">
      <div className="mode-card learn" onClick={() => onSelect("learning")}>
        <FaBookOpen className="mode-icon" />
        <h4>Learning Mode</h4>
        <p>Explore signs and build your skills step-by-step.</p>
      </div>

      <div className="mode-card practice" onClick={() => onSelect("live")}>
        <FaCheckCircle className="mode-icon" />
        <h4>Live Detection</h4>
        <p>Run real-time sign recognition using your webcam.</p>
      </div>
    </div>
  </div>
);

export default ModeSelector;
