import { Router } from "express";
import { SignUp } from "../controllers/auth.controllers.js";
const authRouter = Router();
authRouter.post("/auth/signup", SignUp);
export default authRouter;