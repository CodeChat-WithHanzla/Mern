import { asyncHandler, ApiError, ApiResponse } from "../utils/index.js";
import Comment from "../models/comments.models.js";
export const createComment = asyncHandler(async (req, res) => {
  const { content, postId, userId } = req.body;
  if (userId !== req.user._id.toString())
    throw new ApiError(403, "You are not allowed to create this comment");
  const newComment = await Comment.create({ content, postId, userId });
  res.status(201).json(new ApiResponse(201, newComment, "Comment created!"));
});
export const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ postId: req.params.postId }).sort({
    createdAt: -1,
  });
  res
    .status(200)
    .json(new ApiResponse(200, comments, "Get the comment successfully"));
});
export const likeComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) throw new ApiError(404, "Comment not found");
  const userIndex = comment.likes.indexOf(req.user._id);
  if (userIndex == -1) {
    comment.numberOfLikes += 1;
    comment.likes.push(req.user._id);
  } else {
    comment.numberOfLikes -= 1;
    comment.likes.splice(userIndex, 1);
  }
  await comment.save();
  res.status(201).json(new ApiResponse(201, comment, "Like or unLike"));
});
export const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId)
    throw new ApiError(400, "Comment Id is required for updating the post");
  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }
  const { userId } = comment;
  if (req.user._id.toString() !== userId.toString())
    throw new ApiError(403, "You are not allowed to edit this comment");
  const { content } = req.body;
  if (!content) throw new ApiError(400, "Content required for updating ");
  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true }
  );
  res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment edited successfully"));
});
export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId)
    throw new ApiError(400, "Comment Id is required to delete the comment ");
  const comment = await Comment.findById(commentId);
  if (!comment) throw new ApiError(404, "Comment with this Id is not found");
  if (
    comment.userId.toString() !== req.user._id.toString() ||
    !req.user.isAdmin
  )
    throw new ApiError(403, "You are not authorized for this request");
  await Comment.findByIdAndDelete(commentId);
  res
    .status(200)
    .json(new ApiResponse(200, null, "Commment deleted successfully"));
});
export const getAllComments = asyncHandler(async (req, res) => {
  if (!req.user.isAdmin)
    throw new ApiError(403, "You are not allowed to get all comments");
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.sort === "desc" ? -1 : 1;
  const comments = await Comment.find()
    .sort({ createdAt: sortDirection })
    .skip(startIndex)
    .limit(limit);
  if (!comments) throw new ApiError(404, "Comments not found");
  const totalComments = await Comment.countDocuments();
  const now = new Date();
  const oneMonthAgo = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  const lastMonthComments = await Comment.countDocuments({
    createdAt: { $gte: oneMonthAgo },
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { comments, totalComments, lastMonthComments },
        "All comments are retrieve successfully"
      )
    );
});
