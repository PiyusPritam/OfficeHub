import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, BooleanColumn, IntegerColumn } from '@servicenow/sdk/core'

// AI Chat Messages Table - Individual messages in AI chatbot conversations
export const x_1599224_officehu_ai_chat_message = Table({
    name: 'x_1599224_officehu_ai_chat_message',
    label: 'AI Chat Message',
    description: 'Individual messages within AI chat sessions',
    schema: {
        chat_session: ReferenceColumn({
            label: 'Chat Session',
            referenceTable: 'x_1599224_officehu_ai_chat_session',
            mandatory: true,
            description: 'The chat session this message belongs to'
        }),
        sender_type: StringColumn({
            label: 'Sender Type',
            maxLength: 20,
            choices: {
                user: { label: 'User', sequence: 0 },
                ai_assistant: { label: 'AI Assistant', sequence: 1 },
                system: { label: 'System', sequence: 2 },
                human_agent: { label: 'Human Agent', sequence: 3 }
            },
            dropdown: 'dropdown_without_none',
            mandatory: true,
            description: 'Type of entity that sent the message'
        }),
        sender_user: ReferenceColumn({
            label: 'Sender User',
            referenceTable: 'sys_user',
            description: 'User who sent the message (if sender_type is user or human_agent)'
        }),
        message_content: StringColumn({
            label: 'Message Content',
            maxLength: 4000,
            mandatory: true,
            description: 'The actual message text content'
        }),
        message_type: StringColumn({
            label: 'Message Type',
            maxLength: 30,
            choices: {
                text: { label: 'Text Message', sequence: 0 },
                quick_reply: { label: 'Quick Reply', sequence: 1 },
                action_suggestion: { label: 'Action Suggestion', sequence: 2 },
                form_data: { label: 'Form Data', sequence: 3 },
                file_attachment: { label: 'File Attachment', sequence: 4 },
                system_notification: { label: 'System Notification', sequence: 5 }
            },
            dropdown: 'dropdown_without_none',
            default: 'text',
            description: 'Type of message content'
        }),
        ai_confidence: IntegerColumn({
            label: 'AI Confidence Score',
            min: 0,
            max: 100,
            description: 'AI confidence level for generated responses (0-100%)'
        }),
        action_data: StringColumn({
            label: 'Action Data',
            maxLength: 2000,
            description: 'JSON data for action suggestions or quick replies'
        }),
        parent_message: ReferenceColumn({
            label: 'Parent Message',
            referenceTable: 'x_1599224_officehu_ai_chat_message',
            description: 'Reference to message this is replying to'
        }),
        sequence_number: IntegerColumn({
            label: 'Sequence Number',
            mandatory: true,
            description: 'Order of message within the session'
        }),
        is_helpful: BooleanColumn({
            label: 'Marked as Helpful',
            default: false,
            description: 'User feedback on AI response helpfulness'
        }),
        processing_time_ms: IntegerColumn({
            label: 'Processing Time (ms)',
            description: 'Time taken to generate AI response in milliseconds'
        }),
        intent_detected: StringColumn({
            label: 'Detected Intent',
            maxLength: 100,
            description: 'AI-detected user intent or category'
        }),
        entities_extracted: StringColumn({
            label: 'Extracted Entities',
            maxLength: 500,
            description: 'JSON array of entities extracted from user message'
        })
    },
    display: 'message_content',
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    audit: true
})