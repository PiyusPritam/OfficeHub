// Enhanced User Service for ServiceNow current user session
export class EmployeeService {
  constructor() {
    this.baseUrl = '/api/now/table'
  }

  // Get current ServiceNow user with better error handling and fallbacks
  async getCurrentUser() {
    // Try multiple methods to get the current user
    
    // Method 1: Check ServiceNow global variables
    if (window.g_user && window.g_user.userName && window.g_user.userName !== 'guest') {
      return {
        sys_id: window.g_user.userID,
        user_name: window.g_user.userName,
        first_name: window.g_user.firstName || '',
        last_name: window.g_user.lastName || '',
        email: window.g_user.userName,
        full_name: window.g_user.fullName || `${window.g_user.firstName || ''} ${window.g_user.lastName || ''}`.trim() || window.g_user.userName
      }
    }

    // Method 2: Try to get user info from ServiceNow REST API
    try {
      const response = await fetch('/api/now/table/sys_user?sysparm_query=user_name=javascript:gs.getUserName()&sysparm_limit=1', {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck || ''
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.result && data.result.length > 0) {
          const user = data.result[0]
          return {
            sys_id: user.sys_id,
            user_name: user.user_name,
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || user.user_name,
            full_name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.user_name
          }
        }
      }
    } catch (error) {
      console.warn('Could not fetch user from API:', error)
    }

    // Method 3: Try to get user info using GlideSystem
    try {
      const response = await fetch('/api/now/table/sys_user?sysparm_query=sys_id=javascript:gs.getUserID()&sysparm_limit=1', {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck || ''
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.result && data.result.length > 0) {
          const user = data.result[0]
          return {
            sys_id: user.sys_id,
            user_name: user.user_name,
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            email: user.email || user.user_name,
            full_name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || user.user_name
          }
        }
      }
    } catch (error) {
      console.warn('Could not fetch user using GlideSystem:', error)
    }

    // Method 4: Check if we're in ServiceNow context at all
    if (typeof window !== 'undefined' && window.location) {
      const hostname = window.location.hostname
      if (hostname.includes('service-now.com') || hostname.includes('servicenow.com')) {
        throw new Error('Please ensure you are logged into ServiceNow. Try refreshing the page or logging in again.')
      }
    }

    throw new Error('No active ServiceNow user session found. Please ensure you are logged into ServiceNow and have the necessary permissions.')
  }

  // Enhanced method that waits for ServiceNow globals to be available
  async waitForServiceNowGlobals(maxWaitTime = 5000) {
    const startTime = Date.now()
    
    while (Date.now() - startTime < maxWaitTime) {
      if (window.g_user && window.g_user.userName && window.g_user.userName !== 'guest') {
        return true
      }
      
      // Wait 100ms before checking again
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    
    return false
  }

  // Get current user information with proper initialization waiting
  async getOrCreateEmployee() {
    try {
      // First, wait for ServiceNow globals to be available
      const globalsAvailable = await this.waitForServiceNowGlobals()
      
      if (!globalsAvailable) {
        console.warn('ServiceNow globals not available, trying API approach')
      }
      
      const user = await this.getCurrentUser()
      
      // Just return the current user information directly
      return {
        sys_id: user.sys_id,
        user_name: user.user_name,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        full_name: user.full_name
      }
    } catch (error) {
      console.error('Error getting current user:', error)
      throw error
    }
  }

  // Generic API call helper with enhanced error handling
  async apiCall(endpoint, options = {}) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck || '',
          ...options.headers
        },
        ...options
      })

      if (!response.ok) {
        const errorText = await response.text()
        let errorMessage = `API Error: ${response.status} ${response.statusText}`
        
        if (response.status === 401) {
          errorMessage = 'Authentication failed. Please log into ServiceNow and refresh the page.'
        } else if (response.status === 403) {
          errorMessage = 'Access denied. Please ensure you have the necessary permissions.'
        }
        
        try {
          const errorJson = JSON.parse(errorText)
          if (errorJson.error) {
            if (errorJson.error.message) {
              errorMessage = errorJson.error.message
            } else if (errorJson.error.detail) {
              errorMessage = errorJson.error.detail
            } else if (typeof errorJson.error === 'string') {
              errorMessage = errorJson.error
            }
          }
        } catch {
          if (errorText) {
            errorMessage += ` - ${errorText.substring(0, 200)}`
          }
        }
        
        throw new Error(errorMessage)
      }

      return await response.json()
    } catch (error) {
      console.error('API call failed:', error)
      throw error
    }
  }

  // Get today's date in ServiceNow format
  getTodayServiceNow() {
    return new Date().toISOString().split('T')[0]
  }

  // Get current datetime in ServiceNow format  
  getNowServiceNow() {
    return new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
}