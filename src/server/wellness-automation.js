import { gs, GlideRecord } from '@servicenow/glide'

// Function to calculate wellness points based on activity type and value
export function calculateWellnessPoints(current, previous) {
    try {
        const activityType = current.getValue('activity_type')
        const activityValue = parseFloat(current.getValue('activity_value')) || 0
        let pointsEarned = 0

        // Point calculation logic based on activity type
        switch (activityType) {
            case 'steps':
                // 1 point per 100 steps, max 100 points per day
                pointsEarned = Math.min(Math.floor(activityValue / 100), 100)
                break
            case 'exercise':
                // 2 points per minute of exercise, max 120 points per session
                pointsEarned = Math.min(activityValue * 2, 120)
                break
            case 'meditation':
                // 3 points per minute of meditation, max 90 points per session
                pointsEarned = Math.min(activityValue * 3, 90)
                break
            case 'water_intake':
                // 5 points per glass of water, max 40 points per day
                pointsEarned = Math.min(activityValue * 5, 40)
                break
            case 'sleep':
                // Optimal 7-9 hours sleep gets max points, less or more gets reduced points
                if (activityValue >= 7 && activityValue <= 9) {
                    pointsEarned = 50
                } else if (activityValue >= 6 && activityValue <= 10) {
                    pointsEarned = 30
                } else {
                    pointsEarned = 10
                }
                break
            case 'yoga':
                // 2.5 points per minute, max 100 points per session
                pointsEarned = Math.min(Math.floor(activityValue * 2.5), 100)
                break
            case 'walking':
                // 1.5 points per minute, max 90 points per session
                pointsEarned = Math.min(Math.floor(activityValue * 1.5), 90)
                break
            case 'cycling':
                // 2 points per minute, max 120 points per session
                pointsEarned = Math.min(activityValue * 2, 120)
                break
            case 'running':
                // 3 points per minute, max 150 points per session
                pointsEarned = Math.min(activityValue * 3, 150)
                break
            case 'stretching':
                // 2 points per minute, max 60 points per session
                pointsEarned = Math.min(activityValue * 2, 60)
                break
            default:
                pointsEarned = Math.min(activityValue, 50) // Default: 1 point per unit, max 50
        }

        // Bonus points for device verification
        const deviceSource = current.getValue('device_source')
        if (deviceSource && deviceSource !== 'manual') {
            pointsEarned = Math.floor(pointsEarned * 1.1) // 10% bonus for device verification
        }

        current.setValue('points_earned', pointsEarned)
        
        gs.info(`Wellness points calculated for ${activityType}: ${pointsEarned} points`)
        
    } catch (error) {
        gs.error(`Error calculating wellness points: ${error.message}`)
    }
}

// Function to update leaderboard when activities are added/modified
export function updateLeaderboard(current, previous) {
    try {
        const employee = current.getValue('employee')
        const challengeId = current.getValue('challenge_participation')
        
        if (!employee) return

        // Update individual wellness statistics
        updateEmployeeStats(employee)
        
        // Update challenge leaderboard if participating in a challenge
        if (challengeId) {
            updateChallengeLeaderboard(challengeId, employee)
        }

        gs.info(`Leaderboard updated for employee: ${employee}`)
        
    } catch (error) {
        gs.error(`Error updating leaderboard: ${error.message}`)
    }
}

// Helper function to update employee wellness statistics
function updateEmployeeStats(employeeId) {
    try {
        const gr = new GlideRecord('x_1599224_officehu_wellness_activity')
        gr.addQuery('employee', employeeId)
        gr.addQuery('activity_date', '>=', getThirtyDaysAgo())
        gr.query()
        
        let totalPoints = 0
        let totalActivities = 0
        const activityDates = new Set()
        
        while (gr.next()) {
            totalPoints += parseInt(gr.getValue('points_earned')) || 0
            totalActivities++
            
            const activityDate = gr.getValue('activity_date').split(' ')[0] // Get date part only
            activityDates.add(activityDate)
        }
        
        const activeDays = activityDates.size
        
        // Calculate current streak
        const streak = calculateCurrentStreak(employeeId)
        
        gs.info(`Employee ${employeeId} stats: ${totalPoints} points, ${totalActivities} activities, ${activeDays} active days, ${streak} day streak`)
        
    } catch (error) {
        gs.error(`Error updating employee stats: ${error.message}`)
    }
}

// Helper function to update challenge leaderboard
function updateChallengeLeaderboard(challengeId, employeeId) {
    try {
        const leaderboardGr = new GlideRecord('x_1599224_officehu_wellness_leaderboard')
        leaderboardGr.addQuery('challenge', challengeId)
        leaderboardGr.addQuery('participant', employeeId)
        leaderboardGr.query()
        
        if (!leaderboardGr.next()) {
            // Create new leaderboard entry
            leaderboardGr.initialize()
            leaderboardGr.setValue('challenge', challengeId)
            leaderboardGr.setValue('participant', employeeId)
        }
        
        // Calculate challenge-specific stats
        const challengeStats = calculateChallengeStats(challengeId, employeeId)
        
        leaderboardGr.setValue('current_score', challengeStats.totalScore)
        leaderboardGr.setValue('total_activities', challengeStats.totalActivities)
        leaderboardGr.setValue('days_active', challengeStats.activeDays)
        leaderboardGr.setValue('streak_days', challengeStats.currentStreak)
        
        if (challengeStats.currentStreak > parseInt(leaderboardGr.getValue('max_streak'))) {
            leaderboardGr.setValue('max_streak', challengeStats.currentStreak)
        }
        
        leaderboardGr.setValue('last_activity_date', new GlideDateTime().getDisplayValue())
        leaderboardGr.update()
        
        // Recalculate rankings for this challenge
        updateChallengeRankings(challengeId)
        
    } catch (error) {
        gs.error(`Error updating challenge leaderboard: ${error.message}`)
    }
}

