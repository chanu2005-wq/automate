import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Vehicle from './models/Vehicle.js';
import Booking from './models/Booking.js';
import Payment from './models/Payment.js';
import Review from './models/Review.js';
import Notification from './models/Notification.js';

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/automate`);
    
    await User.deleteMany();
    await Vehicle.deleteMany();
    await Booking.deleteMany();
    await Payment.deleteMany();
    await Review.deleteMany();
    await Notification.deleteMany();

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@automate.com',
      password: 'Admin@123',
      role: 'admin'
    });

    const customer = await User.create({
      name: 'Test Customer',
      email: 'customer@automate.com',
      password: 'Customer@123',
      role: 'customer'
    });

    const vehicle = await Vehicle.create({
      brand: 'Toyota',
      model: 'Camry',
      category: 'Car',
      pricePerDay: 50,
      location: 'New York',
      availability: true,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      seats: 5
    });

    const booking = await Booking.create({
      user: customer._id,
      vehicle: vehicle._id,
      pickupLocation: 'JFK Airport',
      dropOffLocation: 'Manhattan',
      pickupDateTime: new Date(Date.now() + 86400000),
      returnDateTime: new Date(Date.now() + 86400000 * 3),
      rentalDays: 2,
      baseAmount: 100,
      totalAmount: 100,
      status: 'Confirmed'
    });

    await Payment.create({
      booking: booking._id,
      user: customer._id,
      amount: 100,
      status: 'Paid',
      method: 'Card'
    });

    await Review.create({
      user: customer._id,
      vehicle: vehicle._id,
      booking: booking._id,
      rating: 5,
      comment: 'Great car!'
    });

    await Notification.create({
      user: customer._id,
      title: 'Welcome',
      message: 'Welcome to AutoMate!',
      type: 'general'
    });

    console.log('Database seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
