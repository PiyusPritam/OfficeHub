import React from 'react';
import ReactDOM from 'react-dom/client';
import OfficeHubApp from './OfficeHubApp.jsx';
import './theme.css'; // Import shared theme system

// Initialize the application with enhanced error handling
function initializeApp() {
  const rootElement = document.getElementById('officehub-root');
  
  if (!rootElement) {
    console.error('OfficeHub root element not found');
    document.body.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif; background: #fef2f2; color: #991b1b;">
        <div style="text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
          <h2>Application Error</h2>
          <p>Unable to find OfficeHub container element.</p>
          <button onclick="window.location.reload()" style="margin-top: 1rem; padding: 8px 16px; background: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      </div>
    `;
    return;
  }

  // Initialize theme preference detection
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('officehub-theme');
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', initialTheme);

  // Create React root and render app
  try {
    const root = ReactDOM.createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <OfficeHubApp />
      </React.StrictMode>
    );
    
    console.log('✅ OfficeHub initialized successfully');
    
  } catch (error) {
    console.error('❌ Failed to initialize OfficeHub:', error);
    
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100vh; font-family: Arial, sans-serif; background: #fef2f2; color: #991b1b;">
        <div style="text-align: center; padding: 2rem; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 500px;">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔧</div>
          <h2>Initialization Failed</h2>
          <p style="margin-bottom: 1rem;">OfficeHub could not start properly. This may be due to:</p>
          <ul style="text-align: left; margin-bottom: 2rem;">
            <li>ServiceNow session timeout</li>
            <li>Browser compatibility issues</li>
            <li>Network connectivity problems</li>
            <li>Missing application permissions</li>
          </ul>
          <button onclick="window.location.reload()" style="margin-right: 8px; padding: 8px 16px; background: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer;">
            🔄 Refresh Page
          </button>
          <button onclick="window.location.href = window.location.origin" style="padding: 8px 16px; background: #6b7280; color: white; border: none; border-radius: 6px; cursor: pointer;">
            🏠 Go Home
          </button>
          <details style="margin-top: 2rem; text-align: left;">
            <summary style="cursor: pointer; font-weight: 600;">Technical Details</summary>
            <pre style="background: #f3f4f6; padding: 1rem; border-radius: 4px; font-size: 12px; overflow-x: auto; white-space: pre-wrap;">${error.stack || error.message}</pre>
          </details>
        </div>
      </div>
    `;
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

export default initializeApp;