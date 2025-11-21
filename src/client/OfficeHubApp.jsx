import React, { useState, useEffect, createContext, useContext } from 'react'
import { EmployeeService } from './services/EmployeeService.js'
import Dashboard from './components/Dashboard.jsx'
import ClockInOut from './components/ClockInOut.jsx'
import LeaveRequests from './components/LeaveRequests.jsx'
import Timesheets from './components/Timesheets.jsx'
import Calendar from './components/Calendar.jsx'
import AttendanceSummary from './components/AttendanceSummary.jsx'
import Profile from './components/Profile.jsx'
import Notifications from './components/Notifications.jsx'
import PerformanceAnalytics from './components/analytics/PerformanceAnalytics.jsx'
import TeamCollaboration from './components/team/TeamCollaboration.jsx'
import WellnessDashboard from './components/wellness/WellnessDashboard.jsx'
import ActivityTracker from './components/wellness/ActivityTracker.jsx'
import ChallengeHub from './components/wellness/ChallengeHub.jsx'
import AIChatbot from './components/AIChatbot.jsx'
import SocialFeed from './components/SocialFeed.jsx'
import './OfficeHubApp.css'

// Create Theme Context for dark/light mode
const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
  systemPreference: 'light'
})

export const useTheme = () => useContext(ThemeContext)

// Enhanced Error Boundary Component
function ErrorBoundary({ children, onRetry }) {
  return children
}

// Connection Status Monitor
function ConnectionStatusMonitor({ onConnectionChange }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      onConnectionChange?.(true)
    }
    
    const handleOffline = () => {
      setIsOnline(false)
      onConnectionChange?.(false)
    }
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [onConnectionChange])
  
  if (!isOnline) {
    return (
      <div className="connection-banner offline">
        <span className="connection-icon">📶</span>
        <span>You're offline. Some features may be limited.</span>
        <button onClick={() => window.location.reload()}>
          Retry Connection
        </button>
      </div>
    )
  }
  
  return null
}

