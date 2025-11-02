import express from 'express';
import {
    approveReview,
    createReview,
    deleteReview,
    getAllReviews,
    getReviews,
    updateReview
} from '../controllers/reviewController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/sweet/:sweetId', getReviews);

// Protected routes
router.use(protect);
router.post('/', createReview);
router.put('/:id', updateReview);
router.delete('/:id', deleteReview);

// Admin routes
router.get('/', admin, getAllReviews);
router.put('/:id/approve', admin, approveReview);

export default router;