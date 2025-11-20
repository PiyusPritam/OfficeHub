import React, { useState, useEffect } from 'react'
import { EmployeeService } from './services/EmployeeService.js'
import Dashboard from './components/Dashboard.jsx'
import Profile from './components/Profile.jsx'
import ClockInOut from './components/ClockInOut.jsx'
import LeaveRequests from './components/LeaveRequests.jsx'
import Timesheets from './components/Timesheets.jsx'
import Calendar from './components/Calendar.jsx'
import './OfficeHubApp.css'

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { id: 'clock', label: 'Clock In/Out', icon: '🕐' },
  { id: 'leave', label: 'Leave Requests', icon: '🏖️' },
  { id: 'timesheets', label: 'Timesheets', icon: '📋' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'profile', label: 'Profile', icon: '👤' }
]

export default function OfficeHubApp() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  const employeeService = new EmployeeService()

  useEffect(() => {
    initializeApp()
  }, [])

  const initializeApp = async () => {
    try {
      setError(null)
      setLoading(true)
      
      console.log('Initializing OfficeHub application...')
      console.log('ServiceNow globals check:', {
        g_user_exists: !!window.g_user,
        g_user_name: window.g_user?.userName,
        g_ck_exists: !!window.g_ck,
        location: window.location?.hostname
      })
      
      // Get current user from ServiceNow session
      const user = await employeeService.getOrCreateEmployee()
      console.log('User initialized successfully:', user.user_name)
      setCurrentUser(user)
    } catch (error) {
      console.error('Failed to initialize app:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = async () => {
    setRetryCount(prev => prev + 1)
    await initializeApp()
  }

  const handleNavigation = (viewId) => {
    setCurrentView(viewId)
  }

  const renderCurrentView = () => {
    if (!currentUser) return null

    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigation} />
      case 'clock':
        return <ClockInOut user={currentUser} />
      case 'leave':
        return <LeaveRequests user={currentUser} />
      case 'timesheets':
        return <Timesheets user={currentUser} />
      case 'calendar':
        return <Calendar user={currentUser} />
      case 'profile':
        return <Profile user={currentUser} />
      default:
        return <Dashboard onNavigate={handleNavigation} />
    }
  }

  if (loading) {
    return (
      <div className="officehub-loading">
        <div className="loading-content">
          <div className="loading-spinner">🔄</div>
          <h2>Loading OfficeHub...</h2>
          <p>Initializing your employee portal...</p>
          {retryCount > 0 && (
            <p className="retry-info">Retry attempt: {retryCount}</p>
          )}
        </div>
      </div>
    )
  }

  if (error) {
    const isAuthError = error.includes('session') || error.includes('Authentication') || error.includes('logged')
    const isPermissionError = error.includes('Access denied') || error.includes('permissions')
    
    return (
      <div className="officehub-error">
        <div className="error-content">
          <div className="error-icon">
            {isAuthError ? '🔐' : isPermissionError ? '🛡️' : '⚠️'}
          </div>
          <h2>
            {isAuthError ? 'Authentication Required' : 
             isPermissionError ? 'Access Denied' : 'Unable to Access OfficeHub'}
          </h2>
          <p className="error-message">{error}</p>
          
          <div className="error-actions">
            <button onClick={handleRetry} className="btn btn-primary">
              🔄 Try Again
            </button>
            <button onClick={() => window.location.reload()} className="btn btn-secondary">
              🔄 Refresh Page
            </button>
          </div>
          
          <div className="error-help">
            <h4>Troubleshooting Steps:</h4>
            <ul>
              <li>✅ Ensure you are logged into ServiceNow</li>
              <li>🔒 Verify you have access to the OfficeHub application</li>
              <li>🌐 Check that you're accessing this from within ServiceNow</li>
              <li>📞 Contact your IT administrator if the problem persists</li>
            </ul>
            
            <div className="debug-info">
              <h5>Debug Information:</h5>
              <p><strong>Location:</strong> {window.location?.hostname || 'Unknown'}</p>
              <p><strong>User Agent:</strong> {navigator.userAgent.substring(0, 50)}...</p>
              <p><strong>ServiceNow Globals:</strong> {window.g_user ? 'Available' : 'Not Available'}</p>
              {retryCount > 0 && <p><strong>Retry Attempts:</strong> {retryCount}</p>}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="officehub-app">
      <header className="officehub-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="logo-icon">🏢</span>
            OfficeHub
          </h1>
          <div className="user-info">
            <div className="user-avatar">
              {(currentUser?.first_name || currentUser?.user_name || 'U').charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <span className="user-name">
                {currentUser?.full_name || `${currentUser?.first_name || ''} ${currentUser?.last_name || ''}`.trim() || currentUser?.user_name}
              </span>
              <span className="user-role">Employee Portal</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="officehub-nav">
        {navigationItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'active' : ''}`}
            onClick={() => handleNavigation(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <main className="officehub-main">
        {renderCurrentView()}
      </main>
    </div>
  )
}