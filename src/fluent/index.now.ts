import '@servicenow/sdk/global'

// Import all tables
import './tables/employee.now.ts'
import './tables/attendance.now.ts'
import './tables/leave-request.now.ts'
import './tables/timesheet.now.ts'
import './tables/event.now.ts'
import './tables/achievement.now.ts'

// Import roles
import './roles/roles.now.ts'

// Import business rules
import './business-rules/attendance-rules.now.ts'

// Import UI pages
import './ui-pages/officehub-main.now.ts'