import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  pickupLocation: { type: String, required: true },
  dropOffLocation: { type: String, required: true },
  pickupDateTime: { type: Date, required: true },
  returnDateTime: { type: Date, required: true },
  rentalDays: Number,
  baseAmount: Number,
  additionalCharges: { type: Number, default: 0 },
  totalAmount: Number,
  status: { type: String, enum: ['Pending','Confirmed','Active','Completed','Cancelled','Rejected'], default: 'Pending' },
  cancellationReason: String
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
