import express from 'express';
import { fetchPromotedRestaurants,fetchRestaurants } from '../controllers/restaurantController.js';

const router = express.Router();

router.get("/all",fetchRestaurants);
router.get("/promoted",fetchPromotedRestaurants);

export default router;