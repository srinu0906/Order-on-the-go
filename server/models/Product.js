import mongoose from "mongoose";

const productSchema  = new mongoose.Schema({
    productName : {type : String},
    description : {type: String},
    restaurantId : {type : String},
    price : {type: Number},
    discount:{type:Number},
    category : {type: String},
    imageUrl : {type : String},
    rating: {type : Number},
    totalRatings : {type: Number}
});

export default mongoose.model("Product",productSchema);