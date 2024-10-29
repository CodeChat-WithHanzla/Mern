import { Router } from "express";
import {
  createPosts,
  getPosts,
  deletePosts,
} from "../controllers/post.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
const postRouter = Router();
postRouter.post(
  "/posts/create-posts",
  verifyJWT,
  upload.single("coverImage"),
  createPosts
);
postRouter.get("/posts/get-posts", getPosts);
postRouter.delete(
  "/posts/delete-posts/:postId/:userId",
  verifyJWT,
  deletePosts
);
export default postRouter;
