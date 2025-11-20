import { gs, GlideDateTime } from '@servicenow/glide'

// Calculate total hours between clock in and clock out
export function calculateTotalHours(current, previous) {
    if (current.getValue('clock_in') && current.getValue('clock_out')) {
        const clockIn = new GlideDateTime(current.getValue('clock_in'))
        const clockOut = new GlideDateTime(current.getValue('clock_out'))
        
        const diffMs = clockOut.getNumericValue() - clockIn.getNumericValue()
        const hours = diffMs / (1000 * 60 * 60) // Convert ms to hours
        
        // Subtract break time if specified
        const breakMinutes = parseFloat(current.getValue('break_duration') || '0')
        const finalHours = hours - (breakMinutes / 60)
        
        current.setValue('total_hours', finalHours.toFixed(2))
        current.setValue('status', 'clocked_out')
    }
}

// Check for punctuality achievements
export function checkPunctualityAchievement(current, previous) {
    const clockInTime = new GlideDateTime(current.getValue('clock_in'))
    const workStartTime = new GlideDateTime()
    workStartTime.setDisplayValue(clockInTime.getDate() + ' 09:00:00') // Assuming 9 AM start
    
    if (clockInTime.getNumericValue() <= workStartTime.getNumericValue()) {
        // Award punctuality points
        gs.addInfoMessage('Punctuality achievement earned!')
        // Logic to create achievement record would go here
    }
}