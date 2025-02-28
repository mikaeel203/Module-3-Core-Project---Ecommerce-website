import express from 'express';
import { addToCart, getCart , removeFromCart} from '../controllers/cartController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, addToCart);
router.get('/:user_id', auth, getCart);
router.delete('/remove', auth, removeFromCart);

export default router;