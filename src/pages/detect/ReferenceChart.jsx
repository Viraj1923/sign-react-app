import React from "react";

const ReferenceChart = ({ language }) => (
  <div className="reference-section">
    <h3>Reference: Sign Language Alphabet</h3>
    <img
      src={`/images/${language}_chart.png`}
      alt={`${language.toUpperCase()} chart`}
      className="sign-chart"
    />
  </div>
);

export default ReferenceChart;