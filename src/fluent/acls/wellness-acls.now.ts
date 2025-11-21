import '@servicenow/sdk/global'
import { Acl } from '@servicenow/sdk/core'
import { employee_role, manager_role, hr_role, admin_role } from '../roles/roles.now.ts'

// ===== WELLNESS ACTIVITY TABLE ACLs =====

// Allow employees to create their own wellness activities
Acl({
    $id: Now.ID['wellness_activity_create'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_activity',
    operation: 'create',
    roles: [employee_role],
    script: `
        // Employees can only create activities for themselves
        answer = (gs.getUserID() == current.employee);
    `,
    description: 'Allow employees to create their own wellness activities'
})

// Allow employees to read their own wellness activities
Acl({
    $id: Now.ID['wellness_activity_read'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_activity',
    operation: 'read',
    roles: [employee_role],
    script: `
        // Employees can read their own activities, managers can read their team's
        var currentUser = gs.getUserID();
        var activityEmployee = current.employee;
        
        // Allow if it's the employee's own activity
        if (currentUser == activityEmployee) {
            answer = true;
            return;
        }
        
        // Allow if current user is a manager of the activity owner
        var empGr = new GlideRecord('sys_user');
        if (empGr.get(activityEmployee)) {
            var managerSysId = empGr.getValue('manager');
            answer = (currentUser == managerSysId);
        } else {
            answer = false;
        }
    `,
    description: 'Allow employees to read their own wellness activities, managers can read team activities'
})

// Allow employees to update their own wellness activities (within 24 hours)
Acl({
    $id: Now.ID['wellness_activity_write'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_activity',
    operation: 'write',
    roles: [employee_role],
    script: `
        // Employees can edit their own activities within 24 hours of creation
        var currentUser = gs.getUserID();
        
        if (currentUser != current.employee) {
            answer = false;
            return;
        }
        
        // Check if activity was created within last 24 hours
        var createdTime = new GlideDateTime(current.sys_created_on);
        var now = new GlideDateTime();
        var diffMs = now.getNumericValue() - createdTime.getNumericValue();
        var diffHours = diffMs / (1000 * 60 * 60 * 1000);
        
        answer = (diffHours <= 24);
    `,
    description: 'Allow employees to edit their own wellness activities within 24 hours'
})

// Restrict delete operations to HR and Admin only
Acl({
    $id: Now.ID['wellness_activity_delete'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_activity',
    operation: 'delete',
    roles: [hr_role],
    description: 'Only HR and Admin can delete wellness activities'
})

// ===== WELLNESS GOAL TABLE ACLs =====

// Allow employees to create personal goals, managers to create team goals
Acl({
    $id: Now.ID['wellness_goal_create'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_goal',
    operation: 'create',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        var goalType = current.goal_type;
        
        // Personal goals: employee can create for themselves
        if (goalType == 'personal') {
            answer = (currentUser == current.employee);
        }
        // Team/department goals: only managers or HR can create
        else if (goalType == 'team' || goalType == 'department') {
            answer = gs.hasRole('x_1599224_officehu.manager') || gs.hasRole('x_1599224_officehu.hr_admin');
        }
        // Company goals: only HR can create
        else if (goalType == 'company') {
            answer = gs.hasRole('x_1599224_officehu.hr_admin');
        }
        else {
            answer = false;
        }
    `,
    description: 'Goal creation permissions based on goal type'
})

// Allow employees to read goals they participate in
Acl({
    $id: Now.ID['wellness_goal_read'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_goal',
    operation: 'read',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        var goalType = current.goal_type;
        
        // Personal goals: only the owner can read
        if (goalType == 'personal') {
            answer = (currentUser == current.employee);
        }
        // Team/department/company goals: all employees can read
        else {
            answer = true;
        }
    `,
    description: 'Goal read permissions based on goal type and ownership'
})

// Allow goal owners and managers to update goals
Acl({
    $id: Now.ID['wellness_goal_write'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_goal',
    operation: 'write',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        var goalType = current.goal_type;
        
        // Personal goals: only owner can update
        if (goalType == 'personal') {
            answer = (currentUser == current.employee);
        }
        // Other goal types: managers and HR can update
        else {
            answer = gs.hasRole('x_1599224_officehu.manager') || gs.hasRole('x_1599224_officehu.hr_admin');
        }
    `,
    description: 'Goal update permissions based on type and role'
})

// ===== WELLNESS CHALLENGE TABLE ACLs =====

// Allow managers and HR to create challenges
Acl({
    $id: Now.ID['wellness_challenge_create'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_challenge',
    operation: 'create',
    roles: [manager_role],
    description: 'Managers and HR can create wellness challenges'
})

// Allow all employees to read public challenges
Acl({
    $id: Now.ID['wellness_challenge_read'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_challenge',
    operation: 'read',
    roles: [employee_role],
    script: `
        // Allow reading public challenges or challenges organized by current user
        var currentUser = gs.getUserID();
        answer = (current.is_public == 'true') || (currentUser == current.organizer);
    `,
    description: 'Employees can read public challenges or challenges they organize'
})

// Allow challenge organizers and HR to update challenges
Acl({
    $id: Now.ID['wellness_challenge_write'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_challenge',
    operation: 'write',
    roles: [employee_role],
    script: `
        var currentUser = gs.getUserID();
        // Challenge organizers or HR can update
        answer = (currentUser == current.organizer) || gs.hasRole('x_1599224_officehu.hr_admin');
    `,
    description: 'Challenge organizers and HR can update challenges'
})

// ===== WELLNESS LEADERBOARD TABLE ACLs =====

// Restrict leaderboard creation to system processes only
Acl({
    $id: Now.ID['wellness_leaderboard_create'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_leaderboard',
    operation: 'create',
    roles: [admin_role],
    description: 'Only system admin can create leaderboard entries'
})

// Allow employees to read leaderboard entries for public challenges
Acl({
    $id: Now.ID['wellness_leaderboard_read'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_leaderboard',
    operation: 'read',
    roles: [employee_role],
    script: `
        // Check if associated challenge is public
        var challengeGr = new GlideRecord('x_1599224_officehu_wellness_challenge');
        if (challengeGr.get(current.challenge)) {
            answer = (challengeGr.getValue('is_public') == 'true');
        } else {
            answer = false;
        }
    `,
    description: 'Employees can read leaderboard for public challenges'
})

// Restrict leaderboard updates to system processes
Acl({
    $id: Now.ID['wellness_leaderboard_write'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_leaderboard',
    operation: 'write',
    roles: [admin_role],
    description: 'Only system processes can update leaderboard entries'
})

// ===== WELLNESS RESOURCE TABLE ACLs =====

// Allow HR to create wellness resources
Acl({
    $id: Now.ID['wellness_resource_create'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_resource',
    operation: 'create',
    roles: [hr_role],
    description: 'HR can create wellness resources'
})

// Allow all employees to read active wellness resources
Acl({
    $id: Now.ID['wellness_resource_read'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_resource',
    operation: 'read',
    roles: [employee_role],
    condition: 'is_active=true',
    description: 'Employees can read active wellness resources'
})

// Allow HR to update wellness resources
Acl({
    $id: Now.ID['wellness_resource_write'],
    active: true,
    type: 'record',
    table: 'x_1599224_officehu_wellness_resource',
    operation: 'write',
    roles: [hr_role],
    description: 'HR can update wellness resources'
})