import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import './index.css'

const BarChartComponent = ({ data, onBarClick }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
  
    useEffect(() => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      const ctx = chartRef.current.getContext("2d");
  
      const labels = data.map((review, index) => `Review ${index + 1}`);
      const confidenceScores = data.map((review) => review.confidence);
      const backgroundColors = data.map((review) => {
        if (review.sentiment === "Positive") return "rgba(75, 192, 192, 0.2)"; // Green
        if (review.sentiment === "Neutral") return "rgba(255, 205, 86, 0.2)";  // Yellow
        return "rgba(255, 99, 132, 0.2)"; // Red for Negative
    });

    const borderColors = data.map((review) => {
        if (review.sentiment === "Positive") return "rgb(75, 192, 192)"; // Green
        if (review.sentiment === "Neutral") return "rgb(255, 205, 86)";  // Yellow
        return "rgb(255, 99, 132)"; // Red for Negative
    });

      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Confidence (%)",
              data: confidenceScores,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { beginAtZero: true, max: 100 },
          },
          plugins: {
            legend: { display: false },
          },
          onClick: (_, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              onBarClick(data[index]);
            }
          },
        },
      });
  
      return () => chartInstance.current.destroy();
    }, [data, onBarClick]);
  
    return <canvas ref={chartRef} />;
  };
  
  export default BarChartComponent;
