const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use(helmet());

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
