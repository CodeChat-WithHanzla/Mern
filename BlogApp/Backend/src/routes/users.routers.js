import { Router } from "express";
import { updateUser } from "../controllers/user.controllers.js";
const userRouter = Router();
userRouter.put("/update/:userId", updateUser);
export default userRouter;
