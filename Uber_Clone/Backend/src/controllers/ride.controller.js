import { createRide } from "../services/ride.services.js";
import { validationResult } from "express-validator";

export const createRideController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { pickup, destination, vehicleType } = req.body;
  try {
    const ride = await createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });
    return res.status(201).json(ride);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};
