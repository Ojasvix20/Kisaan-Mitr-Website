// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CropAnalyzerPage from "./pages/CropAnalyzerPage";
import SensorDataPage from "./pages/SensorDataPage";
import ExpertChatPage from "./pages/ExpertChatPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/crop-analyzer" element={<CropAnalyzerPage />} />
          <Route path="/sensor-data" element={<SensorDataPage />} />
          <Route path="/expert-chat" element={<ExpertChatPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
