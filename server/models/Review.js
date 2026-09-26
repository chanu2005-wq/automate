import mongoose from 'mongoose';
import Vehicle from './Vehicle.js';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String, maxlength: 1000 }
}, { timestamps: true });

// Ensure one review per vehicle per user
reviewSchema.index({ user: 1, vehicle: 1 }, { unique: true });

reviewSchema.statics.calcAverageRatings = async function(vehicleId) {
  const obj = await this.aggregate([
    { $match: { vehicle: vehicleId } },
    { $group: {
        _id: '$vehicle',
        averageRating: { $avg: '$rating' },
        totalReviews: { $sum: 1 }
      }
    }
  ]);

  try {
    if (obj.length > 0) {
      await Vehicle.findByIdAndUpdate(vehicleId, {
        averageRating: Math.round(obj[0].averageRating * 10) / 10,
        totalReviews: obj[0].totalReviews
      });
    } else {
      await Vehicle.findByIdAndUpdate(vehicleId, {
        averageRating: 0,
        totalReviews: 0
      });
    }
  } catch (err) {
    console.error(err);
  }
};

reviewSchema.post('save', function() {
  this.constructor.calcAverageRatings(this.vehicle);
});

const Review = mongoose.model('Review', reviewSchema);
export default Review;
