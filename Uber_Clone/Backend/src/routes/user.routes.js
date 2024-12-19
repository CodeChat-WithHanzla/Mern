import { Router } from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/user.controller.js";
import { authUser } from "../../middlewares/authUser.middlewares.js";
const routes = Router();
routes.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters long"),
  ],
  registerUser
);
routes.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be 6 characters long"),
  ],
  loginUser
);
routes.get("/profile", authUser, getUserProfile);
export default routes;
