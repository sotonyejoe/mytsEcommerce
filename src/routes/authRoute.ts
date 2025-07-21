import express from 'express';
import { registerAdmin, getAdmins } from '../controllers/authController';

const router = express.Router();

router.post('/admins/register', registerAdmin);
router.get('/admins', getAdmins);


export default router;
