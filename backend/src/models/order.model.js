import mongoose, { mongo } from "mongoose";

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Type.ObjectId,
          ref: "Product",
          require: "true",
        },
        quantity: {
          type: Number,
          require: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      require: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "Pending",
      require: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
