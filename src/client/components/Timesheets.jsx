import React, { useState, useEffect } from 'react'
import { EmployeeService } from '../services/EmployeeService.js'
import './Timesheets.css'

export default function Timesheets({ user }) {
  const [timesheets, setTimesheets] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [selectedWeek, setSelectedWeek] = useState(getThisWeek())
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    project: '',
    hours: '',
    description: '',
    billable: 'billable'
  })

  const employeeService = new EmployeeService()

  function getThisWeek() {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const monday = new Date(today)
    monday.setDate(today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))
    return monday.toISOString().split('T')[0]
  }

  useEffect(() => {
    if (user) {
      fetchTimesheets()
    }
  }, [user, selectedWeek])

  const fetchTimesheets = async () => {
    if (!user) return

    try {
      setError(null)
      const weekStart = new Date(selectedWeek)
      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)
      
      const startDate = weekStart.toISOString().split('T')[0]
      const endDate = weekEnd.toISOString().split('T')[0]
      
      const data = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_timesheet?sysparm_query=user=${user.sys_id}^date>=${startDate}^date<=${endDate}&sysparm_display_value=all&sysparm_query=ORDERBYdate`
      )
      
      setTimesheets(data.result || [])
    } catch (error) {
      console.error('Error fetching timesheets:', error)
      setError(`Failed to load timesheets: ${error.message}`)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('User session not found. Please refresh the page.')
      return
    }

    setLoading(true)
    setError(null)
    
    try {
      await employeeService.apiCall('/api/now/table/x_1599224_officehu_timesheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: user.sys_id,
          date: formData.date,
          project: formData.project,
          hours: parseFloat(formData.hours),
          description: formData.description,
          billable: formData.billable,
          status: 'draft'
        })
      })
      
      setFormData({
        date: new Date().toISOString().split('T')[0],
        project: '',
        hours: '',
        description: '',
        billable: 'billable'
      })
      setShowForm(false)
      await fetchTimesheets()
      alert('Timesheet entry added successfully!')
    } catch (error) {
      console.error('Error submitting timesheet:', error)
      setError(`Failed to submit timesheet entry: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'draft': return 'status-draft'
      case 'submitted': return 'status-submitted'
      case 'approved': return 'status-approved'
      case 'rejected': return 'status-rejected'
      default: return 'status-draft'
    }
  }

  const getBillableBadgeClass = (billable) => {
    switch (billable) {
      case 'billable': return 'billable-yes'
      case 'non_billable': return 'billable-no'
      case 'overtime': return 'billable-overtime'
      default: return 'billable-no'
    }
  }

  const getTotalHours = () => {
    return timesheets.reduce((total, entry) => {
      const hours = typeof entry.hours === 'object' ? 
        parseFloat(entry.hours.display_value) : 
        parseFloat(entry.hours || 0)
      return total + hours
    }, 0).toFixed(1)
  }

  const changeWeek = (direction) => {
    const currentWeek = new Date(selectedWeek)
    currentWeek.setDate(currentWeek.getDate() + (direction * 7))
    setSelectedWeek(currentWeek.toISOString().split('T')[0])
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const getWeekRange = () => {
    const weekStart = new Date(selectedWeek)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekStart.getDate() + 6)
    
    return `${formatDate(weekStart)} - ${formatDate(weekEnd)}`
  }

  if (error) {
    return (
      <div className="timesheets">
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
    <div className="timesheets">
      <div className="timesheets-header">
        <h2 className="timesheets-title">Timesheets</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? '✕ Cancel' : '+ Log Hours'}
        </button>
      </div>

      {/* Week Navigation */}
      <div className="week-navigation">
        <button onClick={() => changeWeek(-1)} className="btn btn-secondary">
          ← Previous Week
        </button>
        <div className="week-info">
          <h3>{getWeekRange()}</h3>
          <p>Total Hours: {getTotalHours()}</p>
        </div>
        <button onClick={() => changeWeek(1)} className="btn btn-secondary">
          Next Week →
        </button>
      </div>

      {showForm && (
        <div className="card timesheet-form-card">
          <h3 className="card-title">⏰ Log Work Hours</h3>
          <form onSubmit={handleSubmit} className="timesheet-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hours">Hours Worked</label>
                <input
                  type="number"
                  id="hours"
                  step="0.25"
                  min="0"
                  max="24"
                  value={formData.hours}
                  onChange={(e) => setFormData({...formData, hours: e.target.value})}
                  placeholder="e.g., 8.5"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="project">Project/Task</label>
                <input
                  type="text"
                  id="project"
                  value={formData.project}
                  onChange={(e) => setFormData({...formData, project: e.target.value})}
                  placeholder="Project name or task description"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="billable">Billable Type</label>
                <select
                  id="billable"
                  value={formData.billable}
                  onChange={(e) => setFormData({...formData, billable: e.target.value})}
                  required
                >
                  <option value="billable">💰 Billable</option>
                  <option value="non_billable">🔧 Non-Billable</option>
                  <option value="overtime">⏰ Overtime</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Work Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the work performed..."
                rows="3"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? '⏳ Logging...' : '💾 Log Hours'}
              </button>
              <button 
                type="button" 
                onClick={() => setShowForm(false)} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Timesheets List */}
      <div className="timesheets-list">
        <h3 className="timesheets-list-title">📊 Time Entries</h3>
        {timesheets.length > 0 ? (
          timesheets.map((entry, index) => {
            const project = typeof entry.project === 'object' ? entry.project.display_value : entry.project
            const hours = typeof entry.hours === 'object' ? entry.hours.display_value : entry.hours
            const billable = typeof entry.billable === 'object' ? entry.billable.display_value : entry.billable
            const status = typeof entry.status === 'object' ? entry.status.display_value : entry.status
            const date = typeof entry.date === 'object' ? entry.date.value : entry.date
            const description = typeof entry.description === 'object' ? entry.description.display_value : entry.description

            return (
              <div key={index} className="card timesheet-entry-card">
                <div className="entry-header">
                  <div className="entry-info">
                    <h4 className="project-name">📁 {project}</h4>
                    <div className="entry-badges">
                      <span className={`billable-badge ${getBillableBadgeClass(billable)}`}>
                        {billable === 'billable' && '💰 '}
                        {billable === 'non_billable' && '🔧 '}
                        {billable === 'overtime' && '⏰ '}
                        {billable}
                      </span>
                      <span className={`status-badge ${getStatusBadgeClass(status)}`}>
                        {status === 'draft' && '📝 '}
                        {status === 'submitted' && '📤 '}
                        {status === 'approved' && '✅ '}
                        {status === 'rejected' && '❌ '}
                        {status}
                      </span>
                    </div>
                  </div>
                  <div className="entry-details">
                    <div className="entry-date">📅 {formatDate(date)}</div>
                    <div className="entry-hours">⏱️ {hours} hours</div>
                  </div>
                </div>
                <div className="entry-description">
                  <strong>📋 Work Description:</strong> {description}
                </div>
              </div>
            )
          })
        ) : (
          <div className="no-entries">
            <div className="no-entries-icon">📊</div>
            <p>No timesheet entries for this week.</p>
            <p>Log your first entry using the button above!</p>
          </div>
        )}
      </div>
    </div>
  )
}