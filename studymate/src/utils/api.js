// Central API service for all backend calls

// Base URL - change this to your production URL when deploying
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000';

/**
 * Generic API call function with error handling
 */
const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `API Error: ${response.status}`);
    }

    return { success: true, data };
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    return {
      success: false,
      error: error.message || 'Network error. Please check your connection.',
    };
  }
};

/**
 * Chat API - Send messages to AI tutor
 * @param {Array} messages - Array of message objects with role and content
 * @param {string} language - Language preference (english, zulu, xhosa)
 * @returns {Promise} Response with AI reply
 */
export const sendChatMessage = async (messages, language = 'english') => {
  return apiCall('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ messages, language }),
  });
};

/**
 * Study Plan API - Generate personalized study schedule
 * @param {Object} planData - Object with subject, date, weakTopics
 * @returns {Promise} Response with study plan array
 */
export const generateStudyPlan = async (planData) => {
  return apiCall('/api/study-plan', {
    method: 'POST',
    body: JSON.stringify(planData),
  });
};

/**
 * Past Papers API - Get past papers and study materials
 * @param {Object} filters - Optional filters (subject, year, type)
 * @returns {Promise} Response with past papers array
 */
export const getPastPapers = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `/api/past-papers?${queryParams}` : '/api/past-papers';

  return apiCall(endpoint, {
    method: 'GET',
  });
};

/**
 * Ask Tutor about Past Paper - Get help with specific past paper question
 * @param {Object} data - Object with paperId, question, context
 * @returns {Promise} Response with AI explanation
 */
export const askAboutPastPaper = async (data) => {
  return apiCall('/api/past-papers/ask', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * User Profile API - Get user profile data
 * @returns {Promise} Response with user profile
 */
export const getUserProfile = async () => {
  return apiCall('/api/profile', {
    method: 'GET',
  });
};

/**
 * Update Profile API - Update user profile data
 * @param {Object} profileData - Updated profile data
 * @returns {Promise} Response with updated profile
 */
export const updateUserProfile = async (profileData) => {
  return apiCall('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

/**
 * Settings API - Get user settings
 * @returns {Promise} Response with user settings
 */
export const getUserSettings = async () => {
  return apiCall('/api/settings', {
    method: 'GET',
  });
};

/**
 * Update Settings API - Update user settings
 * @param {Object} settings - Updated settings data
 * @returns {Promise} Response with updated settings
 */
export const updateUserSettings = async (settings) => {
  return apiCall('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(settings),
  });
};

/**
 * Authentication API - Login
 * @param {Object} credentials - Object with email and password
 * @returns {Promise} Response with auth token and user data
 */
export const login = async (credentials) => {
  return apiCall('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

/**
 * Authentication API - Register
 * @param {Object} userData - User registration data
 * @returns {Promise} Response with auth token and user data
 */
export const register = async (userData) => {
  return apiCall('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

/**
 * Authentication API - Logout
 * @returns {Promise} Response confirming logout
 */
export const logout = async () => {
  return apiCall('/api/auth/logout', {
    method: 'POST',
  });
};

// Export API base URL for other utilities
export { API_BASE_URL };
