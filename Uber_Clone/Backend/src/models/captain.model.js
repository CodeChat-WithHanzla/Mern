import { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const captainSchema = new Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "First name must be at least 3 characters long."],
    },
    lastName: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters long."],
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

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters long."],
    },
    plate: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Plate number must be at least 3 characters long."],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "Capacity must be at least 1."],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "bike", "auto"],
    },
  },
  socketId: {
    type: String,
  },
  location: {
    lat: {
      type: String,
    },
    lng: {
      type: String,
    },
  },
});
captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
captainSchema.methods.comparePasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};
captainSchema.statics.hashPasswords = async function (password) {
  return await bcrypt.hash(password, 10);
};

const Captain = model("Captain", captainSchema);

export default Captain;
