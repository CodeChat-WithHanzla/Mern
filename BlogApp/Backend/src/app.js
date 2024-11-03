import express from "express";
import {
  authRouter,
  userRouter,
  postRouter,
  commentRouter,
} from "./routes/index.js";
import cors from "cors";
import { errorHandler } from "./utils/errorHandler.js";
import cookieParser from "cookie-parser";
const app = express();
// Dependencies
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Routes
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);
app.use("/api/v1", commentRouter);
app.use(errorHandler);
export default app;
