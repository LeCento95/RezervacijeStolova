import axios from 'axios';

const HttpService = axios.create({
  baseURL: 'https://carics95-001-site1.ptempurl.com/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
HttpService.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
HttpService.interceptors.response.use(
  (response) => {
    // Standardize successful responses
    return {
      data: response.data,
      status: response.status,
      success: true
    };
  },
  (error) => {
    // Standardize error responses
    const errorResponse = {
      success: false,
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    };

    if (error.response?.data?.errors) {
      // Format validation errors
      errorResponse.errors = Object.entries(error.response.data.errors)
        .map(([field, messages]) => `${field}: ${messages.join(', ')}`)
        .join('; ');
    }

    return Promise.reject(errorResponse);
  }
);

export { HttpService };