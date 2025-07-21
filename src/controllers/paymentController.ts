import { Request, Response } from 'express';
import {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentByIdService,
  deletePaymentByIdService,
} from '../services/paymentService';

export const createPayment = async (req: Request, res: Response) => {
  try {
    const payment = await createPaymentService(req.body);
    res.status(201).json(payment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllPayments = async (_req: Request, res: Response) => {
  try {
    const payments = await getAllPaymentsService();
    res.status(200).json(payments);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const payment = await getPaymentByIdService(id);
    if (!payment) {
      res.status(404).json({ message: 'Payment not found' });
      return;
    }
    res.status(200).json(payment);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
export const updatePaymentById = async (req: Request, res: Response) => {
  try {
    const updatedPayment = await updatePaymentByIdService(req.params.id, req.body);
    res.status(200).json(updatedPayment);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePaymentById = async (req: Request, res: Response) => {
  try {
    const deleted = await deletePaymentByIdService(req.params.id);
    res.status(200).json(deleted);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
