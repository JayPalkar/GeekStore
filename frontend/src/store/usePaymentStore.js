import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const usePaymentStore = create((set) => ({
  payment: null,
  paymentStatus: null,
  isInitiatingPayment: false,
  isVerifyingPayment: false,

  initiatePayment: async (data) => {
    set({ isInitiatingPayment: true });
    try {
      const res = await axiosInstance.post("/payments", data);
      set({ payment: res.data });
      toast.success("Payment initiated successfully");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to initiate payment"
      );
    } finally {
      set({ isInitiatingPayment: false });
    }
  },

  verifyPaymentStatus: async (orderId) => {
    set({ isVerifyingPayment: true });
    try {
      const res = await axiosInstance.get(`/payments/${orderId}`);
      set({ paymentStatus: res.data });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to verify payment");
    } finally {
      set({ isVerifyingPayment: false });
    }
  },
}));
