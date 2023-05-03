import express from "express";
import bodyParser from "body-parser";
import Tasks from "../model/taskModel.js";

const app = express();

app.use(bodyParser.json());

export const getAllTask = async (req, res) => {
  try {
    const taskList = await Tasks?.find();
    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({ message: "Catched error in getAllTask" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks?.findById(id);
    console.log(task);
    if (!task) {
      return res
        .status(404)
        .json({ message: `Cannot find any task with ID ${id}` });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Catched error in getTaskById" });
  }
};

export const addTask = async (req, res) => {
  try {
    const taskList = await Tasks?.create(req.body);
    res.status(200).json(taskList);
  } catch (error) {
    res.status(500).json({ message: "Catched error in adding task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks?.findByIdAndUpdate(id, req.body);
    if (!task) {
      return res
        .status(404)
        .json({ message: `Cannot find any task with ID ${id}` });
    }
    const taskUpdated = await Tasks?.findById(id);
    res.status(200).json(taskUpdated);
  } catch (error) {
    res.status(500).json({ message: "Catched error in updating task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Tasks?.findByIdAndDelete(id);
    if (!task) {
      return res
        .status(404)
        .json({ message: `Cannot find any task with ID ${id}` });
    }
    res.status(200).json({ message: "Task deleted Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Catched error in delete task" });
  }
};
