import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.timelyapp.site',
  withCredentials: true, // Important for CORS with credentials
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Access-Control-Allow-Credentials'] = 'true';

    if (config.method === 'options') {
      config.headers['Access-Control-Request-Method'] = 'POST, GET, DELETE, PUT, PATCH';
      config.headers['Access-Control-Request-Headers'] = 'Content-Type, Authorization';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.defaults.errorHandler = (error) => {
  if (error.response) {
    console.error('Data:', error.response.data);
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
  } else if (error.request) {
    console.error('Request Error:', error.request);
  } else {
    console.error('Error Message:', error.message);
  }
};
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle CORS errors
    if (error.message === 'Network Error') {
      console.error('CORS or Network Error:', error);
      // You might want to show a user-friendly message here
    }
    
    // Handle authentication errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);


export default axiosInstance;