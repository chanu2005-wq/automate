import Vehicle from '../models/Vehicle.js';
import Booking from '../models/Booking.js';
import Review from '../models/Review.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

export const getVehicles = async (req, res, next) => {
  try {
    const {
      category, fuelType, transmission, seats,
      priceMin, priceMax, location, search,
      availability, sort, page = 1, limit = 10
    } = req.query;

    const query = {};
    if (category) query.category = category;
    if (fuelType) query.fuelType = fuelType;
    // Case-insensitive transmission matching: normalise to model enum
    if (transmission) {
      const normalised = transmission.charAt(0).toUpperCase() + transmission.slice(1).toLowerCase();
      query.transmission = normalised; // 'Automatic' or 'Manual'
    }
    if (seats) query.seats = { $gte: Number(seats) };
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
    if (availability !== undefined) query.availability = availability === 'true';

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
  } catch (err) {
    next(err);
  }
};

export const getFeaturedVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ availability: true }).sort('-averageRating').limit(6);
    sendSuccess(res, 'Featured vehicles fetched', { vehicles });
  } catch (err) {
    next(err);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Vehicle.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    sendSuccess(res, 'Categories fetched', { categories });
  } catch (err) {
    next(err);
  }
};

export const getVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) return sendError(res, 'Vehicle not found', 404);
    const reviews = await Review.find({ vehicle: req.params.id }).populate('user', 'name profileImage');
    sendSuccess(res, 'Vehicle fetched', { vehicle, reviews });
  } catch (err) {
    next(err);
  }
};

export const checkAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { pickupDateTime, returnDateTime } = req.query;

    if (!pickupDateTime || !returnDateTime) {
      return sendError(res, 'pickupDateTime and returnDateTime are required', 400);
    }

    const overlappingBookings = await Booking.find({
      vehicle: id,
      status: { $in: ['Pending', 'Confirmed', 'Active'] },
      $or: [
        {
          pickupDateTime: { $lt: new Date(returnDateTime) },
          returnDateTime: { $gt: new Date(pickupDateTime) }
        }
      ]
    });

    sendSuccess(res, 'Availability checked', { available: overlappingBookings.length === 0 });
  } catch (err) {
    next(err);
  }
};
