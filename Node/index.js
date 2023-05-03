import express from "express";
import bodyParser from "body-parser";
import taskRoute from "./router/commonRouter.js";
import http from "http";
const app = express();

app.use(bodyParser.json());

app.use("/task", taskRoute);

const server = http.createServer(app);

server.listen(3000, () => {
  console.log(`App listening at http://localhost:3000`);
});
