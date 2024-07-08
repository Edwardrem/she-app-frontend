// src/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (credentials) => api.post('/login/', credentials);
export const register = (data) => api.post('/register/', data);
export const logout = (data) => api.post('/logout/', data);
export const fetchProfile = () => api.get('/profiles/me/');
export const fetchAilments = () => api.get('/ailments/');
export const createAilment = (data) => api.post('/ailments/', data);

export default api;
