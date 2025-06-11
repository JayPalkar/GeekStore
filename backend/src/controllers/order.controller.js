import Order from "../models/order.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { products, totalPrice, status } = req.body;
    if (!products || !totalPrice || !status) {
      return res.status(400).json({
        message: "missing essential fields required to place an order.",
      });
    }

    const newOrder = new Order({
      userId: req.user._id,
      products,
      totalPrice,
      status,
    });

    const orderPlaced = await newOrder.save();
    res.status(200).json({ message: "Order placed successfully", orderPlaced });
  } catch (error) {
    console.error("Error in placeOrder controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const myOrders = await Order.find({ userId });
    if (!myOrders) {
      return res.status(404).json({ message: "No current orders" });
    }

    res.status(200).json(myOrders);
  } catch (error) {
    console.error("Error in getUserOrders controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getSingleOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error in getSingleOrder controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const cancelOrder = { status: "cancelled" };

    const updatedOrder = await Order.findByIdAndUpdate(orderId, cancelOrder, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Order cancellation was successful", updatedOrder });
  } catch (error) {
    console.error("Error in cancelOrder controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderStatus = await Order.findById(orderId).select(status);
    if (!orderStatus) {
      return res.status(404).json({ message: "order status not found" });
    }
    res.status(200).json(orderStatus);
  } catch (error) {
    console.error("Error in cancelOrder controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const newStatus = req.body;

    const updatedOrderStatus = await Order.findByIdAndUpdate(
      orderId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedOrderStatus) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "OrderStatusUpdated", updatedOrderStatus });
  } catch (error) {
    console.error("Error in cancelOrder controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
