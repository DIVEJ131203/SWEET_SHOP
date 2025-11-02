import express from 'express';
import {
    addAddress,
    deleteAddress,
    getNotifications,
    getProfile,
    markAllNotificationsRead,
    markNotificationRead,
    updateAddress,
    updateProfile
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All user routes require authentication

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);

// Address routes
router.post('/addresses', addAddress);
router.put('/addresses/:addressId', updateAddress);
router.delete('/addresses/:addressId', deleteAddress);

// Notification routes
router.get('/notifications', getNotifications);
router.put('/notifications/:id/read', markNotificationRead);
router.put('/notifications/read-all', markAllNotificationsRead);

export default router;