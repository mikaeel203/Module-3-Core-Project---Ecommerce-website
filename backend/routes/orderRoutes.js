import express from "express"
import { getOrderIdCon, getOrdersCon, addOrderCon, deleteOrderCon } from '../controller/orderController.js'

const router = express.Router()

router.get('/:id', getOrderIdCon)
router.get('/', getOrdersCon)
router.post('/', addOrderCon)
router.delete('/:order_id', deleteOrderCon)

export default router
