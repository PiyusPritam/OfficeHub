import React, { useState } from 'react'
import './Profile.css'

export default function Profile({ currentUser }) {
  const [activeTab, setActiveTab] = useState('personal')
  
  if (!currentUser) {
    return (
      <div className="profile">
        <div className="error-message">
          <h3>⚠️ Error</h3>
          <p>User information not available</p>
        </div>
      </div>
    )
  }

  // Extract values from ServiceNow objects or use direct values
  const extractValue = (field) => {
    if (!field) return ''
    return typeof field === 'object' ? (field.display_value || field.value || '') : field
  }

  const firstName = extractValue(currentUser.first_name)
  const lastName = extractValue(currentUser.last_name)
  const email = extractValue(currentUser.email) || extractValue(currentUser.user_name)
  const userName = extractValue(currentUser.user_name)
  const fullName = extractValue(currentUser.full_name) || `${firstName} ${lastName}`.trim()
  const title = extractValue(currentUser.title)
  const sysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-avatar-large">
          {(firstName || userName || 'U').charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1 className="profile-name">
            {fullName || userName || 'Unknown User'}
          </h1>
          <p className="profile-email">{email}</p>
          <div className="profile-badges">
            <span className="badge active">Active Employee</span>
            <span className="badge servicenow">ServiceNow User</span>
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <button
          className={`profile-tab ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          👤 Personal Info
        </button>
        <button
          className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          ⚙️ Settings
        </button>
        <button
          className={`profile-tab ${activeTab === 'work' ? 'active' : ''}`}
          onClick={() => setActiveTab('work')}
        >
          💼 Work Info
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'personal' && (
          <div className="card profile-personal">
            <h3 className="card-title">Personal Information</h3>
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Full Name:</span>
                <span className="detail-value">
                  {fullName || 'Not provided'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">First Name:</span>
                <span className="detail-value">{firstName || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Name:</span>
                <span className="detail-value">{lastName || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{email || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">User ID:</span>
                <span className="detail-value">{userName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Title:</span>
                <span className="detail-value">{title || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ServiceNow ID:</span>
                <span className="detail-value">{sysId}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="card profile-settings">
            <h3 className="card-title">Preferences & Settings</h3>
            <div className="settings-section">
              <h4>Notifications</h4>
              <div className="setting-item">
                <label className="setting-label">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  Email notifications for leave approvals
                </label>
              </div>
              <div className="setting-item">
                <label className="setting-label">
                  <input type="checkbox" defaultChecked />
                  <span className="checkmark"></span>
                  Browser notifications for calendar events
                </label>
              </div>
              <div className="setting-item">
                <label className="setting-label">
                  <input type="checkbox" />
                  <span className="checkmark"></span>
                  Weekly timesheet reminders
                </label>
              </div>
            </div>

            <div className="settings-section">
              <h4>Display</h4>
              <div className="setting-item">
                <label className="setting-label">Theme Preference:</label>
                <select className="setting-select">
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="auto">Auto (System)</option>
                </select>
              </div>
              <div className="setting-item">
                <label className="setting-label">Language:</label>
                <select className="setting-select">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'work' && (
          <div className="card profile-work">
            <h3 className="card-title">Work Information</h3>
            <div className="work-stats">
              <div className="stat-card">
                <div className="stat-icon">⏰</div>
                <div className="stat-info">
                  <h4>This Week</h4>
                  <p>32.5 hours worked</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏖️</div>
                <div className="stat-info">
                  <h4>Leave Balance</h4>
                  <p>15 days remaining</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🎯</div>
                <div className="stat-info">
                  <h4>Punctuality</h4>
                  <p>98% on time</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏆</div>
                <div className="stat-info">
                  <h4>Achievements</h4>
                  <p>5 badges earned</p>
                </div>
              </div>
            </div>

            <div className="work-preferences">
              <h4>Work Preferences</h4>
              <div className="setting-item">
                <label className="setting-label">Default Work Location:</label>
                <select className="setting-select">
                  <option value="office">🏢 Office</option>
                  <option value="home">🏠 Home</option>
                  <option value="hybrid">🔄 Hybrid</option>
                  <option value="field">🌍 Field</option>
                </select>
              </div>
              <div className="setting-item">
                <label className="setting-label">Preferred Work Hours:</label>
                <select className="setting-select">
                  <option value="9to5">9:00 AM - 5:00 PM</option>
                  <option value="8to4">8:00 AM - 4:00 PM</option>
                  <option value="10to6">10:00 AM - 6:00 PM</option>
                  <option value="flexible">Flexible Hours</option>
                </select>
              </div>
            </div>

            <div className="work-details">
              <h4>Employment Details</h4>
              <div className="detail-item">
                <span className="detail-label">Employee ID:</span>
                <span className="detail-value">{userName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Department:</span>
                <span className="detail-value">
                  {extractValue(currentUser.department) || 'Not specified'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Manager:</span>
                <span className="detail-value">
                  {extractValue(currentUser.manager) || 'Not assigned'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Location:</span>
                <span className="detail-value">
                  {extractValue(currentUser.location) || 'Not specified'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}