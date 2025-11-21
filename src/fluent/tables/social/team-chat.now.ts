import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, BooleanColumn, DateTimeColumn, IntegerColumn } from '@servicenow/sdk/core'

// Team Chat Message Table - Messages in team chat rooms
export const x_1599224_officehu_team_chat_message = Table({
    name: 'x_1599224_officehu_team_chat_message',
    label: 'Team Chat Message',
    description: 'Messages sent in team chat rooms',
    schema: {
        chat_room: ReferenceColumn({
            label: 'Chat Room',
            referenceTable: 'x_1599224_officehu_chat_room',
            mandatory: true,
            description: 'The chat room this message was sent to'
        }),
        sender: ReferenceColumn({
            label: 'Sender',
            referenceTable: 'sys_user',
            mandatory: true,
            description: 'User who sent the message'
        }),
        message_content: StringColumn({
            label: 'Message Content',
            maxLength: 2000,
            mandatory: true,
            description: 'The message text content'
        }),
        message_type: StringColumn({
            label: 'Message Type',
            maxLength: 20,
            choices: {
                text: { label: 'Text Message', sequence: 0 },
                file: { label: 'File Attachment', sequence: 1 },
                image: { label: 'Image', sequence: 2 },
                system: { label: 'System Message', sequence: 3 },
                announcement: { label: 'Announcement', sequence: 4 },
                poll: { label: 'Poll', sequence: 5 }
            },
            dropdown: 'dropdown_without_none',
            default: 'text',
            description: 'Type of message content'
        }),
        reply_to_message: ReferenceColumn({
            label: 'Reply To Message',
            referenceTable: 'x_1599224_officehu_team_chat_message',
            description: 'Message this is replying to (threaded conversation)'
        }),
        mentioned_users: StringColumn({
            label: 'Mentioned Users',
            maxLength: 1000,
            description: 'JSON array of user sys_ids mentioned in the message'
        }),
        attachment_count: IntegerColumn({
            label: 'Attachment Count',
            default: '0',
            read_only: true,
            description: 'Number of files attached to this message'
        }),
        reaction_count: IntegerColumn({
            label: 'Reaction Count',
            default: '0',
            read_only: true,
            description: 'Number of emoji reactions to this message'
        }),
        is_edited: BooleanColumn({
            label: 'Edited',
            default: false,
            read_only: true,
            description: 'Whether the message has been edited'
        }),
        edited_at: DateTimeColumn({
            label: 'Edited At',
            read_only: true,
            description: 'When the message was last edited'
        }),
        is_pinned: BooleanColumn({
            label: 'Pinned',
            default: false,
            description: 'Whether this message is pinned in the chat room'
        }),
        priority: StringColumn({
            label: 'Priority',
            maxLength: 10,
            choices: {
                normal: { label: 'Normal', sequence: 0 },
                important: { label: 'Important', sequence: 1 },
                urgent: { label: 'Urgent', sequence: 2 }
            },
            dropdown: 'dropdown_without_none',
            default: 'normal',
            description: 'Message priority level'
        })
    },
    display: 'message_content',
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    audit: true,
    text_index: true
})

// Chat Room Membership Table - Users who are members of chat rooms
export const x_1599224_officehu_chat_room_member = Table({
    name: 'x_1599224_officehu_chat_room_member',
    label: 'Chat Room Member',
    description: 'Membership records for users in chat rooms',
    schema: {
        chat_room: ReferenceColumn({
            label: 'Chat Room',
            referenceTable: 'x_1599224_officehu_chat_room',
            mandatory: true,
            description: 'The chat room'
        }),
        user: ReferenceColumn({
            label: 'User',
            referenceTable: 'sys_user',
            mandatory: true,
            description: 'User who is a member of the room'
        }),
        role: StringColumn({
            label: 'Role',
            maxLength: 20,
            choices: {
                member: { label: 'Member', sequence: 0 },
                moderator: { label: 'Moderator', sequence: 1 },
                admin: { label: 'Admin', sequence: 2 },
                owner: { label: 'Owner', sequence: 3 }
            },
            dropdown: 'dropdown_without_none',
            default: 'member',
            description: 'User role within the chat room'
        }),
        joined_at: DateTimeColumn({
            label: 'Joined At',
            mandatory: true,
            description: 'When the user joined the room'
        }),
        last_read_message: ReferenceColumn({
            label: 'Last Read Message',
            referenceTable: 'x_1599224_officehu_team_chat_message',
            description: 'Last message read by this user (for unread count)'
        }),
        notification_settings: StringColumn({
            label: 'Notification Settings',
            maxLength: 20,
            choices: {
                all: { label: 'All Messages', sequence: 0 },
                mentions_only: { label: 'Mentions Only', sequence: 1 },
                none: { label: 'No Notifications', sequence: 2 }
            },
            dropdown: 'dropdown_without_none',
            default: 'all',
            description: 'Notification preference for this room'
        }),
        is_muted: BooleanColumn({
            label: 'Muted',
            default: false,
            description: 'Whether notifications are muted for this user'
        }),
        is_favorite: BooleanColumn({
            label: 'Favorite',
            default: false,
            description: 'Whether user has marked this room as favorite'
        })
    },
    display: 'user',
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    audit: true
})