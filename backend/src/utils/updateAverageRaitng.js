import Product from "../models/product.model";
import Review from "../models/review.model";

export const updateAverageRating = async (productId) => {
  const reviews = await Review.find({ productId });

  if (reviews.length === 0) {
    await Product.findByIdAndUpdate(productId, { averageRating: 0 });
    return;
  }

  let totalWeightedRating = 0;
  let totalWeight = 0;

  for (const review of reviews) {
    totalWeightedRating += review.rating * review.weight;
    totalWeight += review.weight;
  }

  const weightedAverage = totalWeightedRating / totalWeight;

  await Product.findByIdAndUpdate(productId, {
    averageRating: Number(weightedAverage.toFixed(1)),
  });
};
