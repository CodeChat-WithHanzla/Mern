import { Router } from "express";
import { authUser } from "../../middlewares/authUser.middlewares.js";
import {
  getCoordinates,
  getDistanceTimeController,
  getAutoCompleteSuggestions,
} from "../controllers/map.controller.js";
import { query } from "express-validator";

const router = Router();
router.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authUser,
  getCoordinates
);
router.get(
  "/get-distance-time",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isString().isLength({ min: 3 }),
  authUser,
  getDistanceTimeController
);
router.get("/get-suggestions", authUser, getAutoCompleteSuggestions);
export default router;
