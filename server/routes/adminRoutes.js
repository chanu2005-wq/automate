import express from 'express';
import { 
  getDashboardStats, 
  getAllVehicles, createVehicle, updateVehicle, deleteVehicle, toggleAvailability,
  getAllBookings, updateBookingStatus,
  getAllCustomers, toggleBlockCustomer, getCustomerDetail,
  getAllPayments, processRefund,
  getAllReviews, deleteReview,
  getRevenueReport, getVehicleReport, getBookingReport, getCustomerReport
} from '../controllers/adminController.js';
import { protect } from '../middleware/auth.js';
import { admin } from '../middleware/admin.js';

const router = express.Router();

router.use(protect, admin);

router.get('/dashboard', getDashboardStats);

router.route('/vehicles')
  .get(getAllVehicles)
  .post(createVehicle);
router.route('/vehicles/:id')
  .put(updateVehicle)
  .delete(deleteVehicle);
router.put('/vehicles/:id/toggle-availability', toggleAvailability);

router.route('/bookings')
  .get(getAllBookings);
router.put('/bookings/:id/status', updateBookingStatus);

router.get('/customers', getAllCustomers);
router.get('/customers/:id', getCustomerDetail);
router.put('/customers/:id/toggle-block', toggleBlockCustomer);

router.get('/payments', getAllPayments);
router.put('/payments/:id/refund', processRefund);

router.route('/reviews')
  .get(getAllReviews);
router.delete('/reviews/:id', deleteReview);

router.get('/reports/revenue', getRevenueReport);
router.get('/reports/vehicles', getVehicleReport);
router.get('/reports/bookings', getBookingReport);
router.get('/reports/customers', getCustomerReport);

export default router;
