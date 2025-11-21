import React, { useState, useEffect, useMemo, useRef } from 'react'
import { EmployeeService } from '../services/EmployeeService.js'
import './SocialFeed.css'

export default function SocialFeed({ currentUser }) {
  const employeeService = useMemo(() => new EmployeeService(), [])
  const [posts, setPosts] = useState([])
  const [newPost, setNewPost] = useState('')
  const [postType, setPostType] = useState('social')
  const [visibility, setVisibility] = useState('public')
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAdvancedComposer, setShowAdvancedComposer] = useState(false)
  const [pollOptions, setPollOptions] = useState(['', ''])
  const [attachments, setAttachments] = useState([])
  const [mentionSuggestions, setMentionSuggestions] = useState([])
  const [showMentions, setShowMentions] = useState(false)
  const [sortBy, setSortBy] = useState('recent')
  const [trendingTags, setTrendingTags] = useState([])
  const fileInputRef = useRef(null)
  const textareaRef = useRef(null)

  const postTypes = [
    { value: 'social', label: '💬 Social', icon: '💬' },
    { value: 'announcement', label: '📢 Announcement', icon: '📢' },
    { value: 'question', label: '❓ Question', icon: '❓' },
    { value: 'achievement', label: '🏆 Achievement', icon: '🏆' },
    { value: 'team_update', label: '👥 Team Update', icon: '👥' },
    { value: 'knowledge_share', label: '📚 Knowledge Sharing', icon: '📚' },
    { value: 'wellness_tip', label: '🌟 Wellness Tip', icon: '🌟' },
    { value: 'poll', label: '📊 Poll', icon: '📊' },
    { value: 'event_reminder', label: '📅 Event', icon: '📅' }
  ]

  const visibilityOptions = [
    { value: 'public', label: '🌐 Everyone', icon: '🌐' },
    { value: 'team_only', label: '👥 Team Only', icon: '👥' },
    { value: 'department', label: '🏢 Department', icon: '🏢' },
    { value: 'managers_only', label: '👔 Managers Only', icon: '👔' }
  ]

  const sortOptions = [
    { value: 'recent', label: '🕒 Most Recent' },
    { value: 'popular', label: '🔥 Most Popular' },
    { value: 'commented', label: '💬 Most Discussed' },
    { value: 'trending', label: '📈 Trending' }
  ]

  useEffect(() => {
    loadPosts()
    loadTrendingTags()
    loadMentionSuggestions()
  }, [filter, sortBy, searchQuery])

  const loadPosts = async () => {
    try {
      setLoading(true)
      
      let query = 'status=published'
      
      // Add filter conditions
      if (filter !== 'all') {
        query += `^post_type=${filter}`
      }
      
      // Add search functionality
      if (searchQuery.trim()) {
        query += `^contentLIKE${searchQuery.trim()}^ORtagsLIKE${searchQuery.trim()}`
      }
      
      // Add sorting
      switch (sortBy) {
        case 'popular':
          query += '^ORDERBYDESClike_count'
          break
        case 'commented':
          query += '^ORDERBYDESCcomment_count'
          break
        case 'trending':
          query += '^ORDERBYDESCshare_count'
          break
        default:
          query += '^ORDERBYDESCsys_created_on'
      }
      
      const response = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_social_post?sysparm_query=${query}&sysparm_limit=50&sysparm_display_value=all`
      )
      
      setPosts(response.result || [])
      
    } catch (error) {
      console.error('Failed to load posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadTrendingTags = async () => {
    try {
      // Simulate trending tags extraction - in production this would be server-side
      const response = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_social_post?sysparm_query=status=published^tags!=^sys_created_on>=javascript:gs.daysAgoStart(7)&sysparm_fields=tags&sysparm_limit=100&sysparm_display_value=all`
      )
      
      const allTags = []
      response.result?.forEach(post => {
        const tags = typeof post.tags === 'object' ? post.tags.value : post.tags
        if (tags) {
          tags.split(',').forEach(tag => {
            const cleanTag = tag.trim().toLowerCase()
            if (cleanTag) allTags.push(cleanTag)
          })
        }
      })
      
      // Count tag frequency
      const tagCounts = {}
      allTags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
      
      // Get top 10 trending tags
      const trending = Object.entries(tagCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10)
        .map(([tag, count]) => ({ tag, count }))
      
      setTrendingTags(trending)
      
    } catch (error) {
      console.error('Failed to load trending tags:', error)
    }
  }

  const loadMentionSuggestions = async () => {
    try {
      const response = await employeeService.apiCall(
        '/api/now/table/sys_user?sysparm_query=active=true&sysparm_fields=sys_id,first_name,last_name,user_name,title&sysparm_limit=50&sysparm_display_value=all'
      )
      
      setMentionSuggestions(response.result || [])
      
    } catch (error) {
      console.error('Failed to load mention suggestions:', error)
    }
  }

  const createPost = async (e) => {
    e.preventDefault()
    if (!newPost.trim() && postType !== 'poll') return

    try {
      setLoading(true)
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      
      // Extract mentions and tags
      const mentions = extractMentions(newPost)
      const tags = extractTags(newPost)
      
      const postData = {
        author: userSysId,
        content: postType === 'poll' ? createPollContent() : newPost.trim(),
        post_type: postType,
        visibility: visibility,
        status: 'published',
        published_at: new Date().toISOString(),
        mentioned_users: mentions.length > 0 ? JSON.stringify(mentions) : '',
        tags: tags.join(', '),
        priority: postType === 'announcement' ? 'high' : 'normal'
      }

      await employeeService.apiCall(
        '/api/now/table/x_1599224_officehu_social_post',
        'POST',
        postData
      )

      // Reset form
      setNewPost('')
      setPostType('social')
      setVisibility('public')
      setPollOptions(['', ''])
      setAttachments([])
      setShowAdvancedComposer(false)
      
      loadPosts()
      
    } catch (error) {
      console.error('Failed to create post:', error)
    } finally {
      setLoading(false)
    }
  }

  const createPollContent = () => {
    const validOptions = pollOptions.filter(option => option.trim())
    return `${newPost.trim()}\n\nPoll Options:\n${validOptions.map((option, index) => `${index + 1}. ${option}`).join('\n')}`
  }

  const extractMentions = (text) => {
    const mentionRegex = /@(\w+)/g
    const mentions = []
    let match
    
    while ((match = mentionRegex.exec(text)) !== null) {
      const username = match[1].toLowerCase()
      const user = mentionSuggestions.find(u => {
        const userName = typeof u.user_name === 'object' ? u.user_name.value : u.user_name
        return userName.toLowerCase() === username
      })
      
      if (user) {
        const userSysId = typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id
        mentions.push(userSysId)
      }
    }
    
    return [...new Set(mentions)] // Remove duplicates
  }

  const extractTags = (text) => {
    const tagRegex = /#([a-zA-Z0-9_]+)/g
    const tags = []
    let match
    
    while ((match = tagRegex.exec(text)) !== null) {
      tags.push(match[1].toLowerCase())
    }
    
    return [...new Set(tags)] // Remove duplicates
  }

  const handleTextareaChange = (e) => {
    const value = e.target.value
    setNewPost(value)
    
    // Check for mention trigger
    const cursorPosition = e.target.selectionStart
    const textBeforeCursor = value.substring(0, cursorPosition)
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/)
    
    if (mentionMatch) {
      setShowMentions(true)
    } else {
      setShowMentions(false)
    }
  }

  const insertMention = (user) => {
    const userName = typeof user.user_name === 'object' ? user.user_name.value : user.user_name
    const firstName = typeof user.first_name === 'object' ? user.first_name.value : user.first_name
    const lastName = typeof user.last_name === 'object' ? user.last_name.value : user.last_name
    
    const textarea = textareaRef.current
    const cursorPosition = textarea.selectionStart
    const textBeforeCursor = newPost.substring(0, cursorPosition)
    const textAfterCursor = newPost.substring(cursorPosition)
    
    // Find the @ symbol and replace the partial mention
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/)
    if (mentionMatch) {
      const beforeMention = textBeforeCursor.substring(0, mentionMatch.index)
      const newText = `${beforeMention}@${userName} (${firstName} ${lastName}) ${textAfterCursor}`
      setNewPost(newText)
    }
    
    setShowMentions(false)
  }

  const addPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, ''])
    }
  }

  const updatePollOption = (index, value) => {
    const newOptions = [...pollOptions]
    newOptions[index] = value
    setPollOptions(newOptions)
  }

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      const newOptions = pollOptions.filter((_, i) => i !== index)
      setPollOptions(newOptions)
    }
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const newAttachments = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }))
    
    setAttachments(prev => [...prev, ...newAttachments])
  }

  const removeAttachment = (id) => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === id)
      if (attachment?.preview) {
        URL.revokeObjectURL(attachment.preview)
      }
      return prev.filter(a => a.id !== id)
    })
  }

  const toggleLike = async (post) => {
    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      const postSysId = typeof post.sys_id === 'object' ? post.sys_id.value : post.sys_id

      // Check if user already liked this post
      const existingLike = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_post_interaction?sysparm_query=post=${postSysId}^user=${userSysId}^interaction_type=like^is_active=true&sysparm_display_value=all`
      )

      if (existingLike.result && existingLike.result.length > 0) {
        // Unlike - deactivate the like
        const likeSysId = typeof existingLike.result[0].sys_id === 'object' ? 
          existingLike.result[0].sys_id.value : existingLike.result[0].sys_id

        await employeeService.apiCall(
          `/api/now/table/x_1599224_officehu_post_interaction/${likeSysId}`,
          'PATCH',
          { is_active: false }
        )
      } else {
        // Like - create new like interaction
        await employeeService.apiCall(
          '/api/now/table/x_1599224_officehu_post_interaction',
          'POST',
          {
            post: postSysId,
            user: userSysId,
            interaction_type: 'like',
            is_active: true
          }
        )
      }

      loadPosts() // Refresh to update counts
      
    } catch (error) {
      console.error('Failed to toggle like:', error)
    }
  }

  const sharePost = async (post) => {
    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      const postSysId = typeof post.sys_id === 'object' ? post.sys_id.value : post.sys_id

      await employeeService.apiCall(
        '/api/now/table/x_1599224_officehu_post_interaction',
        'POST',
        {
          post: postSysId,
          user: userSysId,
          interaction_type: 'share',
          is_active: true
        }
      )

      // Show share options (could be expanded to actual sharing)
      const postContent = typeof post.content === 'object' ? post.content.value : post.content
      const shareText = `Check out this post: ${postContent.substring(0, 100)}${postContent.length > 100 ? '...' : ''}`
      
      if (navigator.share) {
        await navigator.share({
          title: 'OfficeHub Post',
          text: shareText,
          url: window.location.href
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(shareText)
        alert('Post link copied to clipboard!')
      }

      loadPosts() // Refresh to update counts
      
    } catch (error) {
      console.error('Failed to share post:', error)
    }
  }

  const addComment = async (post, commentText) => {
    if (!commentText.trim()) return

    try {
      const userSysId = typeof currentUser.sys_id === 'object' ? currentUser.sys_id.value : currentUser.sys_id
      const postSysId = typeof post.sys_id === 'object' ? post.sys_id.value : post.sys_id

      // Extract mentions from comment
      const mentions = extractMentions(commentText)

      await employeeService.apiCall(
        '/api/now/table/x_1599224_officehu_post_interaction',
        'POST',
        {
          post: postSysId,
          user: userSysId,
          interaction_type: 'comment',
          comment_text: commentText.trim(),
          mentioned_users: mentions.length > 0 ? JSON.stringify(mentions) : '',
          is_active: true
        }
      )

      loadPosts() // Refresh to update counts
      
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const postTime = new Date(timestamp)
    const diffMs = now - postTime
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return postTime.toLocaleDateString()
  }

  const getPostTypeIcon = (type) => {
    const typeObj = postTypes.find(pt => pt.value === type)
    return typeObj ? typeObj.icon : '💬'
  }

  const highlightMentionsAndTags = (text) => {
    if (!text) return text
    
    return text
      .replace(/@(\w+)/g, '<span class="mention">@$1</span>')
      .replace(/#(\w+)/g, '<span class="hashtag">#$1</span>')
  }

  const renderPost = (post) => {
    const author = typeof post.author === 'object' ? post.author.display_value : post.author
    const content = typeof post.content === 'object' ? post.content.value : post.content
    const postTypeValue = typeof post.post_type === 'object' ? post.post_type.value : post.post_type
    const likeCount = typeof post.like_count === 'object' ? post.like_count.value : post.like_count
    const commentCount = typeof post.comment_count === 'object' ? post.comment_count.value : post.comment_count
    const shareCount = typeof post.share_count === 'object' ? post.share_count.value : post.share_count
    const timestamp = typeof post.sys_created_on === 'object' ? post.sys_created_on.value : post.sys_created_on
    const isPinned = typeof post.is_pinned === 'object' ? post.is_pinned.value === 'true' : post.is_pinned === 'true'
    const isFeatured = typeof post.is_featured === 'object' ? post.is_featured.value === 'true' : post.is_featured === 'true'
    const tags = typeof post.tags === 'object' ? post.tags.value : post.tags
    const priority = typeof post.priority === 'object' ? post.priority.value : post.priority

    return (
      <div key={typeof post.sys_id === 'object' ? post.sys_id.value : post.sys_id} 
           className={`social-post ${isPinned ? 'pinned' : ''} ${isFeatured ? 'featured' : ''} ${priority === 'high' ? 'high-priority' : ''}`}>
        
        {isPinned && (
          <div className="pinned-indicator">
            📌 Pinned Post
          </div>
        )}
        
        {isFeatured && (
          <div className="featured-indicator">
            ⭐ Featured Content
          </div>
        )}
        
        <div className="post-header">
          <div className="post-author">
            <div className="author-avatar">
              {author ? author.split(' ').map(n => n[0]).join('').substring(0, 2) : '?'}
            </div>
            <div className="author-info">
              <div className="author-name">{author}</div>
              <div className="post-meta">
                <span className="post-type" title={postTypes.find(pt => pt.value === postTypeValue)?.label}>
                  {getPostTypeIcon(postTypeValue)}
                </span>
                <span className="post-time">{formatTimeAgo(timestamp)}</span>
                {priority === 'high' && <span className="priority-badge">🔥 Priority</span>}
              </div>
            </div>
          </div>
          
          <div className="post-menu">
            <button className="menu-btn" title="More options">⋯</button>
          </div>
        </div>

        <div className="post-content">
          <div 
            className="post-text"
            dangerouslySetInnerHTML={{ __html: highlightMentionsAndTags(content) }}
          />
          
          {tags && (
            <div className="post-tags">
              {tags.split(',').map((tag, index) => (
                <span key={index} className="tag" onClick={() => setSearchQuery(tag.trim())}>
                  #{tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="post-actions">
          <button 
            className={`action-btn like-btn ${likeCount > 0 ? 'has-likes' : ''}`}
            onClick={() => toggleLike(post)}
            title={`${likeCount} likes`}
          >
            ❤️ {likeCount > 0 ? likeCount : 'Like'}
          </button>
          
          <EnhancedCommentSection 
            post={post}
            commentCount={commentCount}
            onAddComment={addComment}
            employeeService={employeeService}
            mentionSuggestions={mentionSuggestions}
          />
          
          <button 
            className={`action-btn share-btn ${shareCount > 0 ? 'has-shares' : ''}`}
            onClick={() => sharePost(post)}
            title={`${shareCount} shares`}
          >
            🔄 {shareCount > 0 ? shareCount : 'Share'}
          </button>
          
          <button className="action-btn bookmark-btn" title="Bookmark">
            🔖 Save
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="enhanced-social-feed">
      <div className="feed-header">
        <div className="header-main">
          <h2>🌟 Team Social Feed</h2>
          <div className="header-actions">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search posts, tags, or users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </div>
        
        <div className="feed-controls">
          <div className="filters">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Posts</option>
              {postTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {trendingTags.length > 0 && (
            <div className="trending-tags">
              <span className="trending-label">🔥 Trending:</span>
              {trendingTags.slice(0, 5).map(({ tag, count }) => (
                <button
                  key={tag}
                  className="trending-tag"
                  onClick={() => setSearchQuery(`#${tag}`)}
                  title={`${count} posts`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="enhanced-create-post">
        <form onSubmit={createPost}>
          <div className="post-composer">
            <div className="composer-header">
              <div className="user-avatar">
                {currentUser.first_name?.charAt(0)}{currentUser.last_name?.charAt(0)}
              </div>
              <button
                type="button"
                className="toggle-advanced"
                onClick={() => setShowAdvancedComposer(!showAdvancedComposer)}
              >
                {showAdvancedComposer ? '📝 Simple' : '✨ Advanced'}
              </button>
            </div>
            
            <div className="composer-input">
              <textarea
                ref={textareaRef}
                value={newPost}
                onChange={handleTextareaChange}
                placeholder="What's on your mind? Use @username to mention colleagues and #hashtags for topics..."
                className="post-input"
                rows={showAdvancedComposer ? "4" : "3"}
              />
              
              {showMentions && (
                <div className="mention-suggestions">
                  {mentionSuggestions
                    .filter(user => {
                      const userName = typeof user.user_name === 'object' ? user.user_name.value : user.user_name
                      const firstName = typeof user.first_name === 'object' ? user.first_name.value : user.first_name
                      const lastName = typeof user.last_name === 'object' ? user.last_name.value : user.last_name
                      const query = newPost.match(/@(\w*)$/)?.[1]?.toLowerCase() || ''
                      return userName.toLowerCase().includes(query) || 
                             firstName.toLowerCase().includes(query) || 
                             lastName.toLowerCase().includes(query)
                    })
                    .slice(0, 5)
                    .map(user => (
                      <div
                        key={typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id}
                        className="mention-suggestion"
                        onClick={() => insertMention(user)}
                      >
                        <div className="mention-avatar">
                          {(typeof user.first_name === 'object' ? user.first_name.value : user.first_name)?.charAt(0)}
                          {(typeof user.last_name === 'object' ? user.last_name.value : user.last_name)?.charAt(0)}
                        </div>
                        <div className="mention-info">
                          <div className="mention-name">
                            {typeof user.first_name === 'object' ? user.first_name.value : user.first_name} {typeof user.last_name === 'object' ? user.last_name.value : user.last_name}
                          </div>
                          <div className="mention-username">
                            @{typeof user.user_name === 'object' ? user.user_name.value : user.user_name}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {showAdvancedComposer && (
              <div className="advanced-options">
                {postType === 'poll' && (
                  <div className="poll-options">
                    <h4>📊 Poll Options</h4>
                    {pollOptions.map((option, index) => (
                      <div key={index} className="poll-option-input">
                        <input
                          type="text"
                          placeholder={`Option ${index + 1}`}
                          value={option}
                          onChange={(e) => updatePollOption(index, e.target.value)}
                        />
                        {pollOptions.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removePollOption(index)}
                            className="remove-option"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                    {pollOptions.length < 6 && (
                      <button
                        type="button"
                        onClick={addPollOption}
                        className="add-option"
                      >
                        ➕ Add Option
                      </button>
                    )}
                  </div>
                )}

                <div className="attachments-section">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  
                  {attachments.length > 0 && (
                    <div className="attachments-preview">
                      {attachments.map(attachment => (
                        <div key={attachment.id} className="attachment-item">
                          {attachment.preview ? (
                            <img src={attachment.preview} alt={attachment.name} className="attachment-image" />
                          ) : (
                            <div className="attachment-file">
                              <span className="file-icon">📄</span>
                              <span className="file-name">{attachment.name}</span>
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => removeAttachment(attachment.id)}
                            className="remove-attachment"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            <div className="composer-footer">
              <div className="post-options">
                <select 
                  value={postType}
                  onChange={(e) => setPostType(e.target.value)}
                  className="post-type-select"
                >
                  {postTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                
                <select 
                  value={visibility}
                  onChange={(e) => setVisibility(e.target.value)}
                  className="visibility-select"
                >
                  {visibilityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="attachment-actions">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="attachment-btn"
                    title="Add attachment"
                  >
                    📎
                  </button>
                </div>
              </div>
              
              <button 
                type="submit"
                disabled={(!newPost.trim() && postType !== 'poll') || loading}
                className="post-submit-btn"
              >
                {loading ? 'Posting...' : '📤 Post'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="posts-container">
        {loading && posts.length === 0 ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            {searchQuery ? (
              <div>
                <p>No posts found for "{searchQuery}"</p>
                <button onClick={() => setSearchQuery('')} className="clear-search">
                  Clear search
                </button>
              </div>
            ) : (
              <p>No posts yet. Be the first to share something!</p>
            )}
          </div>
        ) : (
          posts.map(renderPost)
        )}
      </div>
    </div>
  )
}

// Enhanced Comment Section Component with advanced features
function EnhancedCommentSection({ post, commentCount, onAddComment, employeeService, mentionSuggestions }) {
  const [showComments, setShowComments] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loadingComments, setLoadingComments] = useState(false)
  const [showMentions, setShowMentions] = useState(false)
  const [replyTo, setReplyTo] = useState(null)

  const loadComments = async () => {
    if (showComments || loadingComments) return
    
    try {
      setLoadingComments(true)
      const postSysId = typeof post.sys_id === 'object' ? post.sys_id.value : post.sys_id
      
      const response = await employeeService.apiCall(
        `/api/now/table/x_1599224_officehu_post_interaction?sysparm_query=post=${postSysId}^interaction_type=comment^is_active=true^ORDERBYsys_created_on&sysparm_display_value=all`
      )
      
      setComments(response.result || [])
      setShowComments(true)
      
    } catch (error) {
      console.error('Failed to load comments:', error)
    } finally {
      setLoadingComments(false)
    }
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      const commentText = replyTo ? `@${replyTo.username} ${newComment}` : newComment
      onAddComment(post, commentText)
      setNewComment('')
      setReplyTo(null)
    }
  }

  const handleCommentChange = (e) => {
    const value = e.target.value
    setNewComment(value)
    
    // Check for mention trigger
    const mentionMatch = value.match(/@(\w*)$/)
    setShowMentions(!!mentionMatch)
  }

  const insertMention = (user) => {
    const userName = typeof user.user_name === 'object' ? user.user_name.value : user.user_name
    const firstName = typeof user.first_name === 'object' ? user.first_name.value : user.first_name
    const lastName = typeof user.last_name === 'object' ? user.last_name.value : user.last_name
    
    const mentionMatch = newComment.match(/@(\w*)$/)
    if (mentionMatch) {
      const beforeMention = newComment.substring(0, mentionMatch.index)
      setNewComment(`${beforeMention}@${userName} (${firstName} ${lastName}) `)
    }
    
    setShowMentions(false)
  }

  return (
    <div className="enhanced-comment-section">
      <button 
        className={`action-btn comment-btn ${commentCount > 0 ? 'has-comments' : ''}`}
        onClick={loadComments}
      >
        💬 {commentCount > 0 ? commentCount : 'Comment'}
      </button>

      {showComments && (
        <div className="comments-container">
          {comments.map(comment => {
            const user = typeof comment.user === 'object' ? comment.user.display_value : comment.user
            const text = typeof comment.comment_text === 'object' ? comment.comment_text.value : comment.comment_text
            const timestamp = typeof comment.sys_created_on === 'object' ? comment.sys_created_on.value : comment.sys_created_on
            const userName = typeof comment.user === 'object' ? comment.user.value : comment.user
            
            return (
              <div key={typeof comment.sys_id === 'object' ? comment.sys_id.value : comment.sys_id} className="enhanced-comment">
                <div className="comment-avatar">
                  {user ? user.split(' ').map(n => n[0]).join('').substring(0, 2) : '?'}
                </div>
                <div className="comment-content">
                  <div className="comment-header">
                    <span className="comment-author">{user}</span>
                    <span className="comment-time">{new Date(timestamp).toLocaleTimeString()}</span>
                    <button 
                      className="reply-btn"
                      onClick={() => setReplyTo({ username: userName, name: user })}
                    >
                      Reply
                    </button>
                  </div>
                  <div 
                    className="comment-text" 
                    dangerouslySetInnerHTML={{ 
                      __html: text.replace(/@(\w+)/g, '<span class="mention">@$1</span>') 
                    }}
                  />
                </div>
              </div>
            )
          })}
          
          {replyTo && (
            <div className="reply-indicator">
              Replying to <strong>{replyTo.name}</strong>
              <button onClick={() => setReplyTo(null)} className="cancel-reply">✕</button>
            </div>
          )}
          
          <form onSubmit={handleAddComment} className="enhanced-comment-form">
            <div className="comment-input-container">
              <input
                type="text"
                value={newComment}
                onChange={handleCommentChange}
                placeholder={replyTo ? `Reply to ${replyTo.name}...` : "Write a comment... Use @username to mention"}
                className="comment-input"
              />
              
              {showMentions && (
                <div className="comment-mentions">
                  {mentionSuggestions.slice(0, 3).map(user => (
                    <div
                      key={typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id}
                      className="mention-suggestion"
                      onClick={() => insertMention(user)}
                    >
                      <span className="mention-name">
                        {typeof user.first_name === 'object' ? user.first_name.value : user.first_name} {typeof user.last_name === 'object' ? user.last_name.value : user.last_name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button type="submit" disabled={!newComment.trim()} className="comment-submit">
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  )
}