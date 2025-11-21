import React, { useState, useEffect } from 'react';
import { EmployeeService } from '../services/EmployeeService.js';
import './Dashboard.css';

export default function Dashboard({ currentUser, onNavigate }) {
  const [dashboardData, setDashboardData] = useState({
    todaysAttendance: null,
    leaveBalance: 25,
    todaysProgress: 0,
    recentNotifications: [],
    quickStats: {
      totalEmployees: 156,
      presentToday: 142,
      onLeave: 8,
      pendingTasks: 23
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const employeeService = new EmployeeService();

  useEffect(() => {
    loadDashboardData();
    
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, [currentUser]);

  const loadDashboardData = async () => {
    if (!currentUser) return;
    
    try {
      setLoading(true);
      
      // Load today's attendance
      const userSysId = typeof currentUser.sys_id === 'object' ? 
        currentUser.sys_id.value : currentUser.sys_id;
      
      const today = new Date().toISOString().split('T')[0];
      
      const attendanceResponse = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_attendance?sysparm_query=user=${userSysId}^date=${today}&sysparm_display_value=all&sysparm_limit=1`
      );
      
      setDashboardData(prev => ({
        ...prev,
        todaysAttendance: attendanceResponse.result?.[0] || null
      }));
      
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProgressPercentage = () => {
    const attendance = dashboardData.todaysAttendance;
    if (!attendance) return 0;
    
    const clockIn = attendance.clock_in?.value || attendance.clock_in;
    const clockOut = attendance.clock_out?.value || attendance.clock_out;
    
    if (!clockIn) return 0;
    if (clockOut) return 100;
    
    // Calculate progress based on current time vs shift duration
    const now = new Date();
    const shiftStart = new Date(`${new Date().toDateString()} 12:00 PM`);
    const shiftEnd = new Date(`${new Date().toDateString()} 9:00 PM`);
    
    if (now < shiftStart) return 0;
    if (now > shiftEnd) return 100;
    
    const totalShift = shiftEnd - shiftStart;
    const elapsed = now - shiftStart;
    
    return Math.min(100, (elapsed / totalShift) * 100);
  };

  const quickActions = [
    { 
      id: 'clockinout', 
      label: 'Clock In/Out', 
      icon: '⏰', 
      color: 'blue',
      description: 'Track your time'
    },
    { 
      id: 'leave', 
      label: 'Request Leave', 
      icon: '🏖️', 
      color: 'green',
      description: 'Time off request'
    },
    { 
      id: 'timesheets', 
      label: 'Log Hours', 
      icon: '📋', 
      color: 'purple',
      description: 'Project hours'
    },
    { 
      id: 'calendar', 
      label: 'View Calendar', 
      icon: '📅', 
      color: 'pink',
      description: 'Upcoming events'
    },
  ];

  const formatTime = (timeStr) => {
    if (!timeStr) return 'Not recorded';
    try {
      return new Date(timeStr).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return 'Not recorded';
    }
  };

  const getAttendanceStatus = () => {
    const attendance = dashboardData.todaysAttendance;
    if (!attendance) return { status: 'Not Clocked In', color: 'text-gray-500' };
    
    const clockIn = attendance.clock_in?.value || attendance.clock_in;
    const clockOut = attendance.clock_out?.value || attendance.clock_out;
    
    if (clockOut) return { status: 'Clocked Out', color: 'text-red-500' };
    if (clockIn) return { status: 'Clocked In', color: 'text-green-500' };
    
    return { status: 'Not Clocked In', color: 'text-gray-500' };
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const progressPercentage = getProgressPercentage();
  const attendanceStatus = getAttendanceStatus();

  return (
    <div className="modern-dashboard">
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-content">
            <p className="stat-label">Total Employees</p>
            <p className="stat-value">{dashboardData.quickStats.totalEmployees}</p>
            <span className="stat-change positive">+12%</span>
          </div>
        </div>
        
        <div className="stat-card green">
          <div className="stat-content">
            <p className="stat-label">Present Today</p>
            <p className="stat-value">{dashboardData.quickStats.presentToday}</p>
            <span className="stat-change positive">+5%</span>
          </div>
        </div>
        
        <div className="stat-card yellow">
          <div className="stat-content">
            <p className="stat-label">On Leave</p>
            <p className="stat-value">{dashboardData.quickStats.onLeave}</p>
            <span className="stat-change negative">-2%</span>
          </div>
        </div>
        
        <div className="stat-card purple">
          <div className="stat-content">
            <p className="stat-label">Pending Tasks</p>
            <p className="stat-value">{dashboardData.quickStats.pendingTasks}</p>
            <span className="stat-change positive">+3%</span>
          </div>
        </div>
      </div>

      {/* Content Cards */}
      <div className="content-grid">
        {/* Today's Progress */}
        <div className="content-card">
          <h3 className="card-title">Today's Progress</h3>
          <div className="progress-content">
            <div className="progress-circle-container">
              <div className="progress-circle">
                <svg viewBox="0 0 120 120" className="progress-svg">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="var(--border-color)"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52 * (1 - progressPercentage / 100)}`}
                    strokeLinecap="round"
                    className="progress-bar"
                  />
                </svg>
                <div className="progress-text">
                  <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
                </div>
              </div>
            </div>
            
            <div className="progress-status">
              <p className="status-label">{attendanceStatus.status}</p>
              <div className="progress-divider"></div>
              <div className="progress-details">
                <div className="progress-detail">
                  <span>Clock In:</span>
                  <span>{formatTime(dashboardData.todaysAttendance?.clock_in?.value || dashboardData.todaysAttendance?.clock_in)}</span>
                </div>
                <div className="progress-detail">
                  <span>Clock Out:</span>
                  <span>{formatTime(dashboardData.todaysAttendance?.clock_out?.value || dashboardData.todaysAttendance?.clock_out)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leave Balance */}
        <div className="content-card">
          <h3 className="card-title">Leave Balance</h3>
          <div className="leave-balance-content">
            <div className="leave-circle-container">
              <div className="leave-circle">
                <svg viewBox="0 0 140 140" className="leave-svg">
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="var(--border-color)"
                    strokeWidth="12"
                  />
                  <circle
                    cx="70"
                    cy="70"
                    r="60"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray={`${2 * Math.PI * 60}`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="leave-text">
                  <span className="leave-days">{dashboardData.leaveBalance}</span>
                </div>
              </div>
            </div>
            
            <div className="leave-details">
              <div className="leave-detail">
                <p className="leave-detail-label">Total Allocated</p>
                <p className="leave-detail-value">{dashboardData.leaveBalance} days</p>
              </div>
              <div className="leave-detail">
                <p className="leave-detail-label">Used</p>
                <p className="leave-detail-value red">0 days</p>
              </div>
              <div className="leave-detail">
                <p className="leave-detail-label">Remaining</p>
                <p className="leave-detail-value green">{dashboardData.leaveBalance} days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="content-card full-width">
          <h3 className="card-title">Quick Actions</h3>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className={`action-card ${action.color}`}
                onClick={() => onNavigate(action.id)}
              >
                <div className={`action-icon ${action.color}`}>
                  <span>{action.icon}</span>
                </div>
                <span className="action-label">{action.label}</span>
                <span className="action-description">{action.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}