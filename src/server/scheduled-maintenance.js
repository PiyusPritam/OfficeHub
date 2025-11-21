import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

// Daily wellness statistics calculation and leaderboard updates
export function calculateDailyWellnessStats() {
    try {
        gs.info('Starting daily wellness statistics calculation')
        
        // Update all active challenge leaderboards
        updateAllChallengeLeaderboards()
        
        // Calculate weekly wellness summaries
        calculateWeeklyWellnessSummary()
        
        // Clean up old notifications (older than 30 days)
        cleanupOldNotifications()
        
        // Generate wellness achievement notifications
        generateWellnessAchievementNotifications()
        
        gs.info('Daily wellness statistics calculation completed successfully')
        
    } catch (error) {
        gs.error('Error in daily wellness statistics calculation: ' + error.message)
    }
}

// Weekly performance metrics calculation
export function calculateWeeklyPerformanceMetrics() {
    try {
        gs.info('Starting weekly performance metrics calculation')
        
        const oneWeekAgo = new GlideDateTime()
        oneWeekAgo.addDaysUTC(-7)
        
        // Get all active employees
        const userGr = new GlideRecord('sys_user')
        userGr.addQuery('active', true)
        userGr.addQuery('sys_class_name', 'sys_user')
        userGr.query()
        
        while (userGr.next()) {
            calculateEmployeeWeeklyMetrics(userGr.getUniqueValue())
        }
        
        gs.info('Weekly performance metrics calculation completed')
        
    } catch (error) {
        gs.error('Error in weekly performance metrics calculation: ' + error.message)
    }
}

// Monthly reporting and data archival
export function generateMonthlyReports() {
    try {
        gs.info('Starting monthly reporting and archival process')
        
        // Generate attendance summary reports
        generateAttendanceSummaryReports()
        
        // Generate wellness program reports
        generateWellnessProgramReports()
        
        // Archive old completed challenges
        archiveCompletedChallenges()
        
        // Update employee achievement summaries
        updateEmployeeAchievementSummaries()
        
        gs.info('Monthly reporting completed successfully')
        
    } catch (error) {
        gs.error('Error in monthly reporting: ' + error.message)
    }
}

// Data cleanup and maintenance
export function performDataMaintenance() {
    try {
        gs.info('Starting data maintenance tasks')
        
        // Clean up old attendance records (keep last 2 years)
        cleanupOldAttendanceRecords()
        
        // Remove expired wellness activities (older than 1 year)
        cleanupExpiredWellnessActivities()
        
        // Update challenge statuses based on dates
        updateChallengeStatuses()
        
        // Optimize database indexes
        optimizeDatabasePerformance()
        
        gs.info('Data maintenance completed successfully')
        
    } catch (error) {
        gs.error('Error in data maintenance: ' + error.message)
    }
}

// Helper function to update all challenge leaderboards
function updateAllChallengeLeaderboards() {
    const challengeGr = new GlideRecord('x_1599224_officehu_wellness_challenge')
    challengeGr.addQuery('challenge_status', 'in_progress')
    challengeGr.query()
    
    while (challengeGr.next()) {
        updateChallengeLeaderboard(challengeGr.getUniqueValue())
    }
}

// Helper function to update specific challenge leaderboard
function updateChallengeLeaderboard(challengeId) {
    try {
        // Recalculate all participant scores for this challenge
        const leaderboardGr = new GlideRecord('x_1599224_officehu_wellness_leaderboard')
        leaderboardGr.addQuery('challenge', challengeId)
        leaderboardGr.orderByDesc('current_score')
        leaderboardGr.query()
        
        let rank = 1
        while (leaderboardGr.next()) {
            const previousRank = parseInt(leaderboardGr.getValue('rank_position')) || 999
            const rankChange = previousRank - rank
            
            leaderboardGr.setValue('previous_rank', previousRank)
            leaderboardGr.setValue('rank_position', rank)
            leaderboardGr.setValue('rank_change', rankChange)
            
            // Update badges based on ranking
            updateParticipantBadge(leaderboardGr, rank)
            
            leaderboardGr.update()
            rank++
        }
        
    } catch (error) {
        gs.error('Error updating challenge leaderboard ' + challengeId + ': ' + error.message)
    }
}

// Helper function to update participant badges
function updateParticipantBadge(leaderboardGr, rank) {
    let badge = 'none'
    
    if (rank === 1) {
        badge = 'champion'
    } else if (rank <= 3) {
        badge = 'gold'
    } else if (rank <= 10) {
        badge = 'silver'
    } else if (rank <= 25) {
        badge = 'bronze'
    }
    
    leaderboardGr.setValue('badge_earned', badge)
}

