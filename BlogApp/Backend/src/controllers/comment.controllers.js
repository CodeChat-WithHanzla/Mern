import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import Comment from "../models/comments.models.js";
export const createComment = asyncHandler(async (req, res) => {
  const { content, postId, userId } = req.body;
  if (userId !== req.user._id.toString())
    throw new ApiError(403, "You are not allowed to create this comment");
  const newComment = await Comment.create({ content, postId, userId });
  res.status(201).json(new ApiResponse(201, newComment, "Comment created!"));
});
