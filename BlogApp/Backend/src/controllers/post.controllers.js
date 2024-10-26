import Post from "../models/posts.models.js";
import {
  ApiError,
  ApiResponse,
  asyncHandler,
  uploadOnCloudinary,
} from "../utils/index.js";
export const createPosts = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin)
    throw new ApiError(403, "You are not allowed to create a post");
  if (!req.body.title || !req.body.content)
    throw new ApiError(400, "Please provide all required fields");
  const coverImage_localPath = req.file?.path;
  let coverImage;
  if (coverImage_localPath)
    coverImage = await uploadOnCloudinary(coverImage_localPath);
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  try {
    const newPost = await Post.create({
      ...req.body,
      coverImage: coverImage?.url,
      slug,
      userId: req.user._id,
    });
    res.status(201).json(new ApiResponse(201, newPost));
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(400, "A post with this title already exists.");
    }
    throw new ApiError(400, "Error occurred while creating a post");
  }
});
