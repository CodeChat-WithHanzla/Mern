import jwt from "jsonwebtoken";
import userModel from "../src/models/user.model.js";
import BlackListToken from "../src/models/blankListToken.model.js";
import captainModel from "../src/models/captain.model.js";
export const authUser = async (req, res, next) => {
  const token =
    req.cookies?.token || req.header("authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Unauthorized" });
  const isBlackedListed = await BlackListToken.findOne({ token });
  if (isBlackedListed) return res.status(401).json({ mes: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
export const authCaptain = async (req, res, next) => {
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Unauthorized" });
  const isBlackedListed = await BlackListToken.findOne({ token });
  if (isBlackedListed) return res.status(401).json({ msg: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decoded._id);
    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized" });
  }
};
