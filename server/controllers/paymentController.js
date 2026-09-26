import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import Booking from '../models/Booking.js';
import createNotification from '../utils/createNotification.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const createPaymentIntent = async (req, res) => {
  const payment = await Payment.findById(req.body.paymentId);
  if (!payment) return sendError(res, 'Payment not found', 404);

  if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_your_key') {
    // Mock for dev
    payment.stripePaymentIntentId = 'mock_pi_123';
    await payment.save();
    return sendSuccess(res, 'Mock Intent created', { clientSecret: 'mock_secret' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: payment.amount * 100, // in cents
    currency: 'usd',
    metadata: { bookingId: payment.booking.toString(), paymentId: payment._id.toString() }
  });

  payment.stripePaymentIntentId = paymentIntent.id;
  await payment.save();

  sendSuccess(res, 'Payment intent created', { clientSecret: paymentIntent.client_secret });
};

export const confirmPayment = async (req, res) => {
  const { paymentId } = req.body;
  const payment = await Payment.findById(paymentId);
  if (!payment) return sendError(res, 'Payment not found', 404);

  payment.status = 'Paid';
  payment.paidAt = Date.now();
  await payment.save();

  const booking = await Booking.findById(payment.booking);
  booking.status = 'Confirmed';
  await booking.save();

  await createNotification({
    user: payment.user,
    title: 'Payment Successful',
    message: 'Your payment was successful and booking is confirmed.',
    type: 'payment',
    relatedBooking: booking._id,
    sendMail: true
  });

  sendSuccess(res, 'Payment confirmed', { payment });
};

export const getPaymentByBooking = async (req, res) => {
  const payment = await Payment.findOne({ booking: req.params.bookingId });
  sendSuccess(res, 'Payment details fetched', { payment });
};

export const handleWebhook = async (req, res) => {
  // Add Stripe webhook logic here if required
  res.status(200).send('Webhook received');
};
