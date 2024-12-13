import { Router } from "express";
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controller.js";
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
export default routes;
