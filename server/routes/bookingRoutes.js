import express from 'express';
import { createBooking, getMyBookings, getBooking, cancelBooking } from '../controllers/bookingController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', createBooking);
router.get('/', getMyBookings);
router.get('/:id', getBooking);
router.put('/:id/cancel', cancelBooking);

export default router;
