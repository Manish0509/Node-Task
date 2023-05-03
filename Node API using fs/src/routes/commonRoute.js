const express = require("express");
const router = express.Router();

const {
  getAllTask,
  getTaskById,
  addTask,
  updateTask,
  deleteTask,
} = require("../controller/commonController");

router.get("/", getAllTask);

router.post("/", addTask);

router.get("/:id", getTaskById);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;
