import Review from '../models/Review.js';
import Booking from '../models/Booking.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const createReview = async (req, res) => {
  const { vehicleId, rating, comment } = req.body;

  const bookings = await Booking.find({ user: req.user.id, vehicle: vehicleId, status: 'Completed' });
  if (bookings.length === 0) return sendError(res, 'You can only review a vehicle you have completed a booking for', 400);

  const existingReview = await Review.findOne({ user: req.user.id, vehicle: vehicleId });
  if (existingReview) return sendError(res, 'You have already reviewed this vehicle', 400);

  const review = await Review.create({
    user: req.user.id,
    vehicle: vehicleId,
    booking: bookings[0]._id,
    rating,
    comment
  });

  sendSuccess(res, 'Review added successfully', { review }, 201);
};

export const getVehicleReviews = async (req, res) => {
  const reviews = await Review.find({ vehicle: req.params.vehicleId }).populate('user', 'name profileImage').sort('-createdAt');
  sendSuccess(res, 'Reviews fetched', { reviews });
};
