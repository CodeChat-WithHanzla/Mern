import { Router } from "express";
import { updateUser, deleteUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
const userRouter = Router();
userRouter.put(
  "/update/:userId",
  verifyJWT,
  upload.single("ProfilePicture"),
  updateUser
);
userRouter.delete("/delete/:userId", verifyJWT, deleteUser);
export default userRouter;
