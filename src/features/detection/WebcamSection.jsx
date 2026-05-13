import React, {
  useRef,
  useState,
} from "react";
import ReferenceChart from "../detection/ReferenceChart";
import "./WebcamSection.css";

import {
  predictSign,
} from "../../services/detectionService";

const WebcamSection = ({
  language,
  mode,
  onBack,
}) => {
  const [showFeed, setShowFeed] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(false);

  const [prediction, setPrediction] =
    useState("");

  const [confidence, setConfidence] =
    useState(null);

  const [error, setError] =
    useState("");

  const [history, setHistory] =
    useState([]);

  const [lastSpoken, setLastSpoken] =
    useState("");

  const [
    lastSpokenTime,
    setLastSpokenTime,
  ] = useState(Date.now());

  const videoRef = useRef(null);

  const intervalRef = useRef(null);

  const previousLabelRef =
    useRef("");

  const stableCountRef =
    useRef(0);

  const speak = (text) => {
    speechSynthesis.cancel();

    const utterance =
      new SpeechSynthesisUtterance(
        text
      );

    utterance.rate = 0.9;

    speechSynthesis.speak(
      utterance
    );
  };

  const startWebcam =
    async () => {
      setError("");
      setIsLoading(true);
      setShowFeed(true);

      try {
        const stream =
          await navigator.mediaDevices.getUserMedia(
            {
              video: true,
            }
          );

        setTimeout(
          async () => {
            if (
              videoRef.current
            ) {
              videoRef.current.srcObject =
                stream;

              await videoRef.current.play();

              intervalRef.current =
                setInterval(
                  captureAndPredict,
                  1000
                );
            }

            setIsLoading(
              false
            );
          },
          100
        );
      } catch (error) {
        console.error(
          "Camera error:",
          error
        );

        setError(
          "Camera access denied. Please allow webcam permission."
        );

        setShowFeed(
          false
        );

        setIsLoading(
          false
        );
      }
    };

  const stopWebcam =
    () => {
      clearInterval(
        intervalRef.current
      );

      const stream =
        videoRef.current
          ?.srcObject;

      stream
        ?.getTracks()
        .forEach(
          (track) =>
            track.stop()
        );

      if (
        videoRef.current
      ) {
        videoRef.current.srcObject =
          null;
      }

      setPrediction("");
      setConfidence(
        null
      );

      setError("");

      setShowFeed(
        false
      );

      previousLabelRef.current =
        "";

      stableCountRef.current =
        0;
    };

  const captureAndPredict =
    async () => {
      const video =
        videoRef.current;

      if (
        !video ||
        video.videoWidth ===
        0
      ) {
        return;
      }

      const canvas =
        document.createElement(
          "canvas"
        );

      canvas.width =
        video.videoWidth;

      canvas.height =
        video.videoHeight;

      const ctx =
        canvas.getContext(
          "2d"
        );

      ctx.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const imageBase64 =
        canvas.toDataURL(
          "image/jpeg"
        );

      const byteCharacters =
        atob(
          imageBase64.split(
            ","
          )[1]
        );

      const byteNumbers =
        Array.from(
          byteCharacters,
          (char) =>
            char.charCodeAt(
              0
            )
        );

      const blob =
        new Blob(
          [
            new Uint8Array(
              byteNumbers
            ),
          ],
          {
            type: "image/jpeg",
          }
        );

      try {
        setError("");

        const data =
          await predictSign(
            language,
            blob
          );

        let label =
          data.predicted_label ||
          data.prediction ||
          data.label ||
          "Hold Gesture Steady";

        if (label === "Uncertain") {
          label = "Hold Gesture Steady";
        }

        const conf =
          data.confidence ||
          data.conf ||
          null;

        if (
          label ===
          previousLabelRef.current
        ) {
          stableCountRef.current +=
            1;
        } else {
          previousLabelRef.current =
            label;

          stableCountRef.current =
            1;
        }

        if (
          stableCountRef.current >=
          2
        ) {
          setPrediction(
            label
          );

          setConfidence(
            conf
          );

          setHistory(
            (
              prev
            ) => {
              if (
                prev[0] ===
                label
              ) {
                return prev;
              }

              return [
                label,
                ...prev,
              ].slice(
                0,
                5
              );
            }
          );

          if (
            label &&
            label !==
            "No Detection" &&
            label !==
            lastSpoken &&
            Date.now() -
            lastSpokenTime >
            1000
          ) {
            speak(
              label
            );

            setLastSpoken(
              label
            );

            setLastSpokenTime(
              Date.now()
            );
          }
        }
      } catch (error) {
        console.error(
          "Prediction error:",
          error
        );

        setError(
          "Detection server unavailable. Please try again."
        );

        setHistory(
          []
        );
      }
    };

  return mode === "learning" ? (
    <div className="learning-layout">

      {/* LEFT SIDE */}
      <div className="video-section">

        {showFeed && (
          <div className="camera-warning">
            ⚠ Keep your face and hand centered in frame
          </div>
        )}

        <div className="video-container">
          {showFeed ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="webcam-video"
              style={{
                transform: "scaleX(-1)",
              }}
            />
          ) : (
            <p>
              {isLoading
                ? "Starting camera..."
                : "📸 Ready for Live Detection"}
            </p>
          )}
        </div>

        {error && (
          <p className="error-text">
            {error}
          </p>
        )}

        {showFeed && (
          <>
            <p className="live-status">
              ● Live Detection
            </p>

            <div className="prediction-box">
              <h3>Detected Sign</h3>

              <p>
                {prediction || "..."}
              </p>

              {confidence && (
                <small>
                  Confidence:{" "}
                  {(confidence * 100).toFixed(1)}%
                </small>
              )}
            </div>

            {history.length > 0 && (
              <div className="history-box">
                <h4>Recent Signs</h4>

                <div className="history-list">
                  {history.map(
                    (item, index) => (
                      <span key={index}>
                        {item}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </>
        )}

        <div className="button-group">
          {isLoading ? (
            <button
              className="detect-button"
              disabled
            >
              Starting...
            </button>
          ) : !showFeed ? (
            <button
              className="detect-button"
              onClick={startWebcam}
            >
              Start Detection
            </button>
          ) : (
            <button
              className="detect-button stop"
              onClick={stopWebcam}
            >
              Stop Detection
            </button>
          )}
        </div>

        {showFeed && (
          <p className="api-info">
            Active Model:{" "}
            {language.toUpperCase()}
          </p>
        )}

        <button
          className="back-button"
          onClick={() => {
            stopWebcam();
            onBack();
          }}
        >
          ← Back
        </button>

      </div>

      {/* RIGHT SIDE */}
      <ReferenceChart
        language={language}
      />

    </div>
  ) : (
    <div className="video-section">

      {showFeed && (
        <div className="camera-warning">
          ⚠ Keep your face and hand centered in frame
        </div>
      )}

      <div className="video-container">
        {showFeed ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="webcam-video"
            style={{
              transform: "scaleX(-1)",
            }}
          />
        ) : (
          <p>
            {isLoading
              ? "Starting camera..."
              : "📸 Ready for Live Detection"}
          </p>
        )}
      </div>

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

      {showFeed && (
        <>
          <p className="live-status">
            ● Live Detection
          </p>

          <div className="prediction-box">
            <h3>Detected Sign</h3>

            <p>
              {prediction || "..."}
            </p>

            {confidence && (
              <small>
                Confidence:{" "}
                {(confidence * 100).toFixed(1)}%
              </small>
            )}
          </div>

          {history.length > 0 && (
            <div className="history-box">
              <h4>Recent Signs</h4>

              <div className="history-list">
                {history.map(
                  (item, index) => (
                    <span key={index}>
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          )}
        </>
      )}

      <div className="button-group">
        {isLoading ? (
          <button
            className="detect-button"
            disabled
          >
            Starting...
          </button>
        ) : !showFeed ? (
          <button
            className="detect-button"
            onClick={startWebcam}
          >
            Start Detection
          </button>
        ) : (
          <button
            className="detect-button stop"
            onClick={stopWebcam}
          >
            Stop Detection
          </button>
        )}
      </div>

      {showFeed && (
        <p className="api-info">
          Active Model:{" "}
          {language.toUpperCase()}
        </p>
      )}

      <button
        className="back-button"
        onClick={() => {
          stopWebcam();
          onBack();
        }}
      >
        ← Back
      </button>

    </div>
  );
};

export default WebcamSection;