import React, { useState, useEffect } from 'react'
import { EmployeeService } from '../services/EmployeeService.js'
import './Calendar.css'

export default function Calendar({ user }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState([])
  const [showEventForm, setShowEventForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    event_type: 'meeting',
    location: ''
  })

  const employeeService = new EmployeeService()

  useEffect(() => {
    if (user) {
      fetchEvents()
    }
  }, [user, currentDate])

  const fetchEvents = async () => {
    if (!user) return

    try {
      setError(null)
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      
      const startDate = firstDay.toISOString().split('T')[0]
      const endDate = lastDay.toISOString().split('T')[0]
      
      const data = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_event?sysparm_query=start_date>=${startDate}^start_date<=${endDate}^ORis_company_wide=true&sysparm_display_value=all&sysparm_query=ORDERBYstart_date`
      )
      
      setEvents(data.result || [])
    } catch (error) {
      console.error('Error fetching events:', error)
      setError(`Failed to load events: ${error.message}`)
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
      await employeeService.apiCall('/api/now/table/x_1599224_officehu_event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          start_date: formData.start_date,
          end_date: formData.end_date,
          event_type: formData.event_type,
          location: formData.location,
          organizer: user.sys_id,
          is_company_wide: false
        })
      })
      
      setFormData({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        event_type: 'meeting',
        location: ''
      })
      setShowEventForm(false)
      setSelectedDate(null)
      await fetchEvents()
      alert('Event created successfully!')
    } catch (error) {
      console.error('Error creating event:', error)
      setError(`Failed to create event: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }
    
    return days
  }

  const getEventsForDate = (day) => {
    if (!day) return []
    
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    
    return events.filter(event => {
      const eventStartDate = typeof event.start_date === 'object' ? event.start_date.value : event.start_date
      const eventDate = eventStartDate.split(' ')[0] // Get date part only
      return eventDate === dateString
    })
  }

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  const handleDateClick = (day) => {
    if (!day) return
    
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(clickedDate)
    
    const dateString = clickedDate.toISOString().split('T')[0]
    setFormData({
      ...formData,
      start_date: dateString + 'T09:00',
      end_date: dateString + 'T10:00'
    })
    setShowEventForm(true)
  }

  const getEventTypeIcon = (eventType) => {
    switch (eventType) {
      case 'meeting': return '👥'
      case 'deadline': return '⏰'
      case 'holiday': return '🏖️'
      case 'training': return '📚'
      case 'conference': return '🎤'
      case 'team_event': return '🎉'
      case 'personal': return '👤'
      default: return '📅'
    }
  }

  const formatTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  if (error) {
    return (
      <div className="calendar">
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
    <div className="calendar">
      <div className="calendar-header">
        <h2 className="calendar-title">📅 Calendar</h2>
        <button 
          onClick={() => setShowEventForm(!showEventForm)}
          className="btn btn-primary"
        >
          {showEventForm ? '✕ Cancel' : '+ New Event'}
        </button>
      </div>

      {showEventForm && (
        <div className="card event-form-card">
          <h3 className="card-title">📝 Create New Event</h3>
          <form onSubmit={handleSubmit} className="event-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter event title"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="event_type">Event Type</label>
                <select
                  id="event_type"
                  value={formData.event_type}
                  onChange={(e) => setFormData({...formData, event_type: e.target.value})}
                  required
                >
                  <option value="meeting">👥 Meeting</option>
                  <option value="deadline">⏰ Deadline</option>
                  <option value="training">📚 Training</option>
                  <option value="conference">🎤 Conference</option>
                  <option value="team_event">🎉 Team Event</option>
                  <option value="personal">👤 Personal</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="start_date">Start Date & Time</label>
                <input
                  type="datetime-local"
                  id="start_date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="end_date">End Date & Time</label>
                <input
                  type="datetime-local"
                  id="end_date"
                  value={formData.end_date}
                  onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Meeting room, address, or online"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Event details and agenda..."
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? '⏳ Creating...' : '📅 Create Event'}
              </button>
              <button 
                type="button" 
                onClick={() => setShowEventForm(false)} 
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="calendar-container">
        <div className="calendar-navigation">
          <button onClick={() => changeMonth(-1)} className="btn btn-secondary">
            ← Previous
          </button>
          <h3 className="current-month">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button onClick={() => changeMonth(1)} className="btn btn-secondary">
            Next →
          </button>
        </div>

        <div className="calendar-grid">
          <div className="calendar-header-row">
            {dayNames.map(day => (
              <div key={day} className="calendar-header-cell">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-body">
            {getDaysInMonth(currentDate).map((day, index) => {
              const dayEvents = getEventsForDate(day)
              const isToday = day && 
                currentDate.getFullYear() === new Date().getFullYear() &&
                currentDate.getMonth() === new Date().getMonth() &&
                day === new Date().getDate()

              return (
                <div
                  key={index}
                  className={`calendar-cell ${day ? 'has-day' : 'empty'} ${isToday ? 'today' : ''} ${dayEvents.length > 0 ? 'has-events' : ''}`}
                  onClick={() => handleDateClick(day)}
                >
                  {day && (
                    <>
                      <span className="day-number">{day}</span>
                      {dayEvents.length > 0 && (
                        <div className="day-events">
                          {dayEvents.slice(0, 2).map((event, eventIndex) => {
                            const title = typeof event.title === 'object' ? event.title.display_value : event.title
                            const eventType = typeof event.event_type === 'object' ? event.event_type.display_value : event.event_type
                            const startDate = typeof event.start_date === 'object' ? event.start_date.value : event.start_date

                            return (
                              <div key={eventIndex} className={`event-item ${eventType}`}>
                                <span className="event-icon">
                                  {getEventTypeIcon(eventType)}
                                </span>
                                <span className="event-title">{title}</span>
                                <span className="event-time">
                                  {formatTime(startDate)}
                                </span>
                              </div>
                            )
                          })}
                          {dayEvents.length > 2 && (
                            <div className="more-events">+{dayEvents.length - 2} more</div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}