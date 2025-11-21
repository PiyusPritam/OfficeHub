import React, { useState, useEffect, useMemo } from 'react';
import { EmployeeService } from './services/EmployeeService.js';
import AttendanceHeader from './components/attendance/AttendanceHeader.jsx';
import ShiftCard from './components/attendance/ShiftCard.jsx';
import WeeklyAttendanceList from './components/attendance/WeeklyAttendanceList.jsx';
import AttendanceSummaryBar from './components/attendance/AttendanceSummaryBar.jsx';
import LoadingSpinner from './components/common/LoadingSpinner.jsx';
import ErrorAlert from './components/common/ErrorAlert.jsx';
import './AttendanceSummaryApp.css';

export default function AttendanceSummaryApp() {
  const employeeService = useMemo(() => new EmployeeService(), []);
  
  const [currentUser, setCurrentUser] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(getStartOfWeek(new Date()));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('attendance');
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    initializeUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadWeeklyAttendance();
    }
  }, [currentUser, currentWeek]);

  const initializeUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = await employeeService.getOrCreateEmployee();
      setCurrentUser(user);
    } catch (err) {
      console.error('Failed to initialize user:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadWeeklyAttendance = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const weekEnd = new Date(currentWeek);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      // Format dates for ServiceNow query
      const startDate = employeeService.formatServiceNowDate(currentWeek);
      const endDate = employeeService.formatServiceNowDate(weekEnd);
      
      const userSysId = typeof currentUser.sys_id === 'object' ? 
        currentUser.sys_id.value : currentUser.sys_id;
      
      const query = `user=${userSysId}^date>=${startDate}^date<=${endDate}^ORDERBYdate`;
      
      const response = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_attendance?sysparm_query=${encodeURIComponent(query)}&sysparm_display_value=all&sysparm_limit=50`
      );
      
      setAttendanceData(response.result || []);
    } catch (err) {
      console.error('Failed to load attendance data:', err);
      setError('Failed to load attendance data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const navigateWeek = (direction) => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(newWeek.getDate() + (direction * 7));
    setCurrentWeek(newWeek);
  };

  const formatWeekRange = () => {
    const weekEnd = new Date(currentWeek);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    return `${currentWeek.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })} - ${weekEnd.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })}`;
  };

  if (loading && !currentUser) {
    return (
      <div className="attendance-app">
        <LoadingSpinner message="Loading user information..." />
      </div>
    );
  }

  if (error && !currentUser) {
    return (
      <div className="attendance-app">
        <ErrorAlert 
          message={error} 
          onRetry={initializeUser}
        />
      </div>
    );
  }

  return (
    <div className="attendance-summary-app">
      <AttendanceHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        weekRange={formatWeekRange()}
        onNavigateWeek={navigateWeek}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <div className="attendance-content">
        <ShiftCard currentUser={currentUser} />
        
        {loading ? (
          <LoadingSpinner message="Loading attendance data..." />
        ) : error ? (
          <ErrorAlert 
            message={error} 
            onRetry={loadWeeklyAttendance}
          />
        ) : (
          <>
            <WeeklyAttendanceList
              attendanceData={attendanceData}
              currentWeek={currentWeek}
              viewMode={viewMode}
            />
            
            <AttendanceSummaryBar
              attendanceData={attendanceData}
              currentWeek={currentWeek}
            />
          </>
        )}
      </div>
    </div>
  );
}

// Helper function to get start of week (Sunday)
function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const diff = d.getDate() - day; // Calculate the difference to Sunday
  return new Date(d.setDate(diff));
}