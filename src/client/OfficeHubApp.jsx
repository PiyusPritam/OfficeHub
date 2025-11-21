import React, { useState, useEffect, createContext, useContext } from 'react'
import { EmployeeService } from './services/EmployeeService.js'
import Dashboard from './components/Dashboard.jsx'
import ClockInOut from './components/ClockInOut.jsx'
import LeaveRequests from './components/LeaveRequests.jsx'
import Timesheets from './components/Timesheets.jsx'
import Calendar from './components/Calendar.jsx'
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

  const employeeService = new EmployeeService()

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

  const getViewTitle = () => {
    const titles = {
      dashboard: 'Dashboard Overview',
      clockinout: 'Time Tracking',
      leave: 'Leave Management',
      timesheets: 'Timesheet Manager',
      calendar: 'Calendar & Events',
      profile: 'Profile Settings',
      notifications: 'Smart Notifications',
      analytics: 'Performance Analytics',
      team: 'Team Collaboration Hub',
      wellness: 'Wellness Dashboard',
      'wellness-tracker': 'Activity Tracker',
      'wellness-challenges': 'Challenge Hub',
      'social-feed': 'Team Social Feed'
    }
    return titles[currentView] || 'OfficeHub'
  }

  const getViewSubtitle = () => {
    const subtitles = {
      dashboard: 'Your daily overview and quick actions',
      clockinout: 'Manage your attendance and work hours',
      leave: 'Request and manage time off',
      timesheets: 'Log your project hours and activities',
      calendar: 'View events and schedule meetings',
      profile: 'Manage your account and preferences',
      notifications: 'Stay updated with smart alerts',
      analytics: 'Track your performance and growth',
      team: 'Collaborate and coordinate with your team',
      wellness: 'Track your wellness journey and goals',
      'wellness-tracker': 'Log your wellness activities and earn points',
      'wellness-challenges': 'Join challenges and compete with colleagues',
      'social-feed': 'Connect with your team and share updates'
    }
    return subtitles[currentView] || ''
  }

  const navigationSections = [
    {
      title: "Overview",
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: '🏠', iconAlt: '📊', darkIcon: '🌙' },
        { key: 'notifications', label: 'Notifications', icon: '🔔', iconAlt: '💬', darkIcon: '🌙', badge: unreadNotifications }
      ]
    },
    {
      title: "Social & Communication",
      items: [
        { key: 'social-feed', label: 'Social Feed', icon: '🌟', iconAlt: '💬', darkIcon: '✨' }
      ]
    },
    {
      title: "Time & Attendance", 
      items: [
        { key: 'clockinout', label: 'Clock In/Out', icon: '⏰', iconAlt: '🕐', darkIcon: '🌙' },
        { key: 'timesheets', label: 'Timesheets', icon: '📋', iconAlt: '⏳', darkIcon: '📝' },
        { key: 'leave', label: 'Leave Requests', icon: '🏖️', iconAlt: '🌴', darkIcon: '🌊' }
      ]
    },
    {
      title: "Wellness & Health",
      items: [
        { key: 'wellness', label: 'Wellness Hub', icon: '🌟', iconAlt: '💪', darkIcon: '✨' },
        { key: 'wellness-tracker', label: 'Activity Tracker', icon: '📝', iconAlt: '🎯', darkIcon: '📊' },
        { key: 'wellness-challenges', label: 'Challenges', icon: '🏆', iconAlt: '🥇', darkIcon: '🎖️' }
      ]
    },
    {
      title: "Analytics & Teams",
      items: [
        { key: 'analytics', label: 'Performance', icon: '📊', iconAlt: '📈', darkIcon: '📉' },
        { key: 'team', label: 'Team Hub', icon: '👥', iconAlt: '🤝', darkIcon: '👫' },
        { key: 'calendar', label: 'Calendar', icon: '📅', iconAlt: '🗓️', darkIcon: '🌙' }
      ]
    },
    {
      title: "Account",
      items: [
        { key: 'profile', label: 'Profile', icon: '👤', iconAlt: '⚙️', darkIcon: '🌙' }
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
        <div className="enhanced-loading-container">
          <div className="loading-brand">
            <span className="brand-icon">🏢</span>
            <h2>OfficeHub</h2>
            <p className="loading-subtitle">Enterprise HR Platform</p>
          </div>
          
          <div className="loading-progress">
            <div className="progress-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            
            <div className="loading-steps">
              <p className="current-step">{getInitializationMessage()}</p>
              <div className="step-indicators">
                <div className={`step-indicator ${['starting', 'checking_session', 'loading_user', 'finalizing'].indexOf(initializationStep) >= 0 ? 'active' : ''}`}></div>
                <div className={`step-indicator ${['checking_session', 'loading_user', 'finalizing'].indexOf(initializationStep) >= 0 ? 'active' : ''}`}></div>
                <div className={`step-indicator ${['loading_user', 'finalizing'].indexOf(initializationStep) >= 0 ? 'active' : ''}`}></div>
                <div className={`step-indicator ${initializationStep === 'finalizing' ? 'active' : ''}`}></div>
              </div>
            </div>
          </div>
          
          <div className="loading-tips">
            <p>💡 <strong>Tip:</strong> Make sure you're logged into ServiceNow</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`officehub-app error ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
        <ConnectionStatusMonitor onConnectionChange={setConnectionStatus} />
        
        <div className="enhanced-error-container">
          <div className="error-header">
            <div className="error-icon-large">⚠️</div>
            <h2>Unable to Load OfficeHub</h2>
            <p className="error-main-message">{error.message}</p>
          </div>
          
          <div className="error-details">
            <h3>🔧 Troubleshooting Steps:</h3>
            <ol className="error-steps">
              {error.steps.map((step, index) => (
                <li key={index} className="error-step">
                  <span className="step-number">{index + 1}</span>
                  <span className="step-text">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="error-actions">
            <button onClick={handleRetry} className="retry-btn primary">
              <span className="btn-icon">🔄</span>
              {retryCount === 0 ? 'Try Again' : `Retry (${retryCount + 1}/3)`}
            </button>
            
            <button onClick={() => window.location.reload()} className="retry-btn secondary">
              <span className="btn-icon">↻</span>
              Refresh Page
            </button>
            
            <button 
              onClick={() => window.location.href = window.location.origin}
              className="retry-btn secondary"
            >
              <span className="btn-icon">🏠</span>
              Go to ServiceNow Home
            </button>
          </div>
          
          {retryCount >= 2 && (
            <div className="error-support">
              <h3>🆘 Still having issues?</h3>
              <div className="support-options">
                <div className="support-item">
                  <strong>Check System Status:</strong>
                  <p>Verify ServiceNow instance is operational</p>
                </div>
                <div className="support-item">
                  <strong>Clear Browser Data:</strong>
                  <p>Clear cache, cookies, and local storage</p>
                </div>
                <div className="support-item">
                  <strong>Contact Support:</strong>
                  <p>Reach out to your system administrator</p>
                </div>
              </div>
            </div>
          )}
          
          {error.originalError && (
            <details className="error-technical">
              <summary>Technical Details</summary>
              <pre>{error.originalError}</pre>
            </details>
          )}
        </div>
      </div>
    )
  }

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className={`officehub-app ${isDarkMode ? 'dark-theme' : 'light-theme'} ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
        <ConnectionStatusMonitor onConnectionChange={setConnectionStatus} />
        
        {/* Enhanced Modern Sidebar */}
        <aside className={`app-sidebar ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
          {/* Enhanced Sidebar Header */}
          <div className="sidebar-header">
            <div className="app-brand">
              <span className="brand-icon">🏢</span>
              {!sidebarCollapsed && (
                <div className="brand-text">
                  <h1>OfficeHub</h1>
                  <span className="brand-subtitle">HR Platform</span>
                </div>
              )}
            </div>
            <div className="header-controls">
              <button 
                className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
                onClick={toggleTheme}
                title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
              <button 
                className="sidebar-toggle"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <span className={`toggle-icon ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
                  {sidebarCollapsed ? '→' : '←'}
                </span>
              </button>
            </div>
          </div>

          {/* Enhanced User Info */}
          {currentUser && (
            <div className="sidebar-user">
              <div className="user-avatar-large">
                <span className="avatar-text">
                  {currentUser.first_name?.charAt(0) || '?'}{currentUser.last_name?.charAt(0) || '?'}
                </span>
                <div className={`user-status-indicator ${connectionStatus}`}></div>
              </div>
              {!sidebarCollapsed && (
                <div className="user-details">
                  <div className="user-name">
                    {currentUser.first_name || 'Unknown'} {currentUser.last_name || 'User'}
                  </div>
                  <div className="user-role">
                    {currentUser.title || currentUser.user_name || 'Employee'}
                  </div>
                  <div className="user-status">
                    <span className={`status-dot ${connectionStatus}`}></span>
                    {connectionStatus === 'online' ? 'Online' : 'Offline'}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Navigation Menu */}
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
                        {sidebarCollapsed ? (
                          isDarkMode ? (item.darkIcon || item.iconAlt || item.icon) : (item.iconAlt || item.icon)
                        ) : (
                          isDarkMode ? (item.darkIcon || item.icon) : item.icon
                        )}
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

          {/* Enhanced Sidebar Footer */}
          <div className="sidebar-footer">
            {!sidebarCollapsed && (
              <div className="app-version">
                <div className="version-info">
                  <span className="version-label">Version 5.1</span>
                  <span className={`version-status ${connectionStatus}`}>
                    {connectionStatus === 'online' ? '🟢 Online' : '🔴 Offline'}
                  </span>
                </div>
                <div className="theme-indicator">
                  <span className="theme-label">
                    {isDarkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Enhanced Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="mobile-overlay" onClick={() => setMobileMenuOpen(false)}>
            <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-header">
                <div className="app-brand">
                  <span className="brand-icon">🏢</span>
                  <div className="brand-text">
                    <h1>OfficeHub</h1>
                    <span className="brand-subtitle">HR Platform</span>
                  </div>
                </div>
                <div className="mobile-header-actions">
                  <button 
                    className={`theme-toggle mobile ${isDarkMode ? 'dark' : 'light'}`}
                    onClick={toggleTheme}
                    title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                  >
                    {isDarkMode ? '☀️' : '🌙'}
                  </button>
                  <button 
                    className="mobile-close"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              {currentUser && (
                <div className="mobile-user">
                  <div className="user-avatar-large">
                    <span className="avatar-text">
                      {currentUser.first_name?.charAt(0) || '?'}{currentUser.last_name?.charAt(0) || '?'}
                    </span>
                  </div>
                  <div className="user-details">
                    <div className="user-name">
                      {currentUser.first_name || 'Unknown'} {currentUser.last_name || 'User'}
                    </div>
                    <div className="user-role">
                      {currentUser.title || currentUser.user_name || 'Employee'}
                    </div>
                  </div>
                </div>
              )}

              <nav className="mobile-nav">
                {navigationSections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mobile-nav-section">
                    <h3 className="mobile-section-title">{section.title}</h3>
                    {section.items.map(item => (
                      <button
                        key={item.key}
                        className={`mobile-nav-item ${currentView === item.key ? 'active' : ''}`}
                        onClick={() => handleNavigate(item.key)}
                      >
                        <span className="nav-icon">
                          {isDarkMode ? (item.darkIcon || item.icon) : item.icon}
                        </span>
                        <span className="nav-label">{item.label}</span>
                        {item.badge > 0 && (
                          <span className="nav-badge">{item.badge}</span>
                        )}
                      </button>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Enhanced Main Content Area */}
        <div className="app-main">
          {/* Enhanced Top Header */}
          <header className="content-header">
            <button 
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(true)}
            >
              ☰
            </button>
            
            <div className="page-title">
              <h1>{getViewTitle()}</h1>
              <p className="page-subtitle">{getViewSubtitle()}</p>
            </div>

            <div className="header-actions">
              <div className="theme-controls desktop-only">
                <button 
                  className={`theme-toggle ${isDarkMode ? 'dark' : 'light'}`}
                  onClick={toggleTheme}
                  title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
              </div>
              
              <div className="quick-stats">
                {unreadNotifications > 0 && (
                  <div className="stat-item notifications-stat" onClick={() => handleNavigate('notifications')}>
                    <span className="stat-icon">🔔</span>
                    <span className="stat-count">{unreadNotifications}</span>
                  </div>
                )}
                <div className="current-time">
                  {new Date().toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
                <div className={`connection-status ${connectionStatus}`}>
                  <span className="connection-dot"></span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="page-content">
            <ErrorBoundary onRetry={initializeApp}>
              {currentView === 'dashboard' && (
                <Dashboard currentUser={currentUser} onNavigate={handleNavigate} />
              )}
              {currentView === 'clockinout' && (
                <ClockInOut currentUser={currentUser} />
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
          </main>
        </div>

        {/* AI Chatbot - Always Available */}
        {currentUser && (
          <AIChatbot currentUser={currentUser} />
        )}
      </div>
    </ThemeContext.Provider>
  )
}