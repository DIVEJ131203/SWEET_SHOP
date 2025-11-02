import express from 'express';
import {
    createSweet,
    deleteSweet,
    getLowStockItems,
    getMyProducts,
    getSweetById,
    getSweets,
    purchaseSweet,
    restockSweet,
    searchSweets,
    updateSweet
} from '../controllers/sweetController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getSweets);
router.get('/search', searchSweets);
router.get('/:id', getSweetById);

// Protected routes
router.use(protect);
router.get('/low-stock', getLowStockItems);
router.get('/my/products', getMyProducts);
router.post('/', upload.single('image'), createSweet);
router.put('/:id', upload.single('image'), updateSweet);
router.delete('/:id', deleteSweet);
router.post('/:id/purchase', purchaseSweet);
router.post('/:id/restock', restockSweet);

export default router;