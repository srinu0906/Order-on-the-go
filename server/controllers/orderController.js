import Order from '../models/Order.js';
import Product from '../models/Product.js';

const placeOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    let totalPrice = 0;
    let finalPrice = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId); 

      if (!product) {
        return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
      }

      const itemTotal = product.price * item.quantity;
      const itemDiscount = (product.discount / 100) * itemTotal;

      totalPrice += itemTotal;
      finalPrice += itemTotal - itemDiscount;
    }

    const newOrder = new Order({
      userId,
      items,
      totalPrice,
      finalPrice,
    });

    await newOrder.save();

    return res.status(200).json({ message: "Order placed successfully", orderId: newOrder._id });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order status updated", order: updatedOrder });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ status: order.status });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    return res.status(200).json(orders);

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const deleted = await Order.findByIdAndDelete(orderId);

    if (!deleted) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Order deleted successfully" });

  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


export {placeOrder,updateOrderStatus,getOrderStatus,getOrderHistory,deleteOrder};