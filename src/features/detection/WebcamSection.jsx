import React, { useRef, useState, useEffect } from "react";
import ReferenceChart from "../detection/ReferenceChart";
import "./WebcamSection.css";
import { predictSign } from "../../services/detectionService";

const WebcamSection = ({ language, mode, onBack }) => {
  const [showFeed, setShowFeed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [lastSpoken, setLastSpoken] = useState("");
  const [lastSpokenTime, setLastSpokenTime] = useState(Date.now());

  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const previousLabelRef = useRef("");
  const stableCountRef = useRef(0);
  const isMountedRef = useRef(true);

  // Track component mounting status to prevent async race conditions
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      clearInterval(intervalRef.current);
    };
  }, []);

  const speak = (text) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const startWebcam = async () => {
    setError("");
    setIsLoading(true);
    setShowFeed(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      if (!isMountedRef.current) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Clear any lingering interval before setting a new one
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(captureAndPredict, 1000);
      }
    } catch (err) {
      console.error("Camera error:", err);
      setError("Camera access denied. Please allow webcam permission.");
      setShowFeed(false);
    } finally {
      if (isMountedRef.current) setIsLoading(false);
    }
  };

  const stopWebcam = () => {
    clearInterval(intervalRef.current);

    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach((track) => track.stop());

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setPrediction("");
    setConfidence(null);
    setError("");
    setShowFeed(false);
    previousLabelRef.current = "";
    stableCountRef.current = 0;
  };

  const captureAndPredict = async () => {
    const video = videoRef.current;
    if (!video || video.videoWidth === 0) return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Native asynchronous blob generation (No high-overhead string encoding loops)
    canvas.toBlob(async (blob) => {
      if (!blob || !isMountedRef.current) return;

      try {
        const data = await predictSign(language, blob);
        if (!isMountedRef.current) return;

        setError("");
        let label = data.predicted_label || data.prediction || data.label || "Hold Gesture Steady";
        if (label === "Uncertain") label = "Hold Gesture Steady";

        const conf = data.confidence || data.conf || null;

        if (label === previousLabelRef.current) {
          stableCountRef.current += 1;
        } else {
          previousLabelRef.current = label;
          stableCountRef.current = 1;
        }

        if (stableCountRef.current >= 2) {
          setPrediction(label);
          setConfidence(conf);

          setHistory((prev) => {
            if (prev[0] === label) return prev;
            return [label, ...prev].slice(0, 5);
          });

          // Prevent vocalizing instructions or status messages
          const dynamicTimeWindow = Date.now() - lastSpokenTime > 1000;
          const isSystemMessage = label === "No Detection" || label === "Hold Gesture Steady";

          if (label && !isSystemMessage && label !== lastSpoken && dynamicTimeWindow) {
            speak(label);
            setLastSpoken(label);
            setLastSpokenTime(Date.now());
          }
        }
      } catch (err) {
        console.error("Prediction error:", err);
        if (isMountedRef.current) {
          setError("Detection server unavailable. Please try again.");
          setHistory([]);
        }
      }
    }, "image/jpeg");
  };

  /* Find the main container div (around line 140) and replace it with this: */
return (
  <div className={`app-canvas ${mode !== "learning" ? "detection-active" : ""}`}>
    <main className="primary-viewport">
        {/* The Core HUD Experience */}
        <div className="video-scanner-wrapper">
          <div className="video-container">
            {showFeed ? (
              <video ref={videoRef} autoPlay playsInline className="webcam-feed" style={{ transform: "scaleX(-1)" }} />
            ) : (
              <div className="camera-standby">
                <span className="standby-icon">📸</span>
                <p>System Ready for Live Detection</p>
              </div>
            )}

            {/* Dynamic Overlays (The HUD) - Replaces the vertical Stack */}
            {showFeed && (
              <div className="hud-overlay">
                <div className="hud-top">
                  <div className="pill status-pill">Recognition Model: {language.toUpperCase()}</div>
                  <div className="pill live-pill">● LIVE</div>
                </div>

                <div className="hud-center">
                  {error ? (
                    <div className="alert error-alert">{error}</div>
                  ) : (
                    <div className="warning-overlay">⚠ Keep Hand Centered</div>
                  )}
                </div>

                <div className="hud-bottom">
                  <div className="hud-data-card prediction">
                    <label>Sign</label>
                    <div className="value">{prediction || "..."}</div>
                  </div>
                  <div className="hud-data-card confidence">
                    <label>Confidence</label>
                    <div className="value">{(confidence * 100).toFixed(0)}%</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Workflow Control Dock */}
        <div className="control-dock">
          <button className="back-btn" onClick={onBack}>← Back</button>

          <div className="main-actions">
            {!showFeed ? (
              <button className="btn-start" onClick={startWebcam}>Start Detection</button>
            ) : (
              <button className="btn-stop" onClick={stopWebcam}>Stop Detection</button>
            )}
          </div>

          <div className="spacer" /> {/* For layout balance */}
        </div>

        {/* Horizontal Sign History */}
        {history.length > 0 && (
          <div className="history-track">
            <span className="track-label">Recent History:</span>
            <div className="history-items">
              {history.map((item, idx) => (
                <div key={idx} className="history-pill">{item}</div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Sidebar Integration */}
      {mode === "learning" && <ReferenceChart language={language} />}
    </div>
  );
};

export default WebcamSection;