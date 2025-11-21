import React from 'react';

export default function ErrorAlert({ message, onRetry }) {
  return (
    <div className="error-alert">
      <h3>⚠️ Error</h3>
      <p>{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="error-retry-button">
          Try Again
        </button>
      )}
    </div>
  );
}