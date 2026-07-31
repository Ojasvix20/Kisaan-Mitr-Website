// src/components/Navbar.jsx

import React, { useState } from "react";
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

// Import Icons
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import ScienceIcon from '@mui/icons-material/Science';
import SensorsIcon from '@mui/icons-material/Sensors';
import ForumIcon from '@mui/icons-material/Forum';

const navItems = [
  { text: 'Home', path: '/', icon: <HomeIcon /> },
  { text: 'AI Crop Analyzer', path: '/crop-analyzer', icon: <ScienceIcon /> },
  { text: 'Sensor Data', path: '/sensor-data', icon: <SensorsIcon /> },
  { text: 'Expert Chat', path: '/expert-chat', icon: <ForumIcon /> },
];

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={RouterLink} to={item.path} onClick={toggleDrawer(false)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* The placeholder div for the MOBILE translator */}
      <ListItem sx={{ padding: 2 }}>
        <div id="google_translate_element_mobile"></div>
      </ListItem>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(10px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Kisaan Mitr 🌱
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          {/* This Box hides the DESKTOP translator on mobile screens */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <div id="google_translate_element"></div>
          </Box>

          <IconButton color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  );
}

export default Navbar;