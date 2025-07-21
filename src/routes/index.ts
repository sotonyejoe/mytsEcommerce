import { Router } from 'express';
import authRoutes from './authRoute';
import userRoutes from './userRoute';
import productRoutes from './productRoute';
import orderRoutes from './orderRoute';
import categoryRoutes from './categoryRoute';
import cartRoute from './cartRoute';

const router = Router();

router.use('/auth', authRoutes); 
router.use('/users', userRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/category', categoryRoutes);
router.use('/cart', cartRoute)

export default router;