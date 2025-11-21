import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { calculateWellnessPoints } from '../../server/wellness-automation.js'
import { updateLeaderboard } from '../../server/wellness-automation.js'

// Business rule to calculate wellness points when activities are logged
BusinessRule({
    $id: Now.ID['wellness_points_calculator'],
    name: 'Wellness Points Calculator',
    table: 'x_1599224_officehu_wellness_activity',
    when: 'before',
    action: ['insert', 'update'],
    script: calculateWellnessPoints,
    order: 100,
    active: true,
    description: 'Automatically calculates points earned for wellness activities based on activity type and value'
})

// Business rule to update leaderboard when wellness activities are logged
BusinessRule({
    $id: Now.ID['wellness_leaderboard_updater'],
    name: 'Wellness Leaderboard Updater',
    table: 'x_1599224_officehu_wellness_activity',
    when: 'after',
    action: ['insert', 'update', 'delete'],
    script: updateLeaderboard,
    order: 200,
    active: true,
    description: 'Updates leaderboard rankings and statistics when wellness activities are modified'
})