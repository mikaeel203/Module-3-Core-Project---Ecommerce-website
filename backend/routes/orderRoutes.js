import express from 'express';
import { placeOrder, getOrders , getOrderById} from '../controllers/orderController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, placeOrder);
router.get('/:user_id', auth, getOrders);

router.get('/orders/:orderId', auth, getOrderById);

export default router;