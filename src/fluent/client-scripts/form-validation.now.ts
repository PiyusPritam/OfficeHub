import '@servicenow/sdk/global'
import { ClientScript } from '@servicenow/sdk/core'

// ===== WELLNESS ACTIVITY CLIENT SCRIPTS =====

// Wellness Activity Form Load - Setup form and calculate points preview
ClientScript({
    $id: Now.ID['wellness_activity_onload'],
    name: 'Wellness Activity Form Setup',
    table: 'x_1599224_officehu_wellness_activity',
    type: 'onLoad',
    active: true,
    ui_type: 'all',
    global: true,
    description: 'Initialize wellness activity form with user-friendly features',
    script: `
        function onLoad() {
            // Set default values for new records
            if (g_form.isNewRecord()) {
                // Set current user as employee
                var currentUser = g_user.userID;
                g_form.setValue('employee', currentUser);
                
                // Set current date/time
                var now = new Date();
                var dateTimeString = now.getFullYear() + '-' + 
                    String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                    String(now.getDate()).padStart(2, '0') + ' ' +
                    String(now.getHours()).padStart(2, '0') + ':' + 
                    String(now.getMinutes()).padStart(2, '0') + ':' + 
                    String(now.getSeconds()).padStart(2, '0');
                g_form.setValue('activity_date', dateTimeString);
                
                // Set default device source
                g_form.setValue('device_source', 'manual');
                
                // Add helpful message
                g_form.addInfoMessage('💡 Tip: Connect a fitness device for 10% bonus points!');
            }
            
            // Make employee field read-only (users can only log their own activities)
            g_form.setReadonly('employee', true);
            
            // Update points preview when form loads
            updatePointsPreview();
        }
        
        function updatePointsPreview() {
            var activityType = g_form.getValue('activity_type');
            var activityValue = parseFloat(g_form.getValue('activity_value')) || 0;
            var deviceSource = g_form.getValue('device_source');
            
            if (activityType && activityValue > 0) {
                var points = calculateExpectedPoints(activityType, activityValue, deviceSource);
                g_form.addInfoMessage('🎯 Expected points: ' + points + ' pts');
            }
        }
        
        function calculateExpectedPoints(activityType, value, deviceSource) {
            var points = 0;
            
            switch (activityType) {
                case 'steps':
                    points = Math.min(Math.floor(value / 100), 100);
                    break;
                case 'exercise':
                    points = Math.min(value * 2, 120);
                    break;
                case 'meditation':
                    points = Math.min(value * 3, 90);
                    break;
                case 'water_intake':
                    points = Math.min(value * 5, 40);
                    break;
                case 'sleep':
                    if (value >= 7 && value <= 9) {
                        points = 50;
                    } else if (value >= 6 && value <= 10) {
                        points = 30;
                    } else {
                        points = 10;
                    }
                    break;
                default:
                    points = Math.min(value * 2, 100);
            }
            
            // Device bonus
            if (deviceSource && deviceSource !== 'manual') {
                points = Math.floor(points * 1.1);
            }
            
            return points;
        }
    `
})

// Wellness Activity Value Change - Validate input and update points preview
ClientScript({
    $id: Now.ID['wellness_activity_value_change'],
    name: 'Wellness Activity Value Validation',
    table: 'x_1599224_officehu_wellness_activity',
    type: 'onChange',
    field: 'activity_value',
    active: true,
    ui_type: 'all',
    description: 'Validate activity value and show points preview',
    script: `
        function onChange(control, oldValue, newValue, isLoading) {
            if (isLoading || newValue === '') return;
            
            var activityType = g_form.getValue('activity_type');
            var value = parseFloat(newValue);
            
            // Validation based on activity type
            if (activityType && value) {
                var isValid = true;
                var errorMessage = '';
                
                switch (activityType) {
                    case 'steps':
                        if (value > 50000) {
                            isValid = false;
                            errorMessage = 'Steps cannot exceed 50,000 per day';
                        }
                        break;
                    case 'exercise':
                    case 'yoga':
                    case 'walking':
                    case 'cycling':
                    case 'running':
                    case 'stretching':
                        if (value > 480) { // 8 hours max
                            isValid = false;
                            errorMessage = 'Exercise duration cannot exceed 8 hours';
                        }
                        break;
                    case 'meditation':
                        if (value > 180) { // 3 hours max
                            isValid = false;
                            errorMessage = 'Meditation duration cannot exceed 3 hours';
                        }
                        break;
                    case 'water_intake':
                        if (value > 20) {
                            isValid = false;
                            errorMessage = 'Water intake cannot exceed 20 glasses per day';
                        }
                        break;
                    case 'sleep':
                        if (value > 12 || value < 1) {
                            isValid = false;
                            errorMessage = 'Sleep hours must be between 1 and 12';
                        }
                        break;
                }
                
                if (!isValid) {
                    g_form.addErrorMessage(errorMessage);
                    g_form.setValue(control, oldValue);
                    return false;
                }
                
                // Show points preview
                var deviceSource = g_form.getValue('device_source');
                var points = calculateExpectedPoints(activityType, value, deviceSource);
                g_form.showFieldMsg('activity_value', '🎯 Will earn: ' + points + ' points', 'info');
            }
        }
        
        function calculateExpectedPoints(activityType, value, deviceSource) {
            var points = 0;
            
            switch (activityType) {
                case 'steps':
                    points = Math.min(Math.floor(value / 100), 100);
                    break;
                case 'exercise':
                    points = Math.min(value * 2, 120);
                    break;
                case 'meditation':
                    points = Math.min(value * 3, 90);
                    break;
                case 'water_intake':
                    points = Math.min(value * 5, 40);
                    break;
                case 'sleep':
                    if (value >= 7 && value <= 9) {
                        points = 50;
                    } else if (value >= 6 && value <= 10) {
                        points = 30;
                    } else {
                        points = 10;
                    }
                    break;
                default:
                    points = Math.min(value * 2, 100);
            }
            
            if (deviceSource && deviceSource !== 'manual') {
                points = Math.floor(points * 1.1);
            }
            
            return points;
        }
    `
})

