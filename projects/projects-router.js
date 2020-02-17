const express = require("express");
const projectModel = require("./projects-model");
const db = require("./projects-model");
const tasksRouter = require("../tasks/tasks.router");

const restricted = require("../middleware/restricted");
const validateProjectId = require("../middleware/validateProjectId");
const router = express.Router();

router.use("/:id/tasks", tasksRouter);

router.get("/", restricted, async (req, res, next) => {
  try {
    const projects = await db.find();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", restricted, validateProjectId, async (req, res, next) => {
  const { id } = req.params;
  const project = await db.findById(id);
  res.json(project);

  try {
  } catch (err) {
    next(err);
  }
});

router.post("/", restricted, async (req, res, next) => {
  try {
    const newproject = await projectModel.add(req.body);
    res.status(201).json(newproject);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", restricted, validateProjectId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.update(id, req.body);
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restricted, validateProjectId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await projectModel.remove(id);

    res.json({ removed: deletedCount });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
