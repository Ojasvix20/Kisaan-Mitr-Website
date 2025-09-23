// src/pages/HomePage.jsx

import React from "react";
import FeatureCards from "../components/FeatureCards";
import MarketRatesChart from "../components/MarketRatesChart"; // 👈 1. Import the new chart
import { Box, Typography, Paper } from "@mui/material";
import BottomFooter from "../components/BottomFooter";

function HomePage() {
  return (
    <>
      {/* Welcome Section */}
      <Box
        sx={{
          textAlign: "center",
          color: "white",
          pt: { xs: 10, md: 15 },
          mb: 5,
        }}
      >
        <Typography
          className="greeting"
          variant="h2"
          sx={{ fontWeight: "bold" }}
        >
          Welcome to Kisaan Mitr 🌱
        </Typography>
        <Typography variant="h6">Helping farmers with technology!</Typography>
      </Box>

      {/* Feature Cards Section */}
      <FeatureCards />

      {/* 👇 2. Add the new Market Rates Chart section */}
      <Box sx={{ padding: { xs: 2, sm: 4 } }}>
        <Paper
          sx={{
            // Add a responsive height for the container
            height: { xs: 350, sm: 450 },
            padding: { xs: 1, sm: 2 },
            // Add flex properties to help center the chart
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            // Keep the glassmorphism styles
            backgroundColor: "rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(10px)",
            borderRadius: "16px",
            border: `1px solid rgba(255, 255, 255, 0.18)`,
          }}
        >
          <MarketRatesChart />
        </Paper>
      </Box>
      <BottomFooter />
    </>
  );
}

export default HomePage;
