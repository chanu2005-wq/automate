import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  category: { type: String, enum: ['Car','Bike','SUV','Van','Luxury'], required: true },
  registrationNumber: { type: String, unique: true, sparse: true },
  fuelType: { type: String, enum: ['Petrol','Diesel','Electric','Hybrid','CNG'] },
  transmission: { type: String, enum: ['Manual','Automatic'] },
  seats: Number,
  pricePerDay: { type: Number, required: true },
  location: { type: String, required: true },
  availability: { type: Boolean, default: true },
  description: String,
  features: [String],
  images: [String],
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
}, { timestamps: true });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
export default Vehicle;
