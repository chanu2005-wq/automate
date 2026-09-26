import express from 'express';
import { createPaymentIntent, confirmPayment, getPaymentByBooking, handleWebhook } from '../controllers/paymentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

router.use(protect);
router.post('/create-intent', createPaymentIntent);
router.post('/confirm', confirmPayment);
router.get('/booking/:bookingId', getPaymentByBooking);

export default router;
