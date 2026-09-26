import Booking from '../models/Booking.js';
import Vehicle from '../models/Vehicle.js';
import Payment from '../models/Payment.js';
import createNotification from '../utils/createNotification.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const createBooking = async (req, res) => {
  const { vehicleId, pickupLocation, dropOffLocation, pickupDateTime, returnDateTime } = req.body;

  if (new Date(pickupDateTime) < new Date() || new Date(returnDateTime) <= new Date(pickupDateTime)) {
    return sendError(res, 'Invalid dates', 400);
  }

  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) return sendError(res, 'Vehicle not found', 404);

  // Check availability again
  const overlappingBookings = await Booking.find({
    vehicle: vehicleId,
    status: { $in: ['Pending', 'Confirmed', 'Active'] },
    $or: [
      { pickupDateTime: { $lt: new Date(returnDateTime) }, returnDateTime: { $gt: new Date(pickupDateTime) } }
    ]
  });

  if (overlappingBookings.length > 0) return sendError(res, 'Vehicle is not available for these dates', 400);

  const rentalDays = Math.ceil((new Date(returnDateTime) - new Date(pickupDateTime)) / (1000 * 60 * 60 * 24));
  const baseAmount = rentalDays * vehicle.pricePerDay;
  const totalAmount = baseAmount; // add logic for taxes/additional later

  const booking = await Booking.create({
    user: req.user.id,
    vehicle: vehicleId,
    pickupLocation,
    dropOffLocation,
    pickupDateTime,
    returnDateTime,
    rentalDays,
    baseAmount,
    totalAmount
  });

  const payment = await Payment.create({
    booking: booking._id,
    user: req.user.id,
    amount: totalAmount
  });

  await createNotification({
    user: req.user.id,
    title: 'Booking Created',
    message: `Your booking for ${vehicle.brand} ${vehicle.model} is pending payment.`,
    type: 'booking',
    relatedBooking: booking._id
  });

  sendSuccess(res, 'Booking created', { booking, payment }, 201);
};

export const getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('vehicle').sort('-createdAt');
  sendSuccess(res, 'My bookings fetched', { bookings });
};

export const getBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('vehicle');
  if (!booking) return sendError(res, 'Booking not found', 404);
  if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return sendError(res, 'Not authorized', 403);
  }
  
  const payment = await Payment.findOne({ booking: req.params.id });
  sendSuccess(res, 'Booking details fetched', { booking, payment });
};

export const cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return sendError(res, 'Booking not found', 404);
  if (booking.user.toString() !== req.user.id) return sendError(res, 'Not authorized', 403);

  if (booking.status !== 'Pending' && booking.status !== 'Confirmed') {
    return sendError(res, `Cannot cancel booking with status ${booking.status}`, 400);
  }

  booking.status = 'Cancelled';
  booking.cancellationReason = req.body.reason || 'User cancelled';
  await booking.save();

  await createNotification({
    user: req.user.id,
    title: 'Booking Cancelled',
    message: `Your booking has been cancelled.`,
    type: 'cancellation',
    relatedBooking: booking._id
  });

  sendSuccess(res, 'Booking cancelled successfully', { booking });
};
