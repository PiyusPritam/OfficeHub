import '@servicenow/sdk/global'

// Import core tables
import './tables/attendance.now.ts'
import './tables/leave-request.now.ts'
import './tables/timesheet.now.ts'
import './tables/event.now.ts'
import './tables/achievement.now.ts'

// Import analytics tables
import './tables/analytics/performance-metric.now.ts'

// Import notifications table
import './tables/notification.now.ts'

// Import team collaboration tables
import './tables/team-schedule.now.ts'
import './tables/coverage-request.now.ts'

// Import roles
import './roles/roles.now.ts'

// Import business rules
import './business-rules/analytics-rules.now.ts'
import './business-rules/notification-rules.now.ts'
import './business-rules/team-collaboration-rules.now.ts'

// Import UI pages
import './ui-pages/officehub-main.now.ts'