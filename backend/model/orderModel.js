import { pool } from "../config/config.js"

const getOrderId = async (id) => {
    let [data] = await pool.query("SELECT * FROM `eternal_rest_db`.`orders` WHERE `orders`.`order_id` = ?", [id])
    return data
}

const getOrders = async () => {
    let [data] = await pool.query("SELECT * FROM `eternal_rest_db`.`orders`")
    return data
}

const addOrder = async (customize_id, user_id, quantity, status) => {
    await pool.query("INSERT INTO `eternal_rest_db`.`orders` (`customize_id`, `user_id`, `quantity`, `status`) VALUES (?, ?, ?, ?)", 
    [customize_id, user_id, quantity, status])
}

const deleteOrder = async (order_id) => {
    await pool.query("DELETE FROM `eternal_rest_db`.`orders` WHERE `orders`.`order_id`=?", [order_id])
}

export { getOrderId, getOrders, addOrder, deleteOrder }
