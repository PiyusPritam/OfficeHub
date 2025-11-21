import React, { useState, useEffect } from 'react'
import './ChallengeHub.css'

const ChallengeHub = () => {
    const [challenges, setChallenges] = useState([])
    const [myChallenges, setMyChallenges] = useState([])
    const [activeTab, setActiveTab] = useState('browse')
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterType, setFilterType] = useState('all')

    useEffect(() => {
        fetchChallenges()
        fetchMyChallenges()
    }, [])

    const fetchChallenges = async () => {
        try {
            const response = await fetch('/api/x_1599224_officehu/wellness/challenges')
            if (response.ok) {
                const data = await response.json()
                setChallenges(data.result || [])
            }
        } catch (error) {
            console.error('Error fetching challenges:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchMyChallenges = async () => {
        try {
            const response = await fetch('/api/x_1599224_officehu/wellness/challenges/my-challenges')
            if (response.ok) {
                const data = await response.json()
                setMyChallenges(data.result || [])
            }
        } catch (error) {
            console.error('Error fetching my challenges:', error)
        }
    }

    const joinChallenge = async (challengeId) => {
        try {
            const response = await fetch(`/api/x_1599224_officehu/wellness/challenges/${challengeId}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (response.ok) {
                alert('Successfully joined the challenge!')
                fetchChallenges()
                fetchMyChallenges()
            } else {
                throw new Error('Failed to join challenge')
            }
        } catch (error) {
            console.error('Error joining challenge:', error)
            alert('Failed to join challenge. Please try again.')
        }
    }

    const leaveChallenge = async (challengeId) => {
        if (confirm('Are you sure you want to leave this challenge?')) {
            try {
                const response = await fetch(`/api/x_1599224_officehu/wellness/challenges/${challengeId}/leave`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })

                if (response.ok) {
                    alert('Successfully left the challenge')
                    fetchChallenges()
                    fetchMyChallenges()
                } else {
                    throw new Error('Failed to leave challenge')
                }
            } catch (error) {
                console.error('Error leaving challenge:', error)
                alert('Failed to leave challenge. Please try again.')
            }
        }
    }

    const getChallengeIcon = (challengeType) => {
        const icons = {
            step_challenge: '👣',
            fitness_challenge: '💪',
            wellness_challenge: '🌟',
            mindfulness_challenge: '🧘',
            nutrition_challenge: '🥗',
            team_building: '🤝',
            habit_building: '🎯',
            weight_loss: '⚖️'
        }
        return icons[challengeType] || '🏆'
    }

    const getStatusColor = (status) => {
        const colors = {
            registration_open: '#10b981',
            in_progress: '#3b82f6',
            completed: '#6b7280',
            cancelled: '#ef4444'
        }
        return colors[status] || '#64748b'
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const getDaysRemaining = (endDate) => {
        const today = new Date()
        const end = new Date(endDate)
        const diffTime = end - today
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        return diffDays > 0 ? diffDays : 0
    }

    const filteredChallenges = challenges.filter(challenge => {
        const matchesSearch = challenge.challenge_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            challenge.challenge_description.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filterType === 'all' || challenge.challenge_type === filterType
        return matchesSearch && matchesFilter
    })

    if (loading) {
        return (
            <div className="challenge-hub loading">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading challenges...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="challenge-hub">
            {/* Header */}
            <div className="hub-header">
                <h1>🏆 Wellness Challenge Hub</h1>
                <p>Join challenges, compete with colleagues, and achieve your wellness goals together</p>
            </div>

            {/* Navigation Tabs */}
            <div className="hub-tabs">
                <button 
                    className={`tab ${activeTab === 'browse' ? 'active' : ''}`}
                    onClick={() => setActiveTab('browse')}
                >
                    Browse Challenges ({challenges.length})
                </button>
                <button 
                    className={`tab ${activeTab === 'my-challenges' ? 'active' : ''}`}
                    onClick={() => setActiveTab('my-challenges')}
                >
                    My Challenges ({myChallenges.length})
                </button>
                <button 
                    className={`tab ${activeTab === 'create' ? 'active' : ''}`}
                    onClick={() => setActiveTab('create')}
                >
                    Create Challenge
                </button>
            </div>

            {/* Browse Challenges Tab */}
            {activeTab === 'browse' && (
                <div className="tab-content">
                    {/* Search and Filter */}
                    <div className="search-filter-bar">
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search challenges..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                        
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">All Types</option>
                            <option value="step_challenge">Step Challenges</option>
                            <option value="fitness_challenge">Fitness</option>
                            <option value="wellness_challenge">General Wellness</option>
                            <option value="mindfulness_challenge">Mindfulness</option>
                            <option value="nutrition_challenge">Nutrition</option>
                            <option value="team_building">Team Building</option>
                            <option value="habit_building">Habit Building</option>
                            <option value="weight_loss">Weight Loss</option>
                        </select>
                    </div>

                    {/* Challenges Grid */}
                    <div className="challenges-grid">
                        {filteredChallenges.length > 0 ? (
                            filteredChallenges.map(challenge => (
                                <div key={challenge.sys_id} className="challenge-card">
                                    <div className="challenge-header">
                                        <div className="challenge-icon">
                                            {getChallengeIcon(challenge.challenge_type)}
                                        </div>
                                        <div className="challenge-status">
                                            <span 
                                                className="status-badge"
                                                style={{ backgroundColor: getStatusColor(challenge.challenge_status) }}
                                            >
                                                {challenge.challenge_status.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <div className="challenge-content">
                                        <h3>{challenge.challenge_name}</h3>
                                        <p className="challenge-description">
                                            {challenge.challenge_description}
                                        </p>
                                        
                                        <div className="challenge-details">
                                            <div className="detail-item">
                                                <span className="detail-label">Duration:</span>
                                                <span className="detail-value">
                                                    {formatDate(challenge.start_date)} - {formatDate(challenge.end_date)}
                                                </span>
                                            </div>
                                            
                                            <div className="detail-item">
                                                <span className="detail-label">Participants:</span>
                                                <span className="detail-value">
                                                    {challenge.current_participants} / {challenge.target_participants}
                                                </span>
                                            </div>
                                            
                                            <div className="detail-item">
                                                <span className="detail-label">Goal:</span>
                                                <span className="detail-value">
                                                    {challenge.target_goal} {challenge.goal_unit}
                                                </span>
                                            </div>
                                            
                                            {challenge.reward_type !== 'no_reward' && (
                                                <div className="detail-item">
                                                    <span className="detail-label">Reward:</span>
                                                    <span className="detail-value reward">
                                                        🎁 {challenge.reward_type.replace('_', ' ')}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {challenge.challenge_status === 'registration_open' && (
                                            <div className="challenge-actions">
                                                <button 
                                                    className="btn-join"
                                                    onClick={() => joinChallenge(challenge.sys_id)}
                                                >
                                                    Join Challenge
                                                </button>
                                                <div className="days-remaining">
                                                    {getDaysRemaining(challenge.registration_deadline)} days to register
                                                </div>
                                            </div>
                                        )}
                                        
                                        {challenge.challenge_status === 'in_progress' && (
                                            <div className="progress-info">
                                                <div className="progress-text">
                                                    Challenge in progress - {getDaysRemaining(challenge.end_date)} days remaining
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">🔍</div>
                                <h3>No challenges found</h3>
                                <p>Try adjusting your search or filter criteria</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* My Challenges Tab */}
            {activeTab === 'my-challenges' && (
                <div className="tab-content">
                    <div className="my-challenges-list">
                        {myChallenges.length > 0 ? (
                            myChallenges.map(challenge => (
                                <div key={challenge.sys_id} className="my-challenge-card">
                                    <div className="challenge-info">
                                        <div className="challenge-icon">
                                            {getChallengeIcon(challenge.challenge_type)}
                                        </div>
                                        <div className="challenge-details">
                                            <h3>{challenge.challenge_name}</h3>
                                            <p>{challenge.challenge_description}</p>
                                            
                                            <div className="progress-section">
                                                <div className="progress-bar">
                                                    <div 
                                                        className="progress-fill"
                                                        style={{ width: `${(challenge.my_progress / challenge.target_goal) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <div className="progress-text">
                                                    {challenge.my_progress} / {challenge.target_goal} {challenge.goal_unit}
                                                </div>
                                            </div>
                                            
                                            <div className="challenge-stats">
                                                <div className="stat">
                                                    <span className="stat-label">Rank:</span>
                                                    <span className="stat-value">#{challenge.my_rank || 'N/A'}</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">Points:</span>
                                                    <span className="stat-value">{challenge.my_points || 0}</span>
                                                </div>
                                                <div className="stat">
                                                    <span className="stat-label">Days Left:</span>
                                                    <span className="stat-value">{getDaysRemaining(challenge.end_date)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="challenge-actions">
                                        <button 
                                            className="btn-secondary"
                                            onClick={() => window.location.hash = `#wellness/challenges/${challenge.sys_id}/leaderboard`}
                                        >
                                            View Leaderboard
                                        </button>
                                        
                                        {challenge.challenge_status === 'registration_open' && (
                                            <button 
                                                className="btn-danger"
                                                onClick={() => leaveChallenge(challenge.sys_id)}
                                            >
                                                Leave Challenge
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <div className="empty-icon">🏆</div>
                                <h3>No active challenges</h3>
                                <p>Join a challenge to start competing with your colleagues!</p>
                                <button 
                                    className="btn-primary"
                                    onClick={() => setActiveTab('browse')}
                                >
                                    Browse Challenges
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Create Challenge Tab */}
            {activeTab === 'create' && (
                <div className="tab-content">
                    <div className="create-challenge-info">
                        <div className="info-card">
                            <h3>🎯 Create Your Own Challenge</h3>
                            <p>Want to organize a custom wellness challenge for your team or department? 
                               Contact your HR administrator or wellness coordinator to create new challenges.</p>
                            
                            <div className="info-features">
                                <div className="feature">
                                    <span className="feature-icon">👥</span>
                                    <span>Team & individual challenges</span>
                                </div>
                                <div className="feature">
                                    <span className="feature-icon">🎁</span>
                                    <span>Custom rewards and recognition</span>
                                </div>
                                <div className="feature">
                                    <span className="feature-icon">📊</span>
                                    <span>Real-time tracking and leaderboards</span>
                                </div>
                                <div className="feature">
                                    <span className="feature-icon">🏆</span>
                                    <span>Achievement badges and milestones</span>
                                </div>
                            </div>
                            
                            <div className="contact-actions">
                                <button 
                                    className="btn-primary"
                                    onClick={() => window.location.href = 'mailto:hr@company.com?subject=New Wellness Challenge Request'}
                                >
                                    Contact HR Team
                                </button>
                                <button 
                                    className="btn-secondary"
                                    onClick={() => window.location.hash = '#wellness/resources'}
                                >
                                    Challenge Guidelines
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ChallengeHub