import axios from 'axios';

// Create an Axios instance with the base URL from our environment variables.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Inject the JWT token into the headers of every request
api.interceptors.request.use(
  (config) => {
    // We check if window is defined to ensure this code only runs on the client-side,
    // as localStorage is not available during Server-Side Rendering (SSR).
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      
      // If a token exists, attach it to the Authorization header
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Optional handling for global API errors
api.interceptors.response.use(
  (response) => {
    // Pass through successful responses
    return response;
  },
  async (error) => {
    // If the server returns a 401 Unauthorized, the token might be expired or invalid.
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        // Here you could implement logic to use a refresh token
        // Or simply clear the invalid token and redirect the user to login:
        
        // localStorage.removeItem('access_token');
        // window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
