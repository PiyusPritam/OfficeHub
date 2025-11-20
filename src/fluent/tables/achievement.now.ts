import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, DateTimeColumn, IntegerColumn } from '@servicenow/sdk/core'

// Employee achievements and badges
export const x_1599224_officehu_achievement = Table({
    name: 'x_1599224_officehu_achievement',
    label: 'Employee Achievement',
    schema: {
        user: ReferenceColumn({ 
            label: 'User', 
            referenceTable: 'sys_user',
            mandatory: true
        }),
        achievement_type: StringColumn({
            label: 'Achievement Type',
            maxLength: 50,
            mandatory: true,
            choices: {
                punctuality: { label: 'Punctuality Badge', sequence: 0 },
                perfect_attendance: { label: 'Perfect Attendance', sequence: 1 },
                early_bird: { label: 'Early Bird', sequence: 2 },
                overtime_hero: { label: 'Overtime Hero', sequence: 3 },
                team_player: { label: 'Team Player', sequence: 4 },
                innovator: { label: 'Innovator', sequence: 5 }
            }
        }),
        title: StringColumn({ 
            label: 'Achievement Title',
            maxLength: 100,
            mandatory: true
        }),
        description: StringColumn({ 
            label: 'Description', 
            maxLength: 500 
        }),
        points: IntegerColumn({ 
            label: 'Points Earned',
            default: '0'
        }),
        earned_date: DateTimeColumn({ 
            label: 'Date Earned',
            mandatory: true
        }),
        level: StringColumn({
            label: 'Level',
            maxLength: 20,
            choices: {
                bronze: { label: 'Bronze', sequence: 0 },
                silver: { label: 'Silver', sequence: 1 },
                gold: { label: 'Gold', sequence: 2 },
                platinum: { label: 'Platinum', sequence: 3 }
            }
        })
    },
    display: 'title',
    extensible: false,
    accessible_from: 'public',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true
})