import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'
import { employee_role, manager_role, admin_role } from '../roles/roles.now.ts'

// ===== ATTENDANCE TABLE ACLs =====

// Allow employees to create their own attendance records
Acl({
    $id: Now.ID['attendance_create'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_attendance',
    operation: 'create',
    roles: [employee_role],
    script: `
        // Employees can only create attendance for themselves
        answer = (gs.getUserID() == current.employee);
    `,
    description: 'Employees can create their own attendance records'
})

// Allow employees to read their own attendance, managers to read team attendance
Acl({
    $id: Now.ID['attendance_read'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_attendance',
    operation: 'read',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        var attendanceEmployee = current.employee;
        
        // Allow if it's the employee's own attendance
        if (currentUser == attendanceEmployee) {
            answer = true;
            return;
        }
        
        // Allow if current user is a manager of the attendance owner
        var empGr = new GlideRecord('sys_user');
        if (empGr.get(attendanceEmployee)) {
            var managerSysId = empGr.getValue('manager');
            answer = (currentUser == managerSysId);
        } else {
            answer = false;
        }
    `,
    description: 'Employees can read own attendance, managers can read team attendance'
})

// Allow employees to update their recent attendance records
Acl({
    $id: Now.ID['attendance_write'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_attendance',
    operation: 'write',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        
        // Only allow employees to edit their own records
        if (currentUser != current.employee) {
            answer = false;
            return;
        }
        
        // Only allow editing within same day or if manager/HR
        var clockInDate = new GlideDateTime(current.clock_in_time);
        var today = new GlideDate();
        var clockInDay = clockInDate.getDate();
        
        answer = (clockInDay.getValue() == today.getValue()) || 
                gs.hasRole('x_1599224_officehu.manager') || 
                gs.hasRole('x_1599224_officehu.hr_admin');
    `,
    description: 'Employees can edit same-day attendance, managers/HR can edit any'
})

// ===== LEAVE REQUEST TABLE ACLs =====

// Allow employees to create their own leave requests
Acl({
    $id: Now.ID['leave_request_create'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_leave_request',
    operation: 'create',
    roles: [employee_role],
    script: `
        answer = (gs.getUserID() == current.employee);
    `,
    description: 'Employees can create their own leave requests'
})

// Allow employees to read their own requests, managers to read team requests
Acl({
    $id: Now.ID['leave_request_read'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_leave_request',
    operation: 'read',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        var requestEmployee = current.employee;
        
        // Allow if it's the employee's own request
        if (currentUser == requestEmployee) {
            answer = true;
            return;
        }
        
        // Allow if current user is a manager of the request owner
        var empGr = new GlideRecord('sys_user');
        if (empGr.get(requestEmployee)) {
            var managerSysId = empGr.getValue('manager');
            answer = (currentUser == managerSysId);
        } else {
            answer = false;
        }
    `,
    description: 'Employees can read own requests, managers can read team requests'
})

// Allow employees to update pending requests, managers to update any
Acl({
    $id: Now.ID['leave_request_write'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_leave_request',
    operation: 'write',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        var requestEmployee = current.employee;
        var status = current.status;
        
        // Managers and HR can update any request
        if (gs.hasRole('x_1599224_officehu.manager') || gs.hasRole('x_1599224_officehu.hr_admin')) {
            answer = true;
            return;
        }
        
        // Employees can only update their own pending requests
        answer = (currentUser == requestEmployee) && (status == 'pending');
    `,
    description: 'Employees can update own pending requests, managers can update any'
})

// ===== TIMESHEET TABLE ACLs =====

// Allow employees to create their own timesheets
Acl({
    $id: Now.ID['timesheet_create'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_timesheet',
    operation: 'create',
    roles: [employee_role],
    script: `
        answer = (gs.getUserID() == current.employee);
    `,
    description: 'Employees can create their own timesheets'
})

// Allow employees to read their own timesheets, managers to read team timesheets
Acl({
    $id: Now.ID['timesheet_read'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_timesheet',
    operation: 'read',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        var timesheetEmployee = current.employee;
        
        // Allow if it's the employee's own timesheet
        if (currentUser == timesheetEmployee) {
            answer = true;
            return;
        }
        
        // Allow if current user is a manager of the timesheet owner
        var empGr = new GlideRecord('sys_user');
        if (empGr.get(timesheetEmployee)) {
            var managerSysId = empGr.getValue('manager');
            answer = (currentUser == managerSysId);
        } else {
            answer = false;
        }
    `,
    description: 'Employees can read own timesheets, managers can read team timesheets'
})

// Allow employees to update draft timesheets, managers to update any
Acl({
    $id: Now.ID['timesheet_write'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_timesheet',
    operation: 'write',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        var timesheetEmployee = current.employee;
        var status = current.status;
        
        // Managers and HR can update any timesheet
        if (gs.hasRole('x_1599224_officehu.manager') || gs.hasRole('x_1599224_officehu.hr_admin')) {
            answer = true;
            return;
        }
        
        // Employees can only update their own draft timesheets
        answer = (currentUser == timesheetEmployee) && (status == 'draft');
    `,
    description: 'Employees can update own draft timesheets, managers can update any'
})

// ===== NOTIFICATION TABLE ACLs =====

// Allow system to create notifications
Acl({
    $id: Now.ID['notification_create'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_notification',
    operation: 'create',
    roles: [admin_role],
    description: 'Only system processes can create notifications'
})

// Allow employees to read their own notifications
Acl({
    $id: Now.ID['notification_read'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_notification',
    operation: 'read',
    roles: [employee_role],
    script: `
        answer = (gs.getUserID() == current.user);
    `,
    description: 'Employees can read their own notifications'
})

// Allow employees to update their own notifications (mark as read)
Acl({
    $id: Now.ID['notification_write'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_notification',
    operation: 'write',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        
        // Allow employees to update their own notifications
        if (currentUser == current.user) {
            // Only allow updating the is_read field
            answer = current.isValidField('is_read') && current.changes();
        } else {
            answer = false;
        }
    `,
    description: 'Employees can mark their own notifications as read'
})

// ===== TEAM SCHEDULE TABLE ACLs =====

// Allow managers to create team schedules
Acl({
    $id: Now.ID['team_schedule_create'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_team_schedule',
    operation: 'create',
    roles: [manager_role],
    description: 'Managers can create team schedules'
})

// Allow employees to read team schedules
Acl({
    $id: Now.ID['team_schedule_read'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_team_schedule',
    operation: 'read',
    roles: [employee_role],
    description: 'All employees can read team schedules'
})

// Allow managers to update team schedules
Acl({
    $id: Now.ID['team_schedule_write'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_team_schedule',
    operation: 'write',
    roles: [manager_role],
    description: 'Managers can update team schedules'
})

// ===== COVERAGE REQUEST TABLE ACLs =====

// Allow employees to create coverage requests
Acl({
    $id: Now.ID['coverage_request_create'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_coverage_request',
    operation: 'create',
    roles: [employee_role],
    script: `
        answer = (gs.getUserID() == current.requesting_employee);
    `,
    description: 'Employees can create their own coverage requests'
})

// Allow employees to read coverage requests they're involved in
Acl({
    $id: Now.ID['coverage_request_read'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_coverage_request',
    operation: 'read',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        
        // Allow if user is the requester or volunteer
        answer = (currentUser == current.requesting_employee) || 
                (currentUser == current.volunteer_employee);
    `,
    description: 'Employees can read coverage requests they are involved in'
})

// Allow employees to update coverage requests they're involved in
Acl({
    $id: Now.ID['coverage_request_write'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_coverage_request',
    operation: 'write',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        var status = current.status;
        
        // Managers can update any coverage request
        if (gs.hasRole('x_1599224_officehu.manager')) {
            answer = true;
            return;
        }
        
        // Requesters can update pending requests
        if (currentUser == current.requesting_employee && status == 'pending') {
            answer = true;
            return;
        }
        
        // Volunteers can accept/decline requests
        if (currentUser == current.volunteer_employee && status == 'pending') {
            answer = true;
            return;
        }
        
        answer = false;
    `,
    description: 'Employees can update coverage requests they are involved in'
})