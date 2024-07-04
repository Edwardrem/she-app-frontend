// src/api.js

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(config=>{
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const login = (Credentials) => api.post('/login', Credentials);
export const register = (Credentials) => api.post('/register', Credentials);
export const logout = (data) => api.post('/logout', data);
export const fetchProfile = () => api.get('/profile');
export const fetchAilments = () => api.get('/ailments');
export const createAilment = (data) => api.post('/ailments', data);
