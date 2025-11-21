import React from 'react';
import ReactDOM from 'react-dom/client';
import AttendanceSummaryApp from './AttendanceSummaryApp.jsx';

// Using React 18's createRoot API
ReactDOM.createRoot(document.getElementById("attendance-root")).render(
  <React.StrictMode>
    <AttendanceSummaryApp />
  </React.StrictMode>
);