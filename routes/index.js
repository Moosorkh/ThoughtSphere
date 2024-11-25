import express from 'express';
const { Router } = express;
import userRoutes from './api/userRoutes.js';
import thoughtRoutes from './api/thoughtRoutes.js';

const router = Router();
router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

export default router;