import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ThemeProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </ThemeProvider>
  // </React.StrictMode>
);
