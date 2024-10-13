import { ApiError, ApiResponse, asyncHandler } from "../utils/index.js";
import User from "../models/users.models.js";
import bcryptjs from "bcryptjs";
export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res
      .status(400)
      .json(new ApiError(400, "User ID is required for updating"));
  }
  const { username, email, password, ProfilePicture } = req.body;
  const updates = {};
  const fields = { username, email, password, ProfilePicture };

  Object.keys(fields).forEach((key) => {
    const value = fields[key];
    if (value && value.trim() !== "") {
      updates[key] = key === "password" ? bcryptjs.hashSync(value, 10) : value;
    }
  });
  const user = await User.findByIdAndUpdate(userId, updates, { new: true });
  if (!user) throw new ApiError(400, "User not found");
  return res.status(200).json(new ApiResponse(200, user, "User updated!"));
});
