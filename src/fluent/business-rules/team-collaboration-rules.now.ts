import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'

// Business rule to update team schedule coverage
export const teamCoverageUpdater = BusinessRule({
    $id: Now.ID['team-coverage-updater'],
    name: 'Team Coverage Updater',
    table: 'x_1599224_officehu_team_schedule',
    when: 'before',
    action: ['insert', 'update'],
    script: `
        try {
            var team = current.getValue('team');
            var startTime = current.getValue('start_time');
            var endTime = current.getValue('end_time');
            
            // Calculate current coverage for this time slot
            var coverage = calculateTeamCoverage(team, startTime, endTime, current.getUniqueValue());
            current.setValue('current_coverage', coverage);
            
            // Update status based on coverage
            var required = parseInt(current.getValue('coverage_required') || '1');
            if (coverage < required) {
                current.setValue('status', 'needs_coverage');
            } else if (coverage >= required) {
                current.setValue('status', 'confirmed');
            }
            
        } catch (e) {
            gs.error('Error updating team coverage: ' + e.message);
        }
        
        function calculateTeamCoverage(team, startTime, endTime, currentId) {
            var gr = new GlideRecord('x_1599224_officehu_team_schedule');
            gr.addQuery('team', team);
            gr.addQuery('start_time', '<=', endTime);
            gr.addQuery('end_time', '>=', startTime);
            gr.addQuery('status', 'IN', 'scheduled,confirmed');
            if (currentId) {
                gr.addQuery('sys_id', '!=', currentId);
            }
            gr.query();
            
            return gr.getRowCount();
        }
    `,
    order: 100,
    active: true
})

// Business rule for coverage request notifications
export const coverageRequestNotifier = BusinessRule({
    $id: Now.ID['coverage-request-notifier'],
    name: 'Coverage Request Notifier',
    table: 'x_1599224_officehu_coverage_request',
    when: 'after',
    action: ['insert', 'update'],
    script: `
        try {
            var requesterId = current.getValue('requester');
            var status = current.getValue('status');
            var previousStatus = previous.getValue('status');
            var coverageDate = current.getDisplayValue('coverage_date');
            var startTime = current.getDisplayValue('start_time');
            var endTime = current.getDisplayValue('end_time');
            var volunteer = current.getValue('volunteer');
            
            // Notify team members when new coverage request is created
            if (status == 'open' && !previous.getValue('sys_id')) {
                notifyTeamMembersOfCoverageRequest(requesterId, coverageDate, startTime, endTime, current.getValue('reason'));
            }
            
            // Notify requester when someone volunteers
            if (status == 'assigned' && previousStatus != 'assigned' && volunteer) {
                createNotification(
                    requesterId,
                    'alert',
                    'Coverage Request Accepted',
                    getUserName(volunteer) + ' has volunteered to cover your shift on ' + coverageDate + ' from ' + startTime + ' to ' + endTime,
                    'medium'
                );
            }
            
            // Notify volunteer when coverage is confirmed
            if (status == 'covered' && previousStatus == 'assigned' && volunteer) {
                createNotification(
                    volunteer,
                    'achievement',
                    'Coverage Assignment Confirmed',
                    'Your coverage for ' + getUserName(requesterId) + ' on ' + coverageDate + ' has been confirmed. Thank you for being a team player!',
                    'low'
                );
            }
            
        } catch (e) {
            gs.error('Error handling coverage request notifications: ' + e.message);
        }
        
        function notifyTeamMembersOfCoverageRequest(requesterId, date, startTime, endTime, reason) {
            // Get team members (excluding requester)
            var gr = new GlideRecord('sys_user');
            gr.addQuery('active', true);
            gr.addQuery('sys_id', '!=', requesterId);
            gr.query();
            
            while (gr.next()) {
                createNotification(
                    gr.getUniqueValue(),
                    'approval_request',
                    'Coverage Request - Team Help Needed',
                    getUserName(requesterId) + ' needs coverage on ' + date + ' from ' + startTime + ' to ' + endTime + '. Reason: ' + reason,
                    'medium'
                );
            }
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
    `,
    order: 100,
    active: true
})