// Helper function to calculate challenge-specific statistics
function calculateChallengeStats(challengeId, employeeId) {
    try {
        // Get challenge details
        const challengeGr = new GlideRecord('x_1599224_officehu_wellness_challenge')
        if (!challengeGr.get(challengeId)) {
            return { totalScore: 0, totalActivities: 0, activeDays: 0, currentStreak: 0 }
        }
        
        const startDate = challengeGr.getValue('start_date')
        const endDate = challengeGr.getValue('end_date')
        
        // Get activities within challenge period
        const activityGr = new GlideRecord('x_1599224_officehu_wellness_activity')
        activityGr.addQuery('employee', employeeId)
        activityGr.addQuery('challenge_participation', challengeId)
        activityGr.addQuery('activity_date', '>=', startDate)
        activityGr.addQuery('activity_date', '<=', endDate)
        activityGr.query()
        
        let totalScore = 0
        let totalActivities = 0
        const activityDates = new Set()
        
        while (activityGr.next()) {
            totalScore += parseInt(activityGr.getValue('points_earned')) || 0
            totalActivities++
            
            const activityDate = activityGr.getValue('activity_date').split(' ')[0]
            activityDates.add(activityDate)
        }
        
        return {
            totalScore: totalScore,
            totalActivities: totalActivities,
            activeDays: activityDates.size,
            currentStreak: calculateChallengeStreak(challengeId, employeeId)
        }
        
    } catch (error) {
        gs.error(`Error calculating challenge stats: ${error.message}`)
        return { totalScore: 0, totalActivities: 0, activeDays: 0, currentStreak: 0 }
    }
}

// Helper function to update rankings for a challenge
function updateChallengeRankings(challengeId) {
    try {
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
            
            // Award badges based on ranking
            if (rank === 1) {
                leaderboardGr.setValue('badge_earned', 'champion')
            } else if (rank <= 3) {
                leaderboardGr.setValue('badge_earned', 'gold')
            } else if (rank <= 10) {
                leaderboardGr.setValue('badge_earned', 'silver')
            } else if (rank <= 25) {
                leaderboardGr.setValue('badge_earned', 'bronze')
            }
            
            leaderboardGr.update()
            rank++
        }
        
    } catch (error) {
        gs.error(`Error updating challenge rankings: ${error.message}`)
    }
}

// Helper function to calculate current streak
function calculateCurrentStreak(employeeId) {
    try {
        const today = new GlideDate()
        let streak = 0
        let checkDate = new GlideDate(today)
        
        // Check each day backwards from today
        for (let i = 0; i < 365; i++) { // Max 1 year streak
            const activityGr = new GlideRecord('x_1599224_officehu_wellness_activity')
            activityGr.addQuery('employee', employeeId)
            activityGr.addQuery('activity_date', 'STARTSWITH', checkDate.getDisplayValue())
            activityGr.query()
            
            if (activityGr.hasNext()) {
                streak++
            } else {
                break
            }
            
            checkDate.addDaysUTC(-1)
        }
        
        return streak
        
    } catch (error) {
        gs.error(`Error calculating streak: ${error.message}`)
        return 0
    }
}

// Helper function to calculate challenge-specific streak
function calculateChallengeStreak(challengeId, employeeId) {
    // Similar to calculateCurrentStreak but limited to challenge period and activities
    try {
        const challengeGr = new GlideRecord('x_1599224_officehu_wellness_challenge')
        if (!challengeGr.get(challengeId)) {
            return 0
        }
        
        const startDate = new GlideDate()
        startDate.setValue(challengeGr.getValue('start_date'))
        
        let streak = 0
        let checkDate = new GlideDate()
        
        while (checkDate.onOrAfter(startDate) && streak < 365) {
            const activityGr = new GlideRecord('x_1599224_officehu_wellness_activity')
            activityGr.addQuery('employee', employeeId)
            activityGr.addQuery('challenge_participation', challengeId)
            activityGr.addQuery('activity_date', 'STARTSWITH', checkDate.getDisplayValue())
            activityGr.query()
            
            if (activityGr.hasNext()) {
                streak++
            } else {
                break
            }
            
            checkDate.addDaysUTC(-1)
        }
        
        return streak
        
    } catch (error) {
        gs.error(`Error calculating challenge streak: ${error.message}`)
        return 0
    }
}

// Helper function to get date 30 days ago
function getThirtyDaysAgo() {
    const date = new GlideDateTime()
    date.addDaysUTC(-30)
    return date.getDisplayValue()
}