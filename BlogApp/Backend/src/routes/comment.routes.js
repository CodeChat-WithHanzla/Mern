import { Router } from "express";
import { createComment } from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const commentRouter = Router();
commentRouter.post("/comments/create", verifyJWT, createComment);
export default commentRouter;
