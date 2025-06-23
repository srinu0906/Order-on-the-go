// import express from 'express';
import Restaurant from '../models/Restaurant.js';
import Admin from '../models/Admin.js';


const fetchRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const fetchPromotedRestaurants = async (req, res) => {
  try {
    const admin = await Admin.findOne();
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const promotedIds = admin.promotedRestaurants;

    const restaurants = await Restaurant.find({
      _id: { $in: promotedIds }
    });

    return res.status(200).json(restaurants);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {fetchPromotedRestaurants,fetchRestaurants};