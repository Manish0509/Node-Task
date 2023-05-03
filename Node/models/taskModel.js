import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Please enter the task name"],
    },
    description: {
      type: String,
      required: [true, "Please enter the task description"],
    },
    assignee: {
      type: String,
      required: [true, "Please enter the task assignee"],
    },
  },
  {
    timestamp: true,
  }
);

// This will create new model with name "Tasks"
const Tasks = mongoose.model("Tasks", taskSchema);

module.exports = Tasks;
