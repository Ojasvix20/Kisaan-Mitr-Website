// src/components/MarketRatesChart.jsx

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// We need to register the components we're using with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// This is our fake data for the chart
const data = {
  labels: ["Wheat", "Rice", "Mustard", "Cotton", "Sugarcane", "Maize"],
  datasets: [
    {
      label: "Price per Quintal (₹)",
      data: [2150, 2203, 5450, 6800, 315, 2090], // Fake data points
      backgroundColor: [
        "rgba(75, 192, 192, 0.9)",
        "rgba(255, 206, 86, 0.9)",
        "rgba(255, 99, 132, 0.9)",
        "rgba(54, 162, 235, 0.9)",
        "rgba(153, 102, 255, 0.9)",
        "rgba(255, 159, 64, 0.9)",
      ],
      borderColor: [
        "rgba(75, 192, 192, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// These options control the chart's appearance (e.g., text color)
const options = {
  responsive: true,
  maintainAspectRatio: false, // 👈 This is a key change for responsiveness
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "white",
        font: { size: 14 },
      },
    },
    title: {
      display: true,
      text: "Today's Market Rates",
      color: "white",
      font: { size: 18 },
    },
  },
  scales: {
    y: {
      ticks: {
        color: "white",
        font: { size: 12 },
      },
      grid: { color: "rgba(255, 255, 255, 0.2)" },
    },
    x: {
      ticks: {
        color: "white",
        font: { size: 10 }, // 👈 Reduced font size for x-axis labels
      },
      grid: { color: "rgba(255, 255, 255, 0.2)" },
    },
  },
};

function MarketRatesChart() {
  return <Bar options={options} data={data} />;
}

export default MarketRatesChart;
