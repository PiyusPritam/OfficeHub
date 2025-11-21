import '@servicenow/sdk/global'
import { Table, ReferenceColumn, StringColumn, DateTimeColumn, BooleanColumn } from '@servicenow/sdk/core'

// Smart notifications and alerts table
export const x_1599224_officehu_notification = Table({
    name: 'x_1599224_officehu_notification',
    label: 'Notification',
    schema: {
        user: ReferenceColumn({ 
            label: 'User', 
            referenceTable: 'sys_user',
            mandatory: true
        }),
        notification_type: StringColumn({
            label: 'Notification Type',
            maxLength: 50,
            mandatory: true,
            choices: {
                reminder: { label: 'Reminder', sequence: 0 },
                alert: { label: 'Alert', sequence: 1 },
                achievement: { label: 'Achievement', sequence: 2 },
                approval_request: { label: 'Approval Request', sequence: 3 },
                deadline_warning: { label: 'Deadline Warning', sequence: 4 },
                overtime_alert: { label: 'Overtime Alert', sequence: 5 },
                leave_balance: { label: 'Leave Balance Warning', sequence: 6 },
                birthday: { label: 'Birthday Reminder', sequence: 7 },
                anniversary: { label: 'Anniversary Reminder', sequence: 8 },
                timesheet_reminder: { label: 'Timesheet Reminder', sequence: 9 }
            }
        }),
        title: StringColumn({ 
            label: 'Title',
            maxLength: 200,
            mandatory: true
        }),
        message: StringColumn({ 
            label: 'Message', 
            maxLength: 1000,
            mandatory: true
        }),
        priority: StringColumn({
            label: 'Priority',
            maxLength: 20,
            choices: {
                low: { label: 'Low', sequence: 0 },
                medium: { label: 'Medium', sequence: 1 },
                high: { label: 'High', sequence: 2 },
                urgent: { label: 'Urgent', sequence: 3 }
            },
            default: 'medium'
        }),
        is_read: BooleanColumn({ 
            label: 'Is Read', 
            default: false 
        }),
        sent_at: DateTimeColumn({ 
            label: 'Sent At'
        }),
        read_at: DateTimeColumn({ 
            label: 'Read At' 
        }),
        action_url: StringColumn({ 
            label: 'Action URL', 
            maxLength: 500 
        }),
        related_table: StringColumn({ 
            label: 'Related Table', 
            maxLength: 50 
        }),
        related_record: StringColumn({ 
            label: 'Related Record ID', 
            maxLength: 32 
        }),
        expires_at: DateTimeColumn({ 
            label: 'Expires At' 
        })
    },
    display: 'title',
    extensible: false,
    accessible_from: 'public',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true
})