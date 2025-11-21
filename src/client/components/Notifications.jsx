import React, { useState, useEffect } from 'react'
import { EmployeeService } from '../services/EmployeeService.js'
import './Notifications.css'

export default function Notifications({ currentUser, onNavigate }) {
  const [notifications, setNotifications] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  const employeeService = new EmployeeService()

  useEffect(() => {
    if (currentUser) {
      fetchNotifications()
    }
  }, [currentUser, filter])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id

      let query = `user=${userSysId}`
      if (filter !== 'all') {
        if (filter === 'unread') {
          query += '^is_read=false'
        } else {
          query += `^notification_type=${filter}`
        }
      }

      const response = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_notification?sysparm_query=${query}&sysparm_limit=50&sysparm_display_value=all&sysparm_query=ORDERBYDESCsent_at`
      )

      setNotifications(response.result || [])
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationId) => {
    try {
      const sysId = typeof notificationId === 'object' ? notificationId.value : notificationId

      await employeeService.apiCall(`/api/now/table/x_1599224_officehu_notification/${sysId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify({
          is_read: true,
          read_at: new Date().toISOString()
        })
      })

      // Update local state
      setNotifications(prev => prev.map(notif => {
        const currentId = typeof notif.sys_id === 'object' ? notif.sys_id.value : notif.sys_id
        if (currentId === sysId) {
          return { ...notif, is_read: { display_value: 'true', value: 'true' } }
        }
        return notif
      }))
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(notif => {
      const isRead = typeof notif.is_read === 'object' ? notif.is_read.display_value : notif.is_read
      return isRead === 'false' || isRead === false
    })

    for (const notif of unreadNotifications) {
      const sysId = typeof notif.sys_id === 'object' ? notif.sys_id.value : notif.sys_id
      await markAsRead(sysId)
    }

    await fetchNotifications()
  }

  const handleNotificationClick = (notification) => {
    const isRead = typeof notification.is_read === 'object' ? notification.is_read.display_value : notification.is_read
    if (isRead === 'false' || isRead === false) {
      const notifId = typeof notification.sys_id === 'object' ? notification.sys_id.value : notification.sys_id
      markAsRead(notifId)
    }

    // Handle action URL if present
    const actionUrl = typeof notification.action_url === 'object' ? notification.action_url.display_value : notification.action_url
    if (actionUrl) {
      if (actionUrl.includes('leave')) {
        onNavigate?.('leave')
      } else if (actionUrl.includes('timesheet')) {
        onNavigate?.('timesheets')
      } else if (actionUrl.includes('calendar')) {
        onNavigate?.('calendar')
      } else if (actionUrl.includes('analytics')) {
        onNavigate?.('analytics')
      }
    }
  }

  const getNotificationIcon = (type) => {
    const typeValue = typeof type === 'object' ? type.display_value : type
    const icons = {
      'reminder': '⏰',
      'alert': '🔔',
      'achievement': '🏆',
      'approval_request': '📋',
      'deadline_warning': '⚠️',
      'overtime_alert': '🌙',
      'leave_balance': '🏖️',
      'birthday': '🎂',
      'anniversary': '🎉',
      'timesheet_reminder': '📝'
    }
    return icons[typeValue] || '📢'
  }

  const getPriorityColor = (priority) => {
    const priorityValue = typeof priority === 'object' ? priority.display_value : priority
    const colors = {
      'low': 'priority-low',
      'medium': 'priority-medium', 
      'high': 'priority-high',
      'urgent': 'priority-urgent'
    }
    return colors[priorityValue] || 'priority-medium'
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(typeof dateString === 'object' ? dateString.value : dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 5) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }

  const getUnreadCount = () => {
    return notifications.filter(notif => {
      const isRead = typeof notif.is_read === 'object' ? notif.is_read.display_value : notif.is_read
      return isRead === 'false' || isRead === false
    }).length
  }

  const getNotificationsByPriority = () => {
    const priorityOrder = { 'urgent': 0, 'high': 1, 'medium': 2, 'low': 3 }
    return notifications.sort((a, b) => {
      const priorityA = typeof a.priority === 'object' ? a.priority.display_value : a.priority
      const priorityB = typeof b.priority === 'object' ? b.priority.display_value : b.priority
      return priorityOrder[priorityA] - priorityOrder[priorityB]
    })
  }

  if (loading) {
    return (
      <div className="notifications-container">
        <div className="loading">Loading notifications...</div>
      </div>
    )
  }

  const sortedNotifications = getNotificationsByPriority()

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Smart Notifications {getUnreadCount() > 0 && <span className="unread-badge">{getUnreadCount()}</span>}</h2>
        <div className="notifications-actions">
          {getUnreadCount() > 0 && (
            <button onClick={markAllAsRead} className="mark-all-read-btn">
              Mark All Read
            </button>
          )}
        </div>
      </div>

      <div className="notifications-filters">
        <button 
          className={filter === 'all' ? 'active' : ''} 
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </button>
        <button 
          className={filter === 'unread' ? 'active' : ''} 
          onClick={() => setFilter('unread')}
        >
          Unread ({getUnreadCount()})
        </button>
        <button 
          className={filter === 'urgent' ? 'active' : ''} 
          onClick={() => setFilter('urgent')}
        >
          Urgent
        </button>
        <button 
          className={filter === 'achievement' ? 'active' : ''} 
          onClick={() => setFilter('achievement')}
        >
          Achievements
        </button>
        <button 
          className={filter === 'reminder' ? 'active' : ''} 
          onClick={() => setFilter('reminder')}
        >
          Reminders
        </button>
      </div>

      <div className="notifications-list">
        {sortedNotifications.length === 0 ? (
          <div className="no-notifications">
            <span className="no-notifications-icon">📭</span>
            <p>No notifications found</p>
            <p className="no-notifications-subtitle">We'll notify you when something important happens!</p>
          </div>
        ) : (
          sortedNotifications.map((notification) => {
            const isRead = typeof notification.is_read === 'object' ? notification.is_read.display_value : notification.is_read
            const title = typeof notification.title === 'object' ? notification.title.display_value : notification.title
            const message = typeof notification.message === 'object' ? notification.message.display_value : notification.message
            const notificationType = typeof notification.notification_type === 'object' ? notification.notification_type.display_value : notification.notification_type
            const priority = typeof notification.priority === 'object' ? notification.priority.display_value : notification.priority
            const sentAt = typeof notification.sent_at === 'object' ? notification.sent_at.value : notification.sent_at

            return (
              <div
                key={typeof notification.sys_id === 'object' ? notification.sys_id.value : notification.sys_id}
                className={`notification-item ${isRead === 'false' || isRead === false ? 'unread' : 'read'} ${getPriorityColor(priority)}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notificationType)}
                </div>
                <div className="notification-content">
                  <div className="notification-header">
                    <h4 className="notification-title">{title}</h4>
                    <span className="notification-time">{formatDate(sentAt)}</span>
                  </div>
                  <p className="notification-message">{message}</p>
                  <div className="notification-meta">
                    <span className={`notification-type ${notificationType}`}>
                      {notificationType?.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className={`notification-priority ${getPriorityColor(priority)}`}>
                      {priority?.toUpperCase()}
                    </span>
                  </div>
                </div>
                {(isRead === 'false' || isRead === false) && (
                  <div className="unread-indicator"></div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}