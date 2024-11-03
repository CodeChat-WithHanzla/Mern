import { Router } from "express";
import {
  createComment,
  getComments,
} from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const commentRouter = Router();
commentRouter.post("/comments/create", verifyJWT, createComment);
commentRouter.get("/comments/get/:postId", getComments);
export default commentRouter;
