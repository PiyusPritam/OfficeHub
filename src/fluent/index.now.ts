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

// Import wellness tables (Phase 5 implementation)
import './tables/wellness/wellness-activity.now.ts'
import './tables/wellness/wellness-goal.now.ts'
import './tables/wellness/wellness-challenge.now.ts'
import './tables/wellness/wellness-leaderboard.now.ts'
import './tables/wellness/wellness-resource.now.ts'

// Import social collaboration tables (AI Chatbot & Social Feed)
import './tables/social/ai-chat-session.now.ts'
import './tables/social/ai-chat-message.now.ts'
import './tables/social/social-post.now.ts'
import './tables/social/post-interactions.now.ts'
import './tables/social/team-chat.now.ts'

// Import roles
import './roles/roles.now.ts'

// Import system properties
import './properties/system-properties.now.ts'

// Import Access Control Lists (ACLs)
import './acls/core-table-acls.now.ts'
import './acls/wellness-acls.now.ts'

// Import business rules
import './business-rules/analytics-rules.now.ts'
import './business-rules/notification-rules.now.ts'
import './business-rules/team-collaboration-rules.now.ts'
import './business-rules/wellness-rules.now.ts'
import './business-rules/social-collaboration-rules.now.ts'

// Import scheduled scripts (Epic 6: Advanced Security Features)
import './scheduled-scripts/maintenance-scripts.now.ts'

// Import UI actions (Epic 6: Advanced Security Features)
import './ui-actions/workflow-actions.now.ts'

// Import client scripts (Epic 6: Advanced Security Features)
import './client-scripts/form-validation.now.ts'

// Import UI pages
import './ui-pages/officehub-main.now.ts'