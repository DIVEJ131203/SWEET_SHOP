import express from 'express';
import {
    addToCart,
    applyCoupon,
    clearCart,
    getCart,
    removeCoupon,
    removeFromCart,
    updateCartItem
} from '../controllers/cartController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All cart routes require authentication
router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update/:sweetId', updateCartItem);
router.delete('/remove/:sweetId', removeFromCart);
router.delete('/clear', clearCart);
router.post('/coupon/apply', applyCoupon);
router.delete('/coupon/remove', removeCoupon);

export default router;