import { Todo } from "../models/todo.models.js";
import ApiError from "../ApiError.js";

const getTodo = async (_, res) => {
  const todos = await Todo.find();
  if (!todos) throw new ApiError(400, "Todo Not Found");
  res.status(200).json({ todos });
};
const createTodo = async (req, res) => {
  const { text, isCompleted } = req.body;
  if (!text) throw new ApiError(400, "Text is required");
  const todo = await Todo.create({ text });
  if (!todo) throw new ApiError(400, "Todo can`t be created plz try again");
  res.status(200).json({ todo, isCompleted });
};
const updateTodo = async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!todo) throw new ApiError(400, "Such todo don`t exist");
  res.status(200).json({ todo });
};
const deleteTodo = async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Todo Deleted" });
};
export { getTodo, createTodo, updateTodo, deleteTodo };
