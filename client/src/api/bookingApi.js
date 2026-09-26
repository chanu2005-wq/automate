import API from './axios';

// Booking endpoints
export const createBooking = (data) => API.post('/bookings', data).then(r => r.data);
// Fix: route is GET /bookings/ (not /bookings/my)
export const getMyBookings = () => API.get('/bookings').then(r => r.data);
export const getBooking = (id) => API.get(`/bookings/${id}`).then(r => r.data);
export const cancelBooking = (id, data) => API.put(`/bookings/${id}/cancel`, data).then(r => r.data);
