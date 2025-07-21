import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  order: mongoose.Types.ObjectId;      // Reference to the order
  paymentId: string;                   // Unique payment transaction ID (e.g., from payment gateway)
  status: string;                      // Payment status (e.g., 'pending', 'completed', 'failed')
  amount: number;                     // Amount paid
  paymentMethod: string;               // Method used (e.g., 'credit card', 'paypal')
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  paymentId: { type: String, required: true, unique: true },
  status: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
}, {
  timestamps: true,  // Adds createdAt and updatedAt fields automatically
});

const Payment = mongoose.model<IPayment>('Payment', paymentSchema);

export default Payment;
