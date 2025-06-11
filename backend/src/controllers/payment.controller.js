import Payment from "../models/payment.model.js";

export const initiatePayment = async (req, res) => {
  try {
    const { orderId, userId, status, transactionId } = req.body;
    if (!orderId || !userId || !status || !transactionId) {
      return res
        .status(404)
        .json({ message: "Missing required fields to initiate a payment" });
    }
    const newPayment = new Payment({
      orderId,
      userId,
      status,
      transactionId,
    });
    const payment = await newPayment.save();
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error in initiatePayment controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const verifyPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const paymentStatus = await Payment.findById({ orderId }).select(status);
    if (!paymentStatus) {
      return res
        .status(404)
        .json({ message: "failed to fetch payment status" });
    }
    res.status(200).json(paymentStatus);
  } catch (error) {
    console.error("Error in verifyPaymentStatus controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
