import API from './axios';
export const register = (data) => API.post('/auth/register', data).then(r => r.data);
export const login = (data) => API.post('/auth/login', data).then(r => r.data);
export const logout = () => API.post('/auth/logout').then(r => r.data);
export const forgotPassword = (data) => API.post('/auth/forgot-password', data).then(r => r.data);
export const resetPassword = (token, data) => API.post(`/auth/reset-password/${token}`, data).then(r => r.data);
