import '@servicenow/sdk/global'
import { 
    Table, 
    StringColumn, 
    IntegerColumn, 
    DateColumn,
    DecimalColumn,
    BooleanColumn,
    ReferenceColumn 
} from '@servicenow/sdk/core'

// Wellness Goal table for managing personal and team wellness goals
export const x_1599224_officehu_wellness_goal = Table({
    name: 'x_1599224_officehu_wellness_goal',
    label: 'Wellness Goal',
    schema: {
        employee: ReferenceColumn({
            label: 'Employee',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        goal_type: StringColumn({
            label: 'Goal Type',
            choices: {
                personal: { label: 'Personal Goal', sequence: 0 },
                team: { label: 'Team Goal', sequence: 1 },
                department: { label: 'Department Goal', sequence: 2 },
                company: { label: 'Company Goal', sequence: 3 }
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
            maxLength: 20
        }),
        activity_type: StringColumn({
            label: 'Activity Type',
            choices: {
                steps: { label: 'Daily Steps', sequence: 0 },
                exercise: { label: 'Exercise Minutes', sequence: 1 },
                meditation: { label: 'Meditation Minutes', sequence: 2 },
                water_intake: { label: 'Water Glasses', sequence: 3 },
                sleep: { label: 'Sleep Hours', sequence: 4 },
                weight_loss: { label: 'Weight Loss (lbs)', sequence: 5 },
                active_days: { label: 'Active Days per Week', sequence: 6 },
                wellness_score: { label: 'Overall Wellness Score', sequence: 7 }
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
            maxLength: 50
        }),
        goal_title: StringColumn({
            label: 'Goal Title',
            mandatory: true,
            maxLength: 200
        }),
        goal_description: StringColumn({
            label: 'Goal Description',
            maxLength: 1000
        }),
        target_value: DecimalColumn({
            label: 'Target Value',
            mandatory: true
        }),
        current_progress: DecimalColumn({
            label: 'Current Progress',
            default: '0'
        }),
        progress_percentage: IntegerColumn({
            label: 'Progress Percentage',
            default: '0',
            max: 100,
            min: 0
        }),
        start_date: DateColumn({
            label: 'Start Date',
            mandatory: true
        }),
        end_date: DateColumn({
            label: 'End Date',
            mandatory: true
        }),
        frequency: StringColumn({
            label: 'Frequency',
            choices: {
                daily: { label: 'Daily', sequence: 0 },
                weekly: { label: 'Weekly', sequence: 1 },
                monthly: { label: 'Monthly', sequence: 2 },
                quarterly: { label: 'Quarterly', sequence: 3 },
                yearly: { label: 'Yearly', sequence: 4 },
                one_time: { label: 'One Time', sequence: 5 }
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
            maxLength: 20
        }),
        status: StringColumn({
            label: 'Status',
            choices: {
                not_started: { label: 'Not Started', sequence: 0 },
                in_progress: { label: 'In Progress', sequence: 1 },
                completed: { label: 'Completed', sequence: 2 },
                paused: { label: 'Paused', sequence: 3 },
                cancelled: { label: 'Cancelled', sequence: 4 },
                overdue: { label: 'Overdue', sequence: 5 }
            },
            dropdown: 'dropdown_with_none',
            default: 'not_started',
            mandatory: true,
            maxLength: 20
        }),
        priority: StringColumn({
            label: 'Priority',
            choices: {
                low: { label: 'Low', sequence: 0 },
                medium: { label: 'Medium', sequence: 1 },
                high: { label: 'High', sequence: 2 },
                critical: { label: 'Critical', sequence: 3 }
            },
            dropdown: 'dropdown_with_none',
            default: 'medium',
            maxLength: 20
        }),
        reward_points: IntegerColumn({
            label: 'Reward Points',
            default: '0'
        }),
        is_public: BooleanColumn({
            label: 'Public Goal',
            default: 'false'
        }),
        team_challenge: ReferenceColumn({
            label: 'Team Challenge',
            referenceTable: 'x_1599224_officehu_wellness_challenge'
        }),
        manager: ReferenceColumn({
            label: 'Manager/Supervisor',
            referenceTable: 'sys_user'
        })
    },
    display: 'goal_title',
    extensible: false,
    accessible_from: 'package_private',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true,
    audit: true
})