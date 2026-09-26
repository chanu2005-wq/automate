import API from './axios';
export const createPaymentIntent = (data) => API.post('/payments/create', data).then(r => r.data);
export const confirmPayment = (data) => API.post('/payments/confirm', data).then(r => r.data);
export const getPaymentByBooking = (bookingId) => API.get(`/payments/${bookingId}`).then(r => r.data);
