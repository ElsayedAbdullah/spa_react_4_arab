import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './context/ThemeContext';
import './i18n';
import App from './App';
import './index.css';

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
