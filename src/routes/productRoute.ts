import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import upload from '../config/multer';

const router = express.Router();

router.post('/', upload.single('image'), createProduct);       // Create product
router.get('/', getAllProducts);         // Get all products
router.get('/:id', getProductById);          // Get single product by ID
router.put('/:id', updateProduct);       // Update product by ID
router.delete('/:id', deleteProduct);    // Delete product by ID

export default router;
