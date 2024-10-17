import {
  ApiError,
  ApiResponse,
  asyncHandler,
  uploadOnCloudinary,
} from "../utils/index.js";
import User from "../models/users.models.js";
import bcryptjs from "bcryptjs";
export const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res
      .status(400)
      .json(new ApiError(400, "User ID is required for updating"));
  }
  if (req.user._id.toString() !== userId) {
    return res
      .status(403)
      .json(new ApiError(403, "You are not authorized to update this user"));
  }
  const { username, email, password } = req.body;
  const ProfilePicture_localPath = req.file?.path;
  const ProfilePicture = await uploadOnCloudinary(ProfilePicture_localPath);
  const updates = {};
  const fields = { username, email, password };

  Object.keys(fields).forEach((key) => {
    const value = fields[key];
    if (value && value.trim() !== "") {
      updates[key] = key === "password" ? bcryptjs.hashSync(value, 10) : value;
    }
  });
  if (ProfilePicture) updates.ProfilePicture = ProfilePicture?.url;
  const user = await User.findByIdAndUpdate(userId, updates, { new: true });
  if (!user) throw new ApiError(404, "User not found");
  return res.status(200).json(new ApiResponse(200, user, "User updated!"));
});
