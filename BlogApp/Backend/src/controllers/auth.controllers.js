import User from "../models/users.models.js";
import bcryptjs from "bcryptjs";
import { ApiError, ApiResponse, asyncHandler } from "../utils/index.js";

export const SignUp = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  [username, email, password].some((field) => {
    if (field?.trim() === "")
      throw new ApiError(400, "All fields are Required");
  });
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const user = await User.create({ username, email, password: hashedPassword });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while registering the user");

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Successfull sign-up"));
});
