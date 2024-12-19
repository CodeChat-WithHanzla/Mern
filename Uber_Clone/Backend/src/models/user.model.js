import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  return token;
};
userSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.statics.hashPasswords = async function (password) {
  return await bcrypt.hash(password, 10);
};
const userModel = model("user", userSchema);
export default userModel;
