import React, { useState, useEffect } from 'react'
import { EmployeeService } from '../../services/EmployeeService.js'
import './TeamCollaboration.css'

export default function TeamCollaboration({ currentUser }) {
  const [teamData, setTeamData] = useState({
    teamMembers: [],
    todaySchedule: [],
    availabilityStatus: {},
    coverageRequests: [],
    myTeam: 'General'
  })
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('availability')
  const [newCoverageRequest, setNewCoverageRequest] = useState({
    coverage_date: '',
    start_time: '',
    end_time: '',
    reason: '',
    urgency: 'medium'
  })
  const [showCoverageForm, setShowCoverageForm] = useState(false)

  const employeeService = new EmployeeService()

  useEffect(() => {
    if (currentUser) {
      fetchTeamData()
    }
  }, [currentUser])

  const fetchTeamData = async () => {
    try {
      setLoading(true)
      
      // Fetch team schedule for today
      const today = new Date().toISOString().split('T')[0]
      const scheduleResponse = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_team_schedule?sysparm_query=start_time>=javascript:gs.dateGenerate('${today}','00:00:00')^start_time<=javascript:gs.dateGenerate('${today}','23:59:59')&sysparm_display_value=all&sysparm_limit=50`
      )

      // Fetch attendance for today to show who's in
      const attendanceResponse = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_attendance?sysparm_query=date=${today}&sysparm_display_value=all&sysparm_limit=100`
      )

      // Get all active users for team directory
      const usersResponse = await employeeService.apiCall(
        `/api/now/table/sys_user?sysparm_query=active=true&sysparm_display_value=all&sysparm_limit=100&sysparm_fields=sys_id,first_name,last_name,user_name,email,title,department,phone`
      )

      // Fetch open coverage requests
      const coverageResponse = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_coverage_request?sysparm_query=status=open^coverage_date>=${today}&sysparm_display_value=all&sysparm_limit=20&sysparm_query=ORDERBYcoverage_date`
      )

      setTeamData({
        teamMembers: usersResponse.result || [],
        todaySchedule: scheduleResponse.result || [],
        availabilityStatus: processAvailabilityData(attendanceResponse.result || []),
        coverageRequests: coverageResponse.result || [],
        myTeam: 'General' // Could be dynamically determined
      })

    } catch (error) {
      console.error('Failed to fetch team data:', error)
    } finally {
      setLoading(false)
    }
  }

  const processAvailabilityData = (attendanceData) => {
    const availability = {}
    
    attendanceData.forEach(record => {
      const userId = typeof record.user === 'object' ? record.user.value : record.user
      const clockIn = typeof record.clock_in === 'object' ? record.clock_in.display_value : record.clock_in
      const clockOut = typeof record.clock_out === 'object' ? record.clock_out.display_value : record.clock_out
      const status = typeof record.status === 'object' ? record.status.display_value : record.status
      const workLocation = typeof record.work_location === 'object' ? record.work_location.display_value : record.work_location

      availability[userId] = {
        status: status || 'absent',
        clockIn,
        clockOut,
        workLocation: workLocation || 'unknown',
        isOnline: clockIn && !clockOut
      }
    })

    return availability
  }

  const getAvailabilityIcon = (status) => {
    const icons = {
      'clocked_in': '🟢',
      'clocked_out': '🔴',
      'break': '🟡',
      'lunch': '🍽️',
      'absent': '⚫'
    }
    return icons[status] || '⚫'
  }

  const getLocationIcon = (location) => {
    const icons = {
      'office': '🏢',
      'home': '🏠',
      'hybrid': '🔄',
      'field': '🚗'
    }
    return icons[location] || '📍'
  }

  const submitCoverageRequest = async (e) => {
    e.preventDefault()
    
    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id

      await employeeService.apiCall('/api/now/table/x_1599224_officehu_coverage_request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify({
          requester: userSysId,
          coverage_date: newCoverageRequest.coverage_date,
          start_time: newCoverageRequest.start_time,
          end_time: newCoverageRequest.end_time,
          reason: newCoverageRequest.reason,
          urgency: newCoverageRequest.urgency,
          created_at: new Date().toISOString(),
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days
        })
      })

      setNewCoverageRequest({
        coverage_date: '',
        start_time: '',
        end_time: '',
        reason: '',
        urgency: 'medium'
      })
      setShowCoverageForm(false)
      await fetchTeamData()
      alert('Coverage request sent to team members!')

    } catch (error) {
      console.error('Failed to submit coverage request:', error)
      alert('Failed to send coverage request')
    }
  }

  const volunteerForCoverage = async (requestId) => {
    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      const covReqId = typeof requestId === 'object' ? requestId.value : requestId

      await employeeService.apiCall(`/api/now/table/x_1599224_officehu_coverage_request/${covReqId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify({
          volunteer: userSysId,
          volunteered_at: new Date().toISOString(),
          status: 'assigned'
        })
      })

      await fetchTeamData()
      alert('Thank you for volunteering! The requester has been notified.')

    } catch (error) {
      console.error('Failed to volunteer for coverage:', error)
      alert('Failed to volunteer for coverage')
    }
  }

  const formatTime = (timeString) => {
    if (!timeString) return 'Not set'
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set'
    return new Date(typeof dateString === 'object' ? dateString.value : dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="team-collaboration">
        <div className="loading">Loading team data...</div>
      </div>
    )
  }

  return (
    <div className="team-collaboration">
      <div className="team-header">
        <h2>Team Collaboration Hub</h2>
        <div className="team-actions">
          <button 
            className="request-coverage-btn"
            onClick={() => setShowCoverageForm(!showCoverageForm)}
          >
            🆘 Request Coverage
          </button>
        </div>
      </div>

      <div className="team-tabs">
        <button 
          className={activeTab === 'availability' ? 'active' : ''}
          onClick={() => setActiveTab('availability')}
        >
          Team Status
        </button>
        <button 
          className={activeTab === 'schedule' ? 'active' : ''}
          onClick={() => setActiveTab('schedule')}
        >
          Today's Schedule
        </button>
        <button 
          className={activeTab === 'coverage' ? 'active' : ''}
          onClick={() => setActiveTab('coverage')}
        >
          Coverage Requests {teamData.coverageRequests.length > 0 && <span className="tab-badge">{teamData.coverageRequests.length}</span>}
        </button>
        <button 
          className={activeTab === 'directory' ? 'active' : ''}
          onClick={() => setActiveTab('directory')}
        >
          Team Directory
        </button>
      </div>

      {/* Coverage Request Form */}
      {showCoverageForm && (
        <div className="coverage-form-overlay">
          <form onSubmit={submitCoverageRequest} className="coverage-form">
            <h3>Request Coverage</h3>
            <div className="form-group">
              <label>Coverage Date</label>
              <input
                type="date"
                value={newCoverageRequest.coverage_date}
                onChange={(e) => setNewCoverageRequest(prev => ({ ...prev, coverage_date: e.target.value }))}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Time</label>
                <input
                  type="time"
                  value={newCoverageRequest.start_time}
                  onChange={(e) => setNewCoverageRequest(prev => ({ ...prev, start_time: e.target.value }))}
                  required
                />
              </div>
              <div className="form-group">
                <label>End Time</label>
                <input
                  type="time"
                  value={newCoverageRequest.end_time}
                  onChange={(e) => setNewCoverageRequest(prev => ({ ...prev, end_time: e.target.value }))}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Urgency</label>
              <select
                value={newCoverageRequest.urgency}
                onChange={(e) => setNewCoverageRequest(prev => ({ ...prev, urgency: e.target.value }))}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="form-group">
              <label>Reason</label>
              <textarea
                value={newCoverageRequest.reason}
                onChange={(e) => setNewCoverageRequest(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Please explain why you need coverage..."
                rows={3}
                required
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setShowCoverageForm(false)} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Send Request
              </button>
            </div>
          </form>
        </div>
      )}

      {activeTab === 'availability' && (
        <div className="availability-view">
          <div className="availability-summary">
            <div className="summary-card">
              <span className="summary-icon">👥</span>
              <div className="summary-info">
                <div className="summary-number">{teamData.teamMembers.length}</div>
                <div className="summary-label">Team Members</div>
              </div>
            </div>
            <div className="summary-card">
              <span className="summary-icon">🟢</span>
              <div className="summary-info">
                <div className="summary-number">
                  {Object.values(teamData.availabilityStatus).filter(status => status.isOnline).length}
                </div>
                <div className="summary-label">Currently Online</div>
              </div>
            </div>
            <div className="summary-card">
              <span className="summary-icon">🏢</span>
              <div className="summary-info">
                <div className="summary-number">
                  {Object.values(teamData.availabilityStatus).filter(status => status.workLocation === 'office').length}
                </div>
                <div className="summary-label">In Office</div>
              </div>
            </div>
            <div className="summary-card">
              <span className="summary-icon">🏠</span>
              <div className="summary-info">
                <div className="summary-number">
                  {Object.values(teamData.availabilityStatus).filter(status => status.workLocation === 'home').length}
                </div>
                <div className="summary-label">Working Remote</div>
              </div>
            </div>
          </div>

          <div className="team-availability-grid">
            {teamData.teamMembers.map(member => {
              const memberId = typeof member.sys_id === 'object' ? member.sys_id.value : member.sys_id
              const firstName = typeof member.first_name === 'object' ? member.first_name.display_value : member.first_name
              const lastName = typeof member.last_name === 'object' ? member.last_name.display_value : member.last_name
              const title = typeof member.title === 'object' ? member.title.display_value : member.title
              const department = typeof member.department === 'object' ? member.department.display_value : member.department
              const availability = teamData.availabilityStatus[memberId] || { status: 'absent', workLocation: 'unknown', isOnline: false }

              return (
                <div key={memberId} className={`availability-card ${availability.isOnline ? 'online' : 'offline'}`}>
                  <div className="member-avatar">
                    {firstName?.charAt(0)}{lastName?.charAt(0)}
                  </div>
                  <div className="member-info">
                    <div className="member-name">{firstName} {lastName}</div>
                    <div className="member-title">{title || 'Employee'}</div>
                    <div className="member-department">{department || 'General'}</div>
                    <div className="member-status">
                      <span className="status-icon">{getAvailabilityIcon(availability.status)}</span>
                      <span className="status-text">{availability.status?.replace('_', ' ') || 'Absent'}</span>
                    </div>
                    <div className="member-location">
                      <span className="location-icon">{getLocationIcon(availability.workLocation)}</span>
                      <span className="location-text">{availability.workLocation || 'Unknown'}</span>
                    </div>
                    {availability.clockIn && (
                      <div className="member-times">
                        <div>In: {formatTime(availability.clockIn)}</div>
                        {availability.clockOut && <div>Out: {formatTime(availability.clockOut)}</div>}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'coverage' && (
        <div className="coverage-view">
          <h3>Open Coverage Requests</h3>
          {teamData.coverageRequests.length === 0 ? (
            <div className="no-requests">
              <span className="no-requests-icon">✅</span>
              <p>No coverage requests at the moment</p>
              <p className="no-requests-subtitle">Great teamwork! Everyone's shifts are covered.</p>
            </div>
          ) : (
            <div className="coverage-list">
              {teamData.coverageRequests.map(request => {
                const requestId = typeof request.sys_id === 'object' ? request.sys_id.value : request.sys_id
                const requester = typeof request.requester === 'object' ? request.requester.display_value : request.requester
                const coverageDate = typeof request.coverage_date === 'object' ? request.coverage_date.display_value : request.coverage_date
                const startTime = typeof request.start_time === 'object' ? request.start_time.display_value : request.start_time
                const endTime = typeof request.end_time === 'object' ? request.end_time.display_value : request.end_time
                const reason = typeof request.reason === 'object' ? request.reason.display_value : request.reason
                const urgency = typeof request.urgency === 'object' ? request.urgency.display_value : request.urgency
                const currentUserId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
                const requesterId = typeof request.requester === 'object' ? request.requester.value : request.requester

                return (
                  <div key={requestId} className={`coverage-request ${urgency}`}>
                    <div className="request-header">
                      <div className="requester-info">
                        <span className="requester-name">{requester}</span>
                        <span className={`urgency-badge ${urgency}`}>{urgency.toUpperCase()}</span>
                      </div>
                      <div className="request-date">{formatDate(coverageDate)}</div>
                    </div>
                    <div className="request-details">
                      <div className="request-time">
                        <span className="time-icon">⏰</span>
                        {formatTime(startTime)} - {formatTime(endTime)}
                      </div>
                      <div className="request-reason">
                        <span className="reason-icon">💬</span>
                        {reason}
                      </div>
                    </div>
                    {currentUserId !== requesterId && (
                      <div className="request-actions">
                        <button 
                          className="volunteer-btn"
                          onClick={() => volunteerForCoverage(requestId)}
                        >
                          🙋 I'll Cover This
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'schedule' && (
        <div className="schedule-view">
          <h3>Today's Team Schedule</h3>
          {teamData.todaySchedule.length === 0 ? (
            <div className="no-schedule">
              <span className="no-schedule-icon">📅</span>
              <p>No scheduled shifts for today</p>
            </div>
          ) : (
            <div className="schedule-list">
              {teamData.todaySchedule.map(schedule => {
                const scheduleId = typeof schedule.sys_id === 'object' ? schedule.sys_id.value : schedule.sys_id
                const user = typeof schedule.user === 'object' ? schedule.user.display_value : schedule.user
                const team = typeof schedule.team === 'object' ? schedule.team.display_value : schedule.team
                const startTime = typeof schedule.start_time === 'object' ? schedule.start_time.display_value : schedule.start_time
                const endTime = typeof schedule.end_time === 'object' ? schedule.end_time.display_value : schedule.end_time
                const status = typeof schedule.status === 'object' ? schedule.status.display_value : schedule.status
                const shiftType = typeof schedule.shift_type === 'object' ? schedule.shift_type.display_value : schedule.shift_type

                return (
                  <div key={scheduleId} className={`schedule-item ${status}`}>
                    <div className="schedule-time">
                      <div className="time-range">
                        {formatTime(startTime)} - {formatTime(endTime)}
                      </div>
                      <div className="shift-type">{shiftType || 'Regular'}</div>
                    </div>
                    <div className="schedule-details">
                      <div className="schedule-user">{user}</div>
                      <div className="schedule-team">{team || 'General'}</div>
                      <div className={`schedule-status ${status}`}>
                        {status?.replace('_', ' ') || 'Scheduled'}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'directory' && (
        <div className="directory-view">
          <h3>Team Directory</h3>
          <div className="directory-list">
            {teamData.teamMembers.map(member => {
              const memberId = typeof member.sys_id === 'object' ? member.sys_id.value : member.sys_id
              const firstName = typeof member.first_name === 'object' ? member.first_name.display_value : member.first_name
              const lastName = typeof member.last_name === 'object' ? member.last_name.display_value : member.last_name
              const email = typeof member.email === 'object' ? member.email.display_value : member.email
              const title = typeof member.title === 'object' ? member.title.display_value : member.title
              const department = typeof member.department === 'object' ? member.department.display_value : member.department
              const phone = typeof member.phone === 'object' ? member.phone.display_value : member.phone

              return (
                <div key={memberId} className="directory-card">
                  <div className="directory-avatar">
                    {firstName?.charAt(0)}{lastName?.charAt(0)}
                  </div>
                  <div className="directory-info">
                    <div className="directory-name">{firstName} {lastName}</div>
                    <div className="directory-title">{title || 'Employee'}</div>
                    <div className="directory-department">{department || 'General'}</div>
                    <div className="directory-contacts">
                      {email && (
                        <a href={`mailto:${email}`} className="contact-link">
                          📧 {email}
                        </a>
                      )}
                      {phone && (
                        <a href={`tel:${phone}`} className="contact-link">
                          📞 {phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}