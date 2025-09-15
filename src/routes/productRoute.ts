import express from 'express';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import upload from '../config/multer';
import { protect, authorizeRoles } from '../middleware/auth_middleware'; 

const router = express.Router();
/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15
 *               description:
 *                 type: string
 *                 example: Latest Apple flagship
 *               price:
 *                 type: number
 *                 example: 1200
 *               stock:
 *                 type: number
 *                 example: 50
 *               category:
 *                 type: string
 *                 example: Phones
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 6500a72f9d12345678c9ab13
 *                 name:
 *                   type: string
 *                   example: iPhone 15
 *                 price:
 *                   type: number
 *                   example: 1200
 */
router.post('/', protect, authorizeRoles('admin'), upload.single('image'), createProduct);

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 6500a72f9d12345678c9ab12
 *                   name:
 *                     type: string
 *                     example: Samsung Galaxy S24
 *                   description:
 *                     type: string
 *                     example: Flagship Samsung phone
 *                   price:
 *                     type: number
 *                     example: 1100
 *                   stock:
 *                     type: number
 *                     example: 30
 *                   category:
 *                     type: string
 *                     example: Phones
 *                   images:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: https://example.com/images/galaxy-s24.jpg
 */
router.get('/', protect, getAllProducts);

/**
 * @openapi
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 6500a72f9d12345678c9ab12
 *                 name:
 *                   type: string
 *                   example: iPhone 15
 *                 price:
 *                   type: number
 *                   example: 1200
 *       404:
 *         description: Product not found
 */
router.get('/:id', protect, getProductById);

/**
 * @openapi
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: iPhone 15 Pro
 *               description:
 *                 type: string
 *                 example: Updated Apple flagship
 *               price:
 *                 type: number
 *                 example: 1300
 *               stock:
 *                 type: number
 *                 example: 40
 *               category:
 *                 type: string
 *                 example: Phones
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Product not found
 */
router.put('/:id', protect, updateProduct);

/**
 * @openapi
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete('/:id', protect, authorizeRoles('admin'), deleteProduct);

export default router;