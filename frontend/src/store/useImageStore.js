import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useImageStore = create((set) => ({
  image: null,
  isImageUploading: false,

  uploadImage: async (file) => {
    set({ isImageUploading: true });
    try {
      const res = await axiosInstance.post("/images", file, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(res.data.message || "Image uploaded successfully");
      set({ image: res.data });
    } catch (err) {
      toast.error("Upload failed", err);
    } finally {
      set({ isImageUploading: true });
    }
  },
}));
