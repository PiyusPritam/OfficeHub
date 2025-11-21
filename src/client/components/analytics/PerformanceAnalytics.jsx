import React, { useState, useEffect } from 'react'
import { EmployeeService } from '../../services/EmployeeService.js'
import './PerformanceAnalytics.css'

export default function PerformanceAnalytics({ currentUser }) {
  const [analyticsData, setAnalyticsData] = useState({
    metrics: {},
    trends: {},
    goals: {}
  })
  const [timeframe, setTimeframe] = useState('weekly')
  const [loading, setLoading] = useState(true)

  const employeeService = new EmployeeService()

  useEffect(() => {
    if (currentUser) {
      fetchAnalyticsData()
    }
  }, [currentUser, timeframe])

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id

      // Fetch performance metrics
      const metricsResponse = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_performance_metric?sysparm_query=user=${userSysId}^period=${timeframe}&sysparm_limit=50&sysparm_display_value=all&sysparm_query=ORDERBYDESCdate`
      )

      const metrics = metricsResponse.result || []
      
      // Process metrics for visualization
      const processedData = processMetricsData(metrics)
      
      setAnalyticsData(processedData)

    } catch (error) {
      console.error('Failed to fetch analytics data:', error)
    } finally {
      setLoading(false)
    }
  }

  const processMetricsData = (metrics) => {
    const metricsByType = {}
    const trends = {}
    
    metrics.forEach(metric => {
      const metricType = typeof metric.metric_type === 'object' ? metric.metric_type.display_value : metric.metric_type
      const value = parseFloat(typeof metric.value === 'object' ? metric.value.display_value : metric.value)
      const date = typeof metric.date === 'object' ? metric.date.display_value : metric.date
      
      if (!metricsByType[metricType]) {
        metricsByType[metricType] = []
      }
      
      metricsByType[metricType].push({ date, value })
    })

    // Calculate trends
    Object.keys(metricsByType).forEach(type => {
      const data = metricsByType[type].sort((a, b) => new Date(a.date) - new Date(b.date))
      if (data.length >= 2) {
        const recent = data.slice(-3).reduce((sum, item) => sum + item.value, 0) / Math.min(3, data.length)
        const previous = data.slice(-6, -3).reduce((sum, item) => sum + item.value, 0) / Math.min(3, data.slice(-6, -3).length)
        trends[type] = previous > 0 ? ((recent - previous) / previous * 100) : 0
      }
    })

    return {
      metrics: metricsByType,
      trends,
      goals: {
        'Punctuality Score': { target: 90, current: getLatestValue(metricsByType, 'Punctuality Score') },
        'Attendance Rate': { target: 95, current: getLatestValue(metricsByType, 'Attendance Rate') },
        'Productivity Hours': { target: 40, current: getLatestValue(metricsByType, 'Productivity Hours') }
      }
    }
  }

  const getLatestValue = (metrics, type) => {
    const typeData = metrics[type]
    return typeData && typeData.length > 0 ? typeData[typeData.length - 1].value : 0
  }

  const getMetricIcon = (metricType) => {
    const icons = {
      'Punctuality Score': '⏰',
      'Attendance Rate': '📅',
      'Productivity Hours': '💼',
      'Overtime Hours': '🌙',
      'Task Completion Rate': '✅',
      'Team Collaboration Score': '👥',
      'Wellness Score': '💪'
    }
    return icons[metricType] || '📊'
  }

  const getTrendIcon = (trend) => {
    if (trend > 5) return '📈'
    if (trend < -5) return '📉'
    return '➡️'
  }

  const getTrendColor = (trend) => {
    if (trend > 5) return 'positive'
    if (trend < -5) return 'negative'
    return 'neutral'
  }

  if (loading) {
    return (
      <div className="performance-analytics loading">
        <div className="loading-spinner">Loading analytics...</div>
      </div>
    )
  }

  return (
    <div className="performance-analytics">
      <div className="analytics-header">
        <h2>Performance Analytics</h2>
        <div className="timeframe-selector">
          <button 
            className={timeframe === 'daily' ? 'active' : ''} 
            onClick={() => setTimeframe('daily')}
          >
            Daily
          </button>
          <button 
            className={timeframe === 'weekly' ? 'active' : ''} 
            onClick={() => setTimeframe('weekly')}
          >
            Weekly
          </button>
          <button 
            className={timeframe === 'monthly' ? 'active' : ''} 
            onClick={() => setTimeframe('monthly')}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="metrics-overview">
        {Object.entries(analyticsData.metrics).map(([metricType, data]) => {
          const latestValue = data.length > 0 ? data[data.length - 1].value : 0
          const trend = analyticsData.trends[metricType] || 0
          
          return (
            <div key={metricType} className="metric-card">
              <div className="metric-header">
                <span className="metric-icon">{getMetricIcon(metricType)}</span>
                <span className="metric-name">{metricType}</span>
              </div>
              <div className="metric-value">
                {latestValue.toFixed(1)}
                {metricType.includes('Rate') || metricType.includes('Score') ? '%' : ''}
              </div>
              <div className={`metric-trend ${getTrendColor(trend)}`}>
                <span className="trend-icon">{getTrendIcon(trend)}</span>
                <span className="trend-value">
                  {trend > 0 ? '+' : ''}{trend.toFixed(1)}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="goals-section">
        <h3>Performance Goals</h3>
        <div className="goals-grid">
          {Object.entries(analyticsData.goals).map(([goalName, goal]) => {
            const progress = Math.min((goal.current / goal.target * 100), 100)
            const isAchieved = goal.current >= goal.target
            
            return (
              <div key={goalName} className={`goal-card ${isAchieved ? 'achieved' : ''}`}>
                <div className="goal-header">
                  <span className="goal-name">{goalName}</span>
                  <span className={`goal-status ${isAchieved ? 'achieved' : 'pending'}`}>
                    {isAchieved ? '✅' : '🎯'}
                  </span>
                </div>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-text">
                    {goal.current.toFixed(1)} / {goal.target}
                    {goalName.includes('Rate') || goalName.includes('Score') ? '%' : ''}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="insights-section">
        <h3>Performance Insights</h3>
        <div className="insights-list">
          {generateInsights(analyticsData).map((insight, index) => (
            <div key={index} className={`insight-item ${insight.type}`}>
              <span className="insight-icon">{insight.icon}</span>
              <span className="insight-text">{insight.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function generateInsights(data) {
  const insights = []
  
  // Punctuality insights
  const punctualityTrend = data.trends['Punctuality Score'] || 0
  if (punctualityTrend > 10) {
    insights.push({
      type: 'positive',
      icon: '🎉',
      text: 'Great job! Your punctuality has improved significantly this period.'
    })
  } else if (punctualityTrend < -10) {
    insights.push({
      type: 'warning',
      icon: '⚠️',
      text: 'Your punctuality score has declined. Consider adjusting your morning routine.'
    })
  }
  
  // Productivity insights
  const productivityGoal = data.goals['Productivity Hours']
  if (productivityGoal && productivityGoal.current > productivityGoal.target * 1.1) {
    insights.push({
      type: 'caution',
      icon: '😴',
      text: 'You\'re working more than expected. Remember to take breaks and maintain work-life balance.'
    })
  }
  
  // Achievement opportunities
  const attendanceGoal = data.goals['Attendance Rate']
  if (attendanceGoal && attendanceGoal.current >= 98) {
    insights.push({
      type: 'positive',
      icon: '🏆',
      text: 'Excellent attendance! You\'re on track for a perfect attendance achievement.'
    })
  }
  
  if (insights.length === 0) {
    insights.push({
      type: 'neutral',
      icon: '📊',
      text: 'Keep up the good work! Your performance metrics are looking stable.'
    })
  }
  
  return insights
}