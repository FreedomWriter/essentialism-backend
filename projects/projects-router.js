const express = require("express");
const projectModel = require("./projects-model");
const db = require("./projects-model");
const tasksRouter = require("../tasks/tasks.router");

const router = express.Router();

router.use("/:id/tasks", tasksRouter);

router.get("/", async (req, res, next) => {
  try {
    const projects = await db.find();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const project = await db.findById(id);
  if (project) {
    res.json(project);
  } else {
    res
      .status(404)
      .json({ message: `Could not find project with id of ${id}` });
  }
  try {
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newproject = await projectModel.add(req.body);
    res.status(201).json(newproject);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.update(id, req.body);
    if (project) {
      res.json(project);
    } else {
      res
        .status(404)
        .json({ message: `Could not find project with id of ${id}` });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await projectModel.remove(id);
    console.log(deletedCount);
    if (deletedCount) {
      res.json({ removed: deletedCount });
    } else {
      res
        .status(404)
        .json({ message: `Could not find project with id of ${id}` });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
