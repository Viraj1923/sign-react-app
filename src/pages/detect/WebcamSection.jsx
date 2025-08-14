import React, {  useRef, useState } from "react";
import axios from "axios";

const API_BASE = "https://viraj1923-slr-back-new.hf.space"; // FastAPI backend

const WebcamSection = ({ language, mode }) => {
  const [showFeed, setShowFeed] = useState(false);
  const [prediction, setPrediction] = useState("");
  const [lastSpoken, setLastSpoken] = useState("");
  const [lastSpokenTime, setLastSpokenTime] = useState(Date.now());
  const videoRef = useRef(null);
  const intervalRef = useRef(null);

  // 🗣 Speak detected letter
  const speak = (text) => {
    speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    speechSynthesis.speak(utterance);
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      intervalRef.current = setInterval(captureAndPredict, 1000); // same as ASLDetect.jsx
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopWebcam = () => {
    clearInterval(intervalRef.current);
    const stream = videoRef.current?.srcObject;
    stream?.getTracks().forEach(track => track.stop());
    videoRef.current.srcObject = null;
    setPrediction("");
    setLastSpoken("");
  };

  const captureAndPredict = async () => {
    const video = videoRef.current;
    if (!video) return;

    // Draw video frame to canvas
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to Blob (same as ASLDetect.jsx)
    const imageBase64 = canvas.toDataURL("image/jpeg");
    const byteCharacters = atob(imageBase64.split(",")[1]);
    const byteNumbers = Array.from(byteCharacters, (char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("file", blob, "frame.jpg");

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        body: formData,
        redirect: "follow",
      });
      const data = await res.json();
      const label = data.prediction || data.label;
      setPrediction(label);

      // ✅ Debounced speech output
      if (
        label &&
        label !== "No Detection" &&
        label !== lastSpoken &&
        Date.now() - lastSpokenTime > 1000
      ) {
        speak(label);
        setLastSpoken(label);
        setLastSpokenTime(Date.now());
      }
    } catch (error) {
      console.error("Prediction error:", error);
    }
  };

  const handleStart = () => {
    setShowFeed(true);
    startWebcam();
  };

  const handleStop = async () => {
    setShowFeed(false);
    stopWebcam();
    try {
      await axios.post(`${API_BASE}/stop_feed`);
    } catch (error) {
      console.error("Error stopping camera:", error);
    }
  };

  return (
    <div className="video-section">
      <div className="video-container">
        {showFeed ? (
          <video ref={videoRef} autoPlay playsInline className="webcam-video" />
        ) : (
          <p>Click Start Detection to begin</p>
        )}
      </div>
      {showFeed && (
        <div className="prediction-box">
          <h3>Predicted Sign:</h3>
          <p>{prediction || "Detecting..."}</p>
        </div>
      )}
      <div className="button-group">
        {!showFeed ? (
          <button className="detect-button" onClick={handleStart}>
            Start Detection
          </button>
        ) : (
          <button className="detect-button stop" onClick={handleStop}>
            Stop Detection
          </button>
        )}
      </div>
    </div>
  );
};

export default WebcamSection;
