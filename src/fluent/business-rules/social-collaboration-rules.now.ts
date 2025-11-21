import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { 
    updateChatSessionActivity,
    generateAIResponse,
    updatePostInteractionCounts,
    updateChatRoomActivity,
    sendChatNotifications,
    processMentions
} from '../../server/social-automation.js'

// AI Chat Session Activity Updater
BusinessRule({
    $id: Now.ID['ai_chat_activity'],
    name: 'AI Chat Session Activity Updater',
    table: 'x_1599224_officehu_ai_chat_message',
    when: 'after',
    action: ['insert'],
    script: updateChatSessionActivity,
    order: 100,
    active: true,
    description: 'Updates chat session with last activity timestamp and message count'
})

// AI Response Generator
BusinessRule({
    $id: Now.ID['ai_response_generator'],
    name: 'AI Response Generator',
    table: 'x_1599224_officehu_ai_chat_message',
    when: 'after',
    action: ['insert'],
    condition: "current.sender_type == 'user'",
    script: generateAIResponse,
    order: 200,
    active: true,
    description: 'Generates AI responses when users send messages'
})

// Social Post Interaction Counter
BusinessRule({
    $id: Now.ID['post_interaction_counter'],
    name: 'Post Interaction Counter',
    table: 'x_1599224_officehu_post_interaction',
    when: 'after',
    action: ['insert', 'update', 'delete'],
    script: updatePostInteractionCounts,
    order: 100,
    active: true,
    description: 'Updates like, comment, and share counts on social posts'
})

// Chat Room Activity Updater
BusinessRule({
    $id: Now.ID['chat_room_activity'],
    name: 'Chat Room Activity Updater',
    table: 'x_1599224_officehu_team_chat_message',
    when: 'after',
    action: ['insert'],
    script: updateChatRoomActivity,
    order: 100,
    active: true,
    description: 'Updates chat room with last message information'
})

// Chat Notification Processor
BusinessRule({
    $id: Now.ID['chat_notifications'],
    name: 'Chat Notification Processor',
    table: 'x_1599224_officehu_team_chat_message',
    when: 'after',
    action: ['insert'],
    script: sendChatNotifications,
    order: 150,
    active: true,
    description: 'Sends notifications for new chat messages based on user preferences'
})

// Social Media Mention Processor
BusinessRule({
    $id: Now.ID['social_mentions'],
    name: 'Social Media Mention Processor',
    table: 'x_1599224_officehu_social_post',
    when: 'after',
    action: ['insert', 'update'],
    condition: "current.mentioned_users != ''",
    script: processMentions,
    order: 100,
    active: true,
    description: 'Processes user mentions in social posts and creates notifications'
})

// Comment Mention Processor
BusinessRule({
    $id: Now.ID['comment_mentions'],
    name: 'Comment Mention Processor',
    table: 'x_1599224_officehu_post_interaction',
    when: 'after',
    action: ['insert', 'update'],
    condition: "current.interaction_type == 'comment' && current.mentioned_users != ''",
    script: processMentions,
    order: 100,
    active: true,
    description: 'Processes user mentions in comments and creates notifications'
})