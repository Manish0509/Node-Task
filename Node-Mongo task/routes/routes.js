import express from "express";
import {
  addTask,
  deleteTask,
  getAllTask,
  getTaskById,
  updateTask,
} from "../controller/controller.js";

const router = express.Router();

router.get("/", getAllTask);

router.get("/:id", getTaskById);

router.post("/", addTask);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

export default router;
