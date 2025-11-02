import express from 'express';
import {
    createOrder,
    getAllOrders,
    getOrder,
    getOrders,
    getOrderStats,
    updateOrderStatus
} from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All order routes require authentication

// Admin routes (must come before parameterized routes)
router.get('/admin/stats', admin, getOrderStats);
router.get('/', admin, getAllOrders);
router.put('/:id/status', admin, updateOrderStatus);

// User routes
router.post('/', createOrder);
router.get('/my-orders', getOrders);
router.get('/:id', getOrder);

export default router;