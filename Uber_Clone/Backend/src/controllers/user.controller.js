import userModel from "../models/user.model.js";
import { createUser } from "../services/user.services.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import BlackListToken from "../models/blankListToken.model.js";

export const registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { fullName, email, password } = req.body;
  const existedUser = await userModel.findOne({
    $or: [{ "fullName.firstName": fullName.firstName }, { email }],
  });
  if (existedUser) {
    return res.status(400).json({ msg: "User with this email or name exists" });
  }
  const hashPassword = await userModel.hashPasswords(password);
  const user = await createUser({
    fullName,
    email,
    hashPassword,
  });
  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};
export const loginUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  if (!user)
    return res
      .status(404)
      .json({ msg: "The user associated with this email does not exist." });
  const isMatch = await user.comparePasswords(password);
  if (!isMatch) return res.status(401).json({ msg: "Incorrect password" });
  const token = await user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, user });
};
export const getUserProfile = async (req, res, next) => {
  return res.status(200).json(req.user);
};
export const logoutUser = async (req, res, next) => {
  const token =
    req.cookies?.token || req.header("authorization")?.split(" ")[1];
  await BlackListToken.create({ token });
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out" });
};
