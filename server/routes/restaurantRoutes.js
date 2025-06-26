import express from 'express';
import { fetchPromotedRestaurants,fetchRestaurants ,postRating} from '../controllers/restaurantController.js';

const router = express.Router();

router.get("/all",fetchRestaurants);
router.get("/promoted",fetchPromotedRestaurants);
router.post("/rating",postRating);

export default router;