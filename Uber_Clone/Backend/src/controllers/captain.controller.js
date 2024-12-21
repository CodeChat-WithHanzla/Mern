import BlackListToken from "../models/blankListToken.model.js";
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
export const loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) return res.status(400).json({ msg: "Invalid Email" });
  const isMatch = await captain.comparePasswords(password, captain.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });
  const token = captain.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, captain });
};
export const getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};
export const logoutCaptain = async (req, res, next) => {
  const token = req.cookies?.token || req.header?.authorization?.split(" ")[1];
  await BlackListToken.create({ token });
  res.clearCookie("token");
  res.status(200).json({ msg: "Logout Successfully" });
};