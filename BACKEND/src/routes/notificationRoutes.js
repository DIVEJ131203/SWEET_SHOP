import express from 'express';
import {
    clearAllNotifications,
    deleteNotification,
    getNotifications,
    getUnreadCount,
    markAllAsRead,
    markAsRead
} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All notification routes require authentication

router.get('/', getNotifications);
router.get('/unread-count', getUnreadCount);
router.put('/:id/read', markAsRead);
router.put('/mark-all-read', markAllAsRead);
router.delete('/:id', deleteNotification);
router.delete('/', clearAllNotifications);

export default router;