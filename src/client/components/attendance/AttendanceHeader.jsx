import React from 'react';
import './AttendanceHeader.css';

export default function AttendanceHeader({
  activeTab,
  onTabChange,
  periodRange,
  onNavigatePeriod,
  viewMode,
  onViewModeChange
}) {
  const tabs = [
    { id: 'attendance', label: 'Attendance Summary' },
    { id: 'regularization', label: 'Regularization' },
    { id: 'onduty', label: 'On Duty' }
  ];

  return (
    <div className="attendance-header-container">
      {/* Header Tabs */}
      <div className="header-tabs">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="date-picker">
          <button 
            className="date-nav"
            onClick={() => onNavigatePeriod(-1)}
            title={viewMode === 'calendar' ? 'Previous Month' : 'Previous Week'}
          >
            ◄
          </button>
          <button 
            className="date-nav"
            onClick={() => onNavigatePeriod(1)}
            title={viewMode === 'calendar' ? 'Next Month' : 'Next Week'}
          >
            ►
          </button>
          <span className="date-range">{periodRange}</span>
        </div>
        
        <div className="toolbar-actions">
          <button 
            className={`btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title="List View"
          >
            📋
          </button>
          <button 
            className={`btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => onViewModeChange('grid')}
            title="Grid View"
          >
            ☰
          </button>
          <button 
            className={`btn ${viewMode === 'calendar' ? 'active' : ''}`}
            onClick={() => onViewModeChange('calendar')}
            title="Calendar View"
          >
            📅
          </button>
          <button className="btn btn-primary">
            Request ▼
          </button>
          <button className="btn">
            ⋮
          </button>
        </div>
      </div>
    </div>
  );
}