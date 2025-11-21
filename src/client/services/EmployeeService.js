// Enhanced Employee Service with comprehensive error handling and session management
export class EmployeeService {
  constructor() {
    this.baseUrl = '/api/now/table'
    this.maxRetries = 3
    this.retryDelay = 1000
  }

  /**
   * Wait for ServiceNow environment to be fully loaded
   */
  async waitForServiceNowEnvironment(maxWaitTime = 10000) {
    const startTime = Date.now()
    
    while (Date.now() - startTime < maxWaitTime) {
      // Check for essential ServiceNow globals
      if (window.g_ck && window.g_user) {
        // Additional check to ensure user is not guest
        if (window.g_user.userName && 
            window.g_user.userName !== 'guest' && 
            window.g_user.userName !== '') {
          return {
            available: true,
            userToken: window.g_ck,
            user: window.g_user
          }
        }
      }
      
      // Wait 200ms before checking again
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    
    return {
      available: false,
      userToken: window.g_ck || null,
      user: window.g_user || null
    }
  }

  /**
   * Enhanced current user detection with multiple fallback strategies
   */
  async getCurrentUser() {
    // Strategy 1: Wait for ServiceNow environment
    console.log('🔍 Checking ServiceNow environment...')
    const envStatus = await this.waitForServiceNowEnvironment()
    
    if (!envStatus.available) {
      console.warn('⚠️ ServiceNow environment not fully loaded')
      
      // Check if we're actually in ServiceNow
      if (!window.location.hostname.includes('service-now.com') && 
          !window.location.hostname.includes('servicenow.com')) {
        throw new Error('This application must be accessed through a ServiceNow instance. Please navigate to your ServiceNow portal.')
      }
      
      // Check for authentication token
      if (!window.g_ck) {
        throw new Error('ServiceNow authentication token not available. Please log into ServiceNow and refresh the page.')
      }
    }

    // Strategy 2: Use ServiceNow global user object if available
    if (envStatus.user && envStatus.user.userName && envStatus.user.userName !== 'guest') {
      console.log('✅ Using ServiceNow global user object')
      return {
        sys_id: envStatus.user.userID,
        user_name: envStatus.user.userName,
        first_name: envStatus.user.firstName || '',
        last_name: envStatus.user.lastName || '',
        email: envStatus.user.email || envStatus.user.userName,
        title: envStatus.user.title || '',
        full_name: envStatus.user.fullName || `${envStatus.user.firstName || ''} ${envStatus.user.lastName || ''}`.trim() || envStatus.user.userName
      }
    }

    // Strategy 3: Fetch current user via REST API using session
    console.log('🔍 Attempting to fetch user via REST API...')
    try {
      const response = await this.apiCallWithRetry('/api/now/v1/whoami')
      
      if (response && response.result) {
        const userInfo = response.result
        console.log('✅ Retrieved user info via whoami API')
        
        return {
          sys_id: userInfo.sys_id,
          user_name: userInfo.user_name,
          first_name: userInfo.first_name || '',
          last_name: userInfo.last_name || '',
          email: userInfo.email || userInfo.user_name,
          title: userInfo.title || '',
          full_name: userInfo.name || `${userInfo.first_name || ''} ${userInfo.last_name || ''}`.trim() || userInfo.user_name
        }
      }
    } catch (error) {
      console.warn('⚠️ whoami API failed:', error.message)
    }

    // Strategy 4: Query sys_user table with current session
    console.log('🔍 Querying sys_user table...')
    try {
      const response = await this.apiCallWithRetry(
        '/api/now/table/sys_user?sysparm_query=user_name=javascript:gs.getUserName()&sysparm_limit=1&sysparm_display_value=all'
      )
      
      if (response.result && response.result.length > 0) {
        const user = response.result[0]
        console.log('✅ Retrieved user info via sys_user query')
        
        return {
          sys_id: typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id,
          user_name: typeof user.user_name === 'object' ? user.user_name.display_value : user.user_name,
          first_name: typeof user.first_name === 'object' ? user.first_name.display_value : user.first_name,
          last_name: typeof user.last_name === 'object' ? user.last_name.display_value : user.last_name,
          email: typeof user.email === 'object' ? user.email.display_value : user.email,
          title: typeof user.title === 'object' ? user.title.display_value : user.title,
          full_name: typeof user.name === 'object' ? user.name.display_value : user.name
        }
      }
    } catch (error) {
      console.warn('⚠️ sys_user query failed:', error.message)
    }

    // Strategy 5: Try alternative user detection methods
    console.log('🔍 Trying alternative user detection...')
    try {
      // Check if we can detect user ID from URL or other context
      const urlParams = new URLSearchParams(window.location.search)
      const sessionInfo = this.extractSessionInfo()
      
      if (sessionInfo.userId) {
        const response = await this.apiCallWithRetry(
          `/api/now/table/sys_user/${sessionInfo.userId}?sysparm_display_value=all`
        )
        
        if (response.result) {
          const user = response.result
          console.log('✅ Retrieved user info via direct user lookup')
          
          return {
            sys_id: typeof user.sys_id === 'object' ? user.sys_id.value : user.sys_id,
            user_name: typeof user.user_name === 'object' ? user.user_name.display_value : user.user_name,
            first_name: typeof user.first_name === 'object' ? user.first_name.display_value : user.first_name,
            last_name: typeof user.last_name === 'object' ? user.last_name.display_value : user.last_name,
            email: typeof user.email === 'object' ? user.email.display_value : user.email,
            title: typeof user.title === 'object' ? user.title.display_value : user.title,
            full_name: typeof user.name === 'object' ? user.name.display_value : user.name
          }
        }
      }
    } catch (error) {
      console.warn('⚠️ Alternative user detection failed:', error.message)
    }

    // Final attempt: Check if we have any user context at all
    if (window.g_ck) {
      throw new Error('User information not available. Please ensure you are logged into ServiceNow with an active session and have the necessary permissions to access OfficeHub.')
    } else {
      throw new Error('No active ServiceNow user session found. Please log into ServiceNow first, then access OfficeHub again.')
    }
  }

  /**
   * Extract session information from browser context
   */
  extractSessionInfo() {
    const info = {
      userId: null,
      sessionId: null,
      instanceInfo: null
    }
    
    // Try to extract from ServiceNow context
    try {
      if (window.g_user && window.g_user.userID) {
        info.userId = window.g_user.userID
      }
      
      if (window.location.hostname) {
        info.instanceInfo = {
          hostname: window.location.hostname,
          isServiceNow: window.location.hostname.includes('service-now.com') || 
                       window.location.hostname.includes('servicenow.com')
        }
      }
      
      // Check for session cookies or other indicators
      if (document.cookie) {
        const cookies = document.cookie.split(';')
        for (const cookie of cookies) {
          if (cookie.includes('JSESSIONID') || cookie.includes('glide_user_session')) {
            info.sessionId = 'detected'
            break
          }
        }
      }
    } catch (error) {
      console.warn('Could not extract session info:', error)
    }
    
    return info
  }

  /**
   * Enhanced API call with retry logic and better error handling
   */
  async apiCallWithRetry(endpoint, method = 'GET', data = null, retryCount = 0) {
    const options = {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-UserToken': window.g_ck || ''
      }
    }

    if (data && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
      options.body = JSON.stringify(data)
    }

    try {
      console.log(`🔄 API Call (attempt ${retryCount + 1}): ${method} ${endpoint}`)
      
      const response = await fetch(endpoint, options)
      
      // Handle different response scenarios
      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`
        let errorDetails = null
        
        try {
          const responseText = await response.text()
          
          // Try to parse as JSON for detailed error information
          try {
            const errorJson = JSON.parse(responseText)
            if (errorJson.error) {
              if (typeof errorJson.error === 'string') {
                errorMessage = errorJson.error
              } else if (errorJson.error.message) {
                errorMessage = errorJson.error.message
                errorDetails = errorJson.error.detail || errorJson.error.details
              }
            }
          } catch (parseError) {
            // If not JSON, use the raw text
            if (responseText && responseText.length < 200) {
              errorMessage += `: ${responseText}`
            }
          }
          
          // Handle specific HTTP status codes
          if (response.status === 401) {
            errorMessage = 'Authentication failed. Please log into ServiceNow and refresh the page.'
          } else if (response.status === 403) {
            errorMessage = 'Access denied. Please ensure you have the necessary permissions to access OfficeHub features.'
          } else if (response.status === 404) {
            errorMessage = 'Requested resource not found. The OfficeHub application may not be properly installed.'
          } else if (response.status === 500) {
            errorMessage = 'Server error occurred. Please try again or contact your system administrator.'
          }
          
        } catch (textError) {
          console.warn('Could not read response text:', textError)
        }
        
        // Retry logic for certain errors
        if (retryCount < this.maxRetries && (response.status >= 500 || response.status === 429)) {
          console.log(`⏳ Retrying in ${this.retryDelay}ms...`)
          await new Promise(resolve => setTimeout(resolve, this.retryDelay))
          return this.apiCallWithRetry(endpoint, method, data, retryCount + 1)
        }
        
        const error = new Error(errorMessage)
        error.status = response.status
        error.details = errorDetails
        throw error
      }

      const responseData = await response.json()
      console.log(`✅ API Call successful: ${method} ${endpoint}`)
      
      return responseData
      
    } catch (error) {
      // Network or parsing errors
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        if (retryCount < this.maxRetries) {
          console.log(`🌐 Network error, retrying in ${this.retryDelay}ms...`)
          await new Promise(resolve => setTimeout(resolve, this.retryDelay))
          return this.apiCallWithRetry(endpoint, method, data, retryCount + 1)
        }
        throw new Error('Network connection failed. Please check your internet connection and try again.')
      }
      
      console.error(`❌ API Call failed: ${method} ${endpoint}`, error)
      throw error
    }
  }

  /**
   * Main method to get or initialize current user
   */
  async getOrCreateEmployee() {
    try {
      console.log('🚀 Starting user initialization...')
      
      const user = await this.getCurrentUser()
      
      // Validate that we have essential user information
      if (!user.sys_id) {
        throw new Error('User system ID not available. Please contact your ServiceNow administrator.')
      }
      
      if (!user.user_name) {
        throw new Error('User name not available. Please ensure your user account is properly configured.')
      }
      
      console.log('✅ User initialization successful:', user.user_name)
      
      // Return the user object with all available information
      return {
        sys_id: user.sys_id,
        user_name: user.user_name,
        first_name: user.first_name || user.user_name.split('.')[0] || 'User',
        last_name: user.last_name || user.user_name.split('.')[1] || '',
        email: user.email || user.user_name,
        title: user.title || 'Employee',
        full_name: user.full_name || `${user.first_name || 'User'} ${user.last_name || ''}`.trim(),
        session_valid: true,
        last_verified: new Date().toISOString()
      }
      
    } catch (error) {
      console.error('❌ User initialization failed:', error)
      
      // Provide more specific error messages based on the failure type
      let enhancedError = error
      
      if (error.message.includes('authentication token')) {
        enhancedError = new Error('Authentication token not available. Please log into ServiceNow in another tab, then refresh this page.')
      } else if (error.message.includes('User information not available')) {
        enhancedError = new Error('User information not available. This may be due to insufficient permissions or an inactive user account. Please contact your system administrator.')
      } else if (error.message.includes('No active ServiceNow user session')) {
        enhancedError = new Error('User session not found. Please refresh the page and ensure you are logged into ServiceNow with proper credentials.')
      } else if (error.message.includes('must be accessed through')) {
        enhancedError = error // Keep original message as it's already clear
      }
      
      throw enhancedError
    }
  }

  /**
   * Generic API call method with comprehensive error handling
   */
  async apiCall(endpoint, method = 'GET', data = null) {
    try {
      return await this.apiCallWithRetry(endpoint, method, data)
    } catch (error) {
      // Add context to API errors
      const contextualError = new Error(error.message)
      contextualError.endpoint = endpoint
      contextualError.method = method
      contextualError.originalError = error
      
      // Don't log authentication errors as they're expected in some cases
      if (!error.message.includes('Authentication failed') && !error.message.includes('Access denied')) {
        console.error('API call failed:', {
          endpoint,
          method,
          error: error.message
        })
      }
      
      throw contextualError
    }
  }

  /**
   * Check if user session is still valid
   */
  async validateSession() {
    try {
      const response = await this.apiCall('/api/now/v1/whoami')
      return !!(response && response.result && response.result.user_name)
    } catch (error) {
      console.warn('Session validation failed:', error.message)
      return false
    }
  }

  /**
   * Refresh user session information
   */
  async refreshUserSession() {
    try {
      return await this.getOrCreateEmployee()
    } catch (error) {
      console.error('Failed to refresh user session:', error)
      throw error
    }
  }

  /**
   * Get diagnostic information for troubleshooting
   */
  getDiagnosticInfo() {
    const diagnostics = {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      hostname: window.location.hostname,
      protocol: window.location.protocol,
      serviceNowGlobals: {
        g_ck_available: !!(window.g_ck),
        g_user_available: !!(window.g_user),
        g_user_name: window.g_user?.userName || 'not available',
        g_user_id: window.g_user?.userID || 'not available'
      },
      browserInfo: {
        cookiesEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        language: navigator.language
      },
      localStorageAvailable: (() => {
        try {
          localStorage.setItem('test', 'test')
          localStorage.removeItem('test')
          return true
        } catch (e) {
          return false
        }
      })()
    }
    
    return diagnostics
  }

  // Utility methods for date/time formatting
  getTodayServiceNow() {
    return new Date().toISOString().split('T')[0]
  }

  getNowServiceNow() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ')
  }

  formatServiceNowDate(date) {
    if (!date) return ''
    return new Date(date).toISOString().split('T')[0]
  }

  formatServiceNowDateTime(date) {
    if (!date) return ''
    return new Date(date).toISOString().slice(0, 19).replace('T', ' ')
  }
}