import { Router } from "express";
import { SignUp } from "../controllers/auth.controllers.js";
const authRouter = Router();
authRouter.post("/signup", SignUp);
export default authRouter;