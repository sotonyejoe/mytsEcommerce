import express from 'express';
import { registerAdmin, getAdmins, loginUser } from '../controllers/authController';

const router = express.Router();

/**
 * @openapi
 * /auth/admins/register:
 *   post:
 *     summary: Register a new admin
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       201:
 *         description: Admin registered successfully
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
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: admin@example.com
 */
router.post('/admins/register', registerAdmin);

/**
 * @openapi
 * /auth/admins:
 *   get:
 *     summary: Get all registered admins
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of admins
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
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: admin@example.com
 */
router.get('/admins', getAdmins);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login as a user or admin
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: StrongPassword123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginUser);

export default router;
