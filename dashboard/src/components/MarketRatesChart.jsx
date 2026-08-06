import React, { useEffect, useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
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
      grid: {
        color: "rgba(255,255,255,0.2)",
      },
    },
    x: {
      ticks: {
        color: "white",
        font: { size: 10 },
      },
      grid: {
        color: "rgba(255,255,255,0.2)",
      },
    },
  },
};

const colors = [
  "rgba(75, 192, 192, 0.9)",
  "rgba(255, 206, 86, 0.9)",
  "rgba(255, 99, 132, 0.9)",
  "rgba(54, 162, 235, 0.9)",
  "rgba(153, 102, 255, 0.9)",
  "rgba(255, 159, 64, 0.9)",
];

const borders = [
  "rgba(75, 192, 192, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

function MarketRatesChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketRates();
  }, []);

  const fetchMarketRates = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/market");

      const rates = await response.json();

      setChartData({
        labels: rates.map((item) => item.crop),

        datasets: [
          {
            label: "Price per Quintal (₹)",
            data: rates.map((item) => item.price),

            backgroundColor: rates.map(
              (_, index) => colors[index % colors.length]
            ),

            borderColor: rates.map(
              (_, index) => borders[index % borders.length]
            ),

            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch market rates:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h3 style={{ color: "white" }}>
        Loading market rates...
      </h3>
    );
  }

  return <Bar options={options} data={chartData} />;
}

export default MarketRatesChart;