import userModel from "../models/user.model.js";

export const createUser = async ({ fullName, email, hashPassword }) => {
  if (!fullName?.firstName || !email || !hashPassword)
    throw new Error("All fields are required");
  const user = await userModel.create({
    fullName: {
      firstName: fullName.firstName,
      lastName: fullName.lastName,
    },
    email,
    password: hashPassword,
  });
  return user;
};
