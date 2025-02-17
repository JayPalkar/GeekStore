import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageURL: {
      type: [String],
      require: true,
    },
    price: {
      type: Number,
      require: true,
      min: 0,
    },
    stock: {
      type: Number,
      require: true,
      default: 0,
    },
    averageRating: {
      type: Number,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    stateOfProduct: {
      type: String,
      enum: ["new_product,", "trending_product", "most_ratted"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
