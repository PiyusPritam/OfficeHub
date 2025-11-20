import React, { useState, useEffect } from 'react'
import { EmployeeService } from '../services/EmployeeService.js'
import './Dashboard.css'

export default function Dashboard({ onNavigate }) {
  const [dashboardData, setDashboardData] = useState({
    todayAttendance: null,
    weeklyHours: 0,
    upcomingEvents: [],
    pendingLeaveRequests: 0,
    achievements: [],
    leaveBalance: {
      total: 25,
      used: 0,
      remaining: 25
    },
    holidays: []
  })
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [error, setError] = useState(null)

  const employeeService = new EmployeeService()

  useEffect(() => {
    initializeUser()
  }, [])

  const initializeUser = async () => {
    try {
      setError(null)
      const user = await employeeService.getOrCreateEmployee()
      setCurrentUser(user)
      await fetchDashboardData(user)
    } catch (error) {
      console.error('Failed to initialize user:', error)
      setError(`Failed to initialize: ${error.message}`)
    }
  }

  const fetchDashboardData = async (user) => {
    if (!user) return

    try {
      const userSysId = user.sys_id

      // Fetch today's attendance
      const today = new Date().toISOString().split('T')[0]
      const attendanceData = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_attendance?sysparm_query=user=${userSysId}^date=${today}&sysparm_limit=1&sysparm_display_value=all`
      ).catch(err => {
        console.warn('Could not fetch attendance:', err)
        return { result: [] }
      })
      
      // Fetch recent achievements
      const achievementsData = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_achievement?sysparm_query=user=${userSysId}&sysparm_limit=5&sysparm_display_value=all&sysparm_query=ORDERBYDESCearned_date`
      ).catch(err => {
        console.warn('Could not fetch achievements:', err)
        return { result: [] }
      })

      // Fetch leave requests for balance calculation
      const leaveData = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_leave_request?sysparm_query=user=${userSysId}^status=approved&sysparm_display_value=all`
      ).catch(err => {
        console.warn('Could not fetch leave requests:', err)
        return { result: [] }
      })

      // Calculate leave balance
      const usedDays = leaveData.result?.reduce((total, request) => {
        const days = typeof request.days_requested === 'object' ? 
          parseInt(request.days_requested.display_value) : 
          parseInt(request.days_requested || 0)
        return total + days
      }, 0) || 0

      // Fetch upcoming holidays/events
      const nowDate = new Date().toISOString().split('T')[0]
      const eventsData = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_event?sysparm_query=start_date>=${nowDate}^event_type=holiday^ORis_company_wide=true&sysparm_limit=5&sysparm_display_value=all&sysparm_query=ORDERBYstart_date`
      ).catch(err => {
        console.warn('Could not fetch events:', err)
        return { result: [] }
      })

      setDashboardData({
        todayAttendance: attendanceData.result?.[0] || null,
        achievements: achievementsData.result || [],
        leaveBalance: {
          total: 25,
          used: usedDays,
          remaining: 25 - usedDays
        },
        weeklyHours: 32.5, // This would be calculated from timesheet data
        upcomingEvents: eventsData.result || [],
        pendingLeaveRequests: 0,
        holidays: eventsData.result?.filter(event => {
          const eventType = typeof event.event_type === 'object' ? 
            event.event_type.display_value : event.event_type
          return eventType === 'holiday'
        }) || []
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError(`Failed to load dashboard: ${error.message}`)
    }
  }

  const handleQuickAction = async (action) => {
    if (!currentUser) {
      setError('User session not found. Please refresh the page.')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      switch (action) {
        case 'clockin':
          await handleClockAction()
          break
        case 'leave':
          onNavigate?.('leave')
          break
        case 'timesheet':
          onNavigate?.('timesheets')
          break
        case 'calendar':
          onNavigate?.('calendar')
          break
        default:
          break
      }
    } catch (error) {
      console.error('Error with quick action:', error)
      setError(`Action failed: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleClockAction = async () => {
    const userSysId = currentUser.sys_id
    const now = new Date().toISOString()
    
    if (!dashboardData.todayAttendance || !dashboardData.todayAttendance.clock_in) {
      // Clock In
      try {
        await employeeService.apiCall('/api/now/table/x_1599224_officehu_attendance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: userSysId,
            date: now,
            clock_in: now,
            work_location: 'office',
            status: 'clocked_in'
          })
        })
        
        await fetchDashboardData(currentUser)
        alert('Successfully clocked in!')
      } catch (error) {
        throw new Error(`Clock in failed: ${error.message}`)
      }
    } else if (dashboardData.todayAttendance.clock_in && !dashboardData.todayAttendance.clock_out) {
      // Clock Out
      try {
        const attendanceSysId = typeof dashboardData.todayAttendance.sys_id === 'object' ? 
          dashboardData.todayAttendance.sys_id.value : dashboardData.todayAttendance.sys_id
        
        await employeeService.apiCall(`/api/now/table/x_1599224_officehu_attendance/${attendanceSysId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            clock_out: now,
            status: 'clocked_out'
          })
        })
        
        await fetchDashboardData(currentUser)
        alert('Successfully clocked out!')
      } catch (error) {
        throw new Error(`Clock out failed: ${error.message}`)
      }
    }
  }

  const formatTime = (timeString) => {
    if (!timeString) return 'Not recorded'
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const getCurrentStatus = () => {
    const attendance = dashboardData.todayAttendance
    if (!attendance) return 'Not clocked in'
    
    const clockIn = attendance.clock_in
    const clockOut = attendance.clock_out
    
    if (clockIn && !clockOut) return 'Currently working'
    if (clockIn && clockOut) return 'Clocked out'
    return 'Not clocked in'
  }

  const getWorkProgress = () => {
    const attendance = dashboardData.todayAttendance
    if (!attendance || !attendance.clock_in) return 0
    
    const clockIn = new Date(attendance.clock_in)
    const now = new Date()
    const workHours = (now - clockIn) / (1000 * 60 * 60) // hours
    const standardWorkDay = 8 // 8 hours
    
    return Math.min((workHours / standardWorkDay) * 100, 100)
  }

  const getClockActionText = () => {
    const attendance = dashboardData.todayAttendance
    if (!attendance || !attendance.clock_in) return '🕐 Clock In'
    if (attendance.clock_in && !attendance.clock_out) return '🔚 Clock Out'
    return '✅ Complete'
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-message">
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Welcome back, {currentUser?.first_name || currentUser?.user_name || 'User'}!</h2>
        <div className="current-time">
          {new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          })}
        </div>
      </div>
      
      <div className="dashboard-grid">
        {/* Enhanced Status Card with Progress */}
        <div className="card status-card">
          <h3 className="card-title">Today's Progress</h3>
          <div className="status-content">
            <div className="status-overview">
              <div className="status-badge-large">
                <span className={`status-indicator ${getCurrentStatus().replace(/\s+/g, '-').toLowerCase()}`}>
                  {getCurrentStatus() === 'Currently working' ? '⚡' : 
                   getCurrentStatus() === 'Clocked out' ? '✅' : '⏸️'}
                </span>
                <span className="status-text">{getCurrentStatus()}</span>
              </div>
            </div>
            
            {dashboardData.todayAttendance?.clock_in && !dashboardData.todayAttendance?.clock_out && (
              <div className="progress-section">
                <div className="progress-header">
                  <span>Work Progress</span>
                  <span>{Math.round(getWorkProgress())}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${getWorkProgress()}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="time-details">
              <div className="time-item">
                <span className="time-label">Clock In:</span>
                <span className="time-value">
                  {formatTime(dashboardData.todayAttendance?.clock_in)}
                </span>
              </div>
              <div className="time-item">
                <span className="time-label">Clock Out:</span>
                <span className="time-value">
                  {formatTime(dashboardData.todayAttendance?.clock_out)}
                </span>
              </div>
              {dashboardData.todayAttendance?.total_hours && (
                <div className="time-item">
                  <span className="time-label">Hours Today:</span>
                  <span className="time-value hours-highlight">
                    {dashboardData.todayAttendance.total_hours} hrs
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="card actions-card">
          <h3 className="card-title">Quick Actions</h3>
          <div className="quick-actions">
            <button 
              className="action-btn clock-action"
              onClick={() => handleQuickAction('clockin')}
              disabled={loading}
            >
              <span className="action-icon">
                {loading ? '⟳' : 
                 !dashboardData.todayAttendance?.clock_in ? '🕐' :
                 dashboardData.todayAttendance?.clock_in && !dashboardData.todayAttendance?.clock_out ? '🔚' : '✅'}
              </span>
              <span className="action-text">{getClockActionText()}</span>
            </button>
            
            <button 
              className="action-btn leave-action"
              onClick={() => handleQuickAction('leave')}
            >
              <span className="action-icon">🏖️</span>
              <span className="action-text">Request Leave</span>
            </button>
            
            <button 
              className="action-btn timesheet-action"
              onClick={() => handleQuickAction('timesheet')}
            >
              <span className="action-icon">📋</span>
              <span className="action-text">Log Hours</span>
            </button>
            
            <button 
              className="action-btn calendar-action"
              onClick={() => handleQuickAction('calendar')}
            >
              <span className="action-icon">📅</span>
              <span className="action-text">View Calendar</span>
            </button>
          </div>
        </div>

        {/* Enhanced Leave Balance Card */}
        <div className="card leave-balance-card">
          <h3 className="card-title">Leave Balance</h3>
          <div className="leave-balance-content">
            <div className="balance-summary">
              <div className="balance-circle">
                <div className="circle-progress">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path className="circle"
                      strokeDasharray={`${(dashboardData.leaveBalance.remaining / dashboardData.leaveBalance.total) * 100}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="balance-number">
                    {dashboardData.leaveBalance.remaining}
                  </div>
                </div>
              </div>
              <div className="balance-details">
                <div className="balance-item">
                  <span className="balance-label">Total Allocated:</span>
                  <span className="balance-value">{dashboardData.leaveBalance.total} days</span>
                </div>
                <div className="balance-item">
                  <span className="balance-label">Used:</span>
                  <span className="balance-value used">{dashboardData.leaveBalance.used} days</span>
                </div>
                <div className="balance-item">
                  <span className="balance-label">Remaining:</span>
                  <span className="balance-value remaining">{dashboardData.leaveBalance.remaining} days</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Summary Card */}
        <div className="card summary-card">
          <h3 className="card-title">This Week</h3>
          <div className="summary-stats">
            <div className="stat">
              <div className="stat-icon">⏰</div>
              <div className="stat-info">
                <div className="stat-value">{dashboardData.weeklyHours}</div>
                <div className="stat-label">Hours Worked</div>
              </div>
            </div>
            <div className="stat">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <div className="stat-value">5</div>
                <div className="stat-label">Days Present</div>
              </div>
            </div>
            <div className="stat">
              <div className="stat-icon">🎯</div>
              <div className="stat-info">
                <div className="stat-value">98%</div>
                <div className="stat-label">Punctuality</div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events & Holidays */}
        <div className="card events-card">
          <h3 className="card-title">Upcoming Events & Holidays</h3>
          {dashboardData.upcomingEvents.length > 0 ? (
            <div className="events-list">
              {dashboardData.upcomingEvents.slice(0, 3).map((event, index) => {
                const title = typeof event.title === 'object' ? event.title.display_value : event.title
                const eventType = typeof event.event_type === 'object' ? event.event_type.display_value : event.event_type
                const startDate = typeof event.start_date === 'object' ? event.start_date.value : event.start_date
                
                return (
                  <div key={index} className={`event-item ${eventType}`}>
                    <div className="event-icon">
                      {eventType === 'holiday' ? '🏖️' : 
                       eventType === 'meeting' ? '👥' : '📅'}
                    </div>
                    <div className="event-info">
                      <div className="event-title">{title}</div>
                      <div className="event-date">
                        {new Date(startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="no-events">No upcoming events or holidays</p>
          )}
        </div>

        {/* Achievements Card */}
        <div className="card achievements-card">
          <h3 className="card-title">Recent Achievements</h3>
          {dashboardData.achievements.length > 0 ? (
            <div className="achievements-list">
              {dashboardData.achievements.map((achievement, index) => (
                <div key={index} className="achievement-item">
                  <div className="achievement-icon">🏆</div>
                  <div className="achievement-info">
                    <div className="achievement-title">
                      {typeof achievement.title === 'object' ? achievement.title.display_value : achievement.title}
                    </div>
                    <div className="achievement-date">
                      {new Date(typeof achievement.earned_date === 'object' ? achievement.earned_date.value : achievement.earned_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-achievements">No achievements yet. Keep up the great work!</p>
          )}
        </div>
      </div>
    </div>
  )
}