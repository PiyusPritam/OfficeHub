import '@servicenow/sdk/global'
import { Table, ReferenceColumn, DateColumn, DecimalColumn, StringColumn } from '@servicenow/sdk/core'

// Timesheet entries for tracking work hours and projects
export const x_1599224_officehu_timesheet = Table({
    name: 'x_1599224_officehu_timesheet',
    label: 'Timesheet Entry',
    schema: {
        user: ReferenceColumn({ 
            label: 'User', 
            referenceTable: 'sys_user',
            mandatory: true
        }),
        date: DateColumn({ 
            label: 'Date',
            mandatory: true
        }),
        project: StringColumn({ 
            label: 'Project/Task', 
            maxLength: 200,
            mandatory: true
        }),
        hours: DecimalColumn({ 
            label: 'Hours Worked',
            mandatory: true
        }),
        description: StringColumn({ 
            label: 'Work Description', 
            maxLength: 1000 
        }),
        billable: StringColumn({
            label: 'Billable',
            maxLength: 20,
            choices: {
                billable: { label: 'Billable', sequence: 0 },
                non_billable: { label: 'Non-Billable', sequence: 1 },
                overtime: { label: 'Overtime', sequence: 2 }
            }
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 20,
            default: 'draft',
            choices: {
                draft: { label: 'Draft', sequence: 0 },
                submitted: { label: 'Submitted', sequence: 1 },
                approved: { label: 'Approved', sequence: 2 },
                rejected: { label: 'Rejected', sequence: 3 }
            }
        })
    },
    display: 'project',
    extensible: false,
    accessible_from: 'public',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true
})