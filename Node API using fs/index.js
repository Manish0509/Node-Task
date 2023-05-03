const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser"); // Kind of middleware is used to parse the incoming request body data in JSON format
const userRoute = require("./src/routes/commonRoute");
var http = require("http");
app.use(bodyParser.json());

app.use("/task", userRoute);
app.use(morgan("common"));

const server = http.createServer(app);
const port = 8081;
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
