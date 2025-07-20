import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.74.26.144:8008',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized! Possibly invalid token.");
    }
    return Promise.reject(error);
  }
);

export default api;
