import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
    restaurantName : {type : String},
    ownerName : {type : String},
    address : {type : String},
    imageUrl : {type : String},
    rating : {type : String},
    totalRatings : {type : String}
});

export default mongoose.model("Restaurant",restaurantSchema);