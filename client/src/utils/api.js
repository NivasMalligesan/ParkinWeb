// src/utils/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://parkinserver.onrender.com';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    // If token exists, add it to headers
    if (token) {
      config.headers.token = token;
      // Alternatively use Authorization header if your backend expects it
      // config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging (remove in production)
    console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`, config.data || '');
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful response for debugging (remove in production)
    console.log(`📥 Response from ${response.config.url}:`, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data
    });
    
    // Handle specific errors
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      // Handle 401 Unauthorized (token expired/invalid)
      if (status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        // Redirect to login if not already there
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }
      
      // Handle 404 Not Found
      if (status === 404) {
        console.error('API endpoint not found:', error.config.url);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received. Check network connection and server status.');
    } else {
      // Something else happened
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Add CORS preflight helper
export const checkCORS = async () => {
  try {
    const response = await api.options('/api/user/register');
    console.log('CORS check successful:', response.headers);
    return true;
  } catch (error) {
    console.error('CORS check failed:', error);
    return false;
  }
};

// Test connection to backend
export const testBackendConnection = async () => {
  try {
    const response = await api.get('/health');
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.response?.status
    };
  }
};

export default api;