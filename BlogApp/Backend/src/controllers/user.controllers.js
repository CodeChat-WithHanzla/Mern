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
  if (!user) throw new ApiError(404, "The specified user could not be found.");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "The user information has been successfully updated!"
      )
    );
});
export const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  if (!userId) {
    return res
      .status(400)
      .json(
        new ApiError(400, "A User ID is required to proceed with the deletion")
      );
  }
  if (!req.user.isAdmin && req.user._id.toString() !== userId) {
    return res
      .status(403)
      .json(
        new ApiError(403, "You do not have permission to delete this user.")
      );
  }
  await User.findByIdAndDelete(userId);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "",
        "The user account has been successfully deleted."
      )
    );
});
export const getUsers = asyncHandler(async (req, res) => {
  try {
    if (!req.user.isAdmin)
      throw new ApiError(403, "You are not allowed to see all users");
    const filters = {};
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    if (startIndex) filters.startIndex = startIndex;
    if (limit) filters.limit = limit;
    if (sortDirection) filters.sortDirection = sortDirection;
    const users = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit)
      .select("-password -refreshToken");
    const totalUsers = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { users, totalUsers, lastMonthUsers },
          "Users successfully retrieved."
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});
export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId).select(
    "-password -refreshToken"
  );
  if (!user) throw new ApiError(404, "User not found");
  res
    .status(200)
    .json(new ApiResponse(200, user, "User retrieved successfully!"));
});
