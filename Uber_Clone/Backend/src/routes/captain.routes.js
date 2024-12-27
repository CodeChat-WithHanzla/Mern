import { Router } from "express";
import { body } from "express-validator";
import {
  registerCaptain,
  loginCaptain,
  getCaptainProfile,
  logoutCaptain,
} from "../controllers/captain.controller.js";
import { authCaptain } from "../../middlewares/authUser.middlewares.js";
const router = Router();
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate must be at least 3 characters long"),
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  registerCaptain
);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginCaptain
);
router.get("/profile", authCaptain, getCaptainProfile);
router.get("/logout", authCaptain, logoutCaptain);
export default router;