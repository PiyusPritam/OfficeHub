import '@servicenow/sdk/global'
import { 
    Table, 
    StringColumn, 
    IntegerColumn, 
    DecimalColumn,
    BooleanColumn,
    ReferenceColumn,
    DateTimeColumn 
} from '@servicenow/sdk/core'

// Wellness Leaderboard table for tracking competition rankings
export const x_1599224_officehu_wellness_leaderboard = Table({
    name: 'x_1599224_officehu_wellness_leaderboard',
    label: 'Wellness Leaderboard',
    schema: {
        challenge: ReferenceColumn({
            label: 'Wellness Challenge',
            referenceTable: 'x_1599224_officehu_wellness_challenge',
            mandatory: true
        }),
        participant: ReferenceColumn({
            label: 'Participant',
            referenceTable: 'sys_user',
            mandatory: true
        }),
        team_name: StringColumn({
            label: 'Team Name',
            maxLength: 100
        }),
        current_score: DecimalColumn({
            label: 'Current Score',
            default: '0'
        }),
        total_activities: IntegerColumn({
            label: 'Total Activities Logged',
            default: '0'
        }),
        rank_position: IntegerColumn({
            label: 'Rank Position',
            default: '999'
        }),
        rank_change: IntegerColumn({
            label: 'Rank Change',
            default: '0'
        }),
        previous_rank: IntegerColumn({
            label: 'Previous Rank',
            default: '999'
        }),
        progress_percentage: DecimalColumn({
            label: 'Progress Percentage',
            default: '0'
        }),
        days_active: IntegerColumn({
            label: 'Days Active',
            default: '0'
        }),
        streak_days: IntegerColumn({
            label: 'Current Streak (Days)',
            default: '0'
        }),
        max_streak: IntegerColumn({
            label: 'Maximum Streak (Days)',
            default: '0'
        }),
        last_activity_date: DateTimeColumn({
            label: 'Last Activity Date'
        }),
        achievements_earned: IntegerColumn({
            label: 'Achievements Earned',
            default: '0'
        }),
        bonus_points: IntegerColumn({
            label: 'Bonus Points',
            default: '0'
        }),
        is_team_leader: BooleanColumn({
            label: 'Team Leader',
            default: 'false'
        }),
        qualified_for_prize: BooleanColumn({
            label: 'Qualified for Prize',
            default: 'false'
        }),
        participation_status: StringColumn({
            label: 'Participation Status',
            choices: {
                active: { label: 'Active', sequence: 0 },
                inactive: { label: 'Inactive', sequence: 1 },
                withdrawn: { label: 'Withdrawn', sequence: 2 },
                disqualified: { label: 'Disqualified', sequence: 3 },
                completed: { label: 'Completed', sequence: 4 }
            },
            dropdown: 'dropdown_with_none',
            default: 'active',
            maxLength: 20
        }),
        badge_earned: StringColumn({
            label: 'Badge Earned',
            choices: {
                bronze: { label: 'Bronze Badge', sequence: 0 },
                silver: { label: 'Silver Badge', sequence: 1 },
                gold: { label: 'Gold Badge', sequence: 2 },
                platinum: { label: 'Platinum Badge', sequence: 3 },
                champion: { label: 'Champion Badge', sequence: 4 },
                mvp: { label: 'MVP Badge', sequence: 5 },
                none: { label: 'No Badge', sequence: 6 }
            },
            dropdown: 'dropdown_with_none',
            default: 'none',
            maxLength: 20
        }),
        notes: StringColumn({
            label: 'Notes',
            maxLength: 1000
        })
    },
    display: 'participant',
    extensible: false,
    accessible_from: 'package_private',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true,
    audit: false,
    index: [
        {
            name: 'challenge_rank_idx',
            element: 'challenge,rank_position',
            unique: false
        },
        {
            name: 'participant_challenge_idx',
            element: 'participant,challenge',
            unique: true
        }
    ]
})