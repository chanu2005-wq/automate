import API from './axios';

// Admin API endpoints — all route paths fixed to match server adminRoutes.js:
// GET  /admin/dashboard  (getDashboardStats)
// GET  /admin/vehicles
// POST /admin/vehicles
// PUT  /admin/vehicles/:id
// DELETE /admin/vehicles/:id
// PUT  /admin/vehicles/:id/toggle-availability
// GET  /admin/bookings
// PUT  /admin/bookings/:id/status
// GET  /admin/customers
// GET  /admin/customers/:id
// PUT  /admin/customers/:id/toggle-block
// GET  /admin/payments
// PUT  /admin/payments/:id/refund
// GET  /admin/reviews
// DELETE /admin/reviews/:id
// GET  /admin/reports/revenue
// GET  /admin/reports/vehicles
// GET  /admin/reports/bookings
// GET  /admin/reports/customers

export const getDashboardStats = () => API.get('/admin/dashboard').then(r => r.data);

export const getAdminVehicles = (params) => API.get('/admin/vehicles', { params }).then(r => r.data);
export const createAdminVehicle = (data) => API.post('/admin/vehicles', data).then(r => r.data);
export const updateAdminVehicle = (id, data) => API.put(`/admin/vehicles/${id}`, data).then(r => r.data);
export const deleteAdminVehicle = (id) => API.delete(`/admin/vehicles/${id}`).then(r => r.data);
// Fix: route is PUT /admin/vehicles/:id/toggle-availability (not PATCH /toggle)
export const toggleVehicleAvailability = (id) => API.put(`/admin/vehicles/${id}/toggle-availability`).then(r => r.data);

export const getAdminBookings = (params) => API.get('/admin/bookings', { params }).then(r => r.data);
export const updateBookingStatus = (id, data) => API.put(`/admin/bookings/${id}/status`, data).then(r => r.data);

export const getAdminCustomers = (params) => API.get('/admin/customers', { params }).then(r => r.data);
export const getCustomerDetail = (id) => API.get(`/admin/customers/${id}`).then(r => r.data);
// Fix: route is PUT /admin/customers/:id/toggle-block (not PATCH /block)
export const toggleBlockCustomer = (id) => API.put(`/admin/customers/${id}/toggle-block`).then(r => r.data);

export const getAdminPayments = (params) => API.get('/admin/payments', { params }).then(r => r.data);
// Fix: route is PUT /admin/payments/:id/refund (not POST)
export const processRefund = (id) => API.put(`/admin/payments/${id}/refund`).then(r => r.data);

export const getAdminReviews = () => API.get('/admin/reviews').then(r => r.data);
export const deleteAdminReview = (id) => API.delete(`/admin/reviews/${id}`).then(r => r.data);

export const getRevenueReport = () => API.get('/admin/reports/revenue').then(r => r.data);
export const getVehicleReport = () => API.get('/admin/reports/vehicles').then(r => r.data);
export const getBookingReport = () => API.get('/admin/reports/bookings').then(r => r.data);
export const getCustomerReport = () => API.get('/admin/reports/customers').then(r => r.data);
