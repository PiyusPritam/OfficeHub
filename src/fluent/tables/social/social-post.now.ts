import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, BooleanColumn, DateTimeColumn, IntegerColumn } from '@servicenow/sdk/core'

// Social Feed Post Table - Employee posts for team collaboration
export const x_1599224_officehu_social_post = Table({
    name: 'x_1599224_officehu_social_post',
    label: 'Social Feed Post',
    description: 'Employee posts for team social feed and collaboration',
    schema: {
        author: ReferenceColumn({
            label: 'Author',
            referenceTable: 'sys_user',
            mandatory: true,
            description: 'Employee who created the post'
        }),
        content: StringColumn({
            label: 'Post Content',
            maxLength: 2000,
            mandatory: true,
            description: 'Text content of the post'
        }),
        post_type: StringColumn({
            label: 'Post Type',
            maxLength: 30,
            choices: {
                announcement: { label: 'Announcement', sequence: 0 },
                question: { label: 'Question', sequence: 1 },
                achievement: { label: 'Achievement', sequence: 2 },
                team_update: { label: 'Team Update', sequence: 3 },
                knowledge_share: { label: 'Knowledge Sharing', sequence: 4 },
                social: { label: 'Social', sequence: 5 },
                event_reminder: { label: 'Event Reminder', sequence: 6 },
                wellness_tip: { label: 'Wellness Tip', sequence: 7 }
            },
            dropdown: 'dropdown_without_none',
            default: 'social',
            description: 'Category or type of the post'
        }),
        visibility: StringColumn({
            label: 'Visibility',
            maxLength: 20,
            choices: {
                public: { label: 'Everyone', sequence: 0 },
                team_only: { label: 'Team Only', sequence: 1 },
                department: { label: 'Department', sequence: 2 },
                managers_only: { label: 'Managers Only', sequence: 3 }
            },
            dropdown: 'dropdown_without_none',
            default: 'public',
            description: 'Who can see this post'
        }),
        tags: StringColumn({
            label: 'Tags',
            maxLength: 500,
            description: 'Comma-separated tags for categorization and search'
        }),
        mentioned_users: StringColumn({
            label: 'Mentioned Users',
            maxLength: 1000,
            description: 'JSON array of user sys_ids mentioned in the post'
        }),
        attachment_count: IntegerColumn({
            label: 'Attachment Count',
            default: '0',
            read_only: true,
            description: 'Number of files attached to this post'
        }),
        like_count: IntegerColumn({
            label: 'Like Count',
            default: '0',
            read_only: true,
            description: 'Number of likes received'
        }),
        comment_count: IntegerColumn({
            label: 'Comment Count',
            default: '0',
            read_only: true,
            description: 'Number of comments on this post'
        }),
        share_count: IntegerColumn({
            label: 'Share Count',
            default: '0',
            read_only: true,
            description: 'Number of times this post was shared'
        }),
        is_pinned: BooleanColumn({
            label: 'Pinned',
            default: false,
            description: 'Whether this post is pinned to the top'
        }),
        is_featured: BooleanColumn({
            label: 'Featured',
            default: false,
            description: 'Whether this post is featured content'
        }),
        scheduled_publish: DateTimeColumn({
            label: 'Scheduled Publish',
            description: 'When to automatically publish this post'
        }),
        published_at: DateTimeColumn({
            label: 'Published At',
            description: 'When the post was published'
        }),
        status: StringColumn({
            label: 'Status',
            maxLength: 20,
            choices: {
                draft: { label: 'Draft', sequence: 0 },
                scheduled: { label: 'Scheduled', sequence: 1 },
                published: { label: 'Published', sequence: 2 },
                archived: { label: 'Archived', sequence: 3 },
                hidden: { label: 'Hidden', sequence: 4 }
            },
            dropdown: 'dropdown_without_none',
            default: 'published',
            description: 'Current status of the post'
        }),
        priority: StringColumn({
            label: 'Priority',
            maxLength: 10,
            choices: {
                low: { label: 'Low', sequence: 0 },
                normal: { label: 'Normal', sequence: 1 },
                high: { label: 'High', sequence: 2 },
                urgent: { label: 'Urgent', sequence: 3 }
            },
            dropdown: 'dropdown_without_none',
            default: 'normal',
            description: 'Priority level for announcements and important posts'
        })
    },
    display: 'content',
    allow_web_service_access: true,
    actions: ['create', 'read', 'update', 'delete'],
    live_feed: true,
    audit: true,
    text_index: true
})