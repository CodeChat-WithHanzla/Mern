import express from "express";
import userRoutes from "./routes/users.routers.js";
import authRouter from "./routes/auth.routes.js";
import cors from 'cors'
import { errorHandler } from "./utils/errorHandler.js";
const app = express();
app.use(express.json());
app.use("/api/v1", authRouter);
app.use(cors());
app.use(errorHandler)
export default app;
