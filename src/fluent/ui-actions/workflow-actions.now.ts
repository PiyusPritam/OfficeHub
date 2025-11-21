import '@servicenow/sdk/global'
import { UiAction } from '@servicenow/sdk/core'

// ===== WELLNESS ACTIVITY UI ACTIONS =====

// Quick Log Activity - Form action for wellness activities
UiAction({
    $id: Now.ID['wellness_quick_log'],
    table: 'x_1599224_officehu_wellness_activity',
    name: 'Quick Log Activity',
    actionName: 'quick_log_activity',
    active: true,
    hint: 'Quickly log a wellness activity with default values',
    showInsert: true,
    form: {
        showButton: true,
        style: 'primary'
    },
    condition: `
        // Only show on new activity forms
        current.isNewRecord();
    `,
    script: `
        // Pre-fill common activity values
        if (g_form.getValue('activity_date') == '') {
            var now = new GlideDateTime();
            g_form.setValue('activity_date', now.getDisplayValue());
        }
        
        if (g_form.getValue('device_source') == '') {
            g_form.setValue('device_source', 'manual');
        }
        
        // Set focus to activity type field
        g_form.flash('activity_type', '#4ade80', 2);
        g_form.setMandatory('activity_type', true);
        g_form.setMandatory('activity_value', true);
        
        g_form.addInfoMessage('Fill in activity type and value, then save to calculate points!');
    `
})

// Join Challenge - Action to quickly join an active challenge
UiAction({
    $id: Now.ID['wellness_join_challenge'],
    table: 'x_1599224_officehu_wellness_challenge',
    name: 'Join Challenge',
    actionName: 'join_wellness_challenge',
    active: true,
    hint: 'Join this wellness challenge',
    showUpdate: true,
    form: {
        showButton: true,
        style: 'primary'
    },
    list: {
        showButton: true,
        style: 'primary'
    },
    condition: `
        // Only show for open registration challenges
        current.getValue('challenge_status') == 'registration_open' && 
        current.getValue('is_public') == 'true';
    `,
    script: `
        var challengeId = current.getUniqueValue();
        var userId = gs.getUserID();
        
        // Check if user is already participating
        var leaderboardGr = new GlideRecord('x_1599224_officehu_wellness_leaderboard');
        leaderboardGr.addQuery('challenge', challengeId);
        leaderboardGr.addQuery('participant', userId);
        leaderboardGr.query();
        
        if (leaderboardGr.hasNext()) {
            gs.addErrorMessage('You are already participating in this challenge!');
        } else {
            // Add user to challenge leaderboard
            var newParticipant = new GlideRecord('x_1599224_officehu_wellness_leaderboard');
            newParticipant.initialize();
            newParticipant.setValue('challenge', challengeId);
            newParticipant.setValue('participant', userId);
            newParticipant.setValue('current_score', 0);
            newParticipant.setValue('rank_position', 999);
            newParticipant.setValue('participation_status', 'active');
            newParticipant.insert();
            
            // Update challenge participant count
            var challengeGr = new GlideRecord('x_1599224_officehu_wellness_challenge');
            if (challengeGr.get(challengeId)) {
                var currentCount = parseInt(challengeGr.getValue('current_participants')) || 0;
                challengeGr.setValue('current_participants', currentCount + 1);
                challengeGr.update();
            }
            
            gs.addInfoMessage('Successfully joined the challenge! Start logging activities to earn points.');
            
            // Create welcome notification
            var notificationGr = new GlideRecord('x_1599224_officehu_notification');
            notificationGr.initialize();
            notificationGr.setValue('user', userId);
            notificationGr.setValue('type', 'challenge_joined');
            notificationGr.setValue('priority', 'medium');
            notificationGr.setValue('title', '🏆 Challenge Joined!');
            notificationGr.setValue('message', 
                'Welcome to "' + current.getValue('challenge_name') + '"! Start logging activities to compete with your colleagues.');
            notificationGr.setValue('is_read', false);
            notificationGr.insert();
        }
        
        action.setRedirectURL(current);
    `
})

// ===== LEAVE REQUEST UI ACTIONS =====

