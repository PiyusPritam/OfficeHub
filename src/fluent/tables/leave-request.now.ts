import '@servicenow/sdk/global'
import { Table, ReferenceColumn, DateColumn, StringColumn, IntegerColumn, BooleanColumn } from '@servicenow/sdk/core'

// Leave requests table for vacation, sick leave, etc.
export const x_1599224_officehu_leave_request = Table({
    name: 'x_1599224_officehu_leave_request',
    label: 'Leave Request',
    schema: {
        user: ReferenceColumn({ 
            label: 'User', 
            referenceTable: 'sys_user',
            mandatory: true
        }),
        leave_type: StringColumn({
            label: 'Leave Type',
            maxLength: 50,
            mandatory: true,
            choices: {
                vacation: { label: 'Vacation', sequence: 0 },
                sick: { label: 'Sick Leave', sequence: 1 },
                personal: { label: 'Personal Leave', sequence: 2 },
                maternity: { label: 'Maternity Leave', sequence: 3 },
                paternity: { label: 'Paternity Leave', sequence: 4 },
                bereavement: { label: 'Bereavement Leave', sequence: 5 },
                unpaid: { label: 'Unpaid Leave', sequence: 6 }
            }
        }),
        start_date: DateColumn({ 
            label: 'Start Date',
            mandatory: true
        }),
        end_date: DateColumn({ 
            label: 'End Date',
            mandatory: true
        }),
        days_requested: IntegerColumn({ 
            label: 'Days Requested',
            read_only: true
        }),
        reason: StringColumn({ 
            label: 'Reason', 
            maxLength: 1000,
            mandatory: true
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 20,
            default: 'pending',
            choices: {
                pending: { label: 'Pending Approval', sequence: 0 },
                approved: { label: 'Approved', sequence: 1 },
                rejected: { label: 'Rejected', sequence: 2 },
                cancelled: { label: 'Cancelled', sequence: 3 }
            }
        }),
        approver: ReferenceColumn({ 
            label: 'Approver', 
            referenceTable: 'sys_user'
        }),
        approval_date: DateColumn({ 
            label: 'Approval Date' 
        }),
        approval_comments: StringColumn({ 
            label: 'Approval Comments', 
            maxLength: 500 
        }),
        is_emergency: BooleanColumn({ 
            label: 'Emergency Leave', 
            default: false 
        })
    },
    display: 'user',
    extensible: false,
    accessible_from: 'public',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true
})