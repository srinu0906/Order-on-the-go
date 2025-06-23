import express from 'express';
import { placeOrder,updateOrderStatus,getOrderHistory,getOrderStatus,deleteOrder} from '../controllers/orderController.js';

const router = express.Router();

router.post('/place',placeOrder);
router.post('/updateStatus/:orderId',updateOrderStatus);
router.get('/history/:userId',getOrderHistory);
router.get('/status/:orderId',getOrderStatus);
router.post('/delete/:orderId',deleteOrder);

export default router;