import express from 'express';
import { placeOrder,updateOrderStatus,getOrderHistory,getOrderStatus,deleteOrder,getRestaurantOrders} from '../controllers/orderController.js';

const router = express.Router();

router.post('/place',placeOrder);
router.post('/updateStatus/:orderId',updateOrderStatus);
router.get('/history/:userId',getOrderHistory);
router.get('/status/:orderId',getOrderStatus);
router.post('/delete/:orderId',deleteOrder);
router.get('/restaurantOrders/:restaurantId',getRestaurantOrders);

export default router;