import { pool } from "../config/config.js"

const getProductId = async (id) => {
    let [data] = await pool.query("SELECT * FROM `eternal_rest_db`.`products` WHERE `products`.`product_id` = ?",[id])
    return data
}

const getProducts = async () => {
    let [data] = await pool.query("SELECT * FROM `eternal_rest_db`.`products`")
    return data
}

export {getProductId,getProducts}