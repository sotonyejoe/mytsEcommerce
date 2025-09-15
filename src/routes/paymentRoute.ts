import express from 'express';
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} from '../controllers/paymentController';
import { protect } from '../middleware/auth_middleware';



const router = express.Router();

/**
 * @openapi
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - amount
 *               - method
 *             properties:
 *               orderId:
 *                 type: string
 *                 example: 6500c12d9d12345678d0aa77
 *               amount:
 *                 type: number
 *                 example: 150.75
 *               method:
 *                 type: string
 *                 enum: [paypal, card, bank_transfer]
 *                 example: paypal
 *     responses:
 *       201:
 *         description: Payment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 6500d45f9d12345678aabb22
 *                 orderId:
 *                   type: string
 *                   example: 6500c12d9d12345678d0aa77
 *                 amount:
 *                   type: number
 *                   example: 150.75
 *                 method:
 *                   type: string
 *                   example: paypal
 *                 status:
 *                   type: string
 *                   example: completed
 */
router.post('/', protect, createPayment);

/**
 * @openapi
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 6500d45f9d12345678aabb22
 *                   orderId:
 *                     type: string
 *                     example: 6500c12d9d12345678d0aa77
 *                   amount:
 *                     type: number
 *                     example: 150.75
 *                   method:
 *                     type: string
 *                     example: paypal
 *                   status:
 *                     type: string
 *                     example: completed
 */
router.get('/', protect, getAllPayments);

/**
 * @openapi
 * /payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 */
router.get('/:id', protect, getPaymentById);

/**
 * @openapi
 * /payments/{id}:
 *   put:
 *     summary: Update a payment by ID
 *     tags:
 *       - Payments
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
 *                 enum: [pending, completed, failed, refunded]
 *                 example: refunded
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Payment not found
 */
router.put('/:id', protect, updatePaymentById);

/**
 * @openapi
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags:
 *       - Payments
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
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 */
router.delete('/:id', protect, deletePaymentById);

export default router;
