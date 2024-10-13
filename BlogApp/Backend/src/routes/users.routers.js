import { Router } from "express";
import { updateUser } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
const userRouter = Router();
userRouter.put("/update/:userId", updateUser);
export default userRouter;
