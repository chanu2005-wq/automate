import API from './axios';
export const getVehicles = (params) => API.get('/vehicles', { params }).then(r => r.data);
export const getFeaturedVehicles = () => API.get('/vehicles/featured').then(r => r.data);
export const getCategories = () => API.get('/vehicles/categories').then(r => r.data);
export const getVehicle = (id) => API.get(`/vehicles/${id}`).then(r => r.data);
export const checkAvailability = (id, params) => API.get(`/vehicles/${id}/availability`, { params }).then(r => r.data);
