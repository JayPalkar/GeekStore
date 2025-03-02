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
export const updateUserAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const { address: newAddress } = req.body;

    if (!addressId || !newAddress) {
      return res
        .status(400)
        .json({ message: "AddressId and new address details are required" });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const addressIndex = user.address.findIndex(
      (addr) => addr._id.toString() === addressId
    );
    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    Object.assign(user.address[addressIndex], newAddress);

    await user.save();
    return res.status(200).json({
      message: "Address updated successfully",
      address: user.address,
    });
  } catch (error) {
    console.error("Error in updateUserAddress controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const becomeASeller = async (req, res) => {
  try {
    const userId = req.user._id;
    const updateFields = { role: "seller" };

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
      new: true,
    });
    res
      .status(200)
      .json({
        message: "User role successfully changed to seller",
        user: updatedUser,
      });
  } catch (error) {
    console.error("Error in becomeASeller controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteUserProfile = async (req, res) => {};
