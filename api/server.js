const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const projectsRouter = require("../projects/projects-router");
const resourcesRouter = require("../resources/resource-router");
const authRouter = require("../auth/auth-router");
const valuesRouter = require("../values/values-router");
const contextsRouter = require("../contexts/context-router");
const valueProjectRouter = require("../value-projects/value-projects-router");

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/projects", projectsRouter);
server.use("/api/resources", resourcesRouter);
server.use("/api/values", valuesRouter);
server.use("/api/contexts", contextsRouter);
server.use("/api/value/projects", valueProjectRouter);

server.get("/", (req, res) => {
  res.send("<h5>Here to serve.");
});

server.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500).json({
    message: "Something went wrong!"
  });
});

module.exports = server;
