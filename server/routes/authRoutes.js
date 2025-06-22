import express from 'express';
import { registerUser,loginUser } from '../controllers/userAuthController.js';

const router = express.Router();

router.post('/user/register',registerUser);
router.post('/user/login',loginUser);

router.post('restaurant/register',(req,res) =>{
    res.send("Restaurant registration route");
})
router.post('restaurant/login',(req,res)=>{
    res.send("Restauarnt registration ");
})

export default router;