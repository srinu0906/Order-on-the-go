import Restaurant from '../models/Restaurant.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';

const registerRestaurant = async (req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Server Error"});
    }
};

const loginRestaurant = async (req,res)=>{
    try{

    } catch(error){
        res.status(500).json({message:"Server Error"});
    }
};

export {registerRestaurant,loginRestaurant};