import { Router } from "express";
import { body } from "express-validator";
import { createRideController } from "../controllers/ride.controller.js";
import { authUser } from "../../middlewares/authUser.middlewares.js";

const router = Router();
router.post(
  "/create",
  authUser,
  body("pickup")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup address"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body("vehicleType")
    .isString()
    .isIn(["auto", "car", "bike"])
    .withMessage("Invalid vehicle type"),
  createRideController
);
export default router;
