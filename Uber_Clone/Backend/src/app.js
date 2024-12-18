import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/users", userRoutes);
export default app;
