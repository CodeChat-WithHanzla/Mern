import express from "express";
import { authRouter, userRouter } from "./routes/index.js";
import cors from "cors";
import { errorHandler } from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
const app = express();
// Dependencies
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use(errorHandler);
export default app;
