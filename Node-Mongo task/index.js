import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import router from "./routes/routes.js";
import * as dotenv from "dotenv";
dotenv.config();

const database_URL = process.env.database_URL;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/task", router);

mongoose.set("strictQuery", false);
mongoose
  .connect(database_URL)
  .then(() => {
    console.log("Connected with MongoDB");
    app.listen(3000, () => {
      console.log("Node API started on port 3000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
