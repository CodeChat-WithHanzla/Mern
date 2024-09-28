import User from "../models/users.models.js";
import bcryptjs from "bcryptjs";
import { ApiError, ApiResponse, asyncHandler } from "../utils/index.js";
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      400,
      `Error occur while generating access or refresh token ${error.message}`
    );
  }
};
export const SignUp = asyncHandler(async (req, res) => {
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
export const SignIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  [email, password].some((field) => {
    if (field?.trim() === "")
      throw new ApiError(400, "All fields are required");
  });
  const user = await User.findOne({ email });
  if (!user) throw new  ApiError(400, "User not found");
  const validPassword = await user.isPasswordCorrect(password);
  if (!validPassword) throw new ApiError(400, "Invalid Password");
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "LogIn Successfully"));
});
