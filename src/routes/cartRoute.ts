import express from 'express';
import {
  getCartController,
  addToCartController,
  removeFromCartController,
  clearCartController
} from '../controllers/cartController';

const router = express.Router();

// GET /api/cart/:userId – Get user cart
router.get('/:userId', getCartController);

// POST /api/cart/:userId – Add item to cart
router.post('/:userId', addToCartController);

// DELETE /api/cart/:userId/:productId – Remove a single product from cart
router.delete('/:userId/:productId', removeFromCartController);

// DELETE /api/cart/:userId – Clear entire cart
router.delete('/:userId', clearCartController);

export default router;
