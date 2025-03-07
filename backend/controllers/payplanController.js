import {
    getPayPlans,getPayPlanById,getPayPlanByUser,insertPayPlan,deletePayPlan,updatePayPlan} from '../models/payplanModel.js'; // Importing the functions from model

// Get all payment plans
const getPayPlansCon = async (req, res) => {
    try {
        const payPlans = await getPayPlans();
        res.status(200).json(payPlans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving payment plans." });
    }
};

// Get a payment plan by payment_id
const getPayPlanCon = async (req, res) => {
    const { payment_id } = req.params;
    try {
        const payPlan = await getPayPlanById(payment_id);
        if (payPlan.length > 0) {
            res.status(200).json(payPlan[0]);
        } else {
            res.status(404).json({ message: "Payment plan not found." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving the payment plan." });
    }
};

// Get all payment plans by user_id
const getPayPlanByUserIdCon = async (req, res) => {
    const { user_id } = req.params;
    try {
        const payPlans = await getPayPlanByUser(user_id);
        if (payPlans.length > 0) {
            res.status(200).json(payPlans);
        } else {
            res.status(404).json({ message: "No payment plans found for this user." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error retrieving payment plans by user." });
    }
};

// Insert a new payment plan
const createPayPlanCon = async (req, res) => {
    const { user_id, total, term } = req.body;
    try {
        await insertPayPlan(user_id, total, term);
        res.status(201).json({ message: "Payment plan created successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating the payment plan." });
    }
};

// Delete a payment plan by payment_id
const removePayPlanCon = async (req, res) => {
    const { payment_id } = req.params;
    try {
        await deletePayPlan(payment_id);
        res.status(200).json({ message: "Payment plan deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting the payment plan." });
    }
};

// Update an existing payment plan
const modifyPayPlanCon = async (req, res) => {
    const { payment_id } = req.params;
    const { user_id, total, term } = req.body;
    try {
        const updatedPayPlan = await updatePayPlan(payment_id, user_id, total, term);
        res.status(200).json({ message: "Payment plan updated successfully.", updatedPayPlan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating the payment plan." });
    }
};

export {getPayPlansCon,getPayPlanCon,getPayPlanByUserIdCon,createPayPlanCon,removePayPlanCon,modifyPayPlanCon};
