import { Request, Response } from 'express';
import {
  getUserCart,
  addItemToCart,
  removeItemFromCart,
  clearCart
} from '../services/cartService';

export const getCartController = async (req: Request, res: Response) => {
  try {
    const cart = await getUserCart(req.params.userId);
    res.status(200).json(cart);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const addToCartController = async (req: Request, res: Response) => {
  try {
    const cart = await addItemToCart(req.params.userId, req.body);
    res.status(200).json(cart);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeFromCartController = async (req: Request, res: Response) => {
  try {
    const { userId, productId } = req.params;
    const cart = await removeItemFromCart(userId, productId);
    res.status(200).json(cart);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const clearCartController = async (req: Request, res: Response) => {
  try {
    const cart = await clearCart(req.params.userId);
    res.status(200).json(cart);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
