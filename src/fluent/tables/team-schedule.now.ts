import '@servicenow/sdk/global'
import { Table, ReferenceColumn, StringColumn, DecimalColumn, IntegerColumn, DateTimeColumn, BooleanColumn } from '@servicenow/sdk/core'

// Team collaboration and scheduling table
export const x_1599224_officehu_team_schedule = Table({
    name: 'x_1599224_officehu_team_schedule',
    label: 'Team Schedule',
    schema: {
        user: ReferenceColumn({ 
            label: 'User', 
            referenceTable: 'sys_user',
            mandatory: true
        }),
        team: StringColumn({ 
            label: 'Team', 
            maxLength: 100,
            mandatory: true
        }),
        shift_type: StringColumn({
            label: 'Shift Type',
            maxLength: 50,
            choices: {
                regular: { label: 'Regular', sequence: 0 },
                night: { label: 'Night Shift', sequence: 1 },
                weekend: { label: 'Weekend', sequence: 2 },
                holiday: { label: 'Holiday', sequence: 3 },
                overtime: { label: 'Overtime', sequence: 4 }
            },
            default: 'regular'
        }),
        start_time: DateTimeColumn({ 
            label: 'Start Time',
            mandatory: true
        }),
        end_time: DateTimeColumn({ 
            label: 'End Time',
            mandatory: true
        }),
        expected_hours: DecimalColumn({ 
            label: 'Expected Hours',
            mandatory: true
        }),
        coverage_required: IntegerColumn({ 
            label: 'Coverage Required',
            default: '1'
        }),
        current_coverage: IntegerColumn({ 
            label: 'Current Coverage',
            read_only: true,
            default: '0'
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 20,
            choices: {
                scheduled: { label: 'Scheduled', sequence: 0 },
                confirmed: { label: 'Confirmed', sequence: 1 },
                needs_coverage: { label: 'Needs Coverage', sequence: 2 },
                cancelled: { label: 'Cancelled', sequence: 3 }
            },
            default: 'scheduled'
        }),
        is_recurring: BooleanColumn({ 
            label: 'Is Recurring', 
            default: false 
        }),
        recurrence_pattern: StringColumn({ 
            label: 'Recurrence Pattern', 
            maxLength: 100 
        }),
        notes: StringColumn({ 
            label: 'Notes', 
            maxLength: 500 
        })
    },
    display: 'team',
    extensible: false,
    accessible_from: 'public',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true
})