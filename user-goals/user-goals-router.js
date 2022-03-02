const express = require("express");
const userGoalModel = require("./user-goals-model");
const db = require("./user-goals-model");
const projectsRouter = require("../projects/projects-router");
const validateUserGoalId = require("../middleware/validateUserGoalId");
const validateUserGoalPost = require("../middleware/validateUserGoalPost");

const router = express.Router({
  mergeParams: true,
});

router.use("/:user_Goal_id/projects", projectsRouter);

router.get("/", async (req, res, next) => {
  try {
    const id = req.params.id;
    const Goals = await db.find(id);
    res.json(Goals);
  } catch (err) {
    next(err);
  }
});

router.get("/:user_Goal_id", validateUserGoalId, async (req, res, next) => {
  try {
    const { user_Goal_id } = req.params;
    const goal = await db.findById(user_Goal_id);
    res.json(goal);
  } catch (err) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  const { id } = req.params;
  // console.log(id);
  console.log(req.body);
  const { user_Goal, user_Goal_description } = req.body;
  console.log({ user_Goal });
  console.log({ user_Goal_description });
  console.log({ id });
  try {
    const newGoal = await userGoalModel.add({
      user_Goal,
      user_Goal_description,
      user_id: Number(id),
    });

    res.status(201).json(newGoal);
  } catch (err) {
    next(err);
  }
});

router.put("/:user_Goal_id", validateUserGoalId, async (req, res, next) => {
  try {
    const { user_Goal_id } = req.params;

    const { user_Goal_description } = req.body;

    const goal = await userGoalModel.update(user_Goal_id, req.body);
    res.json(goal);
  } catch (err) {
    next(err);
  }
});

router.delete("/user_Goal_id", validateUserGoalId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedGoal = await userGoalModel.remove(id);
    res.json({ removed: deletedGoal });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
