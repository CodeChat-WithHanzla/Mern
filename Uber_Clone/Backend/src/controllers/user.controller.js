import userModel from "../models/user.model.js";
import { createUser } from "../services/user.services.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { fullName, email, password } = req.body;
  const existedUser = await userModel.findOne({
    "fullName.firstName": fullName.firstName,
  });
  const existedEmail = await userModel.findOne({ email });

  if (existedUser || existedEmail) {
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
  res.status(200).json({ token, user });
};
