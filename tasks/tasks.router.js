const express = require("express");
const db = require("./tasks-models");
const validateTaskId = require("../middleware/validateTaskId");

const router = express.Router({
  mergeParams: true
});

router.get("/", async (req, res, next) => {
  try {
    const { id } = req.params;
    const tasks = await db.find(id);

    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { id } = req.params;
    const newTask = await db.add(id, req.body);

    res.json(newTask);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
