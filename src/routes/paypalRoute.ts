// src/routes/paypalRoute.ts
import express from 'express';
import {
  createPayPalOrder,
  capturePayPalOrder,
} from '../controllers/paypalController';

const router = express.Router();

// Step 1: Create PayPal order
router.post('/create', createPayPalOrder);

// Step 2: Capture PayPal order after approval
router.post('/capture/:orderId', capturePayPalOrder);

export default router;
