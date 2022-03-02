const express = require("express");
const GoalModel = require("./goals-model");
const db = require("./goals-model");

const restricted = require("../middleware/restricted");
const validateGoalId = require("../middleware/validateGoalId");

const router = express.Router();

router.get("/", restricted, async (req, res, next) => {
  try {
    const Goals = await db.find();
    res.json(Goals);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", restricted, validateGoalId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const goal = await db.findById(id);
    res.json(goal);
  } catch (err) {
    next(err);
  }
});

router.post("/", restricted, async (req, res, next) => {
  try {
    const newGoal = await GoalModel.add(req.body);
    res.status(201).json(newGoal);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", restricted, validateGoalId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const goal = await GoalModel.update(id, req.body);
    res.json(goal);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restricted, validateGoalId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await GoalModel.remove(id);
    res.json({ removed: deletedCount });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
