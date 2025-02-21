import { pool } from "../config/config.js"

const getCustomId = async (id) => {
    let [data] = await pool.query("SELECT * FROM `eternal_rest_db`.`customize` WHERE `customize`.`customize_id` = ?",[id])
    return data
}

const getCustoms = async () => {
    let [data] = await pool.query("SELECT * FROM `eternal_rest_db`.`customize`")
    return data
}

const addCustom = async (product_id, color, wood_type, extra1, extra2) =>{
    await pool.query("INSERT INTO `eternal_rest_db`.`customize` (`product_id`, `color`, `wood_type`, `extra1`, `extra2`) VALUES (?, ?, ?, ?, ?)",[product_id, color, wood_type, extra1, extra2])
}

const deleteCustom =async(customize_id) =>{
    await pool.query("DELETE FROM `eternal_rest_db`.`customize` WHERE `customize`.`customize_id`=?",customize_id)
}

export {getCustomId,getCustoms,addCustom,deleteCustom}