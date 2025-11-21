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

// Wellness Challenge table for team-based wellness competitions
export const x_1599224_officehu_wellness_challenge = Table({
    name: 'x_1599224_officehu_wellness_challenge',
    label: 'Wellness Challenge',
    schema: {
        challenge_name: StringColumn({
            label: 'Challenge Name',
            mandatory: true,
            maxLength: 200
        }),
        challenge_description: StringColumn({
            label: 'Challenge Description',
            maxLength: 2000
        }),
        challenge_type: StringColumn({
            label: 'Challenge Type',
            choices: {
                step_challenge: { label: 'Step Challenge', sequence: 0 },
                fitness_challenge: { label: 'Fitness Challenge', sequence: 1 },
                wellness_challenge: { label: 'General Wellness', sequence: 2 },
                mindfulness_challenge: { label: 'Mindfulness Challenge', sequence: 3 },
                nutrition_challenge: { label: 'Nutrition Challenge', sequence: 4 },
                team_building: { label: 'Team Building', sequence: 5 },
                habit_building: { label: 'Habit Building', sequence: 6 },
                weight_loss: { label: 'Weight Loss Challenge', sequence: 7 }
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
            maxLength: 50
        }),
        organizer: ReferenceColumn({
            label: 'Challenge Organizer',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        target_participants: IntegerColumn({
            label: 'Target Participants',
            default: '10',
            min: 1
        }),
        current_participants: IntegerColumn({
            label: 'Current Participants',
            default: '0',
            read_only: true
        }),
        start_date: DateColumn({
            label: 'Start Date',
            mandatory: true
        }),
        end_date: DateColumn({
            label: 'End Date',
            mandatory: true
        }),
        duration_days: IntegerColumn({
            label: 'Duration (Days)',
            read_only: true
        }),
        registration_deadline: DateColumn({
            label: 'Registration Deadline',
            mandatory: true
        }),
        challenge_status: StringColumn({
            label: 'Challenge Status',
            choices: {
                planning: { label: 'Planning', sequence: 0 },
                registration_open: { label: 'Registration Open', sequence: 1 },
                registration_closed: { label: 'Registration Closed', sequence: 2 },
                in_progress: { label: 'In Progress', sequence: 3 },
                completed: { label: 'Completed', sequence: 4 },
                cancelled: { label: 'Cancelled', sequence: 5 }
            },
            dropdown: 'dropdown_with_none',
            default: 'planning',
            mandatory: true,
            maxLength: 30
        }),
        activity_type: StringColumn({
            label: 'Primary Activity Type',
            choices: {
                steps: { label: 'Steps', sequence: 0 },
                exercise_minutes: { label: 'Exercise Minutes', sequence: 1 },
                meditation_minutes: { label: 'Meditation Minutes', sequence: 2 },
                water_intake: { label: 'Water Intake', sequence: 3 },
                sleep_hours: { label: 'Sleep Hours', sequence: 4 },
                active_days: { label: 'Active Days', sequence: 5 },
                mixed_activities: { label: 'Mixed Activities', sequence: 6 }
            },
            dropdown: 'dropdown_with_none',
            mandatory: true,
            maxLength: 50
        }),
        target_goal: DecimalColumn({
            label: 'Target Goal Value',
            mandatory: true
        }),
        goal_unit: StringColumn({
            label: 'Goal Unit',
            choices: {
                steps: { label: 'Steps', sequence: 0 },
                minutes: { label: 'Minutes', sequence: 1 },
                hours: { label: 'Hours', sequence: 2 },
                days: { label: 'Days', sequence: 3 },
                glasses: { label: 'Glasses', sequence: 4 },
                points: { label: 'Points', sequence: 5 },
                pounds: { label: 'Pounds', sequence: 6 }
            },
            dropdown: 'dropdown_with_none',
            maxLength: 20
        }),
        reward_type: StringColumn({
            label: 'Reward Type',
            choices: {
                points: { label: 'Wellness Points', sequence: 0 },
                gift_card: { label: 'Gift Card', sequence: 1 },
                time_off: { label: 'Extra Time Off', sequence: 2 },
                recognition: { label: 'Public Recognition', sequence: 3 },
                trophy: { label: 'Physical Trophy', sequence: 4 },
                team_lunch: { label: 'Team Lunch', sequence: 5 },
                wellness_budget: { label: 'Wellness Budget', sequence: 6 },
                no_reward: { label: 'No Reward', sequence: 7 }
            },
            dropdown: 'dropdown_with_none',
            maxLength: 30
        }),
        reward_value: StringColumn({
            label: 'Reward Value/Description',
            maxLength: 500
        }),
        is_team_based: BooleanColumn({
            label: 'Team-Based Challenge',
            default: 'false'
        }),
        is_public: BooleanColumn({
            label: 'Public Challenge',
            default: 'true'
        }),
        requires_approval: BooleanColumn({
            label: 'Requires Manager Approval',
            default: 'false'
        }),
        max_team_size: IntegerColumn({
            label: 'Maximum Team Size',
            default: '5',
            min: 1
        }),
        leaderboard_type: StringColumn({
            label: 'Leaderboard Type',
            choices: {
                individual: { label: 'Individual Rankings', sequence: 0 },
                team: { label: 'Team Rankings', sequence: 1 },
                both: { label: 'Individual & Team', sequence: 2 },
                none: { label: 'No Leaderboard', sequence: 3 }
            },
            dropdown: 'dropdown_with_none',
            default: 'individual',
            maxLength: 20
        }),
        rules_and_guidelines: StringColumn({
            label: 'Rules and Guidelines',
            maxLength: 3000
        }),
        winner_announcement: StringColumn({
            label: 'Winner Announcement',
            maxLength: 1000,
            read_only: true
        })
    },
    display: 'challenge_name',
    extensible: false,
    accessible_from: 'package_private',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true,
    audit: true
})