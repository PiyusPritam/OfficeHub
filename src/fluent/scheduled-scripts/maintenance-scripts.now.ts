// Note: Scheduled Scripts will be implemented through ServiceNow UI
// as the ScheduledScript API may not be available in current Fluent version

// The following scheduled scripts should be created manually in ServiceNow:

/*
1. Daily Wellness Statistics Calculator
   - Name: Daily Wellness Statistics Calculator
   - Run: Daily at 2:00 AM EST
   - Script: Call calculateDailyWellnessStats function from scheduled-maintenance.js

2. Weekly Performance Metrics Calculator  
   - Name: Weekly Performance Metrics Calculator
   - Run: Weekly on Monday at 3:00 AM EST
   - Script: Call calculateWeeklyPerformanceMetrics function from scheduled-maintenance.js

3. Monthly Reporting and Archival
   - Name: Monthly Reporting and Archival
   - Run: Monthly on 1st at 1:00 AM EST
   - Script: Call generateMonthlyReports function from scheduled-maintenance.js

4. Data Maintenance and Cleanup
   - Name: Data Maintenance and Cleanup
   - Run: Weekly on Sunday at 4:00 AM EST
   - Script: Call performDataMaintenance function from scheduled-maintenance.js

5. Challenge Status Updater
   - Name: Challenge Status Updater
   - Run: Every hour at 15 minutes past
   - Script: Inline challenge status update logic

6. Notification Cleanup
   - Name: Notification Cleanup  
   - Run: Daily at 5:00 AM EST
   - Script: Inline notification cleanup logic
*/

export const scheduledScriptDocumentation = {
    message: 'Scheduled scripts documentation - implement manually in ServiceNow UI',
    scripts: [
        {
            name: 'Daily Wellness Statistics Calculator',
            schedule: 'Daily at 2:00 AM EST',
            function: 'calculateDailyWellnessStats'
        },
        {
            name: 'Weekly Performance Metrics Calculator', 
            schedule: 'Weekly on Monday at 3:00 AM EST',
            function: 'calculateWeeklyPerformanceMetrics'
        },
        {
            name: 'Monthly Reporting and Archival',
            schedule: 'Monthly on 1st at 1:00 AM EST', 
            function: 'generateMonthlyReports'
        },
        {
            name: 'Data Maintenance and Cleanup',
            schedule: 'Weekly on Sunday at 4:00 AM EST',
            function: 'performDataMaintenance'  
        }
    ]
}