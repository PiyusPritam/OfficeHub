import React from 'react';
import './AttendanceSummaryBar.css';

export default function AttendanceSummaryBar({ attendanceData, currentPeriod, viewMode }) {
  // Calculate summary statistics based on view mode
  const summary = calculatePeriodSummary(attendanceData, currentPeriod, viewMode);

  return (
    <>
      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <span className="legend-label">Days</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-present"></div>
          <span className="legend-label">Present</span>
          <span className="legend-count">{summary.present} Days</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-onduty"></div>
          <span className="legend-label">On Duty</span>
          <span className="legend-count">{summary.onDuty} Days</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-paid"></div>
          <span className="legend-label">Paid leave</span>
          <span className="legend-count">{summary.paidLeave} Days</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-holidays"></div>
          <span className="legend-label">Holidays</span>
          <span className="legend-count">{summary.holidays} Days</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-weekend"></div>
          <span className="legend-label">Weekend</span>
          <span className="legend-count">{summary.weekend} Days</span>
        </div>
      </div>

      {/* Footer */}
      <div className="footer-info">
        Offshore General [ 12:00 PM - 9:00 PM ]
      </div>
    </>
  );
}

function calculatePeriodSummary(attendanceData, currentPeriod, viewMode) {
  let periodDays = [];
  
  if (viewMode === 'calendar') {
    // For monthly calendar view, calculate all days in the month
    const year = currentPeriod.getFullYear();
    const month = currentPeriod.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      periodDays.push(new Date(year, month, day));
    }
  } else {
    // For weekly view, get the current week
    const weekStart = getStartOfWeek(currentPeriod);
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(day.getDate() + i);
      periodDays.push(day);
    }
  }

  // Map attendance data by date
  const attendanceByDate = attendanceData.reduce((acc, record) => {
    const recordDate = new Date(extractValue(record.date));
    const dateKey = recordDate.toISOString().split('T')[0];
    acc[dateKey] = record;
    return acc;
  }, {});

  let present = 0;
  let onDuty = 0;
  let paidLeave = 0;
  let holidays = 0;
  let weekend = 0;

  periodDays.forEach(day => {
    const dateKey = day.toISOString().split('T')[0];
    const isWeekend = day.getDay() === 0 || day.getDay() === 6; // Sunday or Saturday
    const attendance = attendanceByDate[dateKey];

    if (isWeekend) {
      weekend++;
    } else if (attendance) {
      const clockIn = extractValue(attendance.clock_in);
      const status = extractValue(attendance.status);
      
      if (clockIn && (status === 'clocked_in' || status === 'clocked_out')) {
        present++;
      }
      // Add logic for on-duty, paid leave based on your requirements
    }
    // Add logic for holidays based on your holiday table/configuration
  });

  return {
    present,
    onDuty,
    paidLeave,
    holidays,
    weekend
  };
}

// Helper functions
function getStartOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const diff = d.getDate() - day; // Calculate the difference to Sunday
  return new Date(d.setDate(diff));
}

function extractValue(field) {
  return typeof field === 'object' ? field.value : field;
}