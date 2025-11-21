import React, { useState, useEffect } from 'react'
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
import './OfficeHubApp.css'

export default function OfficeHubApp() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [currentUser, setCurrentUser] = useState(null)
  const [unreadNotifications, setUnreadNotifications] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const employeeService = new EmployeeService()

  useEffect(() => {
    initializeApp()
  }, [])

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
      
      const user = await employeeService.getOrCreateEmployee()
      setCurrentUser(user)
      
    } catch (error) {
      console.error('Failed to initialize app:', error)
      setError('Failed to initialize application. Please refresh the page.')
    } finally {
      setLoading(false)
    }
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
      team: 'Team Collaboration Hub'
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
      team: 'Collaborate and coordinate with your team'
    }
    return subtitles[currentView] || ''
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
      title: "Time & Attendance", 
      items: [
        { key: 'clockinout', label: 'Clock In/Out', icon: '⏰', iconAlt: '🕐' },
        { key: 'timesheets', label: 'Timesheets', icon: '📋', iconAlt: '⏳' },
        { key: 'leave', label: 'Leave Requests', icon: '🏖️', iconAlt: '🌴' }
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

  if (loading) {
    return (
      <div className="officehub-app loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">
            <h3>OfficeHub</h3>
            <p>Loading your workspace...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="officehub-app error">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            <span>🔄</span> Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`officehub-app ${sidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      {/* Modern Collapsible Sidebar */}
      <aside className={`app-sidebar ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        {/* Sidebar Header */}
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

        {/* User Info */}
        {currentUser && (
          <div className="sidebar-user">
            <div className="user-avatar-large">
              <span className="avatar-text">
                {currentUser.first_name?.charAt(0)}{currentUser.last_name?.charAt(0)}
              </span>
              <div className="user-status-indicator online"></div>
            </div>
            {!sidebarCollapsed && (
              <div className="user-details">
                <div className="user-name">
                  {currentUser.first_name} {currentUser.last_name}
                </div>
                <div className="user-role">
                  {currentUser.title || currentUser.user_name}
                </div>
                <div className="user-status">
                  <span className="status-dot"></span>
                  Online
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
                      {sidebarCollapsed ? (item.iconAlt || item.icon) : item.icon}
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

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          {!sidebarCollapsed && (
            <div className="app-version">
              <div className="version-info">
                <span className="version-label">Version 4.0</span>
                <span className="version-status">🟢 All Systems Online</span>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Navigation Overlay */}
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
              <button 
                className="mobile-close"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            
            {currentUser && (
              <div className="mobile-user">
                <div className="user-avatar-large">
                  <span className="avatar-text">
                    {currentUser.first_name?.charAt(0)}{currentUser.last_name?.charAt(0)}
                  </span>
                </div>
                <div className="user-details">
                  <div className="user-name">
                    {currentUser.first_name} {currentUser.last_name}
                  </div>
                  <div className="user-role">
                    {currentUser.title || currentUser.user_name}
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
                      <span className="nav-icon">{item.icon}</span>
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

      {/* Main Content Area */}
      <div className="app-main">
        {/* Top Header */}
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
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
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
        </main>
      </div>
    </div>
  )
}