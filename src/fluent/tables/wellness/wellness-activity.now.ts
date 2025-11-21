import '@servicenow/sdk/global'
import { 
    Table, 
    StringColumn, 
    IntegerColumn, 
    DateTimeColumn,
    DecimalColumn,
    BooleanColumn,
    ReferenceColumn 
} from '@servicenow/sdk/core'

// Wellness Activity table for tracking employee wellness activities
export const x_1599224_officehu_wellness_activity = Table({
    name: 'x_1599224_officehu_wellness_activity',
    label: 'Wellness Activity',
    schema: {
        employee: ReferenceColumn({
            label: 'Employee',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        activity_type: StringColumn({
            label: 'Activity Type',
            choices: {
                steps: { label: 'Steps', sequence: 0 },
                exercise: { label: 'Exercise (minutes)', sequence: 1 },
                meditation: { label: 'Meditation (minutes)', sequence: 2 },
                water_intake: { label: 'Water Intake (glasses)', sequence: 3 },
                sleep: { label: 'Sleep (hours)', sequence: 4 },
                yoga: { label: 'Yoga (minutes)', sequence: 5 },
                walking: { label: 'Walking (minutes)', sequence: 6 },
                cycling: { label: 'Cycling (minutes)', sequence: 7 },
                running: { label: 'Running (minutes)', sequence: 8 },
                stretching: { label: 'Stretching (minutes)', sequence: 9 }
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
            maxLength: 50
        }),
        activity_value: DecimalColumn({
            label: 'Activity Value',
            mandatory: true
        }),
        activity_date: DateTimeColumn({
            label: 'Activity Date',
            mandatory: true
        }),
        points_earned: IntegerColumn({
            label: 'Points Earned',
            default: '0'
        }),
        device_source: StringColumn({
            label: 'Device Source',
            choices: {
                manual: { label: 'Manual Entry', sequence: 0 },
                fitbit: { label: 'Fitbit', sequence: 1 },
                apple_watch: { label: 'Apple Watch', sequence: 2 },
                google_fit: { label: 'Google Fit', sequence: 3 },
                samsung_health: { label: 'Samsung Health', sequence: 4 },
                garmin: { label: 'Garmin', sequence: 5 },
                other: { label: 'Other Device', sequence: 6 }
            },
            dropdown: 'dropdown_with_none',
            maxLength: 50
        }),
        notes: StringColumn({
            label: 'Notes',
            maxLength: 500
        }),
        verified: BooleanColumn({
            label: 'Verified',
            default: 'false'
        }),
        challenge_participation: ReferenceColumn({
            label: 'Challenge Participation',
            referenceTable: 'x_1599224_officehu_wellness_challenge'
        })
    },
    display: 'activity_type',
    extensible: false,
    accessible_from: 'package_private',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true,
    audit: true
})