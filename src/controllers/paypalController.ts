import { Request, Response } from 'express';
import { createPayPalOrderService, capturePayPalOrderService } from '../services/paypalService';

export const createPayPalOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount } = req.body;
    const order = await createPayPalOrderService(amount);
    res.status(200).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const capturePayPalOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    const result = await capturePayPalOrderService(orderId);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
