import React, { useState, useEffect } from 'react'
import './ActivityTracker.css'

const ActivityTracker = () => {
    const [activityForm, setActivityForm] = useState({
        activity_type: '',
        activity_value: '',
        activity_date: new Date().toISOString().slice(0, 16),
        device_source: 'manual',
        notes: '',
        challenge_participation: ''
    })
    
    const [activeChallenges, setActiveChallenges] = useState([])
    const [recentActivities, setRecentActivities] = useState([])
    const [loading, setLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        fetchActiveChallenges()
        fetchRecentActivities()
    }, [])

    const fetchActiveChallenges = async () => {
        try {
            const response = await fetch('/api/x_1599224_officehu/wellness/challenges/my-active')
            if (response.ok) {
                const data = await response.json()
                setActiveChallenges(data.result || [])
            }
        } catch (error) {
            console.error('Error fetching challenges:', error)
        }
    }

    const fetchRecentActivities = async () => {
        try {
            const response = await fetch('/api/x_1599224_officehu/wellness/activities/recent?limit=5')
            if (response.ok) {
                const data = await response.json()
                setRecentActivities(data.result || [])
            }
        } catch (error) {
            console.error('Error fetching activities:', error)
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setActivityForm(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/x_1599224_officehu/wellness/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(activityForm)
            })

            if (response.ok) {
                setShowSuccess(true)
                setActivityForm({
                    activity_type: '',
                    activity_value: '',
                    activity_date: new Date().toISOString().slice(0, 16),
                    device_source: 'manual',
                    notes: '',
                    challenge_participation: ''
                })
                fetchRecentActivities()
                
                setTimeout(() => setShowSuccess(false), 3000)
            } else {
                throw new Error('Failed to log activity')
            }
        } catch (error) {
            console.error('Error logging activity:', error)
            alert('Failed to log activity. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const getActivityUnit = (activityType) => {
        const units = {
            steps: 'steps',
            exercise: 'minutes',
            meditation: 'minutes',
            water_intake: 'glasses',
            sleep: 'hours',
            yoga: 'minutes',
            walking: 'minutes',
            cycling: 'minutes',
            running: 'minutes',
            stretching: 'minutes'
        }
        return units[activityType] || 'units'
    }

    const getExpectedPoints = (activityType, value) => {
        if (!activityType || !value) return 0
        
        const numValue = parseFloat(value)
        let points = 0

        switch (activityType) {
            case 'steps':
                points = Math.min(Math.floor(numValue / 100), 100)
                break
            case 'exercise':
                points = Math.min(numValue * 2, 120)
                break
            case 'meditation':
                points = Math.min(numValue * 3, 90)
                break
            case 'water_intake':
                points = Math.min(numValue * 5, 40)
                break
            case 'sleep':
                if (numValue >= 7 && numValue <= 9) {
                    points = 50
                } else if (numValue >= 6 && numValue <= 10) {
                    points = 30
                } else {
                    points = 10
                }
                break
            default:
                points = Math.min(numValue * 2, 100)
        }

        if (activityForm.device_source !== 'manual') {
            points = Math.floor(points * 1.1)
        }

        return points
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="activity-tracker">
            {/* Header */}
            <div className="tracker-header">
                <h1>📝 Log Wellness Activity</h1>
                <p>Track your wellness activities and earn points</p>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className="success-banner">
                    <div className="success-content">
                        <span className="success-icon">🎉</span>
                        <div>
                            <strong>Activity Logged Successfully!</strong>
                            <p>You earned {getExpectedPoints(activityForm.activity_type, activityForm.activity_value)} points</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="tracker-content">
                {/* Activity Form */}
                <div className="activity-form-card">
                    <h2>Add New Activity</h2>
                    <form onSubmit={handleSubmit} className="activity-form">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="activity_type">Activity Type *</label>
                                <select
                                    id="activity_type"
                                    name="activity_type"
                                    value={activityForm.activity_type}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Select activity type</option>
                                    <option value="steps">👣 Steps</option>
                                    <option value="exercise">💪 Exercise</option>
                                    <option value="meditation">🧘 Meditation</option>
                                    <option value="water_intake">💧 Water Intake</option>
                                    <option value="sleep">😴 Sleep</option>
                                    <option value="yoga">🧘‍♀️ Yoga</option>
                                    <option value="walking">🚶 Walking</option>
                                    <option value="cycling">🚴 Cycling</option>
                                    <option value="running">🏃 Running</option>
                                    <option value="stretching">🤸 Stretching</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="activity_value">
                                    Value * 
                                    {activityForm.activity_type && (
                                        <span className="unit-hint">({getActivityUnit(activityForm.activity_type)})</span>
                                    )}
                                </label>
                                <input
                                    type="number"
                                    id="activity_value"
                                    name="activity_value"
                                    value={activityForm.activity_value}
                                    onChange={handleInputChange}
                                    placeholder={`Enter ${getActivityUnit(activityForm.activity_type)}`}
                                    min="0"
                                    step="0.1"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="activity_date">Date & Time *</label>
                                <input
                                    type="datetime-local"
                                    id="activity_date"
                                    name="activity_date"
                                    value={activityForm.activity_date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="device_source">Source</label>
                                <select
                                    id="device_source"
                                    name="device_source"
                                    value={activityForm.device_source}
                                    onChange={handleInputChange}
                                >
                                    <option value="manual">📝 Manual Entry</option>
                                    <option value="fitbit">⌚ Fitbit</option>
                                    <option value="apple_watch">🍎 Apple Watch</option>
                                    <option value="google_fit">🏃‍♂️ Google Fit</option>
                                    <option value="samsung_health">📱 Samsung Health</option>
                                    <option value="garmin">🏃 Garmin</option>
                                    <option value="other">🔗 Other Device</option>
                                </select>
                            </div>

                            {activeChallenges.length > 0 && (
                                <div className="form-group full-width">
                                    <label htmlFor="challenge_participation">Link to Challenge (Optional)</label>
                                    <select
                                        id="challenge_participation"
                                        name="challenge_participation"
                                        value={activityForm.challenge_participation}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">No challenge</option>
                                        {activeChallenges.map(challenge => (
                                            <option key={challenge.sys_id} value={challenge.sys_id}>
                                                🏆 {challenge.challenge_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            <div className="form-group full-width">
                                <label htmlFor="notes">Notes (Optional)</label>
                                <textarea
                                    id="notes"
                                    name="notes"
                                    value={activityForm.notes}
                                    onChange={handleInputChange}
                                    placeholder="Add any notes about your activity..."
                                    rows="3"
                                />
                            </div>
                        </div>

                        {/* Points Preview */}
                        {activityForm.activity_type && activityForm.activity_value && (
                            <div className="points-preview">
                                <div className="points-card">
                                    <span className="points-label">Expected Points:</span>
                                    <span className="points-value">
                                        +{getExpectedPoints(activityForm.activity_type, activityForm.activity_value)} pts
                                    </span>
                                    {activityForm.device_source !== 'manual' && (
                                        <span className="bonus-badge">+10% Device Bonus</span>
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="form-actions">
                            <button 
                                type="submit" 
                                className="btn-primary"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="loading-spinner"></span>
                                        Logging Activity...
                                    </>
                                ) : (
                                    <>
                                        <span>📝</span>
                                        Log Activity
                                    </>
                                )}
                            </button>
                            
                            <button 
                                type="button" 
                                className="btn-secondary"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                {/* Recent Activities */}
                <div className="recent-activities-card">
                    <div className="card-header">
                        <h3>Recent Activities</h3>
                        <button 
                            className="btn-text"
                            onClick={() => window.location.hash = '#wellness/activities/history'}
                        >
                            View All
                        </button>
                    </div>
                    
                    <div className="activities-list">
                        {recentActivities.length > 0 ? (
                            recentActivities.map((activity, index) => (
                                <div key={index} className="recent-activity-item">
                                    <div className="activity-icon">
                                        {activity.activity_type === 'steps' ? '👣' :
                                         activity.activity_type === 'exercise' ? '💪' :
                                         activity.activity_type === 'meditation' ? '🧘' :
                                         activity.activity_type === 'water_intake' ? '💧' :
                                         activity.activity_type === 'sleep' ? '😴' : '🎯'}
                                    </div>
                                    <div className="activity-info">
                                        <div className="activity-name">
                                            {activity.activity_type.replace('_', ' ')} - {activity.activity_value} {getActivityUnit(activity.activity_type)}
                                        </div>
                                        <div className="activity-time">{formatDate(activity.activity_date)}</div>
                                    </div>
                                    <div className="activity-points">+{activity.points_earned} pts</div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-activities">
                                <p>No recent activities found. Log your first activity above!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick Tips */}
            <div className="tips-section">
                <h3>💡 Quick Tips</h3>
                <div className="tips-grid">
                    <div className="tip-card">
                        <div className="tip-icon">⌚</div>
                        <div className="tip-content">
                            <h4>Device Integration</h4>
                            <p>Connect your fitness tracker for 10% bonus points and automatic logging</p>
                        </div>
                    </div>
                    <div className="tip-card">
                        <div className="tip-icon">🏆</div>
                        <div className="tip-content">
                            <h4>Challenge Points</h4>
                            <p>Link activities to challenges for extra recognition and team competition</p>
                        </div>
                    </div>
                    <div className="tip-card">
                        <div className="tip-icon">🔥</div>
                        <div className="tip-content">
                            <h4>Daily Streaks</h4>
                            <p>Log activities daily to build streaks and unlock achievement badges</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityTracker