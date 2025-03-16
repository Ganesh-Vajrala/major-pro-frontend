import React, { useEffect, useRef } from "react";
import './index.css';
import Chart from "chart.js/auto";
const PieChartComponent = ({ data, onSegmentClick }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
  
    useEffect(() => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
  
      const sentimentCounts = {
        Positive: 0,
        Negative: 0,
        Neutral: 0,
      };
  
      data.forEach((review) => {
        sentimentCounts[review.sentiment]++;
      });
  
      const ctx = chartRef.current.getContext("2d");
  
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: ["Positive", "Negative", "Neutral"],
          datasets: [
            {
              data: [
                sentimentCounts.Positive,
                sentimentCounts.Negative,
                sentimentCounts.Neutral,
              ],
              backgroundColor: ["#60d394", "#ee6055", "#ffd97d"],
              hoverOffset: 2,
            },
          ],
        },
        options: {
        
          responsive: true,
          animation: false,
          plugins: {
            legend: { position: "top",
            labels: {
                usePointStyle: true,
                pointStyle: "circle",
              },
          }
        },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const index = elements[0].index;
              const selectedSentiment = ["Positive", "Negative", "Neutral"][index];
              onSegmentClick(selectedSentiment);
            }
          },
        },
      });
      chartRef.current.tabIndex = -1;
  
      return () => chartInstance.current.destroy();
    }, [data, onSegmentClick]);
  
    return <canvas ref={chartRef} />;
  };
  
  export default PieChartComponent;