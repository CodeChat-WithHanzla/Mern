import User from "../models/users.models.js";
import bcryptjs from "bcryptjs";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  uploadOnCloudinary,
} from "../utils/index.js";
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
  let hashedPassword;
  try {
    hashedPassword = bcryptjs.hashSync(password, 10);
  } catch (error) {
    throw new ApiError(500, "Error while hashing password");
  }

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const ProfilePicture_localPath = req.file?.path;
  const ProfilePicture = await uploadOnCloudinary(ProfilePicture_localPath);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    ProfilePicture: ProfilePicture?.url,
  });
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
  if (!user) throw new ApiError(400, "User not found");
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
export const GoogleOAuth = asyncHandler(async (req, res) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
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
      return res
        .status(200)
        .cookie("AccessToken", accessToken, options)
        .cookie("RefreshToken", refreshToken, options)
        .json(new ApiResponse(200, loggedInUser, "LogIn Successfully"));
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const user = await User.create({
        username: name,
        email,
        password: hashedPassword,
        ProfilePicture: googlePhotoUrl,
      });
      const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
      );
      if (!createdUser)
        throw new ApiError(
          500,
          "Something went wrong while registering the user Through Google OAuth"
        );

      return res
        .status(200)
        .json(new ApiResponse(200, createdUser, "Successfull sign-up"));
    }
  } catch (error) {
    throw new ApiError(400, "Error while OAuth Google");
  }
});
export const SignOut = asyncHandler(async (req, res) => {
  try {
    if (!req.cookies?.AccessToken && !req.cookies?.RefreshToken)
      throw new ApiError(400, "No active session to sign out from");
    res.clearCookie("AccessToken");
    res.clearCookie("RefreshToken");
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Successfully signed out"));
  } catch (error) {
    throw new ApiError(500, `Error during sign out: ${error.message}`);
  }
});
