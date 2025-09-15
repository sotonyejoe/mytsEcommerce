import express from 'express';
import {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderController,
  deleteOrderController
} from '../controllers/orderController';
import { protect } from '../middleware/auth_middleware'; 

const router = express.Router();

/**
 * @openapi
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - items
 *             properties:
 *               userId:
 *                 type: string
 *                 example: 6500a72f9d12345678c9ab30
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                       example: 6500b15a9d12345678c9ff42
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 6500c12d9d12345678d0aa77
 *                 userId:
 *                   type: string
 *                   example: 6500a72f9d12345678c9ab30
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: string
 *                         example: 6500b15a9d12345678c9ff42
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                 status:
 *                   type: string
 *                   example: pending
 */
router.post('/', protect, createOrderController);

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 6500c12d9d12345678d0aa77
 *                   userId:
 *                     type: string
 *                     example: 6500a72f9d12345678c9ab30
 *                   status:
 *                     type: string
 *                     example: pending
 */
router.get('/', protect, getAllOrdersController);

/**
 * @openapi
 * /orders/{id}:
 *   get:
 *     summary: Get an order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get('/:id', protect, getOrderByIdController);

/**
 * @openapi
 * /orders/{id}:
 *   put:
 *     summary: Update an order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: shipped
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Order not found
 */
router.put('/:id', protect, updateOrderController);

/**
 * @openapi
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by ID
 *     tags:
 *       - Orders
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete('/:id', protect, deleteOrderController);

export default router;