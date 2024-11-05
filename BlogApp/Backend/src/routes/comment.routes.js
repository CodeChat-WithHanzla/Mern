import { Router } from "express";
import {
  createComment,
  getComments,
  likeComment,
  updateComment,
  deleteComment,
} from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const commentRouter = Router();
commentRouter.post("/comments/create", verifyJWT, createComment);
commentRouter.get("/comments/get/:postId", getComments);
commentRouter.put("/comments/likeComment/:commentId", verifyJWT, likeComment);
commentRouter.put(
  "/comments/updateComment/:commentId",
  verifyJWT,
  updateComment
);
commentRouter.delete(
  "/comments/deleteComments/:commentId",
  verifyJWT,
  deleteComment
);
export default commentRouter;
