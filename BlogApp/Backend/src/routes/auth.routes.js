import { Router } from "express";
import { SignUp, SignIn } from "../controllers/auth.controllers.js";
const authRouter = Router();
authRouter.post("/auth/signup", SignUp);
authRouter.post("/auth/signin", SignIn);
export default authRouter;