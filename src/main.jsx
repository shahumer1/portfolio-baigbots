import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/tokens.css';
import './styles/global.css';
import './styles/components.css';
import './styles/motion.css';
import './styles/interactions.css';
import './styles/hero-folder.css';
import './styles/pages.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
);
