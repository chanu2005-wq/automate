import API from './axios';
export const getNotifications = () => API.get('/notifications').then(r => r.data);
export const markAsRead = (id) => API.put(`/notifications/${id}/read`).then(r => r.data);
export const markAllAsRead = () => API.put('/notifications/read-all').then(r => r.data);
