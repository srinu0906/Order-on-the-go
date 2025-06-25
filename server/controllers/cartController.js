import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const addToCart = async (req, res) => {
  try {
    const { userId, productId ,quantity} = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check for existing cart
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Check if same restaurant
      if (cart.restaurantId !== product.restaurantId) {
        return res.status(400).json({ message: "Cart contains items from another restaurant. Clear cart first." });
      }

      // Check if product already in cart
      const itemIndex = cart.items.findIndex(item => item.productId === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({ productId, quantity});
      }

      // Recalculate price
      let total = 0;
      for (const item of cart.items) {
        const p = await Product.findById(item.productId);
        total += p.price * item.quantity;
      }

      cart.totalPrice = total;
      await cart.save();

    } else {
      // Create new cart
      cart = new Cart({
        userId,
        restaurantId: product.restaurantId,
        items: [{ productId, quantity}],
        totalPrice: product.price
      });

      await cart.save();
    }

    return res.status(200).json({ message: "Added to cart", cart });

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const getCartItems = async (req, res) => {
  try {
    const { userId } = req.query;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart is empty" });
    }

    return res.status(200).json(cart);

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const deleteFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    cart.items.splice(itemIndex, 1);

    // Recalculate totalPrice
    let total = 0;
    for (const item of cart.items) {
      const p = await Product.findById(item.productId);
      total += p.price * item.quantity;
    }
    cart.totalPrice = total;

    // If cart is empty, remove it
    if (cart.items.length === 0) {
      await Cart.findByIdAndDelete(cart._id);
      return res.status(200).json({ message: "Cart is now empty" });
    } else {
      await cart.save();
      return res.status(200).json({ message: "Item removed", cart });
    }

  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export {addToCart,getCartItems,deleteFromCart};