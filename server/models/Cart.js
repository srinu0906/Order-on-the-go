import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userId : {type : String},
    restaurantId : {type : String},
    items : [
        {
            productId : {type : String},
            quantity : {type : Number}
        }
    ],
    totalPrice : {type : Number}
})

export default mongoose.model("Cart",cartSchema);