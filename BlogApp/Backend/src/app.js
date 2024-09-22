import express from "express";
import userRoutes from "./routes/users.routers.js";
import authRouter from './routes/auth.routes.js'
const app = express();
app.use(express.json());
app.use("/api/v1", authRouter);
export default app;
