import React from "react";

const ModeSelector = ({ onSelect }) => (
  <div className="selection-container">
    <h3>Select Mode</h3>
    <button className="select-btn" onClick={() => onSelect("learn")}>Learn</button>
    <button className="select-btn" onClick={() => onSelect("practice")}>Practice</button>
  </div>
);

export default ModeSelector;