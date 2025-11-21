import React, { useState, useEffect } from 'react'
import './WellnessDashboard.css'

const WellnessDashboard = () => {
    const [wellnessStats, setWellnessStats] = useState({
        todayPoints: 0,
        weeklyPoints: 0,
        monthlyPoints: 0,
        currentStreak: 0,
        activeChallenges: 0,
        completedGoals: 0
    })
    
    const [recentActivities, setRecentActivities] = useState([])
    const [activeChallenges, setActiveChallenges] = useState([])
    const [personalGoals, setPersonalGoals] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchWellnessData()
    }, [])

    const fetchWellnessData = async () => {
        setLoading(true)
        try {
            // Fetch wellness statistics
            const statsResponse = await fetch('/api/x_1599224_officehu/wellness/stats')
            if (statsResponse.ok) {
                const stats = await statsResponse.json()
                setWellnessStats(stats)
            }

            // Fetch recent activities
            const activitiesResponse = await fetch('/api/x_1599224_officehu/wellness/activities/recent')
            if (activitiesResponse.ok) {
                const activities = await activitiesResponse.json()
                setRecentActivities(activities.result || [])
            }

            // Fetch active challenges
            const challengesResponse = await fetch('/api/x_1599224_officehu/wellness/challenges/active')
            if (challengesResponse.ok) {
                const challenges = await challengesResponse.json()
                setActiveChallenges(challenges.result || [])
            }

            // Fetch personal goals
            const goalsResponse = await fetch('/api/x_1599224_officehu/wellness/goals/personal')
            if (goalsResponse.ok) {
                const goals = await goalsResponse.json()
                setPersonalGoals(goals.result || [])
            }
        } catch (error) {
            console.error('Error fetching wellness data:', error)
        } finally {
            setLoading(false)
        }
    }

    const getActivityIcon = (activityType) => {
        const icons = {
            steps: '👣',
            exercise: '💪',
            meditation: '🧘',
            water_intake: '💧',
            sleep: '😴',
            yoga: '🧘‍♀️',
            walking: '🚶',
            cycling: '🚴',
            running: '🏃',
            stretching: '🤸'
        }
        return icons[activityType] || '🎯'
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (loading) {
        return (
            <div className="wellness-dashboard loading">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading your wellness data...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="wellness-dashboard">
            {/* Header Section */}
            <div className="wellness-header">
                <h1>🌟 Wellness Dashboard</h1>
                <p>Track your wellness journey and achieve your health goals</p>
            </div>

            {/* Stats Overview */}
            <div className="wellness-stats-grid">
                <div className="stat-card today-points">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-content">
                        <h3>{wellnessStats.todayPoints}</h3>
                        <p>Points Today</p>
                    </div>
                </div>
                
                <div className="stat-card weekly-points">
                    <div className="stat-icon">📅</div>
                    <div className="stat-content">
                        <h3>{wellnessStats.weeklyPoints}</h3>
                        <p>Weekly Points</p>
                    </div>
                </div>
                
                <div className="stat-card current-streak">
                    <div className="stat-icon">🔥</div>
                    <div className="stat-content">
                        <h3>{wellnessStats.currentStreak}</h3>
                        <p>Day Streak</p>
                    </div>
                </div>
                
                <div className="stat-card active-challenges">
                    <div className="stat-icon">🏆</div>
                    <div className="stat-content">
                        <h3>{wellnessStats.activeChallenges}</h3>
                        <p>Active Challenges</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="wellness-content-grid">
                {/* Recent Activities */}
                <div className="wellness-card recent-activities">
                    <div className="card-header">
                        <h2>Recent Activities</h2>
                        <button className="btn-secondary" onClick={() => window.location.hash = '#wellness/activities'}>
                            View All
                        </button>
                    </div>
                    <div className="activities-list">
                        {recentActivities.length > 0 ? (
                            recentActivities.slice(0, 5).map((activity, index) => (
                                <div key={index} className="activity-item">
                                    <div className="activity-icon">
                                        {getActivityIcon(activity.activity_type)}
                                    </div>
                                    <div className="activity-details">
                                        <div className="activity-name">
                                            {activity.activity_type.replace('_', ' ')} - {activity.activity_value}
                                            {activity.activity_type === 'steps' ? ' steps' : 
                                             activity.activity_type === 'water_intake' ? ' glasses' : ' min'}
                                        </div>
                                        <div className="activity-time">{formatDate(activity.activity_date)}</div>
                                    </div>
                                    <div className="activity-points">+{activity.points_earned} pts</div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>No recent activities. Start tracking your wellness journey!</p>
                                <button className="btn-primary" onClick={() => window.location.hash = '#wellness/activities/log'}>
                                    Log Activity
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Active Challenges */}
                <div className="wellness-card active-challenges-card">
                    <div className="card-header">
                        <h2>Active Challenges</h2>
                        <button className="btn-secondary" onClick={() => window.location.hash = '#wellness/challenges'}>
                            Browse All
                        </button>
                    </div>
                    <div className="challenges-list">
                        {activeChallenges.length > 0 ? (
                            activeChallenges.slice(0, 3).map((challenge, index) => (
                                <div key={index} className="challenge-item">
                                    <div className="challenge-info">
                                        <h4>{challenge.challenge_name}</h4>
                                        <p>{challenge.challenge_description}</p>
                                        <div className="challenge-progress">
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill"
                                                    style={{ width: `${challenge.progress_percentage || 0}%` }}
                                                ></div>
                                            </div>
                                            <span>{challenge.progress_percentage || 0}% complete</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>No active challenges. Join a challenge to compete with colleagues!</p>
                                <button className="btn-primary" onClick={() => window.location.hash = '#wellness/challenges'}>
                                    Join Challenge
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Personal Goals */}
                <div className="wellness-card personal-goals">
                    <div className="card-header">
                        <h2>Personal Goals</h2>
                        <button className="btn-secondary" onClick={() => window.location.hash = '#wellness/goals'}>
                            Manage Goals
                        </button>
                    </div>
                    <div className="goals-list">
                        {personalGoals.length > 0 ? (
                            personalGoals.slice(0, 4).map((goal, index) => (
                                <div key={index} className="goal-item">
                                    <div className="goal-info">
                                        <h4>{goal.goal_title}</h4>
                                        <div className="goal-progress">
                                            <div className="progress-bar">
                                                <div 
                                                    className="progress-fill"
                                                    style={{ width: `${goal.progress_percentage || 0}%` }}
                                                ></div>
                                            </div>
                                            <span>{goal.current_progress} / {goal.target_value}</span>
                                        </div>
                                    </div>
                                    <div className="goal-status">
                                        <span className={`status-badge ${goal.status}`}>
                                            {goal.status.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>No personal goals set. Create your first wellness goal!</p>
                                <button className="btn-primary" onClick={() => window.location.hash = '#wellness/goals/create'}>
                                    Create Goal
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="wellness-card quick-actions">
                    <div className="card-header">
                        <h2>Quick Actions</h2>
                    </div>
                    <div className="actions-grid">
                        <button 
                            className="action-btn log-activity"
                            onClick={() => window.location.hash = '#wellness/activities/log'}
                        >
                            <div className="action-icon">📝</div>
                            <span>Log Activity</span>
                        </button>
                        
                        <button 
                            className="action-btn view-leaderboard"
                            onClick={() => window.location.hash = '#wellness/leaderboard'}
                        >
                            <div className="action-icon">🏆</div>
                            <span>Leaderboard</span>
                        </button>
                        
                        <button 
                            className="action-btn wellness-resources"
                            onClick={() => window.location.hash = '#wellness/resources'}
                        >
                            <div className="action-icon">📚</div>
                            <span>Resources</span>
                        </button>
                        
                        <button 
                            className="action-btn wellness-tips"
                            onClick={() => window.location.hash = '#wellness/tips'}
                        >
                            <div className="action-icon">💡</div>
                            <span>Tips</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Motivational Section */}
            <div className="wellness-motivation">
                <div className="motivation-card">
                    <h3>💪 Keep Going!</h3>
                    <p>
                        {wellnessStats.currentStreak > 0 
                            ? `You're on a ${wellnessStats.currentStreak}-day streak! Keep up the great work!`
                            : "Start your wellness journey today. Every step counts!"
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default WellnessDashboard