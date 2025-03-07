import pool from "../config/db.js";

// Function to get all payment plan records
const getPayPlans = async () => {
    let [data] = await pool.query("SELECT * FROM `freedb_eternal-rest`.`payment_plan`");
    return data;
};

// Function to get a specific payment plan record by payment_id
const getPayPlanById = async (payment_id) => {
    let [data] = await pool.query("SELECT * FROM `freedb_eternal-rest`.`payment_plan` WHERE `payment_id` = ?", [payment_id]);
    return data;
};

// Function to get a specific payment plan record by user
const getPayPlanByUser = async (user_id) => {
    let [data] = await pool.query("SELECT * FROM `freedb_eternal-rest`.`payment_plan` WHERE `user_id` = ?", [user_id]);
    return data;
};

// Function to insert a new payment plan record
const insertPayPlan = async (user_id, total, term) => {
    await pool.query("INSERT INTO `freedb_eternal-rest`.`payment_plan` (user_id, total, term) VALUES (?, ?, ?)", [user_id, total, term]);
};

// Function to delete a payment plan record by payment_id
const deletePayPlan = async (payment_id) => {
    await pool.query("DELETE FROM `freedb_eternal-rest`.`payment_plan` WHERE payment_id = ?", [payment_id]);
};

// Function to update an existing payment plan record
const updatePayPlan = async (payment_id, user_id, total, term) => {
    await pool.query("UPDATE `freedb_eternal-rest`.`payment_plan` SET user_id = ?, total = ?, term = ? WHERE payment_id = ?", [user_id, total, term, payment_id]);
    return { payment_id, user_id, total, term };
};

export {getPayPlanById,getPayPlans,getPayPlanByUser,insertPayPlan,deletePayPlan,updatePayPlan}