import express from "express";
import { authRouter, userRouter } from "./routes/index.js";
import cors from "cors";
import { errorHandler } from "./utils/errorHandler.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use("/api/v1", authRouter);
app.use("/api/v1", userRouter);

export default app;
