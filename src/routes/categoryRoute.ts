import express from 'express';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { protect, authorizeRoles } from '../middleware/auth_middleware'; 

const router = express.Router();

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Create a new category
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 example: Devices and gadgets
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 6500a72f9d12345678c9ab30
 *                 name:
 *                   type: string
 *                   example: Electronics
 */
router.post('/', protect, authorizeRoles('admin'), createCategory);

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 6500a72f9d12345678c9ab30
 *                   name:
 *                     type: string
 *                     example: Electronics
 *                   description:
 *                     type: string
 *                     example: Devices and gadgets
 */
router.get('/', protect, getAllCategories);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 6500a72f9d12345678c9ab30
 *                 name:
 *                   type: string
 *                   example: Electronics
 *                 description:
 *                   type: string
 *                   example: Devices and gadgets
 *       404:
 *         description: Category not found
 */
router.get('/:id', protect, getCategoryById);

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Home Appliances
 *               description:
 *                 type: string
 *                 example: Kitchen and household devices
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Category not found
 */
router.put('/:id', protect, updateCategory);

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
router.delete('/:id', protect, deleteCategory);

export default router;
