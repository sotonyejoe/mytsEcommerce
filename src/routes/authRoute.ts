import express from 'express';
import { registerAdmin, getAdmins, loginUser } from '../controllers/authController';

const router = express.Router();

router.post('/admins/register', registerAdmin);
router.get('/admins', getAdmins);
router.post('/login', loginUser);


export default router;
