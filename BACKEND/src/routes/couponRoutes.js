import express from 'express';
import {
    createCoupon,
    deleteCoupon,
    getAllCoupons,
    updateCoupon,
    validateCoupon
} from '../controllers/couponController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All coupon routes require authentication

// User routes
router.post('/validate', validateCoupon);

// Admin routes
router.post('/', admin, createCoupon);
router.get('/', admin, getAllCoupons);
router.put('/:id', admin, updateCoupon);
router.delete('/:id', admin, deleteCoupon);

export default router;