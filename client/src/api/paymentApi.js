import API from './axios';

// Fix route paths to match server:
// POST /payments/create-intent (not /payments/create)
// POST /payments/confirm
// GET /payments/booking/:bookingId (not /payments/:bookingId)
export const createPaymentIntent = (data) => API.post('/payments/create-intent', data).then(r => r.data);
export const confirmPayment = (data) => API.post('/payments/confirm', data).then(r => r.data);
export const getPaymentByBooking = (bookingId) => API.get(`/payments/booking/${bookingId}`).then(r => r.data);
