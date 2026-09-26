import express from 'express';
import { getMe, updateMe, changePassword, getBookingHistory } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.get('/me', getMe);
router.put('/me', updateMe);
router.put('/updatepassword', changePassword);
router.get('/bookings', getBookingHistory);

export default router;
