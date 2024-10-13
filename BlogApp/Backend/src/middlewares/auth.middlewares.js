import jwt from "jsonwebtoken";
import { ApiError, asyncHandler } from "../utils/index.js";
import User from "../models/users.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) throw new ApiError(401, "Unauthorized Request");
    const decodedToken = jwt.verify(token, process.env.ACCESS_PRIVATE_KEY);
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) throw new ApiError(401, "Invalid Access Token");
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
