import express from 'express';
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController
} from '../controllers/orderController';

const router = express.Router();

// POST /api/orders — Create a new order
router.post('/', createOrderController);

// GET /api/orders — Get all orders
router.get('/', getAllOrdersController);

// GET /api/orders/:id — Get order by ID
router.get('/:id', getOrderByIdController);

// PUT /api/orders/:id — Update order by ID
router.put('/:id', updateOrderController);

// DELETE /api/orders/:id — Delete order by ID
router.delete('/:id', deleteOrderController);

export default router;
