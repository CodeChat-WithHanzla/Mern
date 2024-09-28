import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compareSync(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      password: this.password,
    },
    process.env.ACCESS_PRIVATE_KEY,
    {
      expiresIn: process.env.ACCESS_PRIVATE_KEY_Expires,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_PRIVATE_KEY,
    {
      expiresIn: process.env.REFRESH_PRIVATE_KEY_Expires,
    }
  );
};
const User = model("User", userSchema);
export default User;
