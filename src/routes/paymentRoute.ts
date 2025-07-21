import express from 'express';
import {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentById,
  deletePaymentById,
} from '../controllers/paymentController';

const router = express.Router();

router.post('/', createPayment);
router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.put('/:id', updatePaymentById);
router.delete('/:id', deletePaymentById);

export default router;
