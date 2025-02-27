import express from 'express';
import { addToCart, getCart } from '../controllers/cartController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, addToCart);
router.get('/:user_id', auth, getCart);

export default router;