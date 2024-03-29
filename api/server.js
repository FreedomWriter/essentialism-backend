const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const userRouter = require("../users/users-router");
const resourcesRouter = require("../resources/resource-router");
const authRouter = require("../auth/auth-router");
const GoalsRouter = require("../goals/goals-router");
const contextsRouter = require("../contexts/context-router");
const userDataRouter = require("../user-data/user-data-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/user", userRouter);

server.use("/api/resources", resourcesRouter);
server.use("/api/goals", GoalsRouter);
server.use("/api/contexts", contextsRouter);
server.use("/api/user/data", userDataRouter);

server.get("/", (req, res) => {
  res.send("<h5>Here to serve.");
});

server.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
  });
});

module.exports = server;
