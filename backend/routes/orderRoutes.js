
import express from "express"
import { getOrderIdCon, getOrdersCon, addOrderCon, deleteOrderCon } from '../controller/orderController.js'
import { placeOrder, getOrders } from '../controllers/orderController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router()

// router.get('/:id', getOrderIdCon)
// router.get('/', getOrdersCon)
// router.post('/', addOrderCon)
router.delete('/:order_id', deleteOrderCon)


router.post('/', auth, placeOrder);
router.get('/:user_id', auth, getOrders);

export default router;
