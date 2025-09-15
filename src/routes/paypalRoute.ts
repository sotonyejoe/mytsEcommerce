// src/routes/paypalRoute.ts
import express from 'express';
import {
  createPayPalOrder,
  capturePayPalOrder,
} from '../controllers/paypalController';
import { protect } from '../middleware/auth_middleware'; 

const router = express.Router();

// Step 1: Create PayPal order
/**
 * @openapi
 * /payments/paypal/create:
 *   post:
 *     summary: Create a PayPal order
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
 *               - amount
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 150.75
 *     responses:
 *       201:
 *         description: PayPal order created
 *         content:
 *           application/json:
 *             example:
 *               id: "PAYPAL_ORDER_ID"
 *               status: "CREATED"
 *               links:
 *                 - href: "https://paypal.com/checkoutnow?token=PAYPAL_ORDER_ID"
 *                   rel: "approve"
 *                   method: "GET"
 */
router.post('/paypal/create', protect, createPayPalOrder);

/**
 * @openapi
 * /payments/paypal/capture/{orderId}:
 *   post:
 *     summary: Capture an approved PayPal order
 *     tags:
 *       - Payments
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: PayPal order ID to capture
 *     responses:
 *       200:
 *         description: PayPal order captured successfully
 *         content:
 *           application/json:
 *             example:
 *               id: "PAYPAL_ORDER_ID"
 *               status: "COMPLETED"
 *               payer:
 *                 email_address: "buyer@example.com"
 *               purchase_units:
 *                 - amount:
 *                     currency_code: "USD"
 *                     value: "150.75"
 */
router.post('/paypal/capture/:orderId', protect, capturePayPalOrder);

export default router;
