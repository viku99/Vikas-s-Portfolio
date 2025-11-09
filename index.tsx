<<<<<<< HEAD
// 🎯 Entry Point
// This file is the main entry point for the React application.
// It renders the root <App /> component into the 'root' div in index.html.

import React from 'react';
import { createRoot } from 'react-dom/client';
=======

import React from 'react';
import ReactDOM from 'react-dom/client';
>>>>>>> 606c5bb6d5a6d2dceebad08e1b00065ff1f8b8ee
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

<<<<<<< HEAD
const root = createRoot(rootElement);
=======
const root = ReactDOM.createRoot(rootElement);
>>>>>>> 606c5bb6d5a6d2dceebad08e1b00065ff1f8b8ee
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
