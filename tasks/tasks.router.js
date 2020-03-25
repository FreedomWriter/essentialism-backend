const express = require("express");
const taskModel = require("./tasks-models");
const validateTaskId = require("../middleware/validateTaskId");
const validateProjectId = require("../middleware/validateProjectId");
const restricted = require("../middleware/restricted");

const router = express.Router({
  mergeParams: true
});

router.get("/", validateProjectId, async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const tasks = await taskModel.find(project_id);
    if (tasks) {
      res.json(tasks);
    } else {
      res.status(404).json({ message: `This project has no tasks!` });
    }
  } catch (err) {
    next(err);
  }
});

// check model if this route is problematic
router.post("/", validateProjectId, async (req, res, next) => {
  try {
    const { project_id } = req.params;
    const newTask = await taskModel.add(project_id, req.body);

    res.json(newTask);
  } catch (err) {
    next(err);
  }
});
router.get(
  "/:task_Id",

  validateProjectId,
  validateTaskId,
  async (req, res, next) => {
    try {
      const { task_id } = req.params;
      const task = await taskModel.findById(task_id);
      res.json(task);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", validateProjectId, async (req, res, next) => {
  const { project_id } = req.params;
  try {
    const newTask = await taskModel.add(project_id, req.body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:task_id",

  validateProjectId,
  validateTaskId,
  async (req, res, next) => {
    try {
      const { task_id } = req.params;
      const task = await taskModel.update(task_id, req.body);
      res.json(task);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:task_id",

  validateProjectId,
  validateTaskId,
  async (req, res, next) => {
    try {
      const { task_id } = req.params;
      const deletedCount = await taskModel.remove(task_id);

      res.json({ removed: deletedCount });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
