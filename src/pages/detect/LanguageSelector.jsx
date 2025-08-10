import React from "react";

const LanguageSelector = ({ onSelect }) => (
  <div className="selection-container">
    <h3>Select Sign Language</h3>
    <button className="select-btn" onClick={() => onSelect("asl")}>American Sign Language</button>
    <button className="select-btn" onClick={() => onSelect("isl")}>Indian Sign Language</button>
  </div>
);

export default LanguageSelector;