// ===== LEAVE REQUEST CLIENT SCRIPTS =====

// Leave Request Date Validation
ClientScript({
    $id: Now.ID['leave_request_date_validation'],
    name: 'Leave Request Date Validation',
    table: 'x_1599224_officehu_leave_request',
    type: 'onChange',
    field: 'end_date',
    active: true,
    ui_type: 'all',
    description: 'Validate leave request dates and calculate duration',
    script: `
        function onChange(control, oldValue, newValue, isLoading) {
            if (isLoading || newValue === '') return;
            
            var startDate = g_form.getValue('start_date');
            var endDate = newValue;
            
            if (startDate && endDate) {
                var start = new Date(startDate);
                var end = new Date(endDate);
                
                // Validate end date is after start date
                if (end < start) {
                    g_form.addErrorMessage('End date must be after start date');
                    g_form.setValue('end_date', '');
                    return false;
                }
                
                // Calculate and display duration
                var timeDiff = end.getTime() - start.getTime();
                var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;
                
                g_form.showFieldMsg('end_date', 'Duration: ' + daysDiff + ' day(s)', 'info');
                
                // Check for weekend/holiday warnings
                if (includesWeekend(start, end)) {
                    g_form.showFieldMsg('end_date', '⚠️ Request includes weekend days', 'warning');
                }
            }
        }
        
        function includesWeekend(startDate, endDate) {
            var current = new Date(startDate);
            while (current <= endDate) {
                var dayOfWeek = current.getDay();
                if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
                    return true;
                }
                current.setDate(current.getDate() + 1);
            }
            return false;
        }
    `
})

// ===== TIMESHEET CLIENT SCRIPTS =====

// Timesheet Form Load - Setup and calculate totals
ClientScript({
    $id: Now.ID['timesheet_onload'],
    name: 'Timesheet Form Setup',
    table: 'x_1599224_officehu_timesheet',
    type: 'onLoad',
    active: true,
    ui_type: 'all',
    description: 'Initialize timesheet form with calculations',
    script: `
        function onLoad() {
            // Set default values for new records
            if (g_form.isNewRecord()) {
                g_form.setValue('employee', g_user.userID);
                g_form.setValue('status', 'draft');
                
                // Set week ending to upcoming Friday
                var today = new Date();
                var daysUntilFriday = (5 - today.getDay() + 7) % 7;
                if (daysUntilFriday === 0) daysUntilFriday = 7; // If today is Friday, next Friday
                
                var friday = new Date(today);
                friday.setDate(today.getDate() + daysUntilFriday);
                
                var fridayString = friday.getFullYear() + '-' + 
                    String(friday.getMonth() + 1).padStart(2, '0') + '-' + 
                    String(friday.getDate()).padStart(2, '0');
                
                g_form.setValue('week_ending', fridayString);
            }
            
            // Make employee field read-only
            g_form.setReadonly('employee', true);
            
            // Update total hours display
            updateTotalHours();
            
            // Add helpful messages based on status
            var status = g_form.getValue('status');
            if (status === 'draft') {
                g_form.addInfoMessage('💡 Remember to submit your timesheet before the deadline!');
            } else if (status === 'submitted') {
                g_form.addInfoMessage('⏳ Timesheet submitted - waiting for approval');
            } else if (status === 'approved') {
                g_form.addInfoMessage('✅ Timesheet approved');
            }
        }
        
        function updateTotalHours() {
            var total = 0;
            var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            
            days.forEach(function(day) {
                var hours = parseFloat(g_form.getValue(day + '_hours')) || 0;
                total += hours;
            });
            
            g_form.setValue('total_hours', total.toFixed(2));
            
            // Show warnings for unusual hours
            if (total > 60) {
                g_form.showFieldMsg('total_hours', '⚠️ Total exceeds 60 hours - please verify', 'warning');
            } else if (total < 20) {
                g_form.showFieldMsg('total_hours', '💡 Low hours detected - is this correct?', 'info');
            }
        }
    `
})

