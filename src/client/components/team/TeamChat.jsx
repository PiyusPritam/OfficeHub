import React, { useState, useEffect, useRef, useMemo } from 'react'
import { EmployeeService } from '../../services/EmployeeService.js'
import './TeamChat.css'

export default function TeamChat({ currentUser }) {
  const employeeService = useMemo(() => new EmployeeService(), [])
  const [chatRooms, setChatRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showRoomList, setShowRoomList] = useState(true)
  const [unreadCounts, setUnreadCounts] = useState({})
  const [onlineUsers, setOnlineUsers] = useState([])
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (currentUser) {
      loadChatRooms()
      loadOnlineUsers()
      
      // Poll for new messages every 10 seconds
      const interval = setInterval(() => {
        if (currentRoom) {
          loadMessages()
        }
        updateUnreadCounts()
      }, 10000)
      
      return () => clearInterval(interval)
    }
  }, [currentUser])

  useEffect(() => {
    if (currentRoom) {
      loadMessages()
      markRoomAsRead()
    }
  }, [currentRoom])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const loadChatRooms = async () => {
    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      
      // Get rooms where user is a member
      const membershipResponse = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_chat_room_member?sysparm_query=user=${userSysId}&sysparm_display_value=all`
      )
      
      const roomIds = (membershipResponse.result || []).map(membership => {
        const roomId = typeof membership.chat_room === 'object' ? membership.chat_room.value : membership.chat_room
        return roomId
      })
      
      if (roomIds.length > 0) {
        const roomsQuery = roomIds.map(id => `sys_id=${id}`).join('^OR')
        const roomsResponse = await employeeService.apiCall(
          `/api/now/table/x_1599224_officehu_chat_room?sysparm_query=${roomsQuery}^is_archived=false&sysparm_order_by=last_message_time&sysparm_display_value=all`
        )
        
        setChatRooms(roomsResponse.result || [])
        
        // Auto-select first room
        if ((roomsResponse.result || []).length > 0 && !currentRoom) {
          setCurrentRoom(roomsResponse.result[0])
        }
      }
      
    } catch (error) {
      console.error('Failed to load chat rooms:', error)
    }
  }

  const loadMessages = async () => {
    if (!currentRoom) return
    
    try {
      const roomSysId = typeof currentRoom.sys_id === 'object' ? currentRoom.sys_id.value : currentRoom.sys_id
      
      const response = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_team_chat_message?sysparm_query=chat_room=${roomSysId}&sysparm_order_by=sys_created_on&sysparm_limit=100&sysparm_display_value=all`
      )
      
      setMessages(response.result || [])
      
    } catch (error) {
      console.error('Failed to load messages:', error)
    }
  }

  const loadOnlineUsers = async () => {
    try {
      // Simulate online users - in production this would be real-time data
      const response = await employeeService.apiCall(
        '/api/now/table/sys_user?sysparm_query=active=true&sysparm_limit=20&sysparm_display_value=all'
      )
      
      setOnlineUsers(response.result || [])
      
    } catch (error) {
      console.error('Failed to load online users:', error)
    }
  }

  const updateUnreadCounts = async () => {
    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      const counts = {}
      
      for (const room of chatRooms) {
        const roomSysId = typeof room.sys_id === 'object' ? room.sys_id.value : room.sys_id
        
        // Get user's membership to find last read message
        const membershipResponse = await employeeService.apiCall(
          `/api/now/table/x_1599224_officehu_chat_room_member?sysparm_query=chat_room=${roomSysId}^user=${userSysId}&sysparm_display_value=all`
        )
        
        if (membershipResponse.result && membershipResponse.result.length > 0) {
          const membership = membershipResponse.result[0]
          const lastReadMessage = typeof membership.last_read_message === 'object' ? 
            membership.last_read_message.value : membership.last_read_message
          
          // Count unread messages
          let unreadQuery = `chat_room=${roomSysId}`
          if (lastReadMessage) {
            unreadQuery += `^sys_created_on>javascript:gs.getGlideRecord('x_1599224_officehu_team_chat_message','${lastReadMessage}').sys_created_on`
          }
          
          const unreadResponse = await employeeService.apiCall(
            `/api/now/table/x_1599224_officehu_team_chat_message?sysparm_query=${unreadQuery}&sysparm_limit=1`
          )
          
          counts[roomSysId] = unreadResponse.result ? unreadResponse.result.length : 0
        }
      }
      
      setUnreadCounts(counts)
      
    } catch (error) {
      console.error('Failed to update unread counts:', error)
    }
  }

  const markRoomAsRead = async () => {
    if (!currentRoom || messages.length === 0) return
    
    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      const roomSysId = typeof currentRoom.sys_id === 'object' ? currentRoom.sys_id.value : currentRoom.sys_id
      const lastMessage = messages[messages.length - 1]
      const lastMessageId = typeof lastMessage.sys_id === 'object' ? lastMessage.sys_id.value : lastMessage.sys_id
      
      // Update user's last read message
      const membershipResponse = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_chat_room_member?sysparm_query=chat_room=${roomSysId}^user=${userSysId}&sysparm_display_value=all`
      )
      
      if (membershipResponse.result && membershipResponse.result.length > 0) {
        const membershipId = typeof membershipResponse.result[0].sys_id === 'object' ? 
          membershipResponse.result[0].sys_id.value : membershipResponse.result[0].sys_id
        
        await employeeService.apiCall(
          `/api/now/table/x_1599224_officehu_chat_room_member/${membershipId}`,
          'PATCH',
          { last_read_message: lastMessageId }
        )
        
        // Clear unread count for this room
        setUnreadCounts(prev => ({ ...prev, [roomSysId]: 0 }))
      }
      
    } catch (error) {
      console.error('Failed to mark room as read:', error)
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !currentRoom) return

    try {
      setLoading(true)
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      const roomSysId = typeof currentRoom.sys_id === 'object' ? currentRoom.sys_id.value : currentRoom.sys_id

      // Check for mentions in the message
      const mentionRegex = /@(\w+)/g
      const mentions = []
      let match
      while ((match = mentionRegex.exec(newMessage)) !== null) {
        mentions.push(match[1])
      }

      const messageData = {
        chat_room: roomSysId,
        sender: userSysId,
        message_content: newMessage.trim(),
        message_type: 'text',
        mentioned_users: mentions.length > 0 ? JSON.stringify(mentions) : ''
      }

      await employeeService.apiCall(
        '/api/now/table/x_1599224_officehu_team_chat_message',
        'POST',
        messageData
      )

      setNewMessage('')
      loadMessages() // Refresh messages
      
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setLoading(false)
    }
  }

  const createRoom = async (roomData) => {
    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      
      const response = await employeeService.apiCall(
        '/api/now/table/x_1599224_officehu_chat_room',
        'POST',
        {
          ...roomData,
          created_by: userSysId
        }
      )

      // Add creator as room owner
      const roomId = response.result.sys_id
      await employeeService.apiCall(
        '/api/now/table/x_1599224_officehu_chat_room_member',
        'POST',
        {
          chat_room: roomId,
          user: userSysId,
          role: 'owner',
          joined_at: new Date().toISOString()
        }
      )

      loadChatRooms()
      
    } catch (error) {
      console.error('Failed to create room:', error)
    }
  }

  const formatTime = (timestamp) => {
    const messageTime = new Date(timestamp)
    const now = new Date()
    const diffMs = now - messageTime
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return 'now'
    if (diffMins < 60) return `${diffMins}m`
    if (messageTime.toDateString() === now.toDateString()) {
      return messageTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    return messageTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const renderMessage = (message) => {
    const sender = typeof message.sender === 'object' ? message.sender.display_value : message.sender
    const content = typeof message.message_content === 'object' ? message.message_content.value : message.message_content
    const timestamp = typeof message.sys_created_on === 'object' ? message.sys_created_on.value : message.sys_created_on
    const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
    const messageSenderId = typeof message.sender === 'object' ? message.sender.value : message.sender
    
    const isOwnMessage = userSysId === messageSenderId

    return (
      <div 
        key={typeof message.sys_id === 'object' ? message.sys_id.value : message.sys_id} 
        className={`chat-message ${isOwnMessage ? 'own-message' : 'other-message'}`}
      >
        <div className="message-content">
          {!isOwnMessage && (
            <div className="message-sender">{sender}</div>
          )}
          <div className="message-text">{content}</div>
          <div className="message-time">{formatTime(timestamp)}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="team-chat-container">
      {/* Sidebar with room list */}
      <div className={`chat-sidebar ${showRoomList ? 'expanded' : 'collapsed'}`}>
        <div className="sidebar-header">
          <h3>💬 Team Chat</h3>
          <CreateRoomButton onCreateRoom={createRoom} />
        </div>

        <div className="room-list">
          {chatRooms.map(room => {
            const roomName = typeof room.name === 'object' ? room.name.display_value : room.name
            const roomSysId = typeof room.sys_id === 'object' ? room.sys_id.value : room.sys_id
            const lastMessageTime = typeof room.last_message_time === 'object' ? room.last_message_time.value : room.last_message_time
            const lastMessagePreview = typeof room.last_message_preview === 'object' ? room.last_message_preview.value : room.last_message_preview
            const unreadCount = unreadCounts[roomSysId] || 0
            const isActive = currentRoom && (typeof currentRoom.sys_id === 'object' ? currentRoom.sys_id.value : currentRoom.sys_id) === roomSysId

            return (
              <div
                key={roomSysId}
                className={`room-item ${isActive ? 'active' : ''}`}
                onClick={() => setCurrentRoom(room)}
              >
                <div className="room-info">
                  <div className="room-name">{roomName}</div>
                  {lastMessagePreview && (
                    <div className="room-preview">{lastMessagePreview}</div>
                  )}
                </div>
                <div className="room-meta">
                  {lastMessageTime && (
                    <div className="room-time">{formatTime(lastMessageTime)}</div>
                  )}
                  {unreadCount > 0 && (
                    <div className="unread-badge">{unreadCount}</div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <OnlineUsersList users={onlineUsers} />
      </div>

      {/* Main chat area */}
      <div className="chat-main">
        {currentRoom ? (
          <>
            <div className="chat-header">
              <button 
                className="toggle-sidebar"
                onClick={() => setShowRoomList(!showRoomList)}
              >
                ☰
              </button>
              <div className="room-title">
                <h3>{typeof currentRoom.name === 'object' ? currentRoom.name.display_value : currentRoom.name}</h3>
                <div className="room-description">
                  {typeof currentRoom.description === 'object' ? currentRoom.description.value : currentRoom.description}
                </div>
              </div>
              <RoomSettings room={currentRoom} />
            </div>

            <div className="messages-container">
              {messages.map(renderMessage)}
              <div ref={messagesEndRef} />
            </div>

            <form className="message-input-form" onSubmit={sendMessage}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message... (use @username to mention)"
                disabled={loading}
                className="message-input"
              />
              <button 
                type="submit" 
                disabled={!newMessage.trim() || loading}
                className="send-button"
              >
                ➤
              </button>
            </form>
          </>
        ) : (
          <div className="no-room-selected">
            <h3>Select a chat room to start messaging</h3>
            <p>Choose a room from the sidebar or create a new one to begin chatting with your team.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Create Room Modal Component
function CreateRoomButton({ onCreateRoom }) {
  const [showModal, setShowModal] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [roomDescription, setRoomDescription] = useState('')
  const [roomType, setRoomType] = useState('public')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (roomName.trim()) {
      onCreateRoom({
        name: roomName.trim(),
        description: roomDescription.trim(),
        room_type: roomType
      })
      setRoomName('')
      setRoomDescription('')
      setRoomType('public')
      setShowModal(false)
    }
  }

  return (
    <>
      <button className="create-room-btn" onClick={() => setShowModal(true)}>
        ➕
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Create New Chat Room</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                required
              />
              <textarea
                placeholder="Room description (optional)"
                value={roomDescription}
                onChange={(e) => setRoomDescription(e.target.value)}
                rows="3"
              />
              <select 
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="department">Department</option>
              </select>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit">Create Room</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

// Online Users List Component
function OnlineUsersList({ users }) {
  return (
    <div className="online-users">
      <div className="users-header">
        <span className="users-title">Online ({users.length})</span>
      </div>
      <div className="users-list">
        {users.slice(0, 10).map(user => {
          const userName = typeof user.name === 'object' ? user.name.display_value : user.name
          const firstName = typeof user.first_name === 'object' ? user.first_name.value : user.first_name
          const lastName = typeof user.last_name === 'object' ? user.last_name.value : user.last_name
          
          return (
            <div key={typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id} className="user-item">
              <div className="user-avatar">
                <span className="avatar-text">
                  {firstName?.charAt(0)}{lastName?.charAt(0)}
                </span>
                <div className="online-indicator"></div>
              </div>
              <div className="user-name">{firstName} {lastName}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Room Settings Component
function RoomSettings({ room }) {
  return (
    <div className="room-settings">
      <button className="settings-btn" title="Room Settings">
        ⚙️
      </button>
    </div>
  )
}