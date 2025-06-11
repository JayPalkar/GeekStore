import Review from "../models/review.model.js";

export const AddReview = async (req, res) => {
  try {
    const { productId, rating, review } = req.body;
    if (!productId || !rating || !review) {
      return res.status(404).json({ message: "missing required fields" });
    }
    const newReview = new Review({
      userId: req.user._id,
      productId,
      rating,
      review,
    });

    const createdReview = await newReview.save();
    res
      .status(200)
      .json({ message: "Review posted successfully", createdReview });
  } catch (error) {
    console.log("Error in AddReview controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getLatestReviewsForAProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const latestReviews = await Review.find({ productId })
      .sort({ createdAt: -1 })
      .limit(3);
    if (latestReviews.length === 0) {
      return res.status(404).json({ message: "Failed to fetch latest Review" });
    }
    res.status(200).json(latestReviews);
  } catch (error) {
    console.log(
      "Error in getLatestReviewsForAProduct controller",
      error.message
    );
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllReviewsForAProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ productId });
    if (!reviews) {
      return res.status(404).json({ message: "Failed to fetch Review" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.log("Error in getAllReviewsForAProduct controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateAReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, review } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      { rating, review },
      { new: true }
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    console.log("Error in updateAReview controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteAReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const deletedReview = await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "Review Deleted Successfully" });
  } catch {
    console.log("Error in deleteAReview controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
