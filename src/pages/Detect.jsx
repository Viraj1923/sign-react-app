import React, { useState } from "react";
import LanguageSelector from "../features/detection/LanguageSelector";
import ModeSelector from "../features/detection/ModeSelector";
import WebcamSection from "../features/detection/WebcamSection";
import ReferenceChart from "../features/detection/ReferenceChart";
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
      {!(language && mode) && (
        <h2 className="detect-title">
          Sign Language Detection
        </h2>
      )}

      {!language ? (
        <LanguageSelector onSelect={setLanguage} />
      ) : !mode ? (
        <ModeSelector onSelect={setMode} />
      ) : (
        <div className="detect-container">
          <WebcamSection
            language={language}
            mode={mode}
            onBack={resetDetection}
          />

          
        </div>
      )}
    </div>
  );
};

export default Detect;