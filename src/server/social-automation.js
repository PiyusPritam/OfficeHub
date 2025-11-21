import { gs, GlideRecord, GlideDateTime } from '@servicenow/glide'

/**
 * Updates AI chat session with last activity and message count
 */
export function updateChatSessionActivity(current, previous) {
    try {
        const sessionGr = new GlideRecord('x_1599224_officehu_ai_chat_session')
        if (sessionGr.get(current.chat_session)) {
            // Update last activity timestamp
            sessionGr.last_activity = new GlideDateTime().getDisplayValue()
            
            // Update message count
            const messageCount = new GlideRecord('x_1599224_officehu_ai_chat_message')
            messageCount.addQuery('chat_session', current.chat_session)
            messageCount.query()
            sessionGr.message_count = messageCount.getRowCount()
            
            sessionGr.update()
        }
    } catch (error) {
        gs.error('Error updating chat session activity: ' + error.message)
    }
}

/**
 * Generates AI responses for user messages
 */
export function generateAIResponse(current, previous) {
    try {
        // Get session context
        const sessionGr = new GlideRecord('x_1599224_officehu_ai_chat_session')
        if (!sessionGr.get(current.chat_session)) {
            return
        }

        // Generate AI response based on context and message content
        const userMessage = current.message_content.toString()
        const contextType = sessionGr.context_type.toString()
        const aiResponse = generateContextualResponse(userMessage, contextType)
        
        // Create AI response message
        const responseGr = new GlideRecord('x_1599224_officehu_ai_chat_message')
        responseGr.initialize()
        responseGr.chat_session = current.chat_session
        responseGr.sender_type = 'ai_assistant'
        responseGr.message_content = aiResponse.content
        responseGr.message_type = aiResponse.type
        responseGr.ai_confidence = aiResponse.confidence
        responseGr.intent_detected = aiResponse.intent
        responseGr.sequence_number = parseInt(current.sequence_number) + 1
        responseGr.processing_time_ms = aiResponse.processing_time
        
        if (aiResponse.action_data) {
            responseGr.action_data = JSON.stringify(aiResponse.action_data)
        }
        
        responseGr.insert()
        
        // Update session status if escalation is needed
        if (aiResponse.confidence < 50) {
            sessionGr.status = 'escalated'
            sessionGr.update()
        }
        
    } catch (error) {
        gs.error('Error generating AI response: ' + error.message)
    }
}

/**
 * Generates contextual AI responses based on user input
 */
function generateContextualResponse(userMessage, contextType) {
    const startTime = Date.now()
    
    // Simple AI response logic - in production this would integrate with a real AI service
    const responses = {
        hr_questions: {
            keywords: ['policy', 'benefits', 'vacation', 'sick leave', 'payroll'],
            responses: [
                "I can help you with HR-related questions. Let me find the most relevant policy information for you.",
                "For specific policy details, I recommend checking the Employee Handbook or contacting HR directly.",
                "I'll help you understand our HR policies. What specific area would you like to know about?"
            ]
        },
        leave_help: {
            keywords: ['leave', 'vacation', 'time off', 'pto', 'sick'],
            responses: [
                "I can help you with leave requests. You can submit a new request through the Leave Management section.",
                "To check your leave balance, go to your Profile page where you can see available PTO.",
                "For urgent leave requests, please contact your manager directly after submitting the request."
            ]
        },
        timesheet_help: {
            keywords: ['timesheet', 'hours', 'time', 'project', 'billing'],
            responses: [
                "For timesheet assistance, you can log your hours in the Timesheet section. Make sure to select the correct project.",
                "Remember to submit your timesheet by Friday for manager approval. You can track hours by project and task.",
                "If you need to correct a submitted timesheet, contact your manager for assistance."
            ]
        },
        wellness_coach: {
            keywords: ['wellness', 'health', 'exercise', 'stress', 'goals'],
            responses: [
                "Great to see you focusing on wellness! You can track activities and join challenges in the Wellness section.",
                "Setting wellness goals is a great start. I recommend starting with small, achievable targets.",
                "Remember, wellness is a journey. Check out our wellness resources for tips and motivation!"
            ]
        },
        general: {
            keywords: ['help', 'how', 'what', 'where', 'when'],
            responses: [
                "I'm here to help! I can assist with HR questions, leave management, timesheets, and wellness coaching.",
                "You can ask me about company policies, how to use different features, or get wellness tips.",
                "What would you like help with today? I can guide you through various OfficeHub features."
            ]
        }
    }
    
    // Determine intent and confidence
    const contextResponses = responses[contextType] || responses.general
    let confidence = 75
    let detectedIntent = 'general_inquiry'
    
    // Simple keyword matching for intent detection
    const lowerMessage = userMessage.toLowerCase()
    for (const keyword of contextResponses.keywords) {
        if (lowerMessage.includes(keyword)) {
            confidence = 85
            detectedIntent = contextType + '_' + keyword
            break
        }
    }
    
    // Select response
    const responseIndex = Math.floor(Math.random() * contextResponses.responses.length)
    const responseContent = contextResponses.responses[responseIndex]
    
    // Add action suggestions for certain contexts
    let actionData = null
    if (contextType === 'leave_help') {
        actionData = {
            quick_actions: [
                { label: 'Submit Leave Request', action: 'navigate', target: 'leave' },
                { label: 'Check Leave Balance', action: 'navigate', target: 'profile' }
            ]
        }
    } else if (contextType === 'wellness_coach') {
        actionData = {
            quick_actions: [
                { label: 'Log Activity', action: 'navigate', target: 'wellness' },
                { label: 'View Challenges', action: 'navigate', target: 'wellness' }
            ]
        }
    }
    
    return {
        content: responseContent,
        type: actionData ? 'action_suggestion' : 'text',
        confidence: confidence,
        intent: detectedIntent,
        action_data: actionData,
        processing_time: Date.now() - startTime
    }
}

