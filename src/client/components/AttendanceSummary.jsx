import React, { useState, useEffect, useMemo } from 'react';
import { EmployeeService } from '../services/EmployeeService.js';
import AttendanceHeader from './attendance/AttendanceHeader.jsx';
import ShiftCard from './attendance/ShiftCard.jsx';
import WeeklyAttendanceList from './attendance/WeeklyAttendanceList.jsx';
import MonthlyCalendarView from './attendance/MonthlyCalendarView.jsx';
import AttendanceSummaryBar from './attendance/AttendanceSummaryBar.jsx';
import LoadingSpinner from './common/LoadingSpinner.jsx';
import ErrorAlert from './common/ErrorAlert.jsx';
import '../AttendanceSummaryApp.css';

export default function AttendanceSummary({ currentUser }) {
  const employeeService = useMemo(() => new EmployeeService(), []);
  
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('attendance');
  const [viewMode, setViewMode] = useState('list');

  useEffect(() => {
    if (currentUser) {
      loadAttendanceData();
    }
  }, [currentUser, currentDate, viewMode]);

  const loadAttendanceData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let startDate, endDate;
      
      if (viewMode === 'calendar') {
        // For monthly calendar view, load the entire month
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        startDate = employeeService.formatServiceNowDate(monthStart);
        endDate = employeeService.formatServiceNowDate(monthEnd);
      } else {
        // For weekly view, get the current week
        const weekStart = getStartOfWeek(currentDate);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        startDate = employeeService.formatServiceNowDate(weekStart);
        endDate = employeeService.formatServiceNowDate(weekEnd);
      }
      
      const userSysId = typeof currentUser.sys_id === 'object' ? 
        currentUser.sys_id.value : currentUser.sys_id;
      
      const query = `user=${userSysId}^date>=${startDate}^date<=${endDate}^ORDERBYdate`;
      
      const response = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_attendance?sysparm_query=${encodeURIComponent(query)}&sysparm_display_value=all&sysparm_limit=100`
      );
      
      setAttendanceData(response.result || []);
    } catch (err) {
      console.error('Failed to load attendance data:', err);
      setError('Failed to load attendance data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const navigatePeriod = (direction) => {
    const newDate = new Date(currentDate);
    
    if (viewMode === 'calendar') {
      // Navigate by month
      newDate.setMonth(newDate.getMonth() + direction);
    } else {
      // Navigate by week
      newDate.setDate(newDate.getDate() + (direction * 7));
    }
    
    setCurrentDate(newDate);
  };

  const formatPeriodRange = () => {
    if (viewMode === 'calendar') {
      return currentDate.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
      });
    } else {
      const weekStart = getStartOfWeek(currentDate);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      return `${weekStart.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })} - ${weekEnd.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      })}`;
    }
  };

  const handleViewModeChange = (newViewMode) => {
    setViewMode(newViewMode);
    // Reset to current date when changing views
    setCurrentDate(new Date());
  };

  if (loading && attendanceData.length === 0) {
    return (
      <div className="attendance-summary-component">
        <LoadingSpinner message="Loading attendance data..." />
      </div>
    );
  }

  return (
    <div className="attendance-summary-component">
      <AttendanceHeader
        activeTab={activeTab}
        onTabChange={setActiveTab}
        periodRange={formatPeriodRange()}
        onNavigatePeriod={navigatePeriod}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
      />
      
      <div className="attendance-content">
        <ShiftCard currentUser={currentUser} />
        
        {loading ? (
          <LoadingSpinner message="Loading attendance data..." />
        ) : error ? (
          <ErrorAlert 
            message={error} 
            onRetry={loadAttendanceData}
          />
        ) : (
          <>
            {viewMode === 'calendar' ? (
              <MonthlyCalendarView
                attendanceData={attendanceData}
                currentDate={currentDate}
                onDateChange={setCurrentDate}
              />
            ) : (
              <WeeklyAttendanceList
                attendanceData={attendanceData}
                currentWeek={getStartOfWeek(currentDate)}
                viewMode={viewMode}
              />
            )}
            
            <AttendanceSummaryBar
              attendanceData={attendanceData}
              currentPeriod={viewMode === 'calendar' ? currentDate : getStartOfWeek(currentDate)}
              viewMode={viewMode}
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