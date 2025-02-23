import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const addUserAddress = async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }
    user.address.push(address);
    await user.save();

    return res.status(200).json({
      message: "address saved successfully",
      address: user.address,
    });
  } catch (error) {
    console.log("Error in addAddress controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateUserAddress = async (req, res) => {};
export const becomeASeller = async (req, res) => {};
export const deleteUserProfile = async (req, res) => {};
