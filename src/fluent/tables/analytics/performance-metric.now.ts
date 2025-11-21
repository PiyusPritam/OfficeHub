import '@servicenow/sdk/global'
import { Table, ReferenceColumn, DecimalColumn, StringColumn, DateColumn, DateTimeColumn } from '@servicenow/sdk/core'

// Performance metrics tracking table
export const x_1599224_officehu_performance_metric = Table({
    name: 'x_1599224_officehu_performance_metric',
    label: 'Performance Metric',
    schema: {
        user: ReferenceColumn({ 
            label: 'User', 
            referenceTable: 'sys_user',
            mandatory: true
        }),
        date: DateColumn({ 
            label: 'Date',
            mandatory: true
        }),
        metric_type: StringColumn({
            label: 'Metric Type',
            maxLength: 50,
            mandatory: true,
            choices: {
                attendance_rate: { label: 'Attendance Rate', sequence: 0 },
                punctuality_score: { label: 'Punctuality Score', sequence: 1 },
                productivity_hours: { label: 'Productivity Hours', sequence: 2 },
                overtime_hours: { label: 'Overtime Hours', sequence: 3 },
                task_completion: { label: 'Task Completion Rate', sequence: 4 },
                team_collaboration: { label: 'Team Collaboration Score', sequence: 5 },
                wellness_score: { label: 'Wellness Score', sequence: 6 }
            }
        }),
        value: DecimalColumn({ 
            label: 'Metric Value',
            mandatory: true
        }),
        period: StringColumn({
            label: 'Period',
            maxLength: 20,
            choices: {
                daily: { label: 'Daily', sequence: 0 },
                weekly: { label: 'Weekly', sequence: 1 },
                monthly: { label: 'Monthly', sequence: 2 },
                quarterly: { label: 'Quarterly', sequence: 3 },
                yearly: { label: 'Yearly', sequence: 4 }
            }
        }),
        baseline_value: DecimalColumn({ 
            label: 'Baseline Value' 
        }),
        target_value: DecimalColumn({ 
            label: 'Target Value' 
        }),
        notes: StringColumn({ 
            label: 'Notes', 
            maxLength: 500 
        }),
        calculated_at: DateTimeColumn({ 
            label: 'Calculated At'
        })
    },
    display: 'metric_type',
    extensible: false,
    accessible_from: 'public',
    actions: ['create', 'read', 'update', 'delete'],
    allow_web_service_access: true
})