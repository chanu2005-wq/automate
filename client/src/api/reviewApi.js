import API from './axios';
export const createReview = (data) => API.post('/reviews', data).then(r => r.data);
export const getVehicleReviews = (vehicleId) => API.get(`/reviews/vehicle/${vehicleId}`).then(r => r.data);
