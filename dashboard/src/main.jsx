import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Import BrowserRouter from react-router-dom
import { BrowserRouter } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
)
