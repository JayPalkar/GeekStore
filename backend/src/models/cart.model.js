import mongoose from "mongoose";

const cartSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
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
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.Model("Cart", cartSchema);

export default Cart;
