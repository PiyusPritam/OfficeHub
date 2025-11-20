import React, { useState, useEffect } from 'react'
import { EmployeeService } from '../services/EmployeeService.js'
import './LeaveRequests.css'

export default function LeaveRequests({ user }) {
  const [leaveRequests, setLeaveRequests] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [leaveBalance, setLeaveBalance] = useState({
    vacation: { total: 15, used: 0, remaining: 15 },
    sick: { total: 10, used: 0, remaining: 10 },
    personal: { total: 5, used: 0, remaining: 5 }
  })
  const [formData, setFormData] = useState({
    leave_type: 'vacation',
    start_date: '',
    end_date: '',
    reason: '',
    is_emergency: false
  })

  const employeeService = new EmployeeService()

  useEffect(() => {
    if (user) {
      fetchLeaveRequests()
    }
  }, [user])

  const fetchLeaveRequests = async () => {
    if (!user) return

    try {
      setError(null)

      const data = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_leave_request?sysparm_query=user=${user.sys_id}&sysparm_display_value=all&sysparm_query=ORDERBYDESCsys_created_on`
      )
      
      const requests = data.result || []
      setLeaveRequests(requests)
      
      // Calculate leave balance
      const balance = {
        vacation: { total: 15, used: 0, remaining: 15 },
        sick: { total: 10, used: 0, remaining: 10 },
        personal: { total: 5, used: 0, remaining: 5 }
      }
      
      requests.forEach(request => {
        const status = typeof request.status === 'object' ? request.status.display_value : request.status
        const leaveType = typeof request.leave_type === 'object' ? request.leave_type.display_value : request.leave_type
        const days = typeof request.days_requested === 'object' ? 
          parseInt(request.days_requested.display_value) : 
          parseInt(request.days_requested || 0)
        
        if (status === 'approved' && balance[leaveType]) {
          balance[leaveType].used += days
          balance[leaveType].remaining = balance[leaveType].total - balance[leaveType].used
        }
      })
      
      setLeaveBalance(balance)
    } catch (error) {
      console.error('Error fetching leave requests:', error)
      setError(`Failed to load leave requests: ${error.message}`)
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
      // Calculate days requested
      const startDate = new Date(formData.start_date)
      const endDate = new Date(formData.end_date)
      const timeDiff = endDate.getTime() - startDate.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1

      // Check if sufficient balance
      const currentBalance = leaveBalance[formData.leave_type]
      if (currentBalance && daysDiff > currentBalance.remaining) {
        setError(`Insufficient ${formData.leave_type} balance. You have ${currentBalance.remaining} days remaining.`)
        setLoading(false)
        return
      }

      await employeeService.apiCall('/api/now/table/x_1599224_officehu_leave_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: user.sys_id,
          leave_type: formData.leave_type,
          start_date: formData.start_date,
          end_date: formData.end_date,
          reason: formData.reason,
          is_emergency: formData.is_emergency,
          days_requested: daysDiff,
          status: 'pending'
        })
      })
      
      setFormData({
        leave_type: 'vacation',
        start_date: '',
        end_date: '',
        reason: '',
        is_emergency: false
      })
      setShowForm(false)
      await fetchLeaveRequests()
      alert('Leave request submitted successfully!')
    } catch (error) {
      console.error('Error submitting leave request:', error)
      setError(`Failed to submit leave request: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const calculateDays = () => {
    if (formData.start_date && formData.end_date) {
      const startDate = new Date(formData.start_date)
      const endDate = new Date(formData.end_date)
      const timeDiff = endDate.getTime() - startDate.getTime()
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1
      return daysDiff > 0 ? daysDiff : 0
    }
    return 0
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'status-pending'
      case 'approved': return 'status-approved'
      case 'rejected': return 'status-rejected'
      case 'cancelled': return 'status-cancelled'
      default: return 'status-pending'
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getLeaveTypeIcon = (type) => {
    const icons = {
      vacation: '🏖️',
      sick: '🤒',
      personal: '👤',
      maternity: '👶',
      paternity: '👨‍👶',
      bereavement: '🕊️',
      unpaid: '💼'
    }
    return icons[type] || '📝'
  }

  const getBalancePercentage = (balance) => {
    return (balance.remaining / balance.total) * 100
  }

  const requestedDays = calculateDays()
  const currentBalance = leaveBalance[formData.leave_type]
  const hasEnoughBalance = !currentBalance || requestedDays <= currentBalance.remaining

  if (error) {
    return (
      <div className="leave-requests">
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
    <div className="leave-requests">
      <div className="leave-header">
        <h2 className="leave-title">Leave Management</h2>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? '✕ Cancel' : '+ New Request'}
        </button>
      </div>

      {/* Leave Balance Summary */}
      <div className="leave-balance-summary">
        <h3 className="balance-title">Your Leave Balance</h3>
        <div className="balance-cards">
          {Object.entries(leaveBalance).map(([type, balance]) => (
            <div key={type} className="balance-card">
              <div className="balance-header">
                <span className="balance-type">{getLeaveTypeIcon(type)} {type.charAt(0).toUpperCase() + type.slice(1)}</span>
                <span className="balance-remaining">{balance.remaining}/{balance.total}</span>
              </div>
              <div className="balance-progress">
                <div 
                  className="balance-bar"
                  style={{ 
                    width: `${getBalancePercentage(balance)}%`,
                    backgroundColor: getBalancePercentage(balance) > 30 ? '#22c55e' : 
                                   getBalancePercentage(balance) > 10 ? '#f59e0b' : '#ef4444'
                  }}
                ></div>
              </div>
              <div className="balance-details">
                <span className="balance-used">Used: {balance.used} days</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="card leave-form-card">
          <h3 className="card-title">✉️ Submit Leave Request</h3>
          <form onSubmit={handleSubmit} className="leave-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="leave_type">Leave Type</label>
                <select
                  id="leave_type"
                  value={formData.leave_type}
                  onChange={(e) => setFormData({...formData, leave_type: e.target.value})}
                  required
                >
                  <option value="vacation">🏖️ Vacation</option>
                  <option value="sick">🤒 Sick Leave</option>
                  <option value="personal">👤 Personal Leave</option>
                  <option value="maternity">👶 Maternity Leave</option>
                  <option value="paternity">👨‍👶 Paternity Leave</option>
                  <option value="bereavement">🕊️ Bereavement Leave</option>
                  <option value="unpaid">💼 Unpaid Leave</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.is_emergency}
                    onChange={(e) => setFormData({...formData, is_emergency: e.target.checked})}
                  />
                  <span className="checkbox-text">🚨 Emergency Leave</span>
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start_date">Start Date</label>
                <input
                  type="date"
                  id="start_date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="end_date">End Date</label>
                <input
                  type="date"
                  id="end_date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  required
                />
              </div>
            </div>

            {requestedDays > 0 && (
              <div className="days-summary">
                <div className={`days-info ${hasEnoughBalance ? 'sufficient' : 'insufficient'}`}>
                  <span className="days-requested">
                    📅 Requesting {requestedDays} day{requestedDays !== 1 ? 's' : ''}
                  </span>
                  {currentBalance && (
                    <span className="balance-check">
                      {hasEnoughBalance ? 
                        `✅ Balance sufficient (${currentBalance.remaining} days available)` :
                        `❌ Insufficient balance (${currentBalance.remaining} days available)`
                      }
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="reason">Reason for Leave</label>
              <textarea
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="Please provide details about your leave request..."
                rows="4"
                required
              />
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                disabled={loading || !hasEnoughBalance} 
                className="btn btn-primary"
              >
                {loading ? '⏳ Submitting...' : '📤 Submit Request'}
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

      <div className="leave-requests-list">
        <h3 className="requests-title">📋 Your Leave History</h3>
        {leaveRequests.length > 0 ? (
          leaveRequests.map((request, index) => {
            const leaveType = typeof request.leave_type === 'object' ? request.leave_type.display_value : request.leave_type
            const status = typeof request.status === 'object' ? request.status.display_value : request.status
            const startDate = typeof request.start_date === 'object' ? request.start_date.value : request.start_date
            const endDate = typeof request.end_date === 'object' ? request.end_date.value : request.end_date
            const daysRequested = typeof request.days_requested === 'object' ? request.days_requested.display_value : request.days_requested
            const reason = typeof request.reason === 'object' ? request.reason.display_value : request.reason
            const isEmergency = typeof request.is_emergency === 'object' ? request.is_emergency.display_value : request.is_emergency

            return (
              <div key={index} className={`card leave-request-card ${status}`}>
                <div className="request-header">
                  <div className="request-info">
                    <h4 className="request-type">
                      {getLeaveTypeIcon(leaveType)} {leaveType}
                      {isEmergency === 'true' && <span className="emergency-badge">🚨 Emergency</span>}
                    </h4>
                    <span className={`status-badge ${getStatusBadgeClass(status)}`}>
                      {status === 'pending' && '⏳ '}
                      {status === 'approved' && '✅ '}
                      {status === 'rejected' && '❌ '}
                      {status === 'cancelled' && '🚫 '}
                      {status}
                    </span>
                  </div>
                  <div className="request-dates">
                    <div className="date-range">
                      📅 {formatDate(startDate)} - {formatDate(endDate)}
                    </div>
                    <span className="days-count">({daysRequested} day{daysRequested !== '1' ? 's' : ''})</span>
                  </div>
                </div>
                <div className="request-reason">
                  <strong>📝 Reason:</strong> {reason}
                </div>
                {request.approval_comments && (
                  <div className="approval-comments">
                    <strong>💬 Manager Comments:</strong> {typeof request.approval_comments === 'object' ? 
                      request.approval_comments.display_value : request.approval_comments}
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <div className="no-requests">
            <div className="no-requests-icon">📋</div>
            <p>No leave requests found.</p>
            <p>Submit your first request using the button above!</p>
          </div>
        )}
      </div>
    </div>
  )
}