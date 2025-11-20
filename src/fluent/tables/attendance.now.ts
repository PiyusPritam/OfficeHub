import '@servicenow/sdk/global'
import { Table, ReferenceColumn, DateTimeColumn, StringColumn, DecimalColumn } from '@servicenow/sdk/core'

// Attendance tracking table for clock in/out functionality
export const x_1599224_officehu_attendance = Table({
    name: 'x_1599224_officehu_attendance',
    label: 'Attendance Record',
    schema: {
        user: ReferenceColumn({ 
            label: 'User', 
            referenceTable: 'sys_user',
            mandatory: true
        }),
        date: DateTimeColumn({ 
            label: 'Date',
            mandatory: true
        }),
        clock_in: DateTimeColumn({ 
            label: 'Clock In Time' 
        }),
        clock_out: DateTimeColumn({ 
            label: 'Clock Out Time' 
        }),
        work_location: StringColumn({
            label: 'Work Location',
            maxLength: 50,
            choices: {
                office: { label: 'Office', sequence: 0 },
                home: { label: 'Home', sequence: 1 },
                hybrid: { label: 'Hybrid', sequence: 2 },
                field: { label: 'Field', sequence: 3 }
            }
        }),
        total_hours: DecimalColumn({ 
            label: 'Total Hours Worked',
            read_only: true
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 20,
            choices: {
                clocked_in: { label: 'Clocked In', sequence: 0 },
                clocked_out: { label: 'Clocked Out', sequence: 1 },
                break: { label: 'On Break', sequence: 2 },
                lunch: { label: 'At Lunch', sequence: 3 }
            }
        }),
        break_duration: DecimalColumn({ 
            label: 'Break Duration (minutes)',
            default: '0'
        }),
        notes: StringColumn({ 
            label: 'Notes', 
            maxLength: 500 
        })
    },
    display: 'user',
    extensible: false,
    accessible_from: 'public',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true
})