export default function OfficeHubApp() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [currentUser, setCurrentUser] = useState(null)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [systemPreference, setSystemPreference] = useState('light')
  const [connectionStatus, setConnectionStatus] = useState('online')
  const [initializationStep, setInitializationStep] = useState('starting')
  const [currentTime, setCurrentTime] = useState(new Date())

  const employeeService = new EmployeeService()

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // Initialize theme on mount
  useEffect(() => {
    initializeTheme()
    initializeApp()
  }, [])

  // Initialize theme system
  const initializeTheme = () => {
    // Detect system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemPreference(mediaQuery.matches ? 'dark' : 'light')
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem('officehub-theme')
    if (savedTheme === 'dark' || (!savedTheme && mediaQuery.matches)) {
      setIsDarkMode(true)
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      setIsDarkMode(false)
      document.documentElement.setAttribute('data-theme', 'light')
    }
    
    // Listen for system theme changes
    mediaQuery.addEventListener('change', (e) => {
      setSystemPreference(e.matches ? 'dark' : 'light')
      if (!localStorage.getItem('officehub-theme')) {
        setIsDarkMode(e.matches)
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
      }
    })
  }

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem('officehub-theme', newTheme ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', newTheme ? 'dark' : 'light')
  }

  useEffect(() => {
    if (currentUser) {
      fetchUnreadNotifications()
      const interval = setInterval(fetchUnreadNotifications, 30 * 1000)
      return () => clearInterval(interval)
    }
  }, [currentUser])

  const initializeApp = async () => {
    try {
      setLoading(true)
      setError(null)
      setInitializationStep('checking_session')
      
      // Check if we're in ServiceNow context
      if (!window.location.hostname.includes('service-now.com')) {
        throw new Error('This application must be accessed through ServiceNow. Please navigate to your ServiceNow instance.')
      }
      
      setInitializationStep('loading_user')
      const user = await employeeService.getOrCreateEmployee()
      
      // Validate user data
      if (!user || !user.sys_id) {
        throw new Error('User information not available. Please ensure you are logged into ServiceNow with proper permissions.')
      }
      
      setInitializationStep('finalizing')
      setCurrentUser(user)
      setRetryCount(0) // Reset retry count on successful load
      
    } catch (error) {
      console.error('Failed to initialize app:', error)
      
      let userFriendlyError = 'Failed to initialize application.'
      let actionableSteps = ['Please refresh the page']
      
      if (error.message.includes('No active ServiceNow user session')) {
        userFriendlyError = 'User session not found.'
        actionableSteps = [
          'Please ensure you are logged into ServiceNow',
          'Check that you have the necessary permissions',
          'Try refreshing the page',
          'Contact your system administrator if the issue persists'
        ]
      } else if (error.message.includes('User information not available')) {
        userFriendlyError = 'User information not available.'
        actionableSteps = [
          'Verify your ServiceNow login status',
          'Ensure your user account is active',
          'Check that the OfficeHub app is properly installed',
          'Contact support if the problem continues'
        ]
      } else if (error.message.includes('Authentication failed')) {
        userFriendlyError = 'Authentication failed.'
        actionableSteps = [
          'Please log into ServiceNow again',
          'Clear your browser cookies for this site',
          'Try using an incognito/private browser window',
          'Contact IT support if authentication continues to fail'
        ]
      } else if (error.message.includes('ServiceNow instance')) {
        userFriendlyError = 'Invalid access method.'
        actionableSteps = [
          'Please access this app through your ServiceNow instance',
          'Use the correct ServiceNow URL provided by your administrator',
          'Ensure you are not accessing a cached version'
        ]
      }
      
      setError({ message: userFriendlyError, steps: actionableSteps, originalError: error.message })
      setInitializationStep('error')
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = async () => {
    setRetryCount(prev => prev + 1)
    
    if (retryCount >= 2) {
      // After 3 attempts, provide more guidance
      setError({
        ...error,
        message: 'Multiple initialization attempts failed.',
        steps: [
          'Clear your browser cache and cookies',
          'Try accessing OfficeHub in an incognito window',
          'Verify your ServiceNow login and permissions',
          'Contact your system administrator for assistance',
          'Check ServiceNow system status with your IT team'
        ]
      })
      return
    }
    
    await initializeApp()
  }

  const fetchUnreadNotifications = async () => {
    if (!currentUser) return
    
    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      
      const response = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_notification?sysparm_query=user=${userSysId}^is_read=false&sysparm_limit=50&sysparm_display_value=all`
      )
      
      setUnreadNotifications(response.result?.length || 0)
      
    } catch (error) {
      console.error('Failed to fetch notification count:', error)
    }
  }

  const handleNavigate = (view) => {
    setCurrentView(view)
    setMobileMenuOpen(false)
    
    if (currentView === 'notifications' && view !== 'notifications') {
      setTimeout(fetchUnreadNotifications, 1000)
    }
  }

  const navigationSections = [
    {
      title: "Overview",
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: '🏠', iconAlt: '📊' },
        { key: 'notifications', label: 'Notifications', icon: '🔔', iconAlt: '💬', badge: unreadNotifications }
      ]
    },
    {
      title: "Social & Communication",
      items: [
        { key: 'social-feed', label: 'Social Feed', icon: '🌟', iconAlt: '💬' }
      ]
    },
    {
      title: "Time & Attendance", 
      items: [
        { key: 'clockinout', label: 'Clock In/Out', icon: '⏰', iconAlt: '🕐' },
        { key: 'attendance-summary', label: 'Attendance Summary', icon: '📊', iconAlt: '📈' },
        { key: 'timesheets', label: 'Timesheets', icon: '📋', iconAlt: '⏳' },
        { key: 'leave', label: 'Leave Requests', icon: '🏖️', iconAlt: '🌴' }
      ]
    },
    {
      title: "Wellness & Health",
      items: [
        { key: 'wellness', label: 'Wellness Hub', icon: '🌟', iconAlt: '💪' },
        { key: 'wellness-tracker', label: 'Activity Tracker', icon: '📝', iconAlt: '🎯' },
        { key: 'wellness-challenges', label: 'Challenges', icon: '🏆', iconAlt: '🥇' }
      ]
    },
    {
      title: "Analytics & Teams",
      items: [
        { key: 'analytics', label: 'Performance', icon: '📊', iconAlt: '📈' },
        { key: 'team', label: 'Team Hub', icon: '👥', iconAlt: '🤝' },
        { key: 'calendar', label: 'Calendar', icon: '📅', iconAlt: '🗓️' }
      ]
    },
    {
      title: "Account",
      items: [
        { key: 'profile', label: 'Profile', icon: '👤', iconAlt: '⚙️' }
      ]
    }
  ]

  const getInitializationMessage = () => {
    const messages = {
      starting: 'Initializing OfficeHub...',
      checking_session: 'Verifying your ServiceNow session...',
      loading_user: 'Loading your profile and preferences...',
      finalizing: 'Setting up your workspace...',
      error: 'Initialization failed'
    }
    return messages[initializationStep] || 'Loading...'
  }

  // Theme provider value
  const themeValue = {
    isDarkMode,
    toggleTheme,
    systemPreference
  }

  if (loading) {
    return (
      <div className={`officehub-app loading ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <div className="loading-container">
          <div className="loading-content">
            <div className="loading-logo">
              <span className="logo-icon">O</span>
            </div>
            <h2>OfficeHub</h2>
            <p className="loading-subtitle">Enterprise HR Platform</p>
            
            <div className="loading-progress">
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <p className="loading-step">{getInitializationMessage()}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`officehub-app error ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <ConnectionStatusMonitor onConnectionChange={setConnectionStatus} />
        
        <div className="error-container">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h2>Unable to Load OfficeHub</h2>
            <p className="error-message">{error.message}</p>
            
            <div className="error-details">
              <h3>Troubleshooting Steps:</h3>
              <ol className="error-steps">
                {error.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
            
            <div className="error-actions">
              <button onClick={handleRetry} className="btn btn-primary">
                {retryCount === 0 ? 'Try Again' : `Retry (${retryCount + 1}/3)`}
              </button>
              
              <button onClick={() => window.location.reload()} className="btn btn-secondary">
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className={`officehub-app ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <ConnectionStatusMonitor onConnectionChange={setConnectionStatus} />
        
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="header-left">
              <button 
                className="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                title="Toggle menu"
              >
                ☰
              </button>
              
              <div className="brand">
                <div className="brand-logo">
                  <span className="brand-icon">O</span>
                </div>
                <div className="brand-text">
                  <h1>OfficeHub</h1>
                  <p>HR Platform</p>
                </div>
              </div>
            </div>
            
            <div className="header-actions">
              <button 
                className="sidebar-toggle"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {sidebarCollapsed ? '→' : '←'}
              </button>
              
              <button 
                className="theme-toggle"
                onClick={toggleTheme}
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              
              <div className="current-time">
                {currentTime.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                })}
              </div>
              
              <div className="user-avatar" onClick={() => handleNavigate('profile')}>
                <span className="avatar-text">
                  {currentUser?.first_name?.charAt(0) || '?'}{currentUser?.last_name?.charAt(0) || '?'}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="app-body">
          {/* Sidebar */}
          <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : 'expanded'} ${mobileMenuOpen ? 'open' : ''}`}>
            <div className="sidebar-content">
              {/* User Profile Card */}
              {currentUser && (
                <div className="user-profile-card">
                  <div className="profile-avatar">
                    <span className="avatar-text">
                      {currentUser.first_name?.charAt(0) || '?'}{currentUser.last_name?.charAt(0) || '?'}
                    </span>
                  </div>
                  
                  {!sidebarCollapsed && (
                    <div className="profile-info">
                      <p className="profile-name">
                        {currentUser.first_name || 'Unknown'} {currentUser.last_name || 'User'}
                      </p>
                      <p className="profile-title">
                        {currentUser.title || currentUser.user_name || 'Employee'}
                      </p>
                      <div className="profile-status">
                        <div className={`status-dot ${connectionStatus}`}></div>
                        <span className="status-text">
                          {connectionStatus === 'online' ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Menu */}
              <nav className="sidebar-nav">
                {navigationSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="nav-section">
                    {!sidebarCollapsed && (
                      <h3 className="section-title">{section.title}</h3>
                    )}
                    <div className="nav-items">
                      {section.items.map(item => (
                        <button
                          key={item.key}
                          className={`nav-item ${currentView === item.key ? 'active' : ''}`}
                          onClick={() => handleNavigate(item.key)}
                          title={sidebarCollapsed ? item.label : ''}
                        >
                          <span className="nav-icon">
                            {item.icon}
                          </span>
                          {!sidebarCollapsed && (
                            <>
                              <span className="nav-label">{item.label}</span>
                              {item.badge > 0 && (
                                <span className="nav-badge">{item.badge}</span>
                              )}
                            </>
                          )}
                          {sidebarCollapsed && item.badge > 0 && (
                            <span className="nav-badge-collapsed">{item.badge}</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="main">
            <div className="main-content">
              {/* Welcome Banner */}
              {currentView === 'dashboard' && (
                <div className="welcome-banner">
                  <h2>Welcome back, {currentUser?.first_name || 'User'}!</h2>
                  <p>Here's what's happening with your work today</p>
                </div>
              )}
              
              {/* Page Content */}
              <div className="page-content">
                <ErrorBoundary onRetry={initializeApp}>
                  {currentView === 'dashboard' && (
                    <Dashboard currentUser={currentUser} onNavigate={handleNavigate} />
                  )}
                  {currentView === 'clockinout' && (
                    <ClockInOut currentUser={currentUser} />
                  )}
                  {currentView === 'attendance-summary' && (
                    <AttendanceSummary currentUser={currentUser} />
                  )}
                  {currentView === 'leave' && (
                    <LeaveRequests currentUser={currentUser} />
                  )}
                  {currentView === 'timesheets' && (
                    <Timesheets currentUser={currentUser} />
                  )}
                  {currentView === 'calendar' && (
                    <Calendar currentUser={currentUser} />
                  )}
                  {currentView === 'profile' && (
                    <Profile currentUser={currentUser} />
                  )}
                  {currentView === 'notifications' && (
                    <Notifications currentUser={currentUser} onNavigate={handleNavigate} />
                  )}
                  {currentView === 'analytics' && (
                    <PerformanceAnalytics currentUser={currentUser} />
                  )}
                  {currentView === 'team' && (
                    <TeamCollaboration currentUser={currentUser} />
                  )}
                  {currentView === 'wellness' && (
                    <WellnessDashboard currentUser={currentUser} onNavigate={handleNavigate} />
                  )}
                  {currentView === 'wellness-tracker' && (
                    <ActivityTracker currentUser={currentUser} />
                  )}
                  {currentView === 'wellness-challenges' && (
                    <ChallengeHub currentUser={currentUser} />
                  )}
                  {currentView === 'social-feed' && (
                    <SocialFeed currentUser={currentUser} />
                  )}
                </ErrorBoundary>
              </div>
            </div>
          </main>
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}></div>
        )}

        {/* AI Chatbot */}
        {currentUser && (
          <AIChatbot currentUser={currentUser} />
        )}
      </div>
    </ThemeContext.Provider>
  )
}