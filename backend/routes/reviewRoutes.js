import express from 'express';
import { addReview, getProductReviews } from "../controllers/reviewController.js"
import { auth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/reviews - Add a review
router.post('/', auth, addReview);

// GET /api/reviews/:product_id - Get reviews for a product
router.get('/:product_id', getProductReviews);

export default router;