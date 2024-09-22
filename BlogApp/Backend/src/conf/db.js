import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";

const connectDb = async () => {
  try {
    const dbConnect = await mongoose.connect(
      `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
    );
    console.log(`MongoDB connected Successfully ${dbConnect.connection.host}`);
  } catch (error) {
    console.log(`Error :: ${error} `);
    throw new ApiError(400,"Failed to connect database")
  }
};
export default connectDb;
