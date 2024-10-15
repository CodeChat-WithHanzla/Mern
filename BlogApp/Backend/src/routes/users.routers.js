import { Router } from "express";
import { updateUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const userRouter = Router();
userRouter.put("/update/:userId", verifyJWT, updateUser);
export default userRouter;
