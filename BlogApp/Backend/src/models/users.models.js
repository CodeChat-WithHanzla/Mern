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
    ProfilePicture: {
      type: String,
      default:
        "data:image/png;base64,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",
    },
    refreshToken: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
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
      isAdmin: this.isAdmin,
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
