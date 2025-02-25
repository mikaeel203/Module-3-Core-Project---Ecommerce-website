import { getOrderId, getOrders, addOrder, deleteOrder } from '../model/orderModel.js'

const getOrderIdCon = async (req, res) => {
    res.json({ order: await getOrderId(req.params.id) })
}

const getOrdersCon = async (req, res) => {
    res.json({ orders: await getOrders() })
}

const addOrderCon = async (req, res) => {
    let { customize_id, user_id, quantity, status } = req.body
    res.json({ order: await addOrder(customize_id, user_id, quantity, status) })
}

const deleteOrderCon = async (req, res) => {
    res.json({ order: await deleteOrder(req.params.order_id) })
}

export { getOrderIdCon, getOrdersCon, addOrderCon, deleteOrderCon }
