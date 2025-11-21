import React from 'react';
import './WeeklyAttendanceList.css';

export default function WeeklyAttendanceList({ attendanceData, currentWeek, viewMode }) {
  // Generate week days array
  const weekDays = generateWeekDays(currentWeek);
  
  // Map attendance data to days
  const attendanceByDay = attendanceData.reduce((acc, record) => {
    const recordDate = new Date(extractValue(record.date));
    const dateKey = recordDate.toISOString().split('T')[0];
    acc[dateKey] = record;
    return acc;
  }, {});

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="timeline-container">
      {weekDays.map((day, index) => {
        const dateKey = day.date.toISOString().split('T')[0];
        const attendance = attendanceByDay[dateKey];
        const isToday = dateKey === today;
        const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6; // Sunday or Saturday
        
        return (
          <TimelineRow
            key={dateKey}
            day={day}
            attendance={attendance}
            isToday={isToday}
            isWeekend={isWeekend}
          />
        );
      })}
    </div>
  );
}

function TimelineRow({ day, attendance, isToday, isWeekend }) {
  const dayName = day.date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNumber = day.date.getDate();
  
  const clockIn = attendance ? extractValue(attendance.clock_in) : null;
  const clockOut = attendance ? extractValue(attendance.clock_out) : null;
  const workLocation = attendance ? extractDisplayValue(attendance.work_location) : null;
  const totalHours = attendance ? extractValue(attendance.total_hours) : '0';
  
  const getStatusDisplay = () => {
    if (isWeekend) return { label: 'Weekend', class: 'weekend-label' };
    if (!attendance) return { label: 'No Record', class: 'status-label' };
    if (workLocation === 'Home') return { label: 'Work From Home', class: 'status-label' };
    if (workLocation === 'Office') return { label: 'Office In', class: 'status-label' };
    return { label: workLocation || 'Unknown', class: 'status-label' };
  };

  const formatTime = (dateTime) => {
    if (!dateTime) return '--:--';
    return new Date(dateTime).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatHours = (hours) => {
    if (!hours || hours === '0' || hours === 0) return '00:00';
    
    const numHours = parseFloat(hours);
    const wholeHours = Math.floor(numHours);
    const minutes = Math.round((numHours - wholeHours) * 60);
    
    return `${wholeHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  const getTimelineBar = () => {
    if (isWeekend) {
      return (
        <div className="timeline-bar">
          <div className="timeline-track">
            <div className="timeline-segment weekend-segment" style={{left: '0%', width: '100%'}}></div>
          </div>
        </div>
      );
    }
    
    if (!clockIn) {
      return (
        <div className="timeline-bar">
          <div className="timeline-track">
            {/* Empty track for no punches */}
          </div>
        </div>
      );
    }
    
    // Calculate position and width based on times (12 PM to 9 PM = 9 hours)
    const startHour = 12; // 12 PM
    const endHour = 21; // 9 PM
    const totalMinutes = (endHour - startHour) * 60; // 540 minutes
    
    const clockInTime = new Date(clockIn);
    const clockInHour = clockInTime.getHours() + (clockInTime.getMinutes() / 60);
    const clockInMinutes = Math.max(0, (clockInHour - startHour) * 60);
    const startPercent = Math.max(0, Math.min(100, (clockInMinutes / totalMinutes) * 100));
    
    let endPercent = 100;
    let endTimeText = '';
    
    if (clockOut) {
      const clockOutTime = new Date(clockOut);
      const clockOutHour = clockOutTime.getHours() + (clockOutTime.getMinutes() / 60);
      const clockOutMinutes = Math.max(0, (clockOutHour - startHour) * 60);
      endPercent = Math.max(startPercent, Math.min(100, (clockOutMinutes / totalMinutes) * 100));
      endTimeText = formatTime(clockOut);
    }
    
    const width = endPercent - startPercent;
    
    return (
      <div className="timeline-bar">
        <div className="timeline-track">
          <div 
            className="timeline-segment work-segment"
            style={{
              left: `${startPercent}%`,
              width: `${width}%`
            }}
          >
          </div>
          <div 
            className="timeline-dot"
            style={{left: `${startPercent}%`}}
          ></div>
          {clockOut && (
            <div 
              className="timeline-dot end-dot"
              style={{left: `${endPercent}%`}}
            ></div>
          )}
        </div>
        {endTimeText && (
          <span 
            className="end-time"
            style={{
              position: 'absolute', 
              left: `${Math.min(85, endPercent + 2)}%`, 
              top: '50%', 
              transform: 'translateY(-50%)'
            }}
          >
            {endTimeText}
          </span>
        )}
      </div>
    );
  };

  const status = getStatusDisplay();

  return (
    <div className="timeline-row">
      <div className="date-cell">
        <div className="day">{isToday ? 'Today' : dayName}</div>
        <div className={`date ${isToday ? 'today' : ''}`}>
          {dayNumber}
        </div>
      </div>
      
      <div className="status-cell">
        <span className={status.class}>{status.label}</span>
        {clockIn && (
          <span className="status-time">{formatTime(clockIn)}</span>
        )}
      </div>

      {getTimelineBar()}

      <div className="hours-cell">
        <div className="hours-worked">{formatHours(totalHours)}</div>
        <span className="hours-label">Hrs worked</span>
      </div>
    </div>
  );
}

// Helper functions
function generateWeekDays(startOfWeek) {
  const days = [];
  const current = new Date(startOfWeek);
  
  for (let i = 0; i < 7; i++) {
    days.push({
      date: new Date(current),
      dayOfWeek: current.getDay()
    });
    current.setDate(current.getDate() + 1);
  }
  
  return days;
}

function extractValue(field) {
  return typeof field === 'object' ? field.value : field;
}

function extractDisplayValue(field) {
  return typeof field === 'object' ? field.display_value : field;
}