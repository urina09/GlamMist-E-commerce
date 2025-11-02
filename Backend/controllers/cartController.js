import userModel from "../models/userModel.js";

// Add product to cart (no size)
export const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    cartData[itemId] = (cartData[itemId] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update cart quantity
export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId] !== undefined) {
      cartData[itemId] = quantity;
      await userModel.findByIdAndUpdate(userId, { cartData });
      res.json({ success: true, message: "Cart updated" });
    } else {
      res.json({ success: false, message: "Item not found in cart" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    delete cartData[itemId];

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Get user cart
export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
