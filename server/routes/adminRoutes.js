import express from 'express';
import { adminLogin,promoteRestaurant,getDashboardOverview } from '../controllers/adminController.js';

const router = express.Router();

router.post('/login',adminLogin);
router.post('/promoteRestaurant/:restaurantId',promoteRestaurant);
router.get('/dashboardOverview',getDashboardOverview);

export default router;