/**
 * Updates interaction counts on social posts
 */
export function updatePostInteractionCounts(current, previous) {
    try {
        const postGr = new GlideRecord('x_1599224_officehu_social_post')
        if (!postGr.get(current.post)) {
            return
        }
        
        // Count likes
        const likeCount = new GlideRecord('x_1599224_officehu_post_interaction')
        likeCount.addQuery('post', current.post)
        likeCount.addQuery('interaction_type', 'like')
        likeCount.addQuery('is_active', true)
        likeCount.query()
        postGr.like_count = likeCount.getRowCount()
        
        // Count comments
        const commentCount = new GlideRecord('x_1599224_officehu_post_interaction')
        commentCount.addQuery('post', current.post)
        commentCount.addQuery('interaction_type', 'comment')
        commentCount.addQuery('is_active', true)
        commentCount.query()
        postGr.comment_count = commentCount.getRowCount()
        
        // Count shares
        const shareCount = new GlideRecord('x_1599224_officehu_post_interaction')
        shareCount.addQuery('post', current.post)
        shareCount.addQuery('interaction_type', 'share')
        shareCount.addQuery('is_active', true)
        shareCount.query()
        postGr.share_count = shareCount.getRowCount()
        
        postGr.update()
        
    } catch (error) {
        gs.error('Error updating post interaction counts: ' + error.message)
    }
}

/**
 * Updates chat room activity information
 */
export function updateChatRoomActivity(current, previous) {
    try {
        const roomGr = new GlideRecord('x_1599224_officehu_chat_room')
        if (roomGr.get(current.chat_room)) {
            roomGr.last_message_time = new GlideDateTime().getDisplayValue()
            roomGr.last_message_preview = current.message_content.toString().substring(0, 200)
            roomGr.update()
        }
    } catch (error) {
        gs.error('Error updating chat room activity: ' + error.message)
    }
}

/**
 * Sends notifications for new chat messages
 */
export function sendChatNotifications(current, previous) {
    try {
        // Get room members
        const memberGr = new GlideRecord('x_1599224_officehu_chat_room_member')
        memberGr.addQuery('chat_room', current.chat_room)
        memberGr.addQuery('user', '!=', current.sender) // Don't notify sender
        memberGr.query()
        
        while (memberGr.next()) {
            const notificationSetting = memberGr.notification_settings.toString()
            const isMuted = memberGr.is_muted.toString() === 'true'
            
            if (isMuted || notificationSetting === 'none') {
                continue
            }
            
            // Check if user should be notified
            let shouldNotify = false
            if (notificationSetting === 'all') {
                shouldNotify = true
            } else if (notificationSetting === 'mentions_only') {
                const mentionedUsers = current.mentioned_users.toString()
                if (mentionedUsers && mentionedUsers.includes(memberGr.user.toString())) {
                    shouldNotify = true
                }
            }
            
            if (shouldNotify) {
                createChatNotification(memberGr.user, current)
            }
        }
        
    } catch (error) {
        gs.error('Error sending chat notifications: ' + error.message)
    }
}

/**
 * Creates notification for chat message
 */
function createChatNotification(userId, messageRecord) {
    try {
        const notificationGr = new GlideRecord('x_1599224_officehu_notification')
        notificationGr.initialize()
        notificationGr.user = userId
        notificationGr.title = 'New Chat Message'
        notificationGr.message = 'New message in chat room'
        notificationGr.type = 'chat_message'
        notificationGr.priority = 'low'
        notificationGr.is_read = false
        notificationGr.related_record = messageRecord.sys_id
        notificationGr.related_table = 'x_1599224_officehu_team_chat_message'
        notificationGr.insert()
    } catch (error) {
        gs.error('Error creating chat notification: ' + error.message)
    }
}

/**
 * Processes user mentions in posts and comments
 */
export function processMentions(current, previous) {
    try {
        const mentionedUsers = current.mentioned_users.toString()
        if (!mentionedUsers) {
            return
        }
        
        const userIds = JSON.parse(mentionedUsers)
        const mentionType = current.getTableName() === 'x_1599224_officehu_social_post' ? 'post' : 'comment'
        
        for (const userId of userIds) {
            createMentionNotification(userId, current, mentionType)
        }
        
    } catch (error) {
        gs.error('Error processing mentions: ' + error.message)
    }
}

/**
 * Creates notification for user mentions
 */
function createMentionNotification(userId, record, mentionType) {
    try {
        const notificationGr = new GlideRecord('x_1599224_officehu_notification')
        notificationGr.initialize()
        notificationGr.user = userId
        notificationGr.title = mentionType === 'post' ? 'You were mentioned in a post' : 'You were mentioned in a comment'
        notificationGr.message = 'Someone mentioned you in a ' + mentionType
        notificationGr.type = 'mention'
        notificationGr.priority = 'medium'
        notificationGr.is_read = false
        notificationGr.related_record = record.sys_id
        notificationGr.related_table = record.getTableName()
        notificationGr.insert()
    } catch (error) {
        gs.error('Error creating mention notification: ' + error.message)
    }
}