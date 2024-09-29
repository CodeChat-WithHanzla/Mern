import { Router } from "express";
import { SignUp, SignIn,GoogleOAuth } from "../controllers/auth.controllers.js";
const authRouter = Router();
authRouter.post("/auth/signup", SignUp);
authRouter.post("/auth/signin", SignIn);
authRouter.post("/auth/googleOAuth", GoogleOAuth);
export default authRouter;