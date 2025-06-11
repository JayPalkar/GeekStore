import { recalculateTotalPrice } from "../config/utils.js";
import Cart from "../models/cart.model.js";

export const getShoppingCart = async (req, res) => {
  try {
    const id = req.user._id;

    const cart = await Cart.findOne({ userId: id });

    if (!cart) {
      return res.status(404).json({ message: "The cart is empty" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in getShoppingCart controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addItemToCart = async (req, res) => {
  try {
    const id = req.user._id;
    const product = req.body;
    if (!product) {
      return res.status(404).json({
        message: "Missing required product details: productId or Quantity",
      });
    }
    const cart = await Cart.findById({ userId: id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.products.push(product);
    await recalculateTotalPrice(cart);
    await cart.save();

    res
      .status(200)
      .json({ message: "Item added successfully", cart: cart.products });
  } catch (error) {
    console.log("Error in addItemToCart controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const id = req.user._id;
    const { productId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ userId: id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    product.quantity = quantity;

    await recalculateTotalPrice(cart);
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in updateCartItem controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const id = req.user._id;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId: id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const originalLength = cart.products.length;

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== productId
    );

    if (cart.products.length === originalLength) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await recalculateTotalPrice(cart);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in deleteCartItem controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
