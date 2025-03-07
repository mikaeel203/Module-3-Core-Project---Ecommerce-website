import express from "express"
import {getPayPlansCon,getPayPlanCon,getPayPlanByUserIdCon,createPayPlanCon,removePayPlanCon,modifyPayPlanCon} from '../controllers/payplanController.js'


const router = express.Router()

// Get all payment plans
router.get('/', getPayPlansCon);

// Get a specific payment plan by payment_id
router.get('/:payment_id', getPayPlanCon);

// Get payment plans by user_id
router.get('/user/:user_id', getPayPlanByUserIdCon);

// Create a new payment plan
router.post('/', createPayPlanCon);

// Delete a payment plan by payment_id
router.delete('/:payment_id', removePayPlanCon);

// Update a payment plan by payment_id
router.patch('/:payment_id', modifyPayPlanCon)



export default router