import React from "react";
import "./ReferenceChart.css";

const ReferenceChart = ({ language }) => (
  <div className="reference-section">
    <h3>
      {language.toUpperCase()} Reference Guide
    </h3>

    <img
      src={`/images/${language}_chart.png`}
      alt={`${language} chart`}
      className="sign-chart"
    />
  </div>
);

export default ReferenceChart;