import express from 'express';
import {
  getCartController,
  addToCartController,
  removeFromCartController,
  clearCartController
} from '../controllers/cartController';
import { protect } from '../middleware/auth_middleware'; 

const router = express.Router();


/**
 * @openapi
 * /cart/{userId}:
 *   get:
 *     summary: Get a user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: User's cart retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                   example: 64f1c72d8a1f3c4567d89ab1
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: string
 *                         example: 6500a72f9d12345678c9ab12
 *                       quantity:
 *                         type: number
 *                         example: 2
 *       404:
 *         description: Cart not found
 */
router.get('/:userId', protect, getCartController);

/**
 * @openapi
 * /cart/{userId}:
 *   post:
 *     summary: Add item to a user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - product
 *               - quantity
 *             properties:
 *               product:
 *                 type: string
 *                 example: 6500a72f9d12345678c9ab12
 *               quantity:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Item added to cart
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: string
 *                   example: 64f1c72d8a1f3c4567d89ab1
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: string
 *                         example: 6500a72f9d12345678c9ab12
 *                       quantity:
 *                         type: number
 *                         example: 1
 */
router.post('/:userId', protect, addToCartController);

/**
 * @openapi
 * /cart/{userId}/{productId}:
 *   delete:
 *     summary: Remove a single product from a user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID to remove
 *     responses:
 *       200:
 *         description: Product removed from cart
 *       404:
 *         description: Cart or product not found
 */
router.delete('/:userId/:productId', protect, removeFromCartController);

/**
 * @openapi
 * /cart/{userId}:
 *   delete:
 *     summary: Clear an entire user's cart
 *     tags:
 *       - Cart
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's ID
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 *       404:
 *         description: Cart not found
 */
router.delete('/:userId', protect, clearCartController);

export default router;