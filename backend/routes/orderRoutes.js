import express from 'express';
import { placeOrder, getOrders } from '../controllers/orderController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, placeOrder);
router.get('/:user_id', auth, getOrders);

export default router;