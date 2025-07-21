import Payment from '../models/payment';
import mongoose from 'mongoose';

interface CreatePaymentDTO {
  order: string;
  paymentId: string;
  status: string;
  amount: number;
  paymentMethod: string;
}

interface UpdatePaymentDTO {
  status?: string;
  amount?: number;
  paymentMethod?: string;
}

export const createPaymentService = async (data: CreatePaymentDTO) => {
  const payment = new Payment({
    order: new mongoose.Types.ObjectId(data.order),
    paymentId: data.paymentId,
    status: data.status,
    amount: data.amount,
    paymentMethod: data.paymentMethod,
  });
  return await payment.save();
};

export const getAllPaymentsService = async () => {
  return await Payment.find().populate('order');
};

export const getPaymentByIdService = async (id: string) => {
  return await Payment.findById(id).populate('order');
};

export const updatePaymentByIdService = async (id: string, data: UpdatePaymentDTO) => {
  const payment = await Payment.findById(id);
  if (!payment) throw new Error('Payment not found');

  if (data.status) payment.status = data.status;
  if (data.amount !== undefined) payment.amount = data.amount;
  if (data.paymentMethod) payment.paymentMethod = data.paymentMethod;

  return await payment.save();
};

export const deletePaymentByIdService = async (id: string) => {
  const payment = await Payment.findByIdAndDelete(id);
  if (!payment) throw new Error('Payment not found');
  return payment;
};