// Quick Approve - Manager action for leave requests
UiAction({
    $id: Now.ID['leave_quick_approve'],
    table: 'x_1599224_officehu_leave_request',
    name: 'Quick Approve',
    actionName: 'quick_approve_leave',
    active: true,
    hint: 'Quickly approve this leave request',
    showUpdate: true,
    form: {
        showButton: true,
        style: 'primary'
    },
    list: {
        showButton: true,
        style: 'primary'
    },
    roles: ['x_1599224_officehu.manager', 'x_1599224_officehu.hr_admin'],
    condition: `
        // Only show for pending requests
        current.getValue('status') == 'pending';
    `,
    script: `
        current.setValue('status', 'approved');
        current.setValue('approved_by', gs.getUserID());
        current.setValue('approval_date', new GlideDateTime().getDisplayValue());
        current.setValue('comments', 'Approved via Quick Approve');
        current.update();
        
        // Send notification to employee
        var employeeId = current.getValue('employee');
        var notificationGr = new GlideRecord('x_1599224_officehu_notification');
        notificationGr.initialize();
        notificationGr.setValue('user', employeeId);
        notificationGr.setValue('type', 'leave_approved');
        notificationGr.setValue('priority', 'high');
        notificationGr.setValue('title', '✅ Leave Request Approved');
        notificationGr.setValue('message', 
            'Your leave request from ' + current.getValue('start_date') + 
            ' to ' + current.getValue('end_date') + ' has been approved!');
        notificationGr.setValue('is_read', false);
        notificationGr.insert();
        
        gs.addInfoMessage('Leave request approved successfully!');
        action.setRedirectURL(current);
    `
})

// Request Additional Info - Manager action for leave requests
UiAction({
    $id: Now.ID['leave_request_info'],
    table: 'x_1599224_officehu_leave_request',
    name: 'Request More Info',
    actionName: 'request_leave_info',
    active: true,
    hint: 'Request additional information from employee',
    showUpdate: true,
    form: {
        showButton: true,
        style: 'unstyled'
    },
    list: {
        showButton: true,
        style: 'unstyled'
    },
    roles: ['x_1599224_officehu.manager', 'x_1599224_officehu.hr_admin'],
    condition: `
        current.getValue('status') == 'pending';
    `,
    script: `
        // Prompt manager for additional info request
        var additionalInfo = prompt('What additional information do you need from the employee?');
        
        if (additionalInfo && additionalInfo.trim() !== '') {
            current.setValue('status', 'info_requested');
            current.setValue('comments', 'Additional info requested: ' + additionalInfo);
            current.update();
            
            // Send notification to employee
            var employeeId = current.getValue('employee');
            var notificationGr = new GlideRecord('x_1599224_officehu_notification');
            notificationGr.initialize();
            notificationGr.setValue('user', employeeId);
            notificationGr.setValue('type', 'leave_info_requested');
            notificationGr.setValue('priority', 'high');
            notificationGr.setValue('title', '📋 Additional Info Requested');
            notificationGr.setValue('message', 
                'Your manager has requested additional information for your leave request: ' + additionalInfo);
            notificationGr.setValue('is_read', false);
            notificationGr.insert();
            
            gs.addInfoMessage('Information request sent to employee.');
        }
        
        action.setRedirectURL(current);
    `
})

// ===== TIMESHEET UI ACTIONS =====

// Submit for Approval - Employee action for timesheets
UiAction({
    $id: Now.ID['timesheet_submit'],
    table: 'x_1599224_officehu_timesheet',
    name: 'Submit for Approval',
    actionName: 'submit_timesheet',
    active: true,
    hint: 'Submit timesheet for manager approval',
    showUpdate: true,
    form: {
        showButton: true,
        style: 'primary'
    },
    condition: `
        current.getValue('status') == 'draft' && 
        current.getValue('employee') == gs.getUserID();
    `,
    script: `
        // Validate timesheet has hours
        var totalHours = parseFloat(current.getValue('total_hours')) || 0;
        
        if (totalHours <= 0) {
            gs.addErrorMessage('Cannot submit timesheet with zero hours. Please add time entries first.');
            return;
        }
        
        current.setValue('status', 'submitted');
        current.setValue('submitted_date', new GlideDateTime().getDisplayValue());
        current.update();
        
        // Notify manager
        var employeeGr = new GlideRecord('sys_user');
        if (employeeGr.get(current.getValue('employee'))) {
            var managerId = employeeGr.getValue('manager');
            
            if (managerId) {
                var notificationGr = new GlideRecord('x_1599224_officehu_notification');
                notificationGr.initialize();
                notificationGr.setValue('user', managerId);
                notificationGr.setValue('type', 'timesheet_submitted');
                notificationGr.setValue('priority', 'medium');
                notificationGr.setValue('title', '⏰ Timesheet Submitted for Approval');
                notificationGr.setValue('message', 
                    employeeGr.getValue('first_name') + ' ' + employeeGr.getValue('last_name') + 
                    ' submitted timesheet for week ' + current.getValue('week_ending') + 
                    ' (' + totalHours + ' hours)');
                notificationGr.setValue('is_read', false);
                notificationGr.insert();
            }
        }
        
        gs.addInfoMessage('Timesheet submitted for approval successfully!');
        action.setRedirectURL(current);
    `
})

// Bulk Approve Timesheets - Manager list action
UiAction({
    $id: Now.ID['timesheet_bulk_approve'],
    table: 'x_1599224_officehu_timesheet',
    name: 'Bulk Approve Selected',
    actionName: 'bulk_approve_timesheets',
    active: true,
    hint: 'Approve all selected timesheets',
    showUpdate: true,
    showMultipleUpdate: true,
    list: {
        showButton: true,
        style: 'primary'
    },
    roles: ['x_1599224_officehu.manager', 'x_1599224_officehu.hr_admin'],
    condition: `
        current.getValue('status') == 'submitted';
    `,
    script: `
        var approvedCount = 0;
        var currentGR = new GlideRecord('x_1599224_officehu_timesheet');
        
        // Process each selected record
        for (var id in current) {
            if (currentGR.get(id)) {
                if (currentGR.getValue('status') == 'submitted') {
                    currentGR.setValue('status', 'approved');
                    currentGR.setValue('approved_by', gs.getUserID());
                    currentGR.setValue('approval_date', new GlideDateTime().getDisplayValue());
                    currentGR.update();
                    approvedCount++;
                    
                    // Send notification to employee
                    var employeeId = currentGR.getValue('employee');
                    var notificationGr = new GlideRecord('x_1599224_officehu_notification');
                    notificationGr.initialize();
                    notificationGr.setValue('user', employeeId);
                    notificationGr.setValue('type', 'timesheet_approved');
                    notificationGr.setValue('priority', 'medium');
                    notificationGr.setValue('title', '✅ Timesheet Approved');
                    notificationGr.setValue('message', 
                        'Your timesheet for week ending ' + currentGR.getValue('week_ending') + ' has been approved.');
                    notificationGr.setValue('is_read', false);
                    notificationGr.insert();
                }
            }
        }
        
        gs.addInfoMessage(approvedCount + ' timesheet(s) approved successfully!');
    `
})

// ===== ATTENDANCE UI ACTIONS =====

// Clock Out Now - Quick clock out action
UiAction({
    $id: Now.ID['attendance_clock_out'],
    table: 'x_1599224_officehu_attendance',
    name: 'Clock Out Now',
    actionName: 'quick_clock_out',
    active: true,
    hint: 'Complete this attendance record by clocking out',
    showUpdate: true,
    form: {
        showButton: true,
        style: 'primary'
    },
    condition: `
        current.getValue('employee') == gs.getUserID() && 
        current.getValue('clock_out_time').nil();
    `,
    script: `
        var now = new GlideDateTime();
        current.setValue('clock_out_time', now.getDisplayValue());
        
        // Calculate total hours
        var clockIn = new GlideDateTime(current.getValue('clock_in_time'));
        var totalMs = now.getNumericValue() - clockIn.getNumericValue();
        var totalHours = totalMs / (1000 * 60 * 60 * 1000);
        
        current.setValue('total_hours', totalHours.toFixed(2));
        current.setValue('status', 'completed');
        current.update();
        
        gs.addInfoMessage('Clocked out successfully! Total time: ' + totalHours.toFixed(2) + ' hours');
        action.setRedirectURL(current);
    `
})