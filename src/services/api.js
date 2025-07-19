import axios from 'axios';

const api = axios.create({
  baseURL: 'http://52.74.26.144:8008',
});

export default api;

