// src/pages/SensorDataPage.jsx

import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";

// Import icons for each sensor card
import AirIcon from "@mui/icons-material/Air";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import OpacityIcon from "@mui/icons-material/Opacity";

// Initial state and configuration for our fake sensors
const initialSensors = [
  {
    id: "aqi",
    title: "Air Quality Index",
    value: 89,
    unit: "AQI",
    Icon: AirIcon,
    color: "#4caf50", // Green
    min: 85,
    max: 111,
  },
  {
    id: "temp",
    title: "Temperature",
    value: 28.5,
    unit: "°C",
    Icon: ThermostatIcon,
    color: "#ff9800", // Orange
    min: 25,
    max: 32,
  },
  {
    id: "moisture",
    title: "Soil Moisture",
    value: 52.1,
    unit: "%",
    Icon: WaterDropIcon,
    color: "#2196f3", // Blue
    min: 45,
    max: 65,
  },
  {
    id: "humidity",
    title: "Humidity",
    value: 65.8,
    unit: "%",
    Icon: OpacityIcon,
    color: "#9c27b0", // Purple
    min: 60,
    max: 75,
  },
];

function SensorDataPage() {
  const [sensors, setSensors] = useState(initialSensors);

  // This useEffect hook sets up an interval to update the fake data
  useEffect(() => {
    const interval = setInterval(() => {
      setSensors((prevSensors) =>
        prevSensors.map((sensor) => {
          // Create a small random fluctuation
          let fluctuation = (Math.random() - 0.5) * 0.5;
          let newValue = sensor.value + fluctuation;

          // Ensure the new value stays within the min/max range
          if (newValue > sensor.max) newValue = sensor.max;
          if (newValue < sensor.min) newValue = sensor.min;

          return { ...sensor, value: newValue };
        })
      );
    }, 2000); // Update every 2 seconds

    // Cleanup function to stop the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []); // The empty array ensures this effect runs only once

  return (
    <Box sx={{ paddingTop: "8rem", paddingX: "2rem", textAlign: "center" }}>
      <Typography
        variant="h3"
        sx={{ color: "white", fontWeight: "bold", mb: 5 }}
      >
        Live Sensor Readings 🛜
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {sensors.map(({ id, title, value, unit, Icon, color }) => (
          <Grid item key={id} xs={12} sm={6} lg={3}>
            <Paper
              sx={{
                padding: "3rem",
                backgroundColor: "rgba(37, 37, 37, 0.25)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                border: `1px solid ${color}`,
                color: "white",
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {/* 👇 This is the only line that changed */}
                <Icon sx={{ fontSize: "3rem", color: color }} />
                <Typography variant="h4" sx={{fontWeight: "bold" }}>
                  {title}
                </Typography>
              </Box>
              <Typography variant="h2" sx={{ fontWeight: "bold", my: 2 }}>
                {value.toFixed(1)}
                <span style={{ fontSize: "1.5rem", marginLeft: "8px" }}>
                  {unit}
                </span>
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Last updated: Just now
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SensorDataPage;
