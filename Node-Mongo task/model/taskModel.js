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
    timestamps: true,
    versionKey: false,
  }
);

// This will create new model with name "tasklist"
const Tasks = mongoose.model("TaskList", taskSchema);

export default Tasks;
