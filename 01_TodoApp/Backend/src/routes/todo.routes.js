import {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controllers.js";
import { Router } from "express";
const router = Router();
router.route("/").get(getTodo).post(createTodo);
router.route("/:id").put(updateTodo).delete(deleteTodo);
export default router;