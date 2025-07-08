import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useReviewStore = create((set) => ({
  allReviews: [],
  latestReviews: [],
  isLoadingReviews: false,
  isPostingReview: false,
  isUpdatingReview: false,
  isDeletingReview: false,

  getAllReviews: async (productId) => {
    set({ isLoadingReviews: true });
    try {
      const res = await axiosInstance.get(`/reviews/${productId}`);
      set({ allReviews: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to fetch reviews");
    } finally {
      set({ isLoadingReviews: false });
    }
  },

  getLatestReviews: async (productId) => {
    set({ isLoadingReviews: true });
    try {
      const res = await axiosInstance.get(`/reviews/${productId}/latest`);
      set({ latestReviews: res.data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch latest reviews"
      );
    } finally {
      set({ isLoadingReviews: false });
    }
  },

  addReview: async (reviewData) => {
    set({ isPostingReview: true });
    try {
      const res = await axiosInstance.post(
        `/reviews/${reviewData.productId}`,
        reviewData
      );
      toast.success(res.data.message);
      set((state) => ({
        allReviews: [...state.allReviews, res.data.createdReview],
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to post review");
    } finally {
      set({ isPostingReview: false });
    }
  },

  updateReview: async (reviewId, updatedData) => {
    set({ isUpdatingReview: true });
    try {
      const res = await axiosInstance.put(`/reviews/${reviewId}`, updatedData);
      toast.success("Review updated");
      set((state) => ({
        allReviews: state.allReviews.map((r) =>
          r._id === reviewId ? res.data : r
        ),
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update review");
    } finally {
      set({ isUpdatingReview: false });
    }
  },

  deleteReview: async (reviewId) => {
    set({ isDeletingReview: true });
    try {
      await axiosInstance.delete(`/reviews/${reviewId}`);
      toast.success("Review deleted");
      set((state) => ({
        allReviews: state.allReviews.filter((r) => r._id !== reviewId),
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete review");
    } finally {
      set({ isDeletingReview: false });
    }
  },
}));
