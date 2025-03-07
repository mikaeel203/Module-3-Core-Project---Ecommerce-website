import express from 'express';
import { getProductStats, addProduct } from '../controllers/adminController.js';
import { auth, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Admin-only routes
router.get('/stats', auth, isAdmin, getProductStats);
router.post('/products', auth, isAdmin, addProduct);

export default router;