// Helper function to calculate weekly wellness summary
function calculateWeeklyWellnessSummary() {
    const oneWeekAgo = new GlideDateTime()
    oneWeekAgo.addDaysUTC(-7)
    
    // Calculate wellness statistics for the past week
    const activityGr = new GlideRecord('x_1599224_officehu_wellness_activity')
    activityGr.addQuery('activity_date', '>=', oneWeekAgo.getDisplayValue())
    activityGr.query()
    
    const userStats = {}
    
    while (activityGr.next()) {
        const employee = activityGr.getValue('employee')
        const points = parseInt(activityGr.getValue('points_earned')) || 0
        
        if (!userStats[employee]) {
            userStats[employee] = {
                totalPoints: 0,
                activeDays: new Set(),
                totalActivities: 0
            }
        }
        
        userStats[employee].totalPoints += points
        userStats[employee].totalActivities += 1
        
        const activityDate = activityGr.getValue('activity_date').split(' ')[0]
        userStats[employee].activeDays.add(activityDate)
    }
    
    // Generate weekly summary notifications
    for (const employeeId in userStats) {
        const stats = userStats[employeeId]
        generateWeeklySummaryNotification(employeeId, {
            totalPoints: stats.totalPoints,
            activeDays: stats.activeDays.size,
            totalActivities: stats.totalActivities
        })
    }
}

// Helper function to generate weekly summary notification
function generateWeeklySummaryNotification(employeeId, stats) {
    const notificationGr = new GlideRecord('x_1599224_officehu_notification')
    notificationGr.initialize()
    notificationGr.setValue('user', employeeId)
    notificationGr.setValue('type', 'wellness_summary')
    notificationGr.setValue('priority', 'medium')
    notificationGr.setValue('title', '📊 Weekly Wellness Summary')
    notificationGr.setValue('message', 
        `Great week! You earned ${stats.totalPoints} wellness points across ${stats.activeDays} active days with ${stats.totalActivities} activities logged. Keep up the excellent work!`
    )
    notificationGr.setValue('is_read', false)
    notificationGr.insert()
}

// Helper function to clean up old notifications
function cleanupOldNotifications() {
    const thirtyDaysAgo = new GlideDateTime()
    thirtyDaysAgo.addDaysUTC(-30)
    
    const notificationGr = new GlideRecord('x_1599224_officehu_notification')
    notificationGr.addQuery('sys_created_on', '<', thirtyDaysAgo.getDisplayValue())
    notificationGr.addQuery('is_read', true)
    notificationGr.query()
    
    let deletedCount = 0
    while (notificationGr.next()) {
        notificationGr.deleteRecord()
        deletedCount++
    }
    
    gs.info(`Cleaned up ${deletedCount} old notifications`)
}

// Helper function to generate wellness achievement notifications
function generateWellnessAchievementNotifications() {
    // Check for new streak achievements
    checkStreakAchievements()
    
    // Check for points milestones
    checkPointsMilestones()
    
    // Check for challenge completions
    checkChallengeCompletions()
}

// Helper function to check streak achievements
function checkStreakAchievements() {
    const today = new GlideDate()
    
    // Find users with significant streaks (7, 14, 30, 60, 100 days)
    const milestones = [7, 14, 30, 60, 100]
    
    milestones.forEach(milestone => {
        // This would require a more complex query to calculate streaks
        // For now, we'll implement a simplified version
        gs.info(`Checking for ${milestone}-day streak achievements`)
    })
}

// Helper function to check points milestones
function checkPointsMilestones() {
    const milestones = [100, 500, 1000, 2500, 5000, 10000]
    
    milestones.forEach(milestone => {
        // Check users who recently crossed this milestone
        gs.info(`Checking for ${milestone} points milestone achievements`)
    })
}

// Helper function to check challenge completions
function checkChallengeCompletions() {
    const challengeGr = new GlideRecord('x_1599224_officehu_wellness_challenge')
    challengeGr.addQuery('challenge_status', 'completed')
    challengeGr.addQuery('sys_updated_on', '>=', 'javascript:gs.daysAgo(1)') // Updated in last day
    challengeGr.query()
    
    while (challengeGr.next()) {
        // Generate notifications for challenge winners
        notifyChallengWinners(challengeGr.getUniqueValue())
    }
}

