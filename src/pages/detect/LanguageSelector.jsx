import React from "react";
import "./LanguageSelector.css"; // Create this for styling

const LanguageSelector = ({ onSelect }) => (
  <div className="selection-container">
    <h3>Select Sign Language</h3>
    <label className="maintenance-notice">
        Indian Sign Language service is currently undergoing upgrades. Please use American Sign Language.
    </label>
    <div className="card-container">
      {/* American Sign Language */}
      <div className="lang-card" onClick={() => onSelect("asl")}>
        <img
          src="/images/usa-flag.png"
          alt="American Flag"
          className="lang-flag"
        />
        <h4>American Sign Language</h4>
      </div>

      {/* Indian Sign Language */}
      <div className="lang-card" onClick={() => onSelect("isl")}>
        <img
          src="/images/india-flag.png"
          alt="Indian Flag"
          className="lang-flag"
        />
        <h4>Indian Sign Language</h4>
      </div>
      

    </div>
  </div>
);

export default LanguageSelector;
