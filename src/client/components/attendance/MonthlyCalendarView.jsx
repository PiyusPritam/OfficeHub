import React from 'react';
import './MonthlyCalendarView.css';

export default function MonthlyCalendarView({ attendanceData, currentDate, onDateChange }) {
  // Get calendar data for the current month
  const calendarData = generateCalendarData(currentDate, attendanceData);
  
  const monthYear = currentDate.toLocaleDateString('en-US', { 
    month: 'long', 
    year: 'numeric' 
  });

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="monthly-calendar-view">
      <div className="calendar-header">
        <h3 className="calendar-title">{monthYear}</h3>
        <div className="calendar-legend">
          <div className="legend-item">
            <span className="legend-dot present"></span>
            <span className="legend-label">Present</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot wfh"></span>
            <span className="legend-label">WFH</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot absent"></span>
            <span className="legend-label">Absent</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot weekend"></span>
            <span className="legend-label">Weekend</span>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {/* Weekday Headers */}
        <div className="calendar-weekdays">
          {weekdays.map((day) => (
            <div key={day} className="weekday-header">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="calendar-days">
          {calendarData.map((week, weekIndex) => (
            week.map((day, dayIndex) => (
              <CalendarDay
                key={`${weekIndex}-${dayIndex}`}
                day={day}
                isToday={day.dateKey === today}
                onClick={() => day.isCurrentMonth && onDateChange(day.date)}
              />
            ))
          ))}
        </div>
      </div>
    </div>
  );
}

function CalendarDay({ day, isToday, onClick }) {
  const getStatusClass = () => {
    if (!day.isCurrentMonth) return 'other-month';
    if (day.isWeekend) return 'weekend';
    if (!day.attendance) return 'no-data';
    
    const workLocation = extractDisplayValue(day.attendance.work_location);
    const clockIn = extractValue(day.attendance.clock_in);
    
    if (clockIn) {
      if (workLocation === 'Home') return 'wfh';
      return 'present';
    }
    
    return 'absent';
  };

  const getHours = () => {
    if (!day.attendance) return null;
    
    const totalHours = extractValue(day.attendance.total_hours);
    if (!totalHours || totalHours === '0') return '0h';
    
    const hours = Math.floor(parseFloat(totalHours));
    const minutes = Math.round((parseFloat(totalHours) - hours) * 60);
    
    if (hours > 0 && minutes > 0) {
      return `${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}m`;
    }
    
    return '0h';
  };

  const getTimeRange = () => {
    if (!day.attendance) return null;
    
    const clockIn = extractValue(day.attendance.clock_in);
    const clockOut = extractValue(day.attendance.clock_out);
    
    if (clockIn) {
      const inTime = new Date(clockIn).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      if (clockOut) {
        const outTime = new Date(clockOut).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        return `${inTime} - ${outTime}`;
      }
      
      return `${inTime} - Active`;
    }
    
    return null;
  };

  return (
    <div 
      className={`calendar-day ${getStatusClass()} ${isToday ? 'today' : ''}`}
      onClick={onClick}
      title={day.isCurrentMonth ? (day.attendance ? getTimeRange() : 'No attendance record') : ''}
    >
      <div className="day-number">
        {day.date.getDate()}
        {isToday && <div className="today-indicator"></div>}
      </div>
      
      {day.isCurrentMonth && (
        <div className="day-content">
          {day.attendance && (
            <div className="day-hours">
              {getHours()}
            </div>
          )}
          
          <div className="day-status">
            {day.isWeekend ? (
              <span className="status-weekend">Weekend</span>
            ) : day.attendance ? (
              <div className="attendance-indicators">
                <div className={`punch-indicator ${extractValue(day.attendance.clock_in) ? 'present' : 'absent'}`}>
                  {extractValue(day.attendance.clock_in) ? '●' : '○'}
                </div>
                <div className={`punch-indicator ${extractValue(day.attendance.clock_out) ? 'present' : 'pending'}`}>
                  {extractValue(day.attendance.clock_out) ? '●' : '◐'}
                </div>
              </div>
            ) : (
              <span className="status-no-data">—</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper functions
function generateCalendarData(currentDate, attendanceData) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Get first day of month and calculate starting date (show previous month days)
  const firstDay = new Date(year, month, 1);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay()); // Go back to Sunday
  
  // Map attendance data by date
  const attendanceByDate = attendanceData.reduce((acc, record) => {
    const recordDate = new Date(extractValue(record.date));
    const dateKey = recordDate.toISOString().split('T')[0];
    acc[dateKey] = record;
    return acc;
  }, {});

  // Generate 6 weeks of calendar data
  const weeks = [];
  const currentCalendarDate = new Date(startDate);
  
  for (let week = 0; week < 6; week++) {
    const weekDays = [];
    
    for (let day = 0; day < 7; day++) {
      const date = new Date(currentCalendarDate);
      const dateKey = date.toISOString().split('T')[0];
      const isCurrentMonth = date.getMonth() === month;
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      weekDays.push({
        date,
        dateKey,
        isCurrentMonth,
        isWeekend,
        attendance: attendanceByDate[dateKey] || null
      });
      
      currentCalendarDate.setDate(currentCalendarDate.getDate() + 1);
    }
    
    weeks.push(weekDays);
  }
  
  return weeks;
}

function extractValue(field) {
  return typeof field === 'object' ? field.value : field;
}

function extractDisplayValue(field) {
  return typeof field === 'object' ? field.display_value : field;
}