import { Router } from "express";
import { updateUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
const userRouter = Router();
userRouter.put(
  "/update/:userId",
  verifyJWT,
  upload.single("ProfilePicture"),
  updateUser
);
export default userRouter;
