// src/components/Footer.jsx

import React from "react";
import { Box, Typography, Link, Grid, IconButton } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

// Import social media icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function BottomFooter() {
  return (
    <Box
      component="footer"
      sx={{
        marginTop: "auto", // Pushes footer to the bottom
        padding: "2rem",
        backgroundColor: "rgba(0, 0, 0, 0.3)", // A darker glass for contrast
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.18)",
        color: "white",
      }}
    >
      <Grid container spacing={4} justifyContent="space-between">
        {/* Column 1: Brand and mission */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "goldenrod",
              textShadow: "0 0 10px black",
            }}
          >
            Kisaan Mitr 🌱
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, maxWidth: "800px" }}>
            Built for the modern farmer, Kisaan Mitr provides the essential
            technological tools to thrive in today's agricultural landscape. Our
            platform translates complex data into simple, actionable advice,
            helping you increase your harvest, reduce waste, and adapt to
            challenges. From AI-driven disease detection to live market rates,
            we are committed to enhancing your profitability and empowering you
            to cultivate a lasting legacy.
          </Typography>
        </Grid>

        {/* Column 2: Quick Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Quick Links
          </Typography>
          <Link
            component={RouterLink}
            to="/"
            color="inherit"
            display="block"
            sx={{ mb: 1 }}
          >
            Home
          </Link>
          <Link
            component={RouterLink}
            to="/crop-analyzer"
            color="inherit"
            display="block"
            sx={{ mb: 1 }}
          >
            AI Analyzer
          </Link>
          <Link
            component={RouterLink}
            to="/sensor-data"
            color="inherit"
            display="block"
            sx={{ mb: 1 }}
          >
            Sensor Data
          </Link>
        </Grid>

        {/* Column 3: Social Media */}
        <Grid item xs={6} md={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton
              href="https://facebook.com"
              target="_blank"
              color="inherit"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              color="inherit"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              color="inherit"
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              color="inherit"
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Box
        textAlign="center"
        pt={3}
        mt={3}
        borderTop={1}
        borderColor="rgba(255, 255, 255, 0.1)"
      >
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          &copy; {new Date().getFullYear()} Kisaan Mitr. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  );
}

export default BottomFooter;
