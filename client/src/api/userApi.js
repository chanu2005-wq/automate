import API from './axios';
export const getMe = () => API.get('/users/me').then(r => r.data);
export const updateMe = (data) => API.put('/users/me', data).then(r => r.data);
export const changePassword = (data) => API.put('/users/change-password', data).then(r => r.data);
