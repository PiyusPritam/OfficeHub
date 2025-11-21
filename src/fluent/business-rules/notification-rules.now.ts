import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

// Business rule for smart notifications on attendance events
export const smartNotificationGenerator = BusinessRule({
    $id: Now.ID['smart-notification-generator'],
    name: 'Smart Notification Generator',
    table: 'x_1599224_officehu_attendance',
    when: 'after',
    action: ['insert', 'update'],
    script: `
        try {
            var userId = current.getValue('user');
            var totalHours = parseFloat(current.getValue('total_hours') || '0');
            var clockOut = current.getValue('clock_out');
            var clockIn = current.getValue('clock_in');
            
            // Overtime alert
            if (totalHours > 8) {
                createNotification(
                    userId,
                    'overtime_alert',
                    'Overtime Alert',
                    'You worked ' + totalHours + ' hours today. Please ensure proper rest and work-life balance.',
                    'medium'
                );
            }
            
            // End of day reminders when clocking out
            if (clockOut && !previous.getValue('clock_out')) {
                // Check if timesheet needs to be submitted
                checkTimesheetReminder(userId);
                
                // Achievement notification for good performance
                if (totalHours >= 7.5 && totalHours <= 8.5) {
                    createNotification(
                        userId,
                        'achievement',
                        'Great Work Day!',
                        'You maintained perfect work-life balance today with ' + totalHours + ' productive hours.',
                        'low'
                    );
                }
            }
            
            // Late arrival notification
            if (clockIn && !previous.getValue('clock_in')) {
                var clockInTime = new GlideDateTime(clockIn);
                var expectedStart = new GlideDateTime();
                expectedStart.setDisplayValue(clockInTime.getDate() + ' 09:00:00');
                
                if (clockInTime.getNumericValue() > expectedStart.getNumericValue() + (15 * 60 * 1000)) { // 15 minutes late
                    createNotification(
                        userId,
                        'reminder',
                        'Punctuality Reminder',
                        'You arrived 15+ minutes late today. Consider adjusting your schedule for better punctuality.',
                        'low'
                    );
                }
            }
            
        } catch (e) {
            gs.error('Error generating smart notifications: ' + e.message);
        }
        
        function createNotification(userId, type, title, message, priority) {
            var gr = new GlideRecord('x_1599224_officehu_notification');
            gr.initialize();
            gr.setValue('user', userId);
            gr.setValue('notification_type', type);
            gr.setValue('title', title);
            gr.setValue('message', message);
            gr.setValue('priority', priority || 'medium');
            gr.setValue('sent_at', new GlideDateTime().getDisplayValue());
            gr.insert();
        }
        
        function checkTimesheetReminder(userId) {
            var today = new GlideDateTime().getDisplayValue().split(' ')[0];
            
            var gr = new GlideRecord('x_1599224_officehu_timesheet');
            gr.addQuery('user', userId);
            gr.addQuery('date', today);
            gr.addQuery('status', 'draft');
            gr.query();
            
            if (gr.getRowCount() > 0) {
                createNotification(
                    userId,
                    'timesheet_reminder',
                    'Timesheet Submission Reminder',
                    "Don't forget to submit your timesheet for today before leaving.",
                    'medium'
                );
            }
        }
    `,
    order: 200,
    active: true
})

