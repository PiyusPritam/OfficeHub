import React, { useState, useEffect, useRef, useMemo } from 'react'
import { EmployeeService } from '../services/EmployeeService.js'
import './AIChatbot.css'

export default function AIChatbot({ currentUser }) {
  const employeeService = useMemo(() => new EmployeeService(), [])
  const [isOpen, setIsOpen] = useState(false)
  const [chatSessions, setChatSessions] = useState([])
  const [currentSession, setCurrentSession] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [loading, setLoading] = useState(false)
  const [smartSuggestions, setSmartSuggestions] = useState([])
  const [conversationHistory, setConversationHistory] = useState([])
  const [aiPersonality, setAiPersonality] = useState('helpful')
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const messagesEndRef = useRef(null)

  const contextTypes = [
    { value: 'general', label: 'General Help', icon: '🤖', description: 'General assistance and guidance' },
    { value: 'hr_questions', label: 'HR Questions', icon: '👥', description: 'Policies, benefits, and HR procedures' },
    { value: 'leave_help', label: 'Leave Management', icon: '🏖️', description: 'Vacation, sick leave, and time off' },
    { value: 'timesheet_help', label: 'Timesheet Assistance', icon: '⏰', description: 'Time tracking and project logging' },
    { value: 'wellness_coach', label: 'Wellness Coaching', icon: '💪', description: 'Health tips and wellness guidance' },
    { value: 'policy_info', label: 'Policy Information', icon: '📋', description: 'Company policies and procedures' },
    { value: 'technical_support', label: 'Technical Support', icon: '💻', description: 'IT help and system support' },
    { value: 'career_guidance', label: 'Career Guidance', icon: '🚀', description: 'Professional development and growth' },
    { value: 'team_collaboration', label: 'Team Support', icon: '🤝', description: 'Team communication and collaboration' }
  ]

  const aiPersonalities = [
    { value: 'helpful', label: 'Helpful Assistant', description: 'Professional and informative' },
    { value: 'friendly', label: 'Friendly Guide', description: 'Warm and encouraging' },
    { value: 'expert', label: 'Expert Advisor', description: 'Detailed and technical' },
    { value: 'motivational', label: 'Motivational Coach', description: 'Inspiring and energetic' }
  ]

  useEffect(() => {
    if (isOpen && currentUser) {
      loadChatSessions()
      generateSmartSuggestions()
    }
  }, [isOpen, currentUser])

  useEffect(() => {
    if (currentSession) {
      loadMessages()
    }
  }, [currentSession])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadChatSessions = async () => {
    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      
      const response = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_ai_chat_session?sysparm_query=user=${userSysId}^is_archived=false&sysparm_order_by=sys_updated_on&sysparm_display_value=all&sysparm_limit=10`
      )
      
      setChatSessions(response.result || [])
      
      // Auto-select most recent active session
      const activeSessions = (response.result || []).filter(session => {
        const status = typeof session.status === 'object' ? session.status.value : session.status
        return status === 'active'
      })
      
      if (activeSessions.length > 0) {
        setCurrentSession(activeSessions[0])
      }
      
    } catch (error) {
      console.error('Failed to load chat sessions:', error)
    }
  }

  const loadMessages = async () => {
    if (!currentSession) return
    
    try {
      const sessionSysId = typeof currentSession.sys_id === 'object' ? currentSession.sys_id.value : currentSession.sys_id
      
      const response = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_ai_chat_message?sysparm_query=chat_session=${sessionSysId}&sysparm_order_by=sequence_number&sysparm_display_value=all`
      )
      
      const loadedMessages = response.result || []
      setMessages(loadedMessages)
      
      // Build conversation history for context
      const history = loadedMessages.map(msg => ({
        role: typeof msg.sender_type === 'object' ? msg.sender_type.value : msg.sender_type,
        content: typeof msg.message_content === 'object' ? msg.message_content.value : msg.message_content,
        intent: typeof msg.intent_detected === 'object' ? msg.intent_detected.value : msg.intent_detected
      }))
      setConversationHistory(history)
      
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const generateSmartSuggestions = async () => {
    try {
      // Generate context-aware suggestions based on user's recent activity
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      const today = new Date().toISOString().split('T')[0]
      
      // Check recent timesheet activity
      const timesheetResponse = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_timesheet?sysparm_query=employee=${userSysId}^date>=${today}&sysparm_limit=1&sysparm_display_value=all`
      )
      
      // Check leave balance
      const leaveResponse = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_leave_request?sysparm_query=employee=${userSysId}^status=approved&sysparm_limit=5&sysparm_display_value=all`
      )
      
      // Check wellness activity
      const wellnessResponse = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_wellness_activity?sysparm_query=user=${userSysId}&sysparm_limit=1&sysparm_display_value=all`
      )
      
      const suggestions = []
      
      if (!timesheetResponse.result || timesheetResponse.result.length === 0) {
        suggestions.push({
          id: 'timesheet_reminder',
          text: 'Help me log my time for today',
          context: 'timesheet_help',
          priority: 'high'
        })
      }
      
      if (!wellnessResponse.result || wellnessResponse.result.length === 0) {
        suggestions.push({
          id: 'wellness_start',
          text: 'How can I start tracking my wellness?',
          context: 'wellness_coach',
          priority: 'medium'
        })
      }
      
      // Add contextual suggestions based on time of day
      const hour = new Date().getHours()
      if (hour >= 9 && hour <= 10) {
        suggestions.push({
          id: 'morning_checkin',
          text: 'What should I focus on today?',
          context: 'general',
          priority: 'medium'
        })
      } else if (hour >= 17 && hour <= 19) {
        suggestions.push({
          id: 'end_of_day',
          text: 'Help me wrap up my day',
          context: 'timesheet_help',
          priority: 'medium'
        })
      }
      
      // Add seasonal/weekly suggestions
      const dayOfWeek = new Date().getDay()
      if (dayOfWeek === 1) { // Monday
        suggestions.push({
          id: 'monday_motivation',
          text: 'I need some Monday motivation!',
          context: 'wellness_coach',
          priority: 'low'
        })
      } else if (dayOfWeek === 5) { // Friday
        suggestions.push({
          id: 'friday_planning',
          text: 'Help me plan my weekend wellness activities',
          context: 'wellness_coach',
          priority: 'low'
        })
      }
      
      setSmartSuggestions(suggestions.slice(0, 4)) // Limit to 4 suggestions
      
    } catch (error) {
      console.error('Failed to generate smart suggestions:', error)
    }
  }

  const startNewSession = async (contextType = 'general') => {
    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      const contextInfo = contextTypes.find(ct => ct.value === contextType)
      
      const response = await employeeService.apiCall(
        '/api/now/table/x_1599224_officehu_ai_chat_session',
        'POST',
        {
          user: userSysId,
          title: `${contextInfo?.label || 'General'} - ${new Date().toLocaleDateString()}`,
          context_type: contextType,
          status: 'active'
        }
      )
      
      const newSession = response.result
      setChatSessions(prev => [newSession, ...prev])
      setCurrentSession(newSession)
      setMessages([])
      setConversationHistory([])
      
      // Send personalized welcome message based on context and personality
      const welcomeMessage = generateWelcomeMessage(contextType, aiPersonality)
      await sendMessage(welcomeMessage, 'ai_assistant', true)
      
    } catch (error) {
      console.error('Failed to create new chat session:', error)
    }
  }

  const generateWelcomeMessage = (contextType, personality) => {
    const contextInfo = contextTypes.find(ct => ct.value === contextType)
    const personalityInfo = aiPersonalities.find(p => p.value === personality)
    
    const welcomeMessages = {
      helpful: {
        general: `Hello! I'm your AI assistant, ready to help you navigate OfficeHub efficiently. What can I assist you with today?`,
        hr_questions: `Hi there! I'm here to help you with HR-related questions. I can assist with policies, benefits, procedures, and more.`,
        wellness_coach: `Welcome to your wellness journey! I'm here to support your health and well-being goals. Let's make today a healthy one!`,
        career_guidance: `Hello! I'm excited to help you with your professional development. Whether it's career planning or skill building, I'm here to guide you.`
      },
      friendly: {
        general: `Hey there! 😊 I'm your friendly AI assistant, and I'm so happy to chat with you today! What's on your mind?`,
        wellness_coach: `Hi friend! 💪 Ready to make some awesome wellness progress together? I'm here to cheer you on every step of the way!`,
        team_collaboration: `Hello teammate! 🤝 I'm here to help make your team collaboration smoother and more effective. How can I help bring your team together?`
      },
      expert: {
        technical_support: `Greetings. I'm your technical AI advisor with comprehensive knowledge of OfficeHub systems and procedures. Please describe your technical inquiry.`,
        policy_info: `Hello. I have detailed knowledge of company policies and procedures. I can provide specific, accurate information to address your policy questions.`
      },
      motivational: {
        general: `🚀 Hey superstar! You're doing amazing things, and I'm here to help you achieve even more! What goals are we conquering today?`,
        wellness_coach: `🌟 Hello champion! Every step towards wellness is a victory, and I'm here to celebrate every win with you! What wellness adventure shall we start today?`,
        career_guidance: `🎯 Hey future leader! Your potential is unlimited, and I'm here to help unlock it! What career dreams are we making reality today?`
      }
    }
    
    const personalityMessages = welcomeMessages[personality] || welcomeMessages.helpful
    return personalityMessages[contextType] || personalityMessages.general || `Hello! I'm your AI assistant. How can I help you with ${contextInfo?.label.toLowerCase()}?`
  }

  const sendMessage = async (content, senderType = 'user', isWelcome = false) => {
    if (!currentSession && !isWelcome) return
    if (!content.trim() && !isWelcome) return

    try {
      setLoading(true)
      if (senderType === 'user') {
        setNewMessage('')
        setIsTyping(true)
      }

      const sessionSysId = typeof currentSession.sys_id === 'object' ? currentSession.sys_id.value : currentSession.sys_id
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      
      // Get next sequence number
      const existingMessages = messages.length > 0 ? messages : []
      const nextSequence = existingMessages.length + 1

      const messageData = {
        chat_session: sessionSysId,
        sender_type: senderType,
        message_content: content,
        message_type: 'text',
        sequence_number: nextSequence
      }

      if (senderType === 'user') {
        messageData.sender_user = userSysId
        // Add conversation context for better AI responses
        messageData.entities_extracted = JSON.stringify(extractEntities(content))
      }

      const response = await employeeService.apiCall(
        '/api/now/table/x_1599224_officehu_ai_chat_message',
        'POST',
        messageData
      )

      // Refresh messages to get AI response (business rule will generate it)
      if (senderType === 'user') {
        // Generate suggestions for follow-up questions
        generateFollowUpSuggestions(content)
        
        setTimeout(() => {
          loadMessages()
          setIsTyping(false)
        }, 2000) // Give time for AI response to be generated
      } else {
        loadMessages()
      }
      
    } catch (error) {
      console.error('Failed to send message:', error)
      setIsTyping(false)
    } finally {
      setLoading(false)
    }
  }

  const extractEntities = (message) => {
    const entities = []
    const lowerMessage = message.toLowerCase()
    
    // Extract common entities
    if (lowerMessage.includes('vacation') || lowerMessage.includes('time off') || lowerMessage.includes('pto')) {
      entities.push({ type: 'leave_type', value: 'vacation' })
    }
    if (lowerMessage.includes('sick') || lowerMessage.includes('illness')) {
      entities.push({ type: 'leave_type', value: 'sick' })
    }
    if (lowerMessage.includes('timesheet') || lowerMessage.includes('hours') || lowerMessage.includes('time')) {
      entities.push({ type: 'topic', value: 'timesheet' })
    }
    if (lowerMessage.includes('wellness') || lowerMessage.includes('health') || lowerMessage.includes('exercise')) {
      entities.push({ type: 'topic', value: 'wellness' })
    }
    
    // Extract dates (simple pattern matching)
    const dateMatches = message.match(/\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{4}-\d{2}-\d{2}\b/g)
    if (dateMatches) {
      dateMatches.forEach(date => entities.push({ type: 'date', value: date }))
    }
    
    return entities
  }

  const generateFollowUpSuggestions = (userMessage) => {
    const suggestions = []
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('leave') || lowerMessage.includes('vacation')) {
      suggestions.push('How do I check my leave balance?')
      suggestions.push('What types of leave are available?')
    } else if (lowerMessage.includes('timesheet') || lowerMessage.includes('hours')) {
      suggestions.push('How do I submit my timesheet?')
      suggestions.push('Can I edit a submitted timesheet?')
    } else if (lowerMessage.includes('wellness') || lowerMessage.includes('health')) {
      suggestions.push('What wellness challenges are available?')
      suggestions.push('How do I track my fitness activities?')
    }
    
    setSmartSuggestions(prev => [...suggestions.slice(0, 2).map((text, index) => ({
      id: `followup_${index}`,
      text,
      context: 'general',
      priority: 'medium'
    })), ...prev.slice(0, 2)])
  }

  const handleQuickAction = (action) => {
    if (action.action === 'navigate') {
      setIsOpen(false)
      // This would trigger navigation in the parent component
    }
  }

  const handleSmartSuggestion = (suggestion) => {
    setNewMessage(suggestion.text)
    if (suggestion.context !== 'general' && currentSession) {
      // Optionally switch context
    }
  }

  const speakMessage = (text) => {
    if (!voiceEnabled || !window.speechSynthesis) return
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.8
    utterance.pitch = 1
    window.speechSynthesis.speak(utterance)
  }

  const exportConversation = () => {
    const conversationText = messages.map(msg => {
      const sender = typeof msg.sender_type === 'object' ? msg.sender_type.value : msg.sender_type
      const content = typeof msg.message_content === 'object' ? msg.message_content.value : msg.message_content
      const timestamp = typeof msg.sys_created_on === 'object' ? msg.sys_created_on.value : msg.sys_created_on
      
      return `[${new Date(timestamp).toLocaleString()}] ${sender === 'user' ? 'You' : 'AI Assistant'}: ${content}`
    }).join('\n\n')
    
    const blob = new Blob([conversationText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ai-chat-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const renderMessage = (message) => {
    const senderType = typeof message.sender_type === 'object' ? message.sender_type.value : message.sender_type
    const messageType = typeof message.message_type === 'object' ? message.message_type.value : message.message_type
    const content = typeof message.message_content === 'object' ? message.message_content.value : message.message_content
    const timestamp = typeof message.sys_created_on === 'object' ? message.sys_created_on.value : message.sys_created_on
    const confidence = typeof message.ai_confidence === 'object' ? message.ai_confidence.value : message.ai_confidence
    
    const isUser = senderType === 'user'
    const isAI = senderType === 'ai_assistant'
    
    let actionData = null
    try {
      actionData = message.action_data ? JSON.parse(typeof message.action_data === 'object' ? message.action_data.value : message.action_data) : null
    } catch (e) {
      // Invalid JSON, ignore
    }

    return (
      <div key={typeof message.sys_id === 'object' ? message.sys_id.value : message.sys_id} className={`message ${isUser ? 'user-message' : 'ai-message'}`}>
        <div className="message-content">
          <div className="message-header">
            <span className="sender">
              {isUser ? 'You' : isAI ? '🤖 AI Assistant' : 'System'}
            </span>
            <div className="message-meta">
              {isAI && confidence && (
                <span className={`confidence-badge ${confidence > 80 ? 'high' : confidence > 60 ? 'medium' : 'low'}`}>
                  {confidence}%
                </span>
              )}
              <span className="timestamp">{formatTime(timestamp)}</span>
              {isAI && voiceEnabled && (
                <button 
                  className="speak-btn"
                  onClick={() => speakMessage(content)}
                  title="Read aloud"
                >
                  🔊
                </button>
              )}
            </div>
          </div>
          <div className="message-text">{content}</div>
          
          {actionData && actionData.quick_actions && (
            <div className="quick-actions">
              {actionData.quick_actions.map((action, index) => (
                <button
                  key={index}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Enhanced Chat Toggle Button */}
      <button 
        className={`ai-chatbot-toggle ${darkMode ? 'dark' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title="AI Assistant"
      >
        🤖
        <span className="toggle-text">AI Help</span>
        {smartSuggestions.filter(s => s.priority === 'high').length > 0 && (
          <span className="urgent-badge"></span>
        )}
      </button>

      {/* Enhanced Chat Window */}
      {isOpen && (
        <div className={`ai-chatbot-window ${darkMode ? 'dark' : ''}`}>
          <div className="chatbot-header">
            <div className="header-info">
              <h3>🤖 AI Assistant</h3>
              {currentSession && (
                <span className="session-context">
                  {contextTypes.find(ct => ct.value === (typeof currentSession.context_type === 'object' ? currentSession.context_type.value : currentSession.context_type))?.label}
                </span>
              )}
            </div>
            <div className="header-actions">
              <select 
                value={aiPersonality}
                onChange={(e) => setAiPersonality(e.target.value)}
                className="personality-select"
                title="AI Personality"
              >
                {aiPersonalities.map(p => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
              <button 
                className={`settings-btn ${voiceEnabled ? 'active' : ''}`}
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                title="Toggle voice"
              >
                🔊
              </button>
              <button 
                className={`settings-btn ${darkMode ? 'active' : ''}`}
                onClick={() => setDarkMode(!darkMode)}
                title="Toggle dark mode"
              >
                🌙
              </button>
              {messages.length > 0 && (
                <button 
                  className="export-btn"
                  onClick={exportConversation}
                  title="Export conversation"
                >
                  💾
                </button>
              )}
              <button 
                className="new-chat-btn"
                onClick={() => startNewSession()}
                title="Start New Chat"
              >
                ➕
              </button>
              <button 
                className="close-btn"
                onClick={() => setIsOpen(false)}
                title="Close Chat"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="chatbot-body">
            {!currentSession ? (
              <div className="welcome-screen">
                <div className="welcome-content">
                  <h4>👋 Welcome to your Enhanced AI Assistant!</h4>
                  <p>I'm here to provide intelligent, context-aware assistance tailored to your needs.</p>
                  
                  {smartSuggestions.length > 0 && (
                    <div className="smart-suggestions">
                      <h5>🎯 Smart Suggestions for You:</h5>
                      {smartSuggestions.map(suggestion => (
                        <button
                          key={suggestion.id}
                          className={`suggestion-btn ${suggestion.priority}`}
                          onClick={() => {
                            startNewSession(suggestion.context)
                            setTimeout(() => setNewMessage(suggestion.text), 500)
                          }}
                        >
                          <span className="suggestion-text">{suggestion.text}</span>
                          {suggestion.priority === 'high' && <span className="priority-badge">!</span>}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  <div className="context-options">
                    <h5>Choose your focus:</h5>
                    {contextTypes.map(context => (
                      <button
                        key={context.value}
                        className="context-btn"
                        onClick={() => startNewSession(context.value)}
                        title={context.description}
                      >
                        <span className="context-icon">{context.icon}</span>
                        <div className="context-info">
                          <div className="context-label">{context.label}</div>
                          <div className="context-description">{context.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="messages-container">
                  {messages.map(renderMessage)}
                  
                  {isTyping && (
                    <div className="message ai-message">
                      <div className="message-content">
                        <div className="message-header">
                          <span className="sender">🤖 AI Assistant</span>
                          <span className="typing-status">thinking...</span>
                        </div>
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {smartSuggestions.length > 0 && (
                  <div className="suggestions-bar">
                    {smartSuggestions.slice(0, 3).map(suggestion => (
                      <button
                        key={suggestion.id}
                        className="suggestion-chip"
                        onClick={() => handleSmartSuggestion(suggestion)}
                      >
                        {suggestion.text}
                      </button>
                    ))}
                  </div>
                )}

                <form className="message-input-form" onSubmit={(e) => { e.preventDefault(); sendMessage(newMessage.trim()) }}>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask me anything... I'm here to help!"
                    disabled={loading}
                    className="message-input"
                  />
                  <button 
                    type="submit" 
                    disabled={!newMessage.trim() || loading}
                    className="send-btn"
                    title="Send Message"
                  >
                    ➤
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}