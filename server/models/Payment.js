import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  method: { type: String, enum: ['Card','UPI','NetBanking','Wallet','Cash'], default: 'Card' },
  transactionId: String,
  stripePaymentIntentId: String,
  status: { type: String, enum: ['Pending','Paid','Failed','Refunded'], default: 'Pending' },
  paidAt: Date,
  refundedAt: Date
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
