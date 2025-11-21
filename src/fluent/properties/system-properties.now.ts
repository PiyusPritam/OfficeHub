import '@servicenow/sdk/global'
import { Property } from '@servicenow/sdk/core'
import { hr_role, admin_role } from '../roles/roles.now.ts'

// ===== WELLNESS SYSTEM PROPERTIES =====

// Enable/disable wellness features
Property({
    $id: Now.ID['wellness_enabled'],
    name: 'x_1599224_officehu.wellness.enabled',
    type: 'boolean',
    value: true,
    description: 'Enable or disable the wellness tracking features',
    roles: {
        read: ['x_1599224_officehu.employee'],
        write: [admin_role]
    }
})

// Default points multiplier for wellness activities
Property({
    $id: Now.ID['wellness_points_multiplier'],
    name: 'x_1599224_officehu.wellness.points_multiplier',
    type: 'string',
    value: '1.0',
    description: 'Global multiplier for wellness points calculation (e.g., 1.5 for 50% bonus)',
    roles: {
        read: [hr_role],
        write: [admin_role]
    }
})

// Maximum wellness points per day
Property({
    $id: Now.ID['wellness_max_daily_points'],
    name: 'x_1599224_officehu.wellness.max_daily_points',
    type: 'integer',
    value: 500,
    description: 'Maximum wellness points an employee can earn per day',
    roles: {
        read: [hr_role],
        write: [admin_role]
    }
})

// ===== INTEGRATION SYSTEM PROPERTIES =====

// Enable integration features
Property({
    $id: Now.ID['integration_enabled'],
    name: 'x_1599224_officehu.integration.enabled',
    type: 'boolean',
    value: false,
    description: 'Enable or disable external system integrations',
    roles: {
        read: [hr_role],
        write: [admin_role]
    }
})

// Slack integration webhook URL
Property({
    $id: Now.ID['slack_webhook'],
    name: 'x_1599224_officehu.integration.slack.webhook_url',
    type: 'password',
    value: '',
    description: 'Slack webhook URL for sending notifications',
    roles: {
        read: [admin_role],
        write: [admin_role]
    },
    isPrivate: true
})

// Microsoft Teams integration webhook URL
Property({
    $id: Now.ID['teams_webhook'],
    name: 'x_1599224_officehu.integration.teams.webhook_url',
    type: 'password',
    value: '',
    description: 'Microsoft Teams webhook URL for sending notifications',
    roles: {
        read: [admin_role],
        write: [admin_role]
    },
    isPrivate: true
})

// Google Calendar API configuration
Property({
    $id: Now.ID['google_calendar_enabled'],
    name: 'x_1599224_officehu.integration.google_calendar.enabled',
    type: 'boolean',
    value: false,
    description: 'Enable Google Calendar integration for event synchronization',
    roles: {
        read: [hr_role],
        write: [admin_role]
    }
})

// Office 365 calendar integration
Property({
    $id: Now.ID['office365_calendar_enabled'],
    name: 'x_1599224_officehu.integration.office365.enabled',
    type: 'boolean',
    value: false,
    description: 'Enable Office 365 calendar integration',
    roles: {
        read: [hr_role],
        write: [admin_role]
    }
})

// ===== NOTIFICATION SYSTEM PROPERTIES =====

// Default notification retention days
Property({
    $id: Now.ID['notification_retention_days'],
    name: 'x_1599224_officehu.notification.retention_days',
    type: 'integer',
    value: 30,
    description: 'Number of days to retain read notifications before cleanup',
    roles: {
        read: [hr_role],
        write: [admin_role]
    }
})

// Email notifications enabled
Property({
    $id: Now.ID['email_notifications_enabled'],
    name: 'x_1599224_officehu.notification.email_enabled',
    type: 'boolean',
    value: true,
    description: 'Enable email notifications for important events',
    roles: {
        read: ['x_1599224_officehu.employee'],
        write: [hr_role]
    }
})

// ===== MAINTENANCE SYSTEM PROPERTIES =====

// Enable scheduled maintenance
Property({
    $id: Now.ID['maintenance_enabled'],
    name: 'x_1599224_officehu.maintenance.enabled',
    type: 'boolean',
    value: true,
    description: 'Enable automated maintenance and cleanup tasks',
    roles: {
        read: [admin_role],
        write: [admin_role]
    }
})

// Maintenance window start time
Property({
    $id: Now.ID['maintenance_window_start'],
    name: 'x_1599224_officehu.maintenance.window_start',
    type: 'time_format',
    value: '02:00:00',
    description: 'Start time for maintenance window (HH:MM:SS format)',
    roles: {
        read: [admin_role],
        write: [admin_role]
    }
})

// Maintenance window end time
Property({
    $id: Now.ID['maintenance_window_end'],
    name: 'x_1599224_officehu.maintenance.window_end',
    type: 'time_format',
    value: '06:00:00',
    description: 'End time for maintenance window (HH:MM:SS format)',
    roles: {
        read: [admin_role],
        write: [admin_role]
    }
})

// ===== PERFORMANCE SYSTEM PROPERTIES =====

// API response timeout
Property({
    $id: Now.ID['api_timeout'],
    name: 'x_1599224_officehu.api.timeout_seconds',
    type: 'integer',
    value: 30,
    description: 'Timeout in seconds for external API calls',
    roles: {
        read: [admin_role],
        write: [admin_role]
    }
})

// Maximum records per API call
Property({
    $id: Now.ID['api_max_records'],
    name: 'x_1599224_officehu.api.max_records_per_call',
    type: 'integer',
    value: 100,
    description: 'Maximum number of records to process in a single API call',
    roles: {
        read: [admin_role],
        write: [admin_role]
    }
})