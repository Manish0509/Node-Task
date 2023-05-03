import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
const app = express();

app.use(bodyParser.json());

// initial data created
var tasks = [
  {
    id: "e08c20d4-2dd7-485f-ba05-9ee564a742f2",
    task: "Implement Registration form",
    description: "Implement using HTML",
    assignee: "Manish",
    createdAt: "2023-04-19T11:22:01.790Z",
  },
];

export const getAllTask = async (req, res) => {
  try {
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Catched error in getAllTask" });
  }
};

export const getTaskById = (req, res) => {
  try {
    const id = req.params.id;
    const task = tasks?.find((task) => task?.id === id);
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

export const addTask = (req, res) => {
  try {
    const task = req.body;
    task.id = uuidv4();
    task.createdAt = new Date();
    tasks.push(task);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Catched error in adding task" });
  }
};

export const updateTask = (req, res) => {
  try {
    const taskId = req.params.id;
    const task = req.body;
    task.UpdatedAt = new Date();
    const taskIndex = tasks?.findIndex((task) => task?.id === taskId);
    if (taskIndex === -1) {
      res.status(404).json("User not found");
    } else {
      // Update the user with the new data
      tasks.splice(taskIndex, 1, { ...tasks[taskIndex], ...task, id: taskId });
      const updatedtask = tasks?.find((task) => task?.id === taskId);
      res.status(200).json(updatedtask);
    }
  } catch (error) {
    res.status(500).json({ message: `No task found with ID ${taskId}` });
  }
};

export const deleteTask = (req, res) => {
  try {
    const id = req.params?.id;
    const taskIndex = tasks?.findIndex((task) => task?.id === id);
    if (taskIndex === -1) {
      res.status(404).json("Task not found");
    } else {
      tasks.splice(taskIndex, 1);
      res.status(200).json("Record Deleted sucessfully");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Cannot find any task with ID ${id}` });
  }
};
