import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${b64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "products",
    });

    res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Image upload error:", error.message);
    res.status(500).json({ message: "Image upload failed" });
  }
};
