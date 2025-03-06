import express from 'express';
import { addReview, getProductReviews } from '../controllers/ReviewController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', auth, addReview);
router.get('/:product_id', getProductReviews);

export default router;