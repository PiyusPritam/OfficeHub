import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, BooleanColumn, DateTimeColumn } from '@servicenow/sdk/core'

// Social Post Interaction Table - Likes, comments, shares for posts
export const x_1599224_officehu_post_interaction = Table({
    name: 'x_1599224_officehu_post_interaction',
    label: 'Post Interaction',
    description: 'User interactions with social feed posts (likes, comments, shares)',
    schema: {
        post: ReferenceColumn({
            label: 'Post',
            referenceTable: 'x_1599224_officehu_social_post',
            mandatory: true,
            description: 'The post this interaction is for'
        }),
        user: ReferenceColumn({
            label: 'User',
            referenceTable: 'sys_user',
            mandatory: true,
            description: 'User who performed the interaction'
        }),
        interaction_type: StringColumn({
            label: 'Interaction Type',
            maxLength: 20,
            choices: {
                like: { label: 'Like', sequence: 0 },
                comment: { label: 'Comment', sequence: 1 },
                share: { label: 'Share', sequence: 2 },
                bookmark: { label: 'Bookmark', sequence: 3 },
                report: { label: 'Report', sequence: 4 }
            },
            dropdown: 'dropdown_without_none',
            mandatory: true,
            description: 'Type of interaction performed'
        }),
        comment_text: StringColumn({
            label: 'Comment Text',
            maxLength: 1000,
            description: 'Comment content (only for comment interactions)'
        }),
        parent_comment: ReferenceColumn({
            label: 'Parent Comment',
            referenceTable: 'x_1599224_officehu_post_interaction',
            description: 'Parent comment if this is a reply'
        }),
        is_active: BooleanColumn({
            label: 'Active',
            default: true,
            description: 'Whether the interaction is still active (false if user unliked, etc.)'
        }),
        mentioned_users: StringColumn({
            label: 'Mentioned Users',
            maxLength: 500,
            description: 'JSON array of users mentioned in comments'
        })
    },
    display: 'interaction_type',
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    audit: true
})

// Team Chat Room Table - Chat rooms for team communication
export const x_1599224_officehu_chat_room = Table({
    name: 'x_1599224_officehu_chat_room',
    label: 'Chat Room',
    description: 'Team chat rooms for real-time communication',
    schema: {
        name: StringColumn({
            label: 'Room Name',
            maxLength: 100,
            mandatory: true,
            description: 'Name of the chat room'
        }),
        description: StringColumn({
            label: 'Description',
            maxLength: 500,
            description: 'Description of the chat room purpose'
        }),
        room_type: StringColumn({
            label: 'Room Type',
            maxLength: 20,
            choices: {
                public: { label: 'Public', sequence: 0 },
                private: { label: 'Private', sequence: 1 },
                direct_message: { label: 'Direct Message', sequence: 2 },
                department: { label: 'Department', sequence: 3 },
                project: { label: 'Project', sequence: 4 },
                announcement: { label: 'Announcement Only', sequence: 5 }
            },
            dropdown: 'dropdown_without_none',
            default: 'public',
            description: 'Type and privacy level of the room'
        }),
        created_by: ReferenceColumn({
            label: 'Created By',
            referenceTable: 'sys_user',
            mandatory: true,
            description: 'User who created the chat room'
        }),
        member_count: StringColumn({
            label: 'Member Count',
            default: '0',
            read_only: true,
            description: 'Number of users in the room'
        }),
        last_message_time: DateTimeColumn({
            label: 'Last Message Time',
            read_only: true,
            description: 'Timestamp of the last message'
        }),
        last_message_preview: StringColumn({
            label: 'Last Message Preview',
            maxLength: 200,
            read_only: true,
            description: 'Preview of the last message sent'
        }),
        is_archived: BooleanColumn({
            label: 'Archived',
            default: false,
            description: 'Whether the room is archived'
        }),
        allow_external_users: BooleanColumn({
            label: 'Allow External Users',
            default: false,
            description: 'Whether external users can join this room'
        }),
        max_members: StringColumn({
            label: 'Max Members',
            default: '100',
            description: 'Maximum number of members allowed'
        })
    },
    display: 'name',
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    live_feed: true,
    audit: true
})