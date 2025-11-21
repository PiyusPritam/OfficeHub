import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, BooleanColumn, DateTimeColumn, IntegerColumn } from '@servicenow/sdk/core'

// AI Chat Session Table - Manages AI chatbot conversations
export const x_1599224_officehu_ai_chat_session = Table({
    name: 'x_1599224_officehu_ai_chat_session',
    label: 'AI Chat Session',
    description: 'AI chatbot conversation sessions for employees',
    schema: {
        user: ReferenceColumn({
            label: 'User',
            referenceTable: 'sys_user',
            mandatory: true,
            description: 'Employee who initiated the chat session'
        }),
        title: StringColumn({
            label: 'Session Title',
            maxLength: 255,
            default: 'New Chat Session',
            description: 'Title or topic of the chat session'
        }),
        context_type: StringColumn({
            label: 'Context Type',
            maxLength: 50,
            choices: {
                general: { label: 'General Help', sequence: 0 },
                hr_questions: { label: 'HR Questions', sequence: 1 },
                leave_help: { label: 'Leave Management', sequence: 2 },
                timesheet_help: { label: 'Timesheet Assistance', sequence: 3 },
                wellness_coach: { label: 'Wellness Coaching', sequence: 4 },
                policy_info: { label: 'Policy Information', sequence: 5 },
                technical_support: { label: 'Technical Support', sequence: 6 }
            },
            dropdown: 'dropdown_with_none',
            default: 'general',
            description: 'Type of assistance or context for the chat'
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 20,
            choices: {
                active: { label: 'Active', sequence: 0 },
                paused: { label: 'Paused', sequence: 1 },
                completed: { label: 'Completed', sequence: 2 },
                escalated: { label: 'Escalated to Human', sequence: 3 }
            },
            dropdown: 'dropdown_without_none',
            default: 'active',
            description: 'Current status of the chat session'
        }),
        message_count: IntegerColumn({
            label: 'Message Count',
            default: '0',
            read_only: true,
            description: 'Total number of messages in this session'
        }),
        satisfaction_rating: IntegerColumn({
            label: 'Satisfaction Rating',
            min: 1,
            max: 5,
            description: 'User satisfaction rating (1-5 stars)'
        }),
        escalated_to: ReferenceColumn({
            label: 'Escalated To',
            referenceTable: 'sys_user',
            description: 'Human agent if chat was escalated'
        }),
        last_activity: DateTimeColumn({
            label: 'Last Activity',
            read_only: true,
            description: 'Timestamp of last message or activity'
        }),
        is_archived: BooleanColumn({
            label: 'Archived',
            default: false,
            description: 'Whether the session is archived'
        }),
        session_summary: StringColumn({
            label: 'Session Summary',
            maxLength: 1000,
            description: 'AI-generated summary of the conversation'
        })
    },
    display: 'title',
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    live_feed: true,
    audit: true
})