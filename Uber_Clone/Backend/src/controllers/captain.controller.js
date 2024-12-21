import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.services.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { fullName, email, password, vehicle } = req.body;
  const existedCaptain = await captainModel.findOne({
    $or: [
      { "fullName.firstName": fullName.firstName },
      { email },
      { "vehicle.plate": vehicle.plate },
    ],
  });

  if (existedCaptain) {
    if (existedCaptain.email === email) {
      return res.status(400).json({ msg: "Captain with this email exists" });
    }

    if (existedCaptain.fullName?.firstName === fullName.firstName) {
      return res.status(400).json({ msg: "Captain with this name exists" });
    }

    if (existedCaptain.vehicle?.plate === vehicle.plate) {
      return res
        .status(400)
        .json({ msg: "Captain with this plate number exists" });
    }
  }

  const hashPassword = await captainModel.hashPasswords(password);
  const captain = await createCaptain({
    fullName,
    email,
    hashPassword,
    vehicle,
  });
  const token = await captain.generateAuthToken();
  res.status(201).json({ token, captain });
};
