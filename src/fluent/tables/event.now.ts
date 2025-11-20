import '@servicenow/sdk/global'
import { Table, StringColumn, DateTimeColumn, ReferenceColumn, BooleanColumn } from '@servicenow/sdk/core'

// Events and reminders table
export const x_1599224_officehu_event = Table({
    name: 'x_1599224_officehu_event',
    label: 'Event',
    schema: {
        title: StringColumn({ 
            label: 'Event Title',
            maxLength: 200,
            mandatory: true
        }),
        description: StringColumn({ 
            label: 'Description', 
            maxLength: 1000 
        }),
        start_date: DateTimeColumn({ 
            label: 'Start Date & Time',
            mandatory: true
        }),
        end_date: DateTimeColumn({ 
            label: 'End Date & Time',
            mandatory: true
        }),
        event_type: StringColumn({
            label: 'Event Type',
            maxLength: 50,
            choices: {
                meeting: { label: 'Meeting', sequence: 0 },
                deadline: { label: 'Deadline', sequence: 1 },
                holiday: { label: 'Holiday', sequence: 2 },
                training: { label: 'Training', sequence: 3 },
                conference: { label: 'Conference', sequence: 4 },
                team_event: { label: 'Team Event', sequence: 5 },
                personal: { label: 'Personal', sequence: 6 }
            }
        }),
        location: StringColumn({ 
            label: 'Location', 
            maxLength: 200 
        }),
        organizer: ReferenceColumn({ 
            label: 'Organizer', 
            referenceTable: 'sys_user'
        }),
        is_company_wide: BooleanColumn({ 
            label: 'Company-wide Event', 
            default: false 
        }),
        reminder_sent: BooleanColumn({ 
            label: 'Reminder Sent', 
            default: false 
        })
    },
    display: 'title',
    extensible: false,
    accessible_from: 'public',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true
})