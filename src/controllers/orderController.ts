import { Request, Response } from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById
} from '../services/orderService';

// Create a new order
export const createOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const newOrder = await createOrder(req.body);
    res.status(201).json(newOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders
export const getAllOrdersController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await getAllOrders();
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single order by ID
export const getOrderByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await getOrderById(id);
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }
    res.status(200).json(order);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Update an order by ID
export const updateOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedOrder = await updateOrderById(id, req.body);
    res.status(200).json(updatedOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an order by ID
export const deleteOrderController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedOrder = await deleteOrderById(id);
    res.status(200).json(deletedOrder);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