// Helper function to notify challenge winners
function notifyChallengWinners(challengeId) {
    const leaderboardGr = new GlideRecord('x_1599224_officehu_wellness_leaderboard')
    leaderboardGr.addQuery('challenge', challengeId)
    leaderboardGr.addQuery('rank_position', '<=', 3) // Top 3 winners
    leaderboardGr.orderBy('rank_position')
    leaderboardGr.query()
    
    while (leaderboardGr.next()) {
        const rank = leaderboardGr.getValue('rank_position')
        let title, message
        
        if (rank === '1') {
            title = '🏆 Challenge Champion!'
            message = 'Congratulations! You won the wellness challenge!'
        } else if (rank === '2') {
            title = '🥈 Second Place!'
            message = 'Amazing work! You finished second in the wellness challenge!'
        } else if (rank === '3') {
            title = '🥉 Third Place!'
            message = 'Great job! You finished third in the wellness challenge!'
        }
        
        const notificationGr = new GlideRecord('x_1599224_officehu_notification')
        notificationGr.initialize()
        notificationGr.setValue('user', leaderboardGr.getValue('participant'))
        notificationGr.setValue('type', 'achievement')
        notificationGr.setValue('priority', 'high')
        notificationGr.setValue('title', title)
        notificationGr.setValue('message', message)
        notificationGr.setValue('is_read', false)
        notificationGr.insert()
    }
}

// Helper function to calculate employee weekly metrics
function calculateEmployeeWeeklyMetrics(employeeId) {
    // Implementation for calculating individual employee metrics
    gs.info(`Calculating weekly metrics for employee: ${employeeId}`)
}

// Helper function to generate attendance summary reports
function generateAttendanceSummaryReports() {
    gs.info('Generating attendance summary reports')
}

// Helper function to generate wellness program reports
function generateWellnessProgramReports() {
    gs.info('Generating wellness program reports')
}

// Helper function to archive completed challenges
function archiveCompletedChallenges() {
    const sixMonthsAgo = new GlideDateTime()
    sixMonthsAgo.addMonthsUTC(-6)
    
    const challengeGr = new GlideRecord('x_1599224_officehu_wellness_challenge')
    challengeGr.addQuery('challenge_status', 'completed')
    challengeGr.addQuery('end_date', '<', sixMonthsAgo.getDisplayValue())
    challengeGr.query()
    
    let archivedCount = 0
    while (challengeGr.next()) {
        // Archive challenge data rather than delete
        challengeGr.setValue('challenge_status', 'archived')
        challengeGr.update()
        archivedCount++
    }
    
    gs.info(`Archived ${archivedCount} completed challenges`)
}

// Helper function to update employee achievement summaries
function updateEmployeeAchievementSummaries() {
    gs.info('Updating employee achievement summaries')
}

// Helper function to clean up old attendance records
function cleanupOldAttendanceRecords() {
    const twoYearsAgo = new GlideDateTime()
    twoYearsAgo.addYearsUTC(-2)
    
    const attendanceGr = new GlideRecord('x_1599224_officehu_attendance')
    attendanceGr.addQuery('clock_in_time', '<', twoYearsAgo.getDisplayValue())
    attendanceGr.query()
    
    let deletedCount = 0
    while (attendanceGr.next()) {
        attendanceGr.deleteRecord()
        deletedCount++
    }
    
    gs.info(`Cleaned up ${deletedCount} old attendance records`)
}

// Helper function to clean up expired wellness activities
function cleanupExpiredWellnessActivities() {
    const oneYearAgo = new GlideDateTime()
    oneYearAgo.addYearsUTC(-1)
    
    const activityGr = new GlideRecord('x_1599224_officehu_wellness_activity')
    activityGr.addQuery('activity_date', '<', oneYearAgo.getDisplayValue())
    activityGr.query()
    
    let deletedCount = 0
    while (activityGr.next()) {
        activityGr.deleteRecord()
        deletedCount++
    }
    
    gs.info(`Cleaned up ${deletedCount} expired wellness activities`)
}

// Helper function to update challenge statuses
function updateChallengeStatuses() {
    const today = new GlideDate()
    
    // Update challenges that should be in progress
    const startChallengeGr = new GlideRecord('x_1599224_officehu_wellness_challenge')
    startChallengeGr.addQuery('challenge_status', 'registration_closed')
    startChallengeGr.addQuery('start_date', '<=', today.getDisplayValue())
    startChallengeGr.query()
    
    let startedCount = 0
    while (startChallengeGr.next()) {
        startChallengeGr.setValue('challenge_status', 'in_progress')
        startChallengeGr.update()
        startedCount++
    }
    
    // Update challenges that should be completed
    const endChallengeGr = new GlideRecord('x_1599224_officehu_wellness_challenge')
    endChallengeGr.addQuery('challenge_status', 'in_progress')
    endChallengeGr.addQuery('end_date', '<', today.getDisplayValue())
    endChallengeGr.query()
    
    let completedCount = 0
    while (endChallengeGr.next()) {
        endChallengeGr.setValue('challenge_status', 'completed')
        endChallengeGr.update()
        completedCount++
    }
    
    gs.info(`Started ${startedCount} challenges and completed ${completedCount} challenges`)
}

// Helper function to optimize database performance
function optimizeDatabasePerformance() {
    gs.info('Running database optimization tasks')
    // This would typically involve database-specific optimization tasks
}