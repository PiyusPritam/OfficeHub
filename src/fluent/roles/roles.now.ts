import '@servicenow/sdk/global'
import { Role } from '@servicenow/sdk/core'

// Basic user role for all employees
export const employee_role = Role({
    $id: Now.ID['employee-role'],
    name: 'x_1599224_officehu.employee',
    description: 'Basic employee role for OfficeHub access'
})

// Manager role with additional permissions
export const manager_role = Role({
    $id: Now.ID['manager-role'],
    name: 'x_1599224_officehu.manager',
    description: 'Manager role with approval permissions for leave requests and timesheets',
    contains_roles: [employee_role]
})

// HR role with full access to employee management
export const hr_role = Role({
    $id: Now.ID['hr-role'],
    name: 'x_1599224_officehu.hr_admin',
    description: 'HR Administrator role with full access to employee data and reports',
    contains_roles: [manager_role]
})

// Admin role for application administration
export const admin_role = Role({
    $id: Now.ID['admin-role'],
    name: 'x_1599224_officehu.admin',
    description: 'OfficeHub Administrator role with full application access',
    contains_roles: [hr_role]
})