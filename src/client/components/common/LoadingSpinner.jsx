import React from 'react';

export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner-icon"></div>
      <div className="loading-message">{message}</div>
    </div>
  );
}