// Timesheet Hours Change - Validate and recalculate totals
ClientScript({
    $id: Now.ID['timesheet_hours_change'],
    name: 'Timesheet Hours Validation',
    table: 'x_1599224_officehu_timesheet',
    type: 'onChange',
    field: 'monday_hours,tuesday_hours,wednesday_hours,thursday_hours,friday_hours,saturday_hours,sunday_hours',
    active: true,
    ui_type: 'all',
    description: 'Validate daily hours and recalculate totals',
    script: `
        function onChange(control, oldValue, newValue, isLoading) {
            if (isLoading) return;
            
            var hours = parseFloat(newValue) || 0;
            
            // Validate daily hours
            if (hours < 0) {
                g_form.addErrorMessage('Hours cannot be negative');
                g_form.setValue(control, oldValue);
                return false;
            }
            
            if (hours > 24) {
                g_form.addErrorMessage('Hours cannot exceed 24 per day');
                g_form.setValue(control, oldValue);
                return false;
            }
            
            // Show warning for long days
            if (hours > 12) {
                g_form.showFieldMsg(control, '⚠️ Long day - please verify accuracy', 'warning');
            }
            
            // Recalculate total hours
            updateTotalHours();
        }
        
        function updateTotalHours() {
            var total = 0;
            var days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
            
            days.forEach(function(day) {
                var hours = parseFloat(g_form.getValue(day + '_hours')) || 0;
                total += hours;
            });
            
            g_form.setValue('total_hours', total.toFixed(2));
            
            if (total > 60) {
                g_form.showFieldMsg('total_hours', '⚠️ Total exceeds 60 hours', 'warning');
            } else if (total > 40) {
                g_form.showFieldMsg('total_hours', '💼 Overtime hours: ' + (total - 40).toFixed(2), 'info');
            }
        }
    `
})

// ===== WELLNESS CHALLENGE CLIENT SCRIPTS =====

// Wellness Challenge Form Load
ClientScript({
    $id: Now.ID['wellness_challenge_onload'],
    name: 'Wellness Challenge Form Setup',
    table: 'x_1599224_officehu_wellness_challenge',
    type: 'onLoad',
    active: true,
    ui_type: 'all',
    description: 'Initialize wellness challenge form',
    script: `
        function onLoad() {
            if (g_form.isNewRecord()) {
                // Set default values
                g_form.setValue('organizer', g_user.userID);
                g_form.setValue('challenge_status', 'planning');
                g_form.setValue('is_public', 'true');
                g_form.setValue('current_participants', '0');
                
                // Set default dates (start next Monday, end following Friday)
                var today = new Date();
                var nextMonday = new Date(today);
                nextMonday.setDate(today.getDate() + (1 + 7 - today.getDay()) % 7);
                
                var endFriday = new Date(nextMonday);
                endFriday.setDate(nextMonday.getDate() + 11); // 2 weeks later
                
                var regDeadline = new Date(nextMonday);
                regDeadline.setDate(nextMonday.getDate() - 1); // Sunday before
                
                g_form.setValue('start_date', formatDate(nextMonday));
                g_form.setValue('end_date', formatDate(endFriday));
                g_form.setValue('registration_deadline', formatDate(regDeadline));
            }
            
            // Make organizer read-only
            g_form.setReadonly('organizer', true);
            
            // Update duration when dates change
            updateChallengeDuration();
        }
        
        function updateChallengeDuration() {
            var startDate = g_form.getValue('start_date');
            var endDate = g_form.getValue('end_date');
            
            if (startDate && endDate) {
                var start = new Date(startDate);
                var end = new Date(endDate);
                var duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
                
                g_form.setValue('duration_days', duration);
                g_form.showFieldMsg('end_date', 'Duration: ' + duration + ' days', 'info');
            }
        }
        
        function formatDate(date) {
            return date.getFullYear() + '-' + 
                String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                String(date.getDate()).padStart(2, '0');
        }
    `
})