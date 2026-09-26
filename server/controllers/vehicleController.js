import Vehicle from '../models/Vehicle.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const getVehicles = async (req, res) => {
  const { category, fuelType, transmission, seats, priceMin, priceMax, location, search, availability, sort, page = 1, limit = 10 } = req.query;
  
  const query = {};
  if (category) query.category = category;
  if (fuelType) query.fuelType = fuelType;
  if (transmission) query.transmission = transmission;
  if (seats) query.seats = { $gte: seats };
  if (priceMin || priceMax) {
    query.pricePerDay = {};
    if (priceMin) query.pricePerDay.$gte = Number(priceMin);
    if (priceMax) query.pricePerDay.$lte = Number(priceMax);
  }
  if (location) query.location = { $regex: location, $options: 'i' };
  if (search) {
    query.$or = [
      { brand: { $regex: search, $options: 'i' } },
      { model: { $regex: search, $options: 'i' } }
    ];
  }
  if (availability) query.availability = availability === 'true';

  let sortQuery = '-createdAt';
  if (sort === 'priceAsc') sortQuery = 'pricePerDay';
  if (sort === 'priceDesc') sortQuery = '-pricePerDay';
  if (sort === 'rating') sortQuery = '-averageRating';

  const vehicles = await Vehicle.find(query)
    .sort(sortQuery)
    .skip((page - 1) * limit)
    .limit(Number(limit));
    
  const total = await Vehicle.countDocuments(query);
  
  sendSuccess(res, 'Vehicles fetched', {
    vehicles,
    totalPages: Math.ceil(total / limit),
    currentPage: Number(page)
  });
};

export const getFeaturedVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({ availability: true }).sort('-averageRating').limit(6);
  sendSuccess(res, 'Featured vehicles fetched', { vehicles });
};

export const getCategories = async (req, res) => {
  const categories = await Vehicle.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } }
  ]);
  sendSuccess(res, 'Categories fetched', { categories });
};

export const getVehicle = async (req, res) => {
  const vehicle = await Vehicle.findById(req.params.id);
  if (!vehicle) throw new Error('Vehicle not found');
  const reviews = await Review.find({ vehicle: req.params.id }).populate('user', 'name profileImage');
  sendSuccess(res, 'Vehicle fetched', { vehicle, reviews });
};

export const checkAvailability = async (req, res) => {
  const { id } = req.params;
  const { pickupDateTime, returnDateTime } = req.query;

  const overlappingBookings = await Booking.find({
    vehicle: id,
    status: { $in: ['Pending', 'Confirmed', 'Active'] },
    $or: [
      { pickupDateTime: { $lt: new Date(returnDateTime) }, returnDateTime: { $gt: new Date(pickupDateTime) } }
    ]
  });

  sendSuccess(res, 'Availability checked', { available: overlappingBookings.length === 0 });
};
