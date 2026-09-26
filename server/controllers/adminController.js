import Vehicle from '../models/Vehicle.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Payment from '../models/Payment.js';
import Review from '../models/Review.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getDashboardStats = async (req, res) => {
  const totalVehicles = await Vehicle.countDocuments();
  const availableVehicles = await Vehicle.countDocuments({ availability: true });
  const totalBookings = await Booking.countDocuments();
  const activeRentals = await Booking.countDocuments({ status: 'Active' });
  const pendingReturns = await Booking.countDocuments({ status: 'Pending' }); // Adjust logic as needed
  
  const payments = await Payment.find({ status: 'Paid' });
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  
  const totalCustomers = await User.countDocuments({ role: 'customer' });
  
  const recentBookings = await Booking.find().sort('-createdAt').limit(5).populate('user', 'name email').populate('vehicle', 'brand model');
  const recentPayments = await Payment.find().sort('-createdAt').limit(5).populate('user', 'name').populate('booking');
  
  sendSuccess(res, 'Dashboard stats fetched', {
    totalVehicles, availableVehicles, totalBookings, activeRentals, pendingReturns,
    totalRevenue, totalCustomers, recentBookings, recentPayments
  });
};

export const getAllVehicles = async (req, res) => {
  const vehicles = await Vehicle.find();
  sendSuccess(res, 'All vehicles fetched', { vehicles });
};

export const createVehicle = async (req, res) => {
  const vehicle = await Vehicle.create(req.body);
  sendSuccess(res, 'Vehicle created', { vehicle }, 201);
};

export const updateVehicle = async (req, res) => {
  const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  sendSuccess(res, 'Vehicle updated', { vehicle });
};

export const deleteVehicle = async (req, res) => {
  await Vehicle.findByIdAndDelete(req.params.id);
  sendSuccess(res, 'Vehicle deleted');
};

export const toggleAvailability = async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  vehicle.availability = !vehicle.availability;
  await vehicle.save();
  sendSuccess(res, 'Vehicle availability toggled', { vehicle });
};

export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate('user', 'name').populate('vehicle', 'brand model');
  sendSuccess(res, 'All bookings fetched', { bookings });
};

export const updateBookingStatus = async (req, res) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  sendSuccess(res, 'Booking status updated', { booking });
};

export const getAllCustomers = async (req, res) => {
  const customers = await User.find({ role: 'customer' });
  sendSuccess(res, 'All customers fetched', { customers });
};

export const toggleBlockCustomer = async (req, res) => {
  const user = await User.findById(req.params.id);
  user.isBlocked = !user.isBlocked;
  await user.save();
  sendSuccess(res, 'Customer block status toggled', { user });
};

export const getCustomerDetail = async (req, res) => {
  const user = await User.findById(req.params.id);
  sendSuccess(res, 'Customer detail fetched', { user });
};

export const getAllPayments = async (req, res) => {
  const payments = await Payment.find().populate('user', 'name');
  sendSuccess(res, 'All payments fetched', { payments });
};

export const processRefund = async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  payment.status = 'Refunded';
  payment.refundedAt = Date.now();
  await payment.save();
  sendSuccess(res, 'Refund processed', { payment });
};

export const getAllReviews = async (req, res) => {
  const reviews = await Review.find().populate('user', 'name').populate('vehicle', 'brand model');
  sendSuccess(res, 'All reviews fetched', { reviews });
};

export const deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  sendSuccess(res, 'Review deleted');
};

export const getRevenueReport = async (req, res) => {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);

  const monthly = await Payment.aggregate([
    { $match: { status: 'Paid', paidAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { year: { $year: '$paidAt' }, month: { $month: '$paidAt' } },
        revenue: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  const totalRevenue = await Payment.aggregate([
    { $match: { status: 'Paid' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);

  sendSuccess(res, 'Revenue report fetched', {
    monthly,
    totalRevenue: totalRevenue[0]?.total || 0
  });
};

export const getVehicleReport = async (req, res) => {
  const mostRented = await Booking.aggregate([
    { $group: { _id: '$vehicle', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
    { $lookup: { from: 'vehicles', localField: '_id', foreignField: '_id', as: 'vehicle' } },
    { $unwind: '$vehicle' }
  ]);

  const categoryDist = await Vehicle.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);

  const availabilityStats = {
    available: await Vehicle.countDocuments({ availability: true }),
    unavailable: await Vehicle.countDocuments({ availability: false })
  };

  sendSuccess(res, 'Vehicle report fetched', { mostRented, categoryDist, availabilityStats });
};

export const getBookingReport = async (req, res) => {
  const statusDist = await Booking.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);

  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const monthly = await Booking.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } }
  ]);

  sendSuccess(res, 'Booking report fetched', { statusDist, monthly });
};

export const getCustomerReport = async (req, res) => {
  const total = await User.countDocuments({ role: 'customer' });
  const blocked = await User.countDocuments({ role: 'customer', isBlocked: true });

  const now = new Date();
  const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
  const newCustomers = await User.countDocuments({
    role: 'customer',
    createdAt: { $gte: thirtyDaysAgo }
  });

  const registrationTrend = await User.aggregate([
    { $match: { role: 'customer' } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
    { $limit: 12 }
  ]);

  sendSuccess(res, 'Customer report fetched', {
    total, blocked, active: total - blocked, newCustomers, registrationTrend
  });
};
