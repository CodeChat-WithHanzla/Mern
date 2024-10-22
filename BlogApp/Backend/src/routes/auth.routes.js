import { Router } from "express";
import {
  SignUp,
  SignIn,
  SignOut,
  GoogleOAuth,
} from "../controllers/auth.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";
const authRouter = Router();
authRouter.post("/auth/signup", upload.single("ProfilePicture"), SignUp);
authRouter.post("/auth/signin", SignIn);
authRouter.post("/auth/signout", SignOut);
authRouter.post("/auth/googleOAuth", GoogleOAuth);
export default authRouter;
