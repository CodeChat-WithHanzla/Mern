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
export const getPosts = asyncHandler(async (req, res) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === "asc" ? 1 : -1;

    const filter = {};
    if (req.query.userId) filter.userId = req.query.userId;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.slug) filter.slug = req.query.slug;
    if (req.query.postId) filter._id = req.query.postId;
    if (req.query.searchItem) {
      filter.$or = [
        { title: { $regex: req.query.searchItem, $options: "i" } },
        { content: { $regex: req.query.searchItem, $options: "i" } },
      ];
    }

    const posts = await Post.find(filter)
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    return res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    throw new ApiError(
      400,
      `Error occurred while getting posts: ${error.message}`
    );
  }
});
export const deletePosts = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId)
    throw new ApiError(403, "You are not allowed to delete this post");
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json("The post has been deleted");
  } catch (error) {
    new ApiError(500, error.message);
  }
});
