import User from '../models/User.js';
import Booking from '../models/Booking.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  const bookingsCount = await Booking.countDocuments({ user: req.user.id });
  sendSuccess(res, 'User fetched', { user, bookingsCount });
};

export const updateMe = async (req, res) => {
  const { name, email, phone } = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, { name, email, phone }, { new: true, runValidators: true });
  sendSuccess(res, 'User updated', { user });
};

export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');
  
  if (!(await user.matchPassword(oldPassword))) {
    return sendError(res, 'Invalid current password', 400);
  }

  user.password = newPassword;
  await user.save();
  sendSuccess(res, 'Password changed successfully');
};

export const getBookingHistory = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).populate('vehicle');
  sendSuccess(res, 'Booking history fetched', { bookings });
};
