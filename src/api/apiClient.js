import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor - Add auth token to all requests
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle responses and errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', response.config.url, response.status);
    }
    
    return response;
  },
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - Clear token and redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/auth/signin';
          break;
          
        case 403:
          // Forbidden - User doesn't have permission
          console.error('❌ Access Denied:', data.message);
          break;
          
        case 404:
          // Not found
          console.error('❌ Not Found:', error.config.url);
          break;
          
        case 500:
          // Server error
          console.error('❌ Server Error:', data.message);
          break;
          
        default:
          console.error('❌ API Error:', status, data);
      }
      
      // Return error with message
      return Promise.reject({
        message: data.message || 'حدث خطأ أثناء معالجة الطلب',
        status,
        data,
      });
    } else if (error.request) {
      // Request made but no response received
      console.error('❌ Network Error: No response from server');
      return Promise.reject({
        message: 'فشل الاتصال بالخادم. يرجى التحقق من اتصال الإنترنت',
        status: 0,
      });
    } else {
      // Something happened in setting up the request
      console.error('❌ Request Setup Error:', error.message);
      return Promise.reject({
        message: 'حدث خطأ غير متوقع',
        status: 0,
      });
    }
  }
);

// Helper functions for common HTTP methods
export const api = {
  get: (url, config) => apiClient.get(url, config),
  post: (url, data, config) => apiClient.post(url, data, config),
  put: (url, data, config) => apiClient.put(url, data, config),
  patch: (url, data, config) => apiClient.patch(url, data, config),
  delete: (url, config) => apiClient.delete(url, config),
};

export default apiClient;
