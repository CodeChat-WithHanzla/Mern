import express from "express";
import cors from "cors";
import router from "./routes/todo.routes.js";
const app = express();
// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/v1/todos", router);
export { app };
