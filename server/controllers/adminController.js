// import express from 'express';
import Admin from '../models/Admin.js';

const adminLogin = async (req,res) => {
    try{
        const {uname,password} = req.body;
        const admin = await Admin.findOne({uname,password});
        if(!admin){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        return res.status(200).json({message:"Admin login sucessfull"});
    }catch(error){
        return res.status(500).json({message:"Serrver Error",error:error.message});
    }
}

const promoteRestaurant = async (req,res) =>{
    try{
        const {restaurantId} = req.params;
        const admin = await Admin.findOne();
        
        if(!admin.promotedRestaurants.includes(restaurantId)){
            admin.promotedRestaurants.push(restaurantId);
            await admin.save();
        }

        return res.status(200).json({message:"Restaurant promoted sucessfully"});

    } catch(error){
        return res.status(500).json({message:"Server Error",error:error.message});
    }
}

import Users from '../models/User.js'; // adjust path as needed

// Dashboard Overview Controller
const getDashboardOverview = async (req, res) => {
  try {
    // Count users and restaurants
    const totalUsers = await Users.countDocuments({ userType: 'user' });
    const totalRestaurants = await Users.countDocuments({ userType: 'restaurant' });

    res.status(200).json({
      totalUsers,
      totalRestaurants
    });
  } catch (err) {
    console.error("Dashboard overview error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export {adminLogin,promoteRestaurant,getDashboardOverview};