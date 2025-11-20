import React, { useState, useEffect } from 'react'
import { EmployeeService } from '../services/EmployeeService.js'
import './ClockInOut.css'

export default function ClockInOut({ user }) {
  const [todayAttendance, setTodayAttendance] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [loading, setLoading] = useState(false)
  const [workLocation, setWorkLocation] = useState('office')
  const [error, setError] = useState(null)

  const employeeService = new EmployeeService()

  useEffect(() => {
    if (user) {
      fetchTodayAttendance()
    }
    
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    
    return () => clearInterval(timer)
  }, [user])

  const fetchTodayAttendance = async () => {
    if (!user) return

    try {
      setError(null)
      const today = new Date().toISOString().split('T')[0]
      
      const data = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_attendance?sysparm_query=user=${user.sys_id}^date=${today}&sysparm_limit=1&sysparm_display_value=all`
      )
      
      setTodayAttendance(data.result?.[0] || null)
    } catch (error) {
      console.error('Error fetching attendance:', error)
      setError(`Failed to load attendance: ${error.message}`)
    }
  }

  const handleClockIn = async () => {
    if (!user) {
      setError('User session not found. Please refresh the page.')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      const now = new Date().toISOString()
      
      await employeeService.apiCall('/api/now/table/x_1599224_officehu_attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: user.sys_id,
          date: now,
          clock_in: now,
          work_location: workLocation,
          status: 'clocked_in'
        })
      })
      
      await fetchTodayAttendance()
      alert('Successfully clocked in!')
    } catch (error) {
      console.error('Error clocking in:', error)
      setError(`Failed to clock in: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleClockOut = async () => {
    if (!todayAttendance || !user) return
    
    setLoading(true)
    setError(null)
    
    try {
      const now = new Date().toISOString()
      const attendanceSysId = typeof todayAttendance.sys_id === 'object' ? 
        todayAttendance.sys_id.value : todayAttendance.sys_id
      
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
      
      await fetchTodayAttendance()
      alert('Successfully clocked out!')
    } catch (error) {
      console.error('Error clocking out:', error)
      setError(`Failed to clock out: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const formatTime = (timeString) => {
    if (!timeString) return 'Not recorded'
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })
  }

  const isClocked = () => {
    if (!todayAttendance) return false
    const clockIn = todayAttendance.clock_in
    const clockOut = todayAttendance.clock_out
    return clockIn && !clockOut
  }

  const canClockIn = () => {
    return !todayAttendance || (!todayAttendance.clock_in || todayAttendance.clock_out)
  }

  const canClockOut = () => {
    return todayAttendance && todayAttendance.clock_in && !todayAttendance.clock_out
  }

  if (error) {
    return (
      <div className="clockinout">
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
    <div className="clockinout">
      <h2 className="clockinout-title">Clock In/Out</h2>
      
      <div className="clockinout-container">
        {/* Current Time Display */}
        <div className="card time-display">
          <h3 className="current-time">
            {currentTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true
            })}
          </h3>
          <p className="current-date">
            {currentTime.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Status Card */}
        <div className="card status-card">
          <h3 className="card-title">Today's Status</h3>
          <div className="status-info">
            <div className="status-item">
              <span className="status-label">Status:</span>
              <span className={`status-badge ${isClocked() ? 'working' : 'not-working'}`}>
                {isClocked() ? 'Working' : 'Not Working'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Clock In:</span>
              <span className="status-value">
                {formatTime(todayAttendance?.clock_in)}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Clock Out:</span>
              <span className="status-value">
                {formatTime(todayAttendance?.clock_out)}
              </span>
            </div>
            {todayAttendance?.total_hours && (
              <div className="status-item">
                <span className="status-label">Total Hours:</span>
                <span className="status-value">
                  {typeof todayAttendance.total_hours === 'object' ? 
                    todayAttendance.total_hours.display_value : 
                    todayAttendance.total_hours} hours
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Clock In/Out Actions */}
        <div className="card actions-card">
          <h3 className="card-title">Actions</h3>
          
          {canClockIn() && (
            <div className="action-section">
              <label htmlFor="work-location" className="location-label">
                Work Location:
              </label>
              <select
                id="work-location"
                value={workLocation}
                onChange={(e) => setWorkLocation(e.target.value)}
                className="location-select"
              >
                <option value="office">🏢 Office</option>
                <option value="home">🏠 Home</option>
                <option value="hybrid">🔄 Hybrid</option>
                <option value="field">🌍 Field</option>
              </select>
              
              <button
                onClick={handleClockIn}
                disabled={loading}
                className="btn btn-success clock-btn"
              >
                {loading ? '⏳ Clocking In...' : '🕐 Clock In'}
              </button>
            </div>
          )}
          
          {canClockOut() && (
            <div className="action-section">
              <p className="work-location-display">
                Working from: {typeof todayAttendance?.work_location === 'object' ? 
                  todayAttendance.work_location.display_value : 
                  todayAttendance?.work_location || 'Office'}
              </p>
              
              <button
                onClick={handleClockOut}
                disabled={loading}
                className="btn btn-danger clock-btn"
              >
                {loading ? '⏳ Clocking Out...' : '🔚 Clock Out'}
              </button>
            </div>
          )}
          
          {!canClockIn() && !canClockOut() && (
            <div className="action-section">
              <p className="completed-message">
                ✅ You have completed your work day!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}