import User from "../models/users.models.js";
import bcryptjs from "bcryptjs";
import { ApiError, ApiResponse, asyncHandler } from "../utils/index.js";

export const SignUp = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  [username, email, password].some((field) => {
    if (field?.trim() === "")
      throw new ApiError(400, "All fields are Required");
  });
  const hashedPassword = bcryptjs.hashSync(password);
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }
  try {
    await User.create({ username, email, password: hashedPassword });
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { username, email, password },
          "Successfull sign-up"
        )
      );
  } catch (error) {
    res
      .status(400)
      .json(new ApiError(400, `Error While SignUp :: ${error.message}`));
  }
});
