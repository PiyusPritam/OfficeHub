import '@servicenow/sdk/global'
import { Table, ReferenceColumn, StringColumn, DateTimeColumn } from '@servicenow/sdk/core'

// Coverage requests for team collaboration
export const x_1599224_officehu_coverage_request = Table({
    name: 'x_1599224_officehu_coverage_request',
    label: 'Coverage Request',
    schema: {
        requester: ReferenceColumn({ 
            label: 'Requester', 
            referenceTable: 'sys_user',
            mandatory: true
        }),
        original_schedule: ReferenceColumn({ 
            label: 'Original Schedule', 
            referenceTable: 'x_1599224_officehu_team_schedule'
        }),
        coverage_date: DateTimeColumn({ 
            label: 'Coverage Date',
            mandatory: true
        }),
        start_time: DateTimeColumn({ 
            label: 'Start Time',
            mandatory: true
        }),
        end_time: DateTimeColumn({ 
            label: 'End Time',
            mandatory: true
        }),
        reason: StringColumn({ 
            label: 'Reason', 
            maxLength: 500,
            mandatory: true
        }),
        urgency: StringColumn({
            label: 'Urgency',
            maxLength: 20,
            choices: {
                low: { label: 'Low', sequence: 0 },
                medium: { label: 'Medium', sequence: 1 },
                high: { label: 'High', sequence: 2 },
                critical: { label: 'Critical', sequence: 3 }
            },
            default: 'medium'
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 20,
            choices: {
                open: { label: 'Open', sequence: 0 },
                assigned: { label: 'Assigned', sequence: 1 },
                covered: { label: 'Covered', sequence: 2 },
                cancelled: { label: 'Cancelled', sequence: 3 },
                expired: { label: 'Expired', sequence: 4 }
            },
            default: 'open'
        }),
        volunteer: ReferenceColumn({ 
            label: 'Volunteer', 
            referenceTable: 'sys_user'
        }),
        volunteered_at: DateTimeColumn({ 
            label: 'Volunteered At' 
        }),
        approved_by: ReferenceColumn({ 
            label: 'Approved By', 
            referenceTable: 'sys_user'
        }),
        approved_at: DateTimeColumn({ 
            label: 'Approved At' 
        }),
        compensation_type: StringColumn({
            label: 'Compensation Type',
            maxLength: 50,
            choices: {
                time_off: { label: 'Time Off Credit', sequence: 0 },
                overtime_pay: { label: 'Overtime Pay', sequence: 1 },
                bonus: { label: 'Bonus', sequence: 2 },
                none: { label: 'None', sequence: 3 }
            },
            default: 'time_off'
        }),
        expires_at: DateTimeColumn({ 
            label: 'Expires At'
        }),
        created_at: DateTimeColumn({ 
            label: 'Created At'
        })
    },
    display: 'requester',
    extensible: false,
    accessible_from: 'public',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true
})