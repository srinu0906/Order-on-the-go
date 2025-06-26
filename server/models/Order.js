import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userId : {type : String},
  items: [
    {
      productId: { type: String },
      quantity: { type: Number, default: 1 },
    }
  ],
  totalPrice: { type: Number },
  status: { type: String, default: 'pending' },
  discount:{type: Number , default:0},
  finalPrice: {type: Number},
  createdAt: { type: String }
});

export default mongoose.model('Order', orderSchema);
