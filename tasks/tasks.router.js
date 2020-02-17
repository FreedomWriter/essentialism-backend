const express = require("express");
const taskModel = require("./tasks-models");
const validateTaskId = require("../middleware/validateTaskId");
const validateProjectId = require("../middleware/validateProjectId");
const restricted = require("../middleware/restricted");

const router = express.Router({
  mergeParams: true
});

router.get("/", restricted, validateProjectId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await taskModel.find(id);

    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// check model if this route is problematic
router.post("/", restricted, validateProjectId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const newTask = await taskModel.add(id, req.body);

    res.json(newTask);
  } catch (err) {
    next(err);
  }
});
router.get(
  "/:taskId",
  restricted,
  validateProjectId,
  validateTaskId,
  async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const task = await taskModel.findById(taskId);
      res.json(task);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", restricted, validateProjectId, async (req, res, next) => {
  const { id } = req.params;
  try {
    const newTask = await taskModel.add(id, req.body);
    res.status(201).json(newTask);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:taskId",
  restricted,
  validateProjectId,
  validateTaskId,
  async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const task = await taskModel.update(taskId, req.body);
      res.json(task);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:taskId",
  restricted,
  validateProjectId,
  validateTaskId,
  async (req, res, next) => {
    try {
      const { taskId } = req.params;
      const deletedCount = await taskModel.remove(taskId);

      res.json({ removed: deletedCount });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
