import React, { useState } from "react";
import LanguageSelector from "./detect/LanguageSelector";
import ModeSelector from "./detect/ModeSelector";
import WebcamSection from "./detect/WebcamSection";
import ReferenceChart from "./detect/ReferenceChart";
import "./Detect.css";

const Detect = () => {
  const [language, setLanguage] = useState(null);
  const [mode, setMode] = useState(null);

  const resetDetection = () => {
    setLanguage(null);
    setMode(null);
  };

  return (
    <div className="detect-page">
      <h2 className="detect-title">Sign Language Detection</h2>
      {!language ? (
        <LanguageSelector onSelect={setLanguage} />
      ) : !mode ? (
        <ModeSelector onSelect={setMode} />
      ) : (
        <div className="detect-container">
          <WebcamSection language={language} mode={mode} />
          {mode === "learn" && <ReferenceChart language={language} />}
        </div>
      )}
      {(language && mode) && (
        <button className="detect-button stop" onClick={resetDetection}>Back</button>
      )}
    </div>
  );
};

export default Detect;