// Business rule for leave request notifications
export const leaveNotificationGenerator = BusinessRule({
    $id: Now.ID['leave-notification-generator'],
    name: 'Leave Notification Generator',
    table: 'x_1599224_officehu_leave_request',
    when: 'after',
    action: ['insert', 'update'],
    script: `
        try {
            var userId = current.getValue('user');
            var status = current.getValue('status');
            var leaveType = current.getDisplayValue('leave_type');
            var startDate = current.getDisplayValue('start_date');
            var endDate = current.getDisplayValue('end_date');
            var approver = current.getValue('approver');
            
            // Notification to approver when leave is submitted
            if (status == 'pending' && !previous.getValue('sys_id')) {
                if (approver) {
                    createNotification(
                        approver,
                        'approval_request',
                        'Leave Request Pending Approval',
                        getUserName(userId) + ' has requested ' + leaveType + ' leave from ' + startDate + ' to ' + endDate,
                        'medium'
                    );
                }
            }
            
            // Notification to employee when status changes
            if (current.getValue('sys_id') && status != previous.getValue('status')) {
                var message = '';
                var notificationType = 'alert';
                
                switch (status) {
                    case 'approved':
                        message = 'Your ' + leaveType + ' leave request has been approved for ' + startDate + ' to ' + endDate + '.';
                        notificationType = 'achievement';
                        break;
                    case 'rejected':
                        message = 'Your ' + leaveType + ' leave request has been rejected. Reason: ' + current.getValue('approval_comments');
                        break;
                    case 'cancelled':
                        message = 'Your ' + leaveType + ' leave request has been cancelled.';
                        break;
                }
                
                if (message) {
                    createNotification(
                        userId,
                        notificationType,
                        'Leave Request Update',
                        message,
                        'medium'
                    );
                }
            }
            
            // Low leave balance warning
            if (status == 'approved' && previous.getValue('status') != 'approved') {
                checkLeaveBalanceWarning(userId);
            }
            
        } catch (e) {
            gs.error('Error generating leave notifications: ' + e.message);
        }
        
        function createNotification(userId, type, title, message, priority) {
            var gr = new GlideRecord('x_1599224_officehu_notification');
            gr.initialize();
            gr.setValue('user', userId);
            gr.setValue('notification_type', type);
            gr.setValue('title', title);
            gr.setValue('message', message);
            gr.setValue('priority', priority || 'medium');
            gr.setValue('sent_at', new GlideDateTime().getDisplayValue());
            gr.insert();
        }
        
        function getUserName(userId) {
            var gr = new GlideRecord('sys_user');
            if (gr.get(userId)) {
                return gr.getDisplayValue('name') || gr.getValue('user_name');
            }
            return 'Unknown User';
        }
        
        function checkLeaveBalanceWarning(userId) {
            var currentYear = new Date().getFullYear();
            var startOfYear = currentYear + '-01-01';
            var endOfYear = currentYear + '-12-31';
            
            var gr = new GlideRecord('x_1599224_officehu_leave_request');
            gr.addQuery('user', userId);
            gr.addQuery('status', 'approved');
            gr.addQuery('start_date', '>=', startOfYear);
            gr.addQuery('start_date', '<=', endOfYear);
            gr.query();
            
            var usedDays = 0;
            while (gr.next()) {
                usedDays += parseInt(gr.getValue('days_requested') || '0');
            }
            
            var totalAllocation = 25; // Default annual allocation
            var remaining = totalAllocation - usedDays;
            
            if (remaining <= 5 && remaining > 0) {
                createNotification(
                    userId,
                    'leave_balance',
                    'Low Leave Balance Warning',
                    'You have only ' + remaining + ' leave days remaining this year. Plan your time off carefully.',
                    'medium'
                );
            }
        }
    `,
    order: 100,
    active: true
})

// Business rule for performance achievement notifications
export const achievementNotificationGenerator = BusinessRule({
    $id: Now.ID['achievement-notification-generator'],
    name: 'Achievement Notification Generator',
    table: 'x_1599224_officehu_achievement',
    when: 'after',
    action: ['insert'],
    script: `
        try {
            var userId = current.getValue('user');
            var achievementTitle = current.getDisplayValue('title');
            var points = current.getValue('points');
            var level = current.getDisplayValue('level');
            
            createNotification(
                userId,
                'achievement',
                'New Achievement Unlocked!',
                'Congratulations! You earned the "' + achievementTitle + '" achievement and gained ' + points + ' points (' + level + ' level).',
                'low'
            );
            
        } catch (e) {
            gs.error('Error generating achievement notifications: ' + e.message);
        }
        
        function createNotification(userId, type, title, message, priority) {
            var gr = new GlideRecord('x_1599224_officehu_notification');
            gr.initialize();
            gr.setValue('user', userId);
            gr.setValue('notification_type', type);
            gr.setValue('title', title);
            gr.setValue('message', message);
            gr.setValue('priority', priority || 'medium');
            gr.setValue('sent_at', new GlideDateTime().getDisplayValue());
            gr.insert();
        }
    `,
    order: 100,
    active: true
})