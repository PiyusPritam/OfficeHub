import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { calculateTotalHours, checkPunctualityAchievement } from '../../server/attendance-utils.js'

// Business rule to calculate total hours when attendance record is updated
export const calculateAttendanceHours = BusinessRule({
    $id: Now.ID['calculate-attendance-hours'],
    name: 'Calculate Attendance Hours',
    table: 'x_1599224_officehu_attendance',
    when: 'before',
    action: ['insert', 'update'],
    script: calculateTotalHours,
    order: 100,
    active: true
})

// Business rule to check for punctuality achievements
export const punctualityChecker = BusinessRule({
    $id: Now.ID['punctuality-checker'],
    name: 'Punctuality Achievement Checker',
    table: 'x_1599224_officehu_attendance',
    when: 'after',
    action: ['insert', 'update'],
    script: checkPunctualityAchievement,
    order: 200,
    active: true,
    condition: "current.clock_in.changes() && current.getValue('clock_in') != ''"
})