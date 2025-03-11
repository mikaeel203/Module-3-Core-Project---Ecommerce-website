import express from 'express';
import { addToCart, getCart , removeFromCart,removeAllFromCart, updateCart} from '../controllers/cartController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/add', auth, addToCart);
router.get('/', auth, getCart);
router.delete('/remove', auth, removeFromCart);
router.delete('/removeall/:user_id',auth, removeAllFromCart)
// BEFORE (INCORRECT)
// router.delete('/remove', auth, removeFromCart);
// router.put('/update', auth, updateCart);

// AFTER (CORRECTED)
router.delete('/remove/:cart_id', auth, removeFromCart); // Add route parameter
router.put('/update/:cart_id', auth, updateCart); // Add route parameter

export default router;