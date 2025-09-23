// src/components/FeatureCards.jsx
import React from 'react';
// Import Link from react-router-dom to make the cards navigable
import { Link } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';
import BiotechIcon from '@mui/icons-material/Biotech';
import SensorsIcon from '@mui/icons-material/Sensors';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

// Added a `path` to each object to define its navigation route
const features = [
  {
    title: 'AI CROP Analyzer',
    icon: <BiotechIcon sx={{ fontSize: 60, color: '#03ff10ff' }} />,
    description: 'Get instant analysis of crop health and detect diseases early by uploading an image.',
    path: '/crop-analyzer' // The URL for this page
  },
  {
    title: 'SENSOR DATA',
    icon: <SensorsIcon sx={{ fontSize: 60, color: '#0080ffff' }} />,
    description: 'Monitor real-time data from your farm sensors like soil moisture, temperature, and humidity.',
    path: '/sensor-data' // The URL for this page
  },
  {
    title: 'EXPERT CHAT TALKS',
    icon: <SupportAgentIcon sx={{ fontSize: 60, color: '#f42424ff' }} />,
    description: 'Connect directly with agricultural experts for personalized advice and solutions.',
    path: '/expert-chat' // The URL for this page
  }
];

function FeatureCards() {
  return (
    <Box sx={{ flexGrow: 1, padding: { xs: 2, sm: 4 }, marginTop: 4 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="stretch">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                height: '100%',
                textAlign: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.45)', // Slightly reduced transparency for text readability
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: '0 16px 40px 0 rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              {/* This CardActionArea now acts as a Link */}
              <CardActionArea
                component={Link}
                to={feature.path}
                sx={{ height: '100%', padding: 3 }}
              >
                <CardContent>
                  {feature.icon}
                  <Typography gutterBottom variant="h4" component="div" sx={{ fontWeight: 'bold', mt: 2, color: 'white' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ minHeight: '60px', color: 'rgba(255, 255, 255, 0.85)' }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